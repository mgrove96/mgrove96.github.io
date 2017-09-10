import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './stylesheets/normalize.css';
import './stylesheets/index.css';

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
