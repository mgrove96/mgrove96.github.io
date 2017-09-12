import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import '../stylesheets/App.scss';
import Landing from './Landing';
import Music from './Music';
import Games from './Games';
import Contact from './Contact';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/music' component={Music}/>
        <Route path='/games' component={Games}/>
        <Route path='/contact' component={Contact}/>
      </Switch>
    );
  }
}

export default App;
