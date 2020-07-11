import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './Dashboard.css';
import ChatListComponent from '../ChatList/ChatList';
const firebase = require('firebase');

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      email: null,
      selectedChat: null,
      chatHidden: true
    }
    this.createNewChat = this.createNewChat.bind(this);
    this.chooseChat = this.chooseChat.bind(this);
  }

  createNewChat = () => {
    this.setState({
      chatHidden: false,
      selectedChat: null
    });
  }

  chooseChat = (index) => {
    this.setState({
      selectedChat: index,
    });
  }
  
  render () {
    return (
      <main className='dashboard-cont'>
        <div className='dashboard'>
          <div className='leftPanel'>
            <ChatListComponent 
            history={this.props.history}
            chats={this.state.chats} 
            userEmail={this.state.email}
            selectedChatIndex={this.state.selectedChat}
            newChat={this.createNewChat}
            select={this.chooseChat}
            >
            </ChatListComponent>
          </div>
          {/* here's the place for messages container */}
        </div>
      </main>
    )
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