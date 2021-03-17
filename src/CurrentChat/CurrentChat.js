import React from "react";
import CurrentChat from './CurrentChat.css';
const firebase = require('firebase');

class CurrentChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
      };
   
    render () {
        
        if(this.props.chat === undefined) {
            return( <div></div>)
        } else {
            return (
                <main className='chatBoard'>
                    {
                    this.props.chat.messages.map((mess, index) => {
                        return(
                        <div key={index} className={ this.props.user === mess.sender ? 
                            'userMess' : 'friendMess'} id='font'>
        {/* here we can try switch statement for mess.message and mess.img*/}
                            {mess.message}
                        </div>
                        )
                    })
                    }
                    {/* <img src={}/> */}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el }}>
                    </div>
                </main>
            )
        }
    }


    scrollToBottom = () => {
        this.messagesEnd && this.messagesEnd.scrollIntoView({behavior: 'smooth'});
        
      }
      
    componentDidMount() {
        this.scrollToBottom();
      }
      
    componentDidUpdate() {
        this.scrollToBottom();
      }
  };

export default CurrentChatComponent;
