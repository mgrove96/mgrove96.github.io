import React, { Component } from 'react';
import Landing from './Landing';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 0
    }
  }
  render() {
    return (
      <div>
        <Landing>
        </Landing>
      </div>
    );
  }
}

export default App;
