import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatList from './ChatList.css';
import { createNoSubstitutionTemplateLiteral } from "typescript";

// const firebase = require('firebase');

class ChatListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.newChat = this.newChat.bind(this);
  }
    render () {

    if(this.props.chats.length > 0) {
        return (
        <main className='listOfChats'>
            <button className='newChatButton'
                onClick={this.newChat}>
                New Chat</button> 
            
            {
                this.props.chats.map((_chat, _index) => {
                    return (
                        <div key={_index}>
                            <div className='chatListItem' 
                            onClick={() => this.select(_index)} 
                            selected={this.props.selectedChatIndex === _index}>
                                
                                <div className='avatar-circle'>
                                    <h1 className='initials'>{_chat.users.filter(_user => _user = this.props.userEmail)[1].split('')[0]}</h1>
                                </div>
                                
                                <div className='text'>
                                    <p id='textLine1'>{_chat.users.filter(_user => _user = this.props.userEmail)[1]}</p>
                                    <br></br>
                                    <p>"{_chat.messages[_chat.messages.length - 1].message.slice(0, 25)}..."</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }  
             
            </main>   
         );      
        } else {
            return (
                <button className='newChatButton'
                onClick={this.newChat}>
                New Chat</button> 
            );
        }
  }

newChat = () => {
// console.log(this.props);
this.props.newChat();
}

select = (index) => {
    // console.log(_index);
    this.props.select(index);
    // chooseChat = async(index)
}

};

export default ChatListComponent;

