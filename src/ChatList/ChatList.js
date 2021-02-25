import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatList from './ChatList.css';
import { createNoSubstitutionTemplateLiteral } from "typescript";

// const firebase = require('firebase');

class ChatListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }
    render () {
    
    if(this.props.chats.length > 0) {
        return (
            <div className='listOfChats'>
                <div className='chatsContainer'>
                    {
                        this.props.chats.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <div className='chatListItem' 
                                    onClick={() => this.select(index)}
                                    selected={this.props.selectedChatIndex === index}>
                                        
                                        <div className='avatar-circle'>
                                            <h1 className='initials'>{chat.users.find(friend => friend !== this.props.userEmail).split('')[0]}</h1>
                                        </div>
                                        
                                        <div className='chatListItemText'>
                                            <p id='friendsEmail'>{chat.users.filter(user => user !== this.props.userEmail)[0]}</p>
                                            <p>"{chat.messages[chat.messages.length - 1].message.slice(0, 14)}..."</p>
                                        </div>
                                        {
                                            chat.messages[chat.messages.length - 1].sender !== this.props.userEmail && this.props.newMessages ?
                                            <img src='./icons/newmessage.png' alt=''/> : null     
                                        }
                                    </div>
                                </div>
                            )
                        })
                    } 
            </div>
            </div>
                 
        );      
        } else {
            return (
                <div></div>
            );
        }
    }

    select = (index) => {
        this.props.select(index);
    };
};

export default ChatListComponent;

