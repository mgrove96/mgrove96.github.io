import React from 'react';
import { Route } from 'react-router-dom';

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
      content = <button onClick={() => this.handlePortfolioClick()}>Portfolio</button>
    } 
    else {
      content = (
      <div className="landingScrollLinks">
        <Route render={({ history}) => (
          <span id="homeLink" onClick={() => { history.push('/') }}>Home</span>
        )} />
        <Route render={({ history}) => (
          <span id="musicLink" onClick={() => { history.push('/music') }}>Music</span>
        )} />
        <Route render={({ history}) => (
          <span id="gamesLink" onClick={() => { history.push('/games') }}>Games</span>
        )} />
       </div>
      );
    }
    return (
       <div className="view">
          <div className="landingContainer">
              <h1 className="landingTitle">hi, I'm<span id="contactLink"> mitch.</span></h1>
              {content}
            </div>
        </div>
    );
  }
}
