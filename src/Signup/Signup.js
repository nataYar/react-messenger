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
      passwordConfirmation: null,
      errorSubmit: ''
     };
    // this.submitSignUp = this.submitSignUp.bind(this);
  }
  
  
  render () {

    //we should add passportVerify function before submitting
    // submitSignUp = (e) => {
    //   e.preventDefault();
    // };


    return (
      <main className="mainContainer">
        <div className="signupContainer">
          <h1>Sign up</h1>
          {/* onSubmit={e => this.submitSignUp} */}
          <form>
            <label for="email">Email</label>
            <input type="text" id="email" required/>
            <br/>

            <label for="password">Enter your password</label>
            <input type="password" id="password" required/>
            <br/>

            <label for="passwordConfirmation">Confirm password</label>
            <input type="password" id="passwordConfirmation" required/>
            <br/>

          
            <button type="button" onclick="alert('Hello World!')">Sign up</button>
          </form>

        </div>
      </main>
    )
  }
};

export default SignupComponent;

