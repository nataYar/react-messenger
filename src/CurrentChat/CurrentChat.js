import React from "react";
import { Link } from "react-router-dom";
import CurrentChat from './CurrentChat.css';
const firebase = require("firebase");

class CurrentChatComponent extends React.Component {
    render () {
        if(this.props.chat === undefined) {
            return( <div>lala</div>)
        } else {
            return (
                <main>
                    {
                        this.props.chat.messages.map((mess, index) => {
                            return(
                            <div key={index} className={ this.props.user === mess.sender ? 
                                'friendMess' : 'userMess'}>
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

// {
//     this.props.chat.messages.map((_msg, _index) => {
//         return(
//         <div key={_index}>
//             {_msg.message}
//         </div>
//         )
//     })
// }
