import React from "react";
import NewChat from './NewChat.css';
const firebase = require('firebase/app');

class NewChatComponent extends React.Component {
  constructor(){
    super();
    this.state={
      friendsEmail: null,
      mess: null
    }
    this.userTyping=this.userTyping.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.docKey=this.docKey.bind(this);
    this.chatExists=this.chatExists.bind(this);
    }
    
    
    userTyping = (type, e) => {
      switch(type) {
        case('friendsEmail'): 
        this.setState({
          friendsEmail: e.target.value
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

    submitForm = async (e) => {
      e.preventDefault();
      const docKey = this.docKey();
      const mess = this.state.mess;
      const chatExists = await this.chatExists()
      .catch(error => {
        console.error(error.message);
      });
      chatExists ? this.props.goToExistingChat(docKey, mess) : this.props.createChat(docKey, mess);
    }
    
    docKey = () => {
      const docID = [this.props.email, this.state.friendsEmail].sort().join(':');
      return docID;
    }

    chatExists = async () => {
      const docKey = this.docKey();
      const chat = await firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .get();
      return chat.exists;
    }

    render() {
      return (
          <div className='newChatContainer'>
            <form className='submitForm' onSubmit={(e) => this.submitForm(e)}>
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