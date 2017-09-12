import React from 'react';
import '../stylesheets/Music.scss';
import { Route } from 'react-router-dom'
import axios from 'axios';

const getHashParams = () => {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const getTopTracks = async (token, artistName) => {
  let returnTracks = [];
  try {
    const artist = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': 'Bearer ' + token
        },
        params: {
          q: artistName,
          type: 'artist'
        }
      })
    const artistID = artist.data.artists.items[0].id;
    const tracks = await axios.get('https://api.spotify.com/v1/artists/'+artistID+'/top-tracks', {
        headers: {
        'Authorization': 'Bearer ' + token
        },
        params: {
          country: 'US'
        }
      })
    returnTracks = tracks.data.tracks;
  }
  catch (e) {
    console.error(e)
  }
  finally {
    return returnTracks;
  }
}

export default class Music extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      artistName: "",
      tracks: [],
      videoID: ""
    }
  }

  componentWillMount() {
    const hashParams = getHashParams();
    const access_token = hashParams.access_token;
    const searchVal = hashParams.state;
    if (access_token !== undefined) {
      getTopTracks(access_token, searchVal).then(tracks => this.setTracksState(tracks));
    }
  }

  setTracksState(tracks) {
    this.setState({tracks: tracks});
  }

  setVideoIdState(videoID) {
    this.setState({videoID: videoID});
  }

  artistSearch(e) {
    e.preventDefault();
    const artist = this.state.artistName
    console.log(artist);
    const client_id = '7f704c94d85f4b3ab799467aa94a1a7b'; // Your client id
    const redirect_uri = 'https://mgrove96.github.io/music'; // Your redirect uri
    const scope = 'user-read-private user-read-email';
    const state = this.state.artistName;
    let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);
    window.location = url;

  }

  handleUserInput(e) {
    this.setState({artistName: e.target.value})
  }

  handleTrackClick(query) {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        key: 'AIzaSyAmG1e0vpUuQOzRNPzKvqEczzyIm6ZE_WY',
        part: 'snippet'
      }
    }).then(response => this.setVideoIdState(response.data.items[0].id.videoId));
  }

  render() {
    let youtubePlayer;
    const vid = this.state.videoID;
    console.log(vid);
    if (vid !== "") {
      youtubePlayer = <iframe width='560' height='315' src={`https://www.youtube.com/embed/${vid}`} frameBorder='0' allowFullScreen></iframe>
    } else {
      youtubePlayer = <div></div>
    }

    let content = [];
    const tracks = this.state.tracks;
    for (let [i, track] of tracks.entries()) {
      let imageURL = track.album.images[0].url;
      let trackArtist = track.artists[0].name; 
      let trackName = track.name;
      content.push(
        <div
          className='track'
          onClick={query => this.handleTrackClick(trackArtist + " " + trackName)}
          key={i}
          style={
            {background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${imageURL}) top center / 7rem 7rem no-repeat`}
          }>
          <span>{trackName}</span>
        </div>);
    }

    return (
      <div>
        <Route render={({ history}) => (
          <span id="musicToHomeLink" onClick={() => { history.push('/') }}>home</span>
        )} />
        <div className="musicView">
          <div className="search">
            <form onSubmit={e => this.artistSearch(e)}>
              <span className="icon"><i className="fa fa-search" aria-hidden="true"></i></span>
              <input type="text" id="searchVal" placeholder="search for an artist..."
                onChange={e => this.handleUserInput(e)}
              />
            </form>
          </div>
          <div className="contentViewer">
            <div className="topTracks">
              {content}
            </div>
            <div className="youtubePlayer">
              {youtubePlayer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
