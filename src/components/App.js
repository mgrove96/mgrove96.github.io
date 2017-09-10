import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import '../stylesheets/App.scss';
import Landing from './Landing';
import Music from './Music';
import Games from './Games';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/music' component={Music}/>
        <Route path='/games' component={Games}/>
      </Switch>
    );
  }
}

export default App;
