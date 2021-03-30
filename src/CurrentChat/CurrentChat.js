import React from "react";
import CurrentChat from './CurrentChat.css';
const firebase = require('firebase');

class CurrentChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.displayImg = this.displayImg.bind(this);
        
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
                            {mess.message ? mess.message : mess.imgUrl ? 
                            <a onClick={this.displayImg} target='_blank' href={`${mess.imgUrl}`} ><img  className='chatImg' src={`${mess.imgUrl}`} 
                            /></a>: 
                            <p><a href={`${mess.docUrl}`} target='_blank'>{mess.docName}</a></p>
                            }
                        </div>
                        )})
                    }
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el }}>
                    </div>
                </main>
            )
        }
    }

    displayImg = () => {
        console.log('hi from display img')
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
