import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";

import SignupComponent from './LogSignContainer/Signup';
import LoginComponent from './LogSignContainer/Login';
import DashboardComponent from './Dashboard/Dashboard';

import './index.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// require('firebase/firestore');
// require('firebase/auth');
// require('firebase/database');
// require('firebase/storage');


const dbConfig = {
  apiKey: "AIzaSyBi_NSBGYtRV1-bsmZMMfUfujthVEilXW4",
  authDomain: "auth-81336.firebaseapp.com",
  databaseURL: "https://auth-81336.firebaseio.com",
  projectId: "auth-81336",
  storageBucket: "auth-81336.appspot.com",
  messagingSenderId: "89033781584",
  appId: "1:89033781584:web:ac49f6c4936c2379e23c55",
  measurementId: "G-NZV9ZFHFNQ"
}

firebase.initializeApp(dbConfig);

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginComponent/>}/>
        <Route path='/signup' element={<SignupComponent />} />
        <Route path='/dashboard' element={<DashboardComponent /> }/>
    </Routes>
  </BrowserRouter>
  , rootElement
);


