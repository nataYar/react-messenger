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
                            {mess.message ? mess.message : <div className='picContainer'>
                                <img className='chatImg' src={`${mess.doc}`}/> </div>} 
                        </div>
                        )
                    })
                    }
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el }}>
                    </div>
                </main>
            )
        }
    }
//TO DOWNLOAD
//get URL
// fileRef.getDownloadURL() 
// .then((url) => {
    
  
//     // Or inserted into an <img> element
//     const img = document.getElementById('addImg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });

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
