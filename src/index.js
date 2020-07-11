import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupComponent from './RegisterContainer/Signup';
import LoginComponent from './Login/Login';
import DashboardComponent from './Dashboard/Dashboard';

import './index.css';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBi_NSBGYtRV1-bsmZMMfUfujthVEilXW4",
  authDomain: "auth-81336.firebaseapp.com",
  databaseURL: "https://auth-81336.firebaseio.com",
  projectId: "auth-81336",
  storageBucket: "auth-81336.appspot.com",
  messagingSenderId: "89033781584",
  appId: "1:89033781584:web:ac49f6c4936c2379e23c55",
  measurementId: "G-NZV9ZFHFNQ"
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
