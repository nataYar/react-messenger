import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatList from './ChatList.css';

const firebase = require('firebase');

class ChatListComponent extends React.Component {
  render () {
    return (
        <main className='listOfChats'>
            <button className='newChatButton'
            onClick={this.newChat}>
                New Chat</button>
            <div>
                {
                    this.props.chats.map((chat, index) => {
                        return (
                            <div key={index}>
                                <div className='chatListItem'
                                onClick={() => this.select} 
                                select={this.props.selectedChatIndex == index}>
                                    <h1>{chat.users.filter(user => user = this.props.userEmail)[1].split('')[0]}</h1>
                                    <p id='chatName'>{chat.messages[chat.messages.length - 1].message.slice(0, 30)}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
                
                
        </main>
    );  
  }

  newChat = () => {this.props.createNewChat()};
  select = (index) => {this.props.chooseChat(index);

  }

};

export default ChatListComponent;

