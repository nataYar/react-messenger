import React from "react";
import { Link } from "react-router-dom";
import Login from './Login.css';
const firebase = require("firebase");

class LoginComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      email: null,
      password: null,
      errorLogin: ''
    }
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
    
        default:
          break;
    }
  } 

  submitLogin(e) {
    e.preventDefault();
  
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.props.history.push('/dashboard')
    }, databaseError => {
      console.log(databaseError);
      this.setState({
        errorLogin : 'Log in error'
      })}
    )
  };
    
  render () {
    return (
      <main className="mainContainerL">
        <div className="registerContainerL">
          <h1 className="headerL">Log In</h1>
          <form onSubmit={(e) => this.submitLogin(e)}>
              <input className="inputBoxL" placeholder="Email" type="text"  
              value={this.state.email}
              onChange={(e) => this.handleInput('email', e)} required/>

              <input className="inputBoxL" placeholder="Password" type="password"   minLength="4" 
              value={this.state.password}
              onChange={(e) => this.handleInput('password', e)} required/>

              <button className="loginButton" type="submit">Log in</button>
              {
                this.state.errorLogin ? <h5>{this.state.errorLogin}</h5> : null
              }
              <p>Not registered yet?</p>
              <Link id="signupLink" style={{ marginLeft: '5%'}} to="/signup">Sign up</Link>
          </form>
        </div>
      </main>
    )
  }
};

export default LoginComponent;