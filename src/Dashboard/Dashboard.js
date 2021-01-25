import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './Dashboard.css';
import ChatListComponent from '../ChatList/ChatList';
import CurrentChatComponent from '../CurrentChat/CurrentChat';
import MessageInputComponent from '../MessageInput/MessageInput';
const firebase = require('firebase');

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      email: null,
      selectedChat: null,
      chatVisible: true,
      newMessages: true
    }
    this.createNewChat = this.createNewChat.bind(this);
    this.chooseChat = this.chooseChat.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.buildDocId = this.buildDocId.bind(this);
  }
  
  render () {
    return (
        <div className='dashboard-cont'>
          <div className='dashboard'>

            <button className='signOutButton'
              onClick={this.signOut}> Sign Out
              </button>

            <ChatListComponent
              history={this.props.history}
              chats={this.state.chats} 
              userEmail={this.state.email}
              newMessages={this.state.newMessages}
              selectedChatIndex={this.state.selectedChat}
              
              newChat={this.createNewChat}
              select={this.chooseChat}
              >
            </ChatListComponent>

            <CurrentChatComponent 
              chat={this.state.chats[this.state.selectedChat]} 
              user={this.state.email}>
            </CurrentChatComponent>

            <MessageInputComponent
              visibility={this.state.chatVisible}
              selected={this.state.selectedChat}
              addMsgFn={this.addMsg}>
            </MessageInputComponent>
          </div>
        </div>

    )
  }

  signOut = () => firebase.auth().signOut();

  createNewChat = () => {
    this.setState({
      chatVisible: true,
      selectedChat: null
    });
  }

  chooseChat = async(index) => {
    await this.setState({
      selectedChat: index,
      chatVisible: true,
      newMessages: false
    });
  }

  buildDocId = (friend) => [this.state.email, friend].sort().join(':');
  //send msg to the chat & add msg to chat.messages array
  addMsg = (msg) => {
    const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
    //doc ID:   nata@gmail.com:pata@gmail.com
    const docId = this.buildDocId(friend);
    
    console.log(docId);
    // FirebaseError: Function FieldValue.arrayUnion() called with invalid data. 
    // Unsupported field value: a custom Class object
    firebase
      .firestore()
      .collection('chats')
      .doc(docId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: msg,
          sender: this.state.email,
          timestamp: Date.now()
        })
      });
  }
  
  //to get the current user by setting an observer on the Auth object:
  componentDidMount = () => {
  firebase
  .auth()
  .onAuthStateChanged(async currUser => {
    if (!currUser) {
      this.props.history.push('/signup')
    } else {
      //we checked if the user exists, then we should grab his info from db
      await firebase
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', currUser.email)
        //perform realtime db changes
        .onSnapshot(async resp =>{
          const chats = resp.docs.map(doc => doc.data());
          await this.setState({
            email: currUser.email,
            chats: chats,
          })
        })
    }
  });
  // this.checkForNewMessages(this.state.chats);
  
}}



export default DashboardComponent;