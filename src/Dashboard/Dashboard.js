import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './Dashboard.css';
import ChatListComponent from '../ChatList/ChatList';
import CurrentChatComponent from '../CurrentChat/CurrentChat';
import MessageInputComponent from '../MessageInput/MessageInput';
import NewChatComponent from '../NewChat/NewChat';
// import firebase from 'firebase/app';
const firebase = require('firebase');
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const timestamp = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'/'+today.getHours()+':'+today.getMinutes();
  return date;
};

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = firebase.storage();
// Create a storage reference from our storage service
// var storageRef = storage.ref();

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      email: null,
      selectedChat: null,
      chatVisible: false,
      newChatFormVisible: false
    }
    this.showNewChatForm = this.showNewChatForm.bind(this);
    this.chooseChat = this.chooseChat.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.addDoc = this.addDoc.bind(this);
    this.buildDocId = this.buildDocId.bind(this);
    this.goToExistingChat = this.goToExistingChat.bind(this);
    this.newChatFn = this.newChatFn.bind(this);
    this.messageWasRead = this.messageWasRead.bind(this); 
  }
  
  render () {
    return (
        <div className='dashboard-cont'>
          <div className='dashboard'>
            <button className='signOutButton'
              onClick={this.signOut}> Sign Out
              </button>

            <button className='newChatButton'
              onClick={this.showNewChatForm}>
              New Chat
              </button>   
              
            { this.state.newChatFormVisible ? <NewChatComponent email={this.state.email}
            goToExistingChat={this.goToExistingChat}
            createChat={this.newChatFn}></NewChatComponent> :  null
            }
              
            <ChatListComponent
              history={this.props.history}
              chats={this.state.chats} 
              userEmail={this.state.email}
              selectedChat={this.state.selectedChat}
              select={this.chooseChat}>
              </ChatListComponent>

            <CurrentChatComponent 
              chat={this.state.chats[this.state.selectedChat]} 
              user={this.state.email}>
              </CurrentChatComponent> 
            
            <MessageInputComponent
              visibility={this.state.chatVisible}
              selected={this.state.selectedChat}
              addMsgFn={this.addMsg}
              addDocFn={this.addDoc}>
              </MessageInputComponent>
             
          </div>
        </div>

    )
  }

  signOut = () => firebase.auth().signOut();

  showNewChatForm = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null
    })
  }
   
   //update the db so that it was set to true
   messageWasRead = () => {
    const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
    const docId = this.buildDocId(friend);
    //if the sender is NOT a current user
    if (this.state.chats[this.state.selectedChat].messages[this.state.chats[this.state.selectedChat].messages.length - 1].sender !== 
      this.state.email) {
      console.log('messageWasRead should be true');
      firebase
      .firestore()
      .collection('chats')
      .doc(docId)
      .update({ messageWasRead: true })
    } else {
      console.log('Clicked message where the user was the sender');
    } 
  }
 
  
  newChatFn = (docKey, msg) => {
    // console.log(docKey, msg);
    const users = docKey.split(':');
    // console.log('newChatFn users: ' + users)
    firebase
    .firestore()
      .collection('chats')
      .doc(docKey)
      .set({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: msg,
          sender: this.state.email,
          timestamp: timestamp(),
        }),
        users: users,
        messageWasRead: false
      });
    this.setState({
      newChatFormVisible: false
    });
    const chat = this.state.chats.find(chat => users.every(usr => chat.users.includes(usr)));
    console.log(chat);
    const index = this.state.chats.indexOf(chat);
    this.chooseChat(index);
  }

  chooseChat = async(index) => {
    await this.setState({
      selectedChat: index,
      chatVisible: true,
      newChatFormVisible: false
    });
    this.messageWasRead();
  }

  goToExistingChat = async (docKey, msg) => {  
    //get your friend - returns string !!!
    const users = docKey.split(':');
    // find chat which includes your friend (from this.state.chats)
    const chat = this.state.chats.find(chat => users.every(usr => chat.users.includes(usr)));
    // find index of this chat
    const index = this.state.chats.indexOf(chat);
    await this.chooseChat(index);
    this.addMsg(msg);
  }

  buildDocId = (friend) => [this.state.email, friend].sort().join(':');

  //send msg to the chat & add msg to chat.messages array
  addMsg = (msg) => {
    const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
    const docId = this.buildDocId(friend);
  
    firebase
      .firestore()
      .collection('chats')
      .doc(docId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: msg,
          sender: this.state.email,
          timestamp: timestamp(),
        }),
        messageWasRead: false
      })
  }

  addDoc = async (e) => {
    const file = e.target.files[0];
    const fileRef = firebase.storage().ref('images').child(file.name);
    fileRef.put(file); //add doc to cloud storage with images
    const docUrl = await fileRef.getDownloadURL(); //get url
    //func to upload image to database
    const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
    const docId = this.buildDocId(friend);
  
    firebase
      .firestore()
      .collection('chats')
      .doc(docId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          url: docUrl,
          sender: this.state.email,
          timestamp: timestamp(),
        }),
        messageWasRead: false
      })
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
  
  
}}



export default DashboardComponent;