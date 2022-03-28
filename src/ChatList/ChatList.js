import React from "react";
import ChatList from './ChatList.css';

class ChatListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    render () {
    if(this.props.chats.length > 0) {
        return (
        //toggles visibility when max-width: 767px
        <div id={this.props.mobileChatsMode ? 'listOfChats' : 'listOfChats_visible'}>
            {
                this.props.chats.map((chat, index) => {
                    let lastMessage = chat.messages[chat.messages.length - 1];
                    let docSent = 'doc sent';

                    return (
                        <div key={index}>
                            <div className={this.props.selectedChat === index ? 'chatListItem selected' : 'chatListItem'}
                            onClick={() => this.select(index)}>
                    
                                <div className= {chat.messageWasRead === false && chat.messages[chat.messages.length - 1].sender !== this.props.userEmail  ? 
                                    'avatar-circle unread' : 'avatar-circle'}>
                                    <h1 className='initials'>{(chat.users.find(friend => friend !== this.props.userEmail).split('')[0]).toUpperCase()}</h1>
                                </div>
                                <div className={this.props.selectedChat === index ? 'chatListItemText whiteText' : 'chatListItemText'} >
                                    <p id='friendsEmail'>{chat.users.filter(user => user !== this.props.userEmail)[0]}</p>
                                    <p>{lastMessage.message ? lastMessage.message.slice(0, 14) : docSent }...</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            } 
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