import React from "react";
import NewChat from './NewChat.css';
const firebase = require('firebase');

class NewChatComponent extends React.Component {
  constructor(){
    super();
    this.state={
      friendsEmail: null,
      mess: null
    }
    this.userTyping=this.userTyping.bind(this);
    this.submitNewChat=this.submitNewChat.bind(this);
    this.docKey=this.docKey.bind(this);
    this.chatExists=this.chatExists.bind(this);
    this.goToChat=this.goToChat.bind(this); 
    
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
    
    docKey = () => {
      const friend = this.state.friendsEmail;
      const chat = this.props.getDocKey(friend);
      return chat;
    }

    goToChat = async () => {
      const docKey = this.docKey();
      const mess = this.state.mess;
      console.log("go to chat");
      await this.props.goToChat(docKey, mess);
    }
    submitNewChat = (e) => {
      //pata@gmail.com
      const chat = this.docKey();
      console.log(chat)
      this.chatExists() ? this.goToChat() /*console.log("chat")*/ : console.log("no such chat");
      e.preventDefault();
    }

    chatExists = async () => {
      const docKey = this.docKey();
      const chat = await firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
      console.log(chat)
      if (chat.exists) {
        return chat;
      } 
    }

    

    
      // db.collectionGroup('Songs')
      // .where('songName', '==', 'X')
      // .get()
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