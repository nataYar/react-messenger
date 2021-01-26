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
                        this.props.chats.map((_chat, _index) => {
                            return (
                                <div key={_index}>
                                    <div className='chatListItem' id={_chat.messages[_chat.messages.length - 1].sender !== this.props.userEmail && this.props.newMessages ? 
                                    'unreadMessDetected' : 'nonewmessages'} 
                                    onClick={() => this.select(_index)}
                                    selected={this.props.selectedChatIndex === _index}>
                                        
                                        <div className='avatar-circle'>
                                            <h1 className='initials'>{_chat.users.find(friend => friend !== this.props.userEmail).split('')[0]}</h1>
                                        </div>
                                        
                                        <div className='text'>
                                            <p id='friendsEmail'>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</p>
                                            <br></br>
                                            <p>"{_chat.messages[_chat.messages.length - 1].message.slice(0, 20)}..."</p>
                                        </div>
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

