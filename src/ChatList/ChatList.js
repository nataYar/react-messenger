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
                                    <div className='chatListItem' 
                                    onClick={() => this.select(_index)}
                                    selected={this.props.selectedChatIndex === _index}>
                                        
                                        <div className='avatar-circle'>
                                            <h1 className='initials'>{_chat.users.find(friend => friend !== this.props.userEmail).split('')[0]}</h1>
                                        </div>
                                        
                                        <div className='chatListItemText'>
                                            <p id='friendsEmail'>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</p>
                                            <p>"{_chat.messages[_chat.messages.length - 1].message.slice(0, 14)}..."</p>
                                        </div>
                                        {
                                            _chat.messages[_chat.messages.length - 1].sender !== this.props.userEmail && this.props.newMessages ?
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

