import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './Dashboard.css';
import ChatListComponent from '../ChatList/ChatList';
import CurrentChatComponent from '../CurrentChat/CurrentChat';

const firebase = require('firebase');

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      email: null,
      selectedChat: null,
      chatVisible: true
    }
    this.createNewChat = this.createNewChat.bind(this);
    this.chooseChat = this.chooseChat.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  
  render () {
    return (
      <main className='dashboard-cont'>
        <div className='dashboard'>
          
            <ChatListComponent className='listOfChats'
              history={this.props.history}
              chats={this.state.chats} 
              userEmail={this.state.email}
              selectedChatIndex={this.state.selectedChat}
              
              newChat={this.createNewChat}
              select={this.chooseChat}>
            </ChatListComponent>
            <button className='signOutButton'
              onClick={this.signOut}>
              Sign out</button>

            <CurrentChatComponent 
              chat={this.state.chats[this.state.selectedChat]} 
              user={this.state.email}
              chatNotVisible={this.state.chatHidden}>
            </CurrentChatComponent>
            
            
          
        </div>
      </main>
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
      chatVisible: true
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
}
};


export default DashboardComponent;