import React from 'react';
import { Route } from 'react-router-dom';
import '../stylesheets/Landing.scss';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolio: false
    }
  }

  handlePortfolioClick() {
    let current = this.state.portfolio;
    this.setState({portfolio: !current })
  }

  render() {
    const portfolio = this.state.portfolio;
    let content;
    if (!portfolio) {
      content = <button className="showPortfolioButton" onClick={() => this.handlePortfolioClick()}>apps i've made</button>
    } 
    else {
      content = (
      <div className="landingScrollLinks">
        <Route render={({ history}) => (
          <span id="musicLink" onClick={() => { history.push('/music') }}>music.</span>
        )} />
        <Route render={({ history}) => (
          <span id="gamesLink" onClick={() => { history.push('/hotcold') }}>games.</span>
        )} />
          <span id="socialLink"><a href="http://sunlitgrove.com/" target="_blank">social.</a></span>
       </div>
      );
    }
    return (
       <div className="view">
          <div className="landingContainer">
              <h1 className="landingTitle">hi, i'm
                <Route render={({ history}) => (
                  <span id="contactLink" onClick={() => { history.push('/contact') }}> mitch.</span>
                )} />
              </h1>
              {content}
            </div>
        </div>
    );
  }
}
