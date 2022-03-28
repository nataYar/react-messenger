import React from "react";
import Dashboard from './Dashboard.css';
import ChatListComponent from '../ChatList/ChatList';
import CurrentChatComponent from '../CurrentChat/CurrentChat';
import MessageInputComponent from '../MessageInput/MessageInput';
import NewChatComponent from '../NewChat/NewChat';


const firebase = require('firebase');

import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const timestamp = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'/'+today.getHours()+':'+today.getMinutes();
  return date;
};

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      email: null,
      selectedChat: null,
      chatVisible: false,
      newChatFormVisible: false,
      mobileChatsMode: true, 
      fullScreen: false
    }
    this.showNewChatForm = this.showNewChatForm.bind(this);
    this.chooseChat = this.chooseChat.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.uploadDoc = this.uploadDoc.bind(this);
    this.buildDocId = this.buildDocId.bind(this);
    this.goToExistingChat = this.goToExistingChat.bind(this);
    this.newChatFn = this.newChatFn.bind(this);
    this.messageWasRead = this.messageWasRead.bind(this); 
    this.toggleMobileVisibility = this.toggleMobileVisibility.bind(this); 
  }
  render () {
    return (
        <div className='dashboard-cont gradient'>
          <div className='dashboard' id='fs'>
            <button className=' dashboardBtn signOutButton'
              onClick={this.signOut}></button>

            <button className='dashboardBtn newChatButton'
              onClick={this.showNewChatForm}></button>

            <button className='dashboardBtn goToChatButton'
              onClick={() => { this.toggleMobileVisibility()}}
              ></button>      
              
            { this.state.newChatFormVisible ? <NewChatComponent email={this.state.email}
            goToExistingChat={this.goToExistingChat}
            createChat={this.newChatFn}></NewChatComponent> :  null
            }

            <ChatListComponent
              mobileChatsMode={this.state.mobileChatsMode}
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
              mobileChatsMode={this.state.mobileChatsMode}
              visibility={this.state.chatVisible}
              selected={this.state.selectedChat}
              addMsgFn={this.addMsg}
              addDocFn={this.uploadDoc}>
              </MessageInputComponent>
          </div>
        </div>
    )
  }

  signOut = () => firebase.auth().signOut();

  toggleMobileVisibility = () => { 
    this.setState({
      mobileChatsMode: !this.state.mobileChatsMode,
      newChatFormVisible: false });
  }


  showNewChatForm = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null,
      // mobileChatsMode: false,
      chatVisible: false
    })
  }

  newChatFn = async (docKey, msg) => {
    const users = docKey.split(':');
    await firebase
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
      })
      .catch(error => {
        console.error(error.message);
      });
    const chat = this.state.chats.find(chat => users.every(usr => chat.users.includes(usr)));
    const index = this.state.chats.indexOf(chat);
    this.chooseChat(index);
  }

  chooseChat = async(index) => {
    await this.setState({
      selectedChat: index,
      chatVisible: true,
      newChatFormVisible: false,
    });
    this.messageWasRead();
    this.toggleMobileVisibility();
    if ( window.innerWidth <= 767 ) {
      document.body.requestFullscreen()
  }
  }

  messageWasRead = () => {
    //if sender is NOT a current user
    if (this.state.chats[this.state.selectedChat].messages[this.state.chats[this.state.selectedChat].messages.length - 1].sender !== this.state.email) {
      const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
      const docId = this.buildDocId(friend);
      console.log('messageWasRead should be true');
      firebase
      .firestore()
      .collection('chats')
      .doc(docId)
      .update({ messageWasRead: true })
    } else {
      console.error();
    } 
  }

  goToExistingChat = async (docKey, msg) => {  
    //get your friend - returns string !!!
    const users = docKey.split(':');
    // find chat which includes your friend (from this.state.chats)
    const chat = this.state.chats.find(chat => users.every(usr => chat.users.includes(usr)));
    // find index of this chat
    const index = this.state.chats.indexOf(chat);
    await this.chooseChat(index)
    .catch(error => {
      console.error(error.message);
    });
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

  uploadDoc = (e) => {
    const friend = this.state.chats[this.state.selectedChat].users.filter(user => user !== this.state.email)[0];
    const docId = this.buildDocId(friend);
    const file = e.target.files[0];
    const fileRef = firebase.storage().ref('docs').child(file.name);
    // console.log(firebase.firestore().ref('docs'));
    
    if (file.type.includes('image')) {
      fileRef.put(file)
        .then(data => {
          data.ref.getDownloadURL()
          .then((url) => {
            firebase //add URL to Database
            .firestore()
            .collection('chats')
            .doc(docId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                imgUrl: url,
                docName: file.name,
                sender: this.state.email,
                timestamp: timestamp(),
              }),
              messageWasRead: false
            })
          })
          .catch(error => {
            console.error(error.message);
          });
        });
    } else if (file.type.includes('application')) {
      fileRef.put(file)
        .then(data => {
          data.ref.getDownloadURL()
          .then((url) => {
            firebase //add URL to Database
            .firestore()
            .collection('chats')
            .doc(docId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                docUrl: url,
                docName: file.name,
                sender: this.state.email,
                timestamp: timestamp(),
              }),
              messageWasRead: false
            })
          })
          .catch(error => {
            console.error(error.message);
          });
        })
    } else if (file.type.includes('video')) {
      fileRef.put(file)
        .then(data => {
          data.ref.getDownloadURL()
          .then((url) => {
            firebase //add URL to Database
            .firestore()
            .collection('chats')
            .doc(docId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                vidUrl: url,
                docName: file.name,
                sender: this.state.email,
                timestamp: timestamp(),
              }),
              messageWasRead: false
            })
          })
          .catch(error => {
            console.error(error.message);
          });
        })
    } else {
      throw error => console.error(error.message);
    }
  }

  //to get the current user by setting an observer on the Auth object:
  componentDidMount = () => {
    firebase
    .auth()
    .onAuthStateChanged(currUser => {
      if (!currUser) {
        history.push('/signup');
        history.go(0);
      } else {
        //we checked if the user exists, then we should grab his info from db
        firebase
        .firestore()
        .collection('chats')
        .where('users', 'array-contains', currUser.email)
        //perform realtime db changes
        .onSnapshot(resp =>{
          const chats = resp.docs.map(doc => doc.data());
          this.setState({
            email: currUser.email,
            chats: chats,
          })
        })

      }
    })
  }

}



export default DashboardComponent;