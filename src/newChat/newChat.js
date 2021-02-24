import { Chat } from "@material-ui/icons";
import React from "react";
import NewChat from './NewChat.css';
const firebase = require('firebase');

class NewChatComponent extends React.Component {
  constructor(){
    this.state={
      friendsEmail: null,
      mess: null
    }
    this.userTyping=this.userTyping.bind(this);
    this.submitNewChat=this.submitNewChat.bind(this);
    }

    submitNewChat = e => {
      const friend = this.state.friendsEmail;
      const userEmail = this.props.email;
      const chat = this.props.getDocKey(friend)
    }
    userTyping = (type, e) => {
      switch(type) {
        case('friendsEmail'): 
        this.setState({
          email: e.target.value
        });
        break;
        case('mess'):
        this.setState({
          mess: e.target.value
        });
        break;
        default:
          break;
      }
    }
    render() {
      return (
          <div className='newChatContainer'>
            <form className='submitForm' onSubmit={(e) => this.submitNewChat(e)}>
                <input className='userInput' type='text' 
                placeholder="Enter friend's email"
                onChange={e => this.userTyping('friendsEmail', e)}></input>
                <input className='userInput' type='text' 
                placeholder="Type your message"
                onChange={e => this.userTyping('mess', e)}></input>
                <button className='newChatBtn' type='submit'>Send</button>
            </form> 
          </div>
      )
    }  
};

  export default NewChatComponent;