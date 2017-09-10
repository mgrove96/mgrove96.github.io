import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import './stylesheets/normalize.css';
import './stylesheets/index.css';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
