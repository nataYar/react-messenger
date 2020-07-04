import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Signup from './Signup.css';

class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: null,
      password: null,
      passConfirmation: null,
      errorSubmit: ''
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
    }
  } 
  //check the validity of the password
  verifyPasswords() {
    if (this.password == this.passConfirmation) {
      return true;
    }
    
  }

   //we should add passportVerify function before submitting
   submitSignUp(e) {
    e.preventDefault();

    if(!this.verifyPasswords) {
      this.setState({
        errorSubmit: 'Passwords should match!'
      })
    }
  };



  render () {
    return (
      <main className="mainContainer">
        <div className="signupContainer">
          <h1>Sign up</h1>
          <form onSubmit={e => this.submitSignUp}>
            <input placeholder="Email" type="text" className="inputBox" 
            value={this.state.email}
            onChange={(type, e) => this.handleInput} required/>
            <br/>

            <input placeholder="Password" type="password" className="inputBox"  minLength="4" 
            value={this.state.password}
            onChange={(type, e) => this.handleInput} required/>
            <br/>

            <input placeholder="Confirm password" type="password" 
            value={this.state.passConfirmation} className="inputBox"  minLength="4"
            onChange={(type, e) => this.handleInput} required/>
            <br/>

            <button className="submitButton" type="submit">Sign up</button>
            <p>Registered user?</p>
            
            <Link to="/login">Log in</Link>
          </form>
        </div>
      </main>
    )
  }

};

export default SignupComponent;

