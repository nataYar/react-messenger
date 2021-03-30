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
            <div className='listOfChats'>
                {/* <div className='chatsContainer'> */}
                    {
                        this.props.chats.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <div className={this.props.selectedChat === index ? 'chatListItem selected' : 'chatListItem'}
                                    onClick={() => this.select(index)}>
                          
                                        <div className= { chat.messageWasRead === false && chat.messages[chat.messages.length - 1].sender !== this.props.userEmail  ? 
                                            'avatar-circle unread' : 'avatar-circle'}>
                                            <h1 className='initials'>{chat.users.find(friend => friend !== this.props.userEmail).split('')[0]}</h1>
                                        </div>
                                        
                                        <div className='chatListItemText'>
                                            <p id='friendsEmail'>{chat.users.filter(user => user !== this.props.userEmail)[0]}</p>
                                            {/* {
                                                if
                                            } */}
                                            {/* <p>"{chat.messages[chat.messages.length - 1].message.slice(0, 14)}..."</p> */}
                                             {/* if chat.messages[chat.messages.length - 1].[0] === message.slice(0, 14)}..." */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    } 
            {/* </div> */}
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

