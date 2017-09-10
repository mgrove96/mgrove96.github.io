import React from 'react';
import '../stylesheets/Landing.scss';

export default class Landing extends React.Component {
  render() {
    return (
      <div className="view">
        <div className="landingContainer">
            <h1 className="landingTitle">hi, I'm<span id="contactLink"> mitch.</span></h1>
            <div className="landingScrollLinks">
              <span id="webDevLink">web developer.</span>
              <span id="pmLink">product manager.</span>
              <span id="langLink">language enthusiast.</span>
            </div>
          </div>
      </div>
    );
  }
}
