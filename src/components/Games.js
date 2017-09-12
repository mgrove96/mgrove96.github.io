import React from 'react';
import { Route } from 'react-router-dom'
import Modal from './Modal';
import '../stylesheets/Games.scss'

export default class Games extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hot: true,
      isModalOpen: false
    }
  }

  temperatureChange() {
    const temp = this.state.hot;
    this.setState({hot: !temp});
  }

  openHowToPlay() {
    this.setState({ isModalOpen: true })
  }

  closeHowToPlay() {
    this.setState({ isModalOpen: false })
  }

  render() {
    const isHot = this.state.hot;
    return (
      <div>
      <span id="howToPlayLink" onClick={() => this.openHowToPlay()}>huh?</span>
      <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeHowToPlay()}>
        <h1 className="howToPlayTitle">how to play:</h1>
        <ul className="howToPlayList">
          <li>i pick a <span className="hotText">random number</span> between 1 and 100 and keep it secret</li>
          <li>you need to <span className="hotText">guess</span> until you find the hidden secret number</li>
          <li>i'll tell you if you're <span className="hotText">hot</span> or <span className="coldText">cold</span>!</li>
        </ul>
        <button className="exitHowToPlay" onClick={() =>  this.closeHowToPlay()}>got it!</button>
      </Modal>
      <Route render={({ history}) => (
          <span id="gamesToHomeLink" onClick={() => { history.push('/') }}>home</span>
        )} />
        <div className={isHot ? "gamesView hot" : "gamesView cold"}>
          <h1 onClick={() => this.temperatureChange()} className="gamesTitle">hot or cold?</h1>
          <div className="gameArea">
            <div className="inputArea">
            </div>
            <div className="feedbackArea">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
