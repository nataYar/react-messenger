import React from "react";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
import './style.css';

import firebase from 'firebase/app';
import 'firebase/auth';

import { createBrowserHistory } from "history";
let history = createBrowserHistory();


class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: null,
      password: null,
      passConfirmation: null,
      errorSignup: ''
     };
    this.submitSignUp = this.submitSignUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.verifyPasswords = this.verifyPasswords.bind(this);
  }

  handleInput(inputType, e) {
    switch (inputType) {
      case 'email':
        this.setState({
          email: e.target.value
        });
        break;
      case 'password':
        this.setState({
          password: e.target.value
        });
        break;
      case 'passwordConfirmation':
        this.setState({
          passConfirmation: e.target.value
        });
        break;

        default:
          break;
    }
  } 

  //check the validity of the password
  verifyPasswords() {
    if (this.password === this.passConfirmation) {
      return true;
    }
  }

   //we should add passwort verifying function before submitting
   submitSignUp(e) {
    e.preventDefault();
   
    if(!this.verifyPasswords) {
      this.setState({ errorSignup: 'Passwords should match' })
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      //at this moment we get a response from server, 
      .then(res => {
      //we get response and create a user object
        const userObject = {
          email: res.user.email
        }
      
        //now we access the cloud firebase storage/database
        firebase
        .firestore()
        .collection('users')
        //add user to a collection; the doc name = user's email
        .doc(this.state.email)
        //we're setting the doc to a user object
        .set(userObject)
        .then(
          console.log(history)
        )
        .then(() => {
          //history object is passed in automatically by Router
          history.push("/dashboard"); 
          history.go(0);
        }, databaseError => {
            console.log(databaseError);
            this.setState({
              errorSignup : 'Error at adding a user'
            })
        })
      }, errAuth => {
        console.log(errAuth);
        this.setState({
          errorSignup : 'Error at adding a user'
        });
      })
  };

  render () {
    return (
      <main className="backgroundContainer">
          <form className='flexItems' onSubmit={(e) => this.submitSignUp(e)}>
            <h1 className="header">Sign up</h1>
            <input className="inputBox" id="txt-input" placeholder="Email" type="text"  
            value={this.state.email}
            onChange={(e) => this.handleInput('email', e)} required/>

            <input className="inputBox" placeholder="Password" type="password"   minLength="4" 
            value={this.state.password}
            onChange={(e) => this.handleInput('password', e)} required/>
   
            <input className="inputBox" placeholder="Confirm password" type="password" 
            value={this.state.passConfirmation}  minLength="4"
            onChange={(e) => this.handleInput('passConfirmation', e)} required/>

            <button className="SLButton" type="submit">Sign up</button>
            {
              this.state.errorSignup ? <h5>{this.state.errorSignup}</h5> : null
            }
            <p className='redirect'>Registered user? </p>
              <Link className='redirect'  to="/">Log in</Link>
          </form>
      </main>
    )
  }
};

export default SignupComponent;

