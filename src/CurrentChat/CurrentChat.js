import React from "react";
import { Link } from "react-router-dom";
import CurrentChat from './CurrentChat.css';
const firebase = require("firebase");

class CurrentChatComponent extends React.Component {
    render () {
        if(this.props.chat === undefined) {
            return( <div>i'm an empty chat</div>)
        } else {
            return (
                <main className='chatBoard'>
                    {
                        this.props.chat.messages.map((mess, index) => {
                            return(
                            <div key={index} className={ this.props.user === mess.sender ? 
                                'userMess' : 'friendMess'} id='font'>
                                {mess.message}
                            </div>
                            )
                        })
                    }
                </main>
            )
        }
    }
  };

export default CurrentChatComponent;
