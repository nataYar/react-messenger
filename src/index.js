import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupComponent from './LogSignContainer/Signup';
import LoginComponent from './LogSignContainer/Login';
import DashboardComponent from './Dashboard/Dashboard';

import './index.css';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  ......
});

const routing = (
  //gives us history attribute
  <Router>
    <div>
      <Route exact path='/signup' component={SignupComponent}/>
      <Route exact path='/login' component={LoginComponent}/>
      <Route exact path='/dashboard' component={DashboardComponent}/>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
