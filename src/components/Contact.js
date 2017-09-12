import React from 'react';
import { Route } from 'react-router-dom'
import '../stylesheets/Contact.scss';

export default class Contact extends React.Component {

  render() {
    return (
      <div>
        <Route render={({ history}) => (
            <span id="contactToHomeLink" onClick={() => { history.push('/') }}>home</span>
          )} />
        <div className="contactView">
          <h1 className="contactTitle">let's get in touch</h1>
          <div className="contactIconsContainer">
            <a href="https://www.linkedin.com/in/mitchgrove/" target="_blank"><i className="fa fa-linkedin-square contactIcon" id="linkedin-click" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/mitch.grove.9" target="_blank"><i className="fa fa-facebook-square contactIcon" id="facebook-click" aria-hidden="true"></i></a>
            <a href="https://github.com/mgrove96" target="_blank"><i className="fa fa-github-square contactIcon" id="github-click" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  }
}
