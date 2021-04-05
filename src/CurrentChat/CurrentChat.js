import React from "react";
import CurrentChat from './CurrentChat.css';

class CurrentChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            fullImg: false
        };
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.toggleImg = this.toggleImg.bind(this);
        
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
                            <a target='_blank' onClick={this.toggleImg} href={`${mess.imgUrl}`}><img 
                            target='_blank' className= 'chatImg' alt="image sent in chat" src={`${mess.imgUrl}`} 
                            /></a>: 
                            <p><a href={`${mess.docUrl}`} target='_blank'>{mess.docName}</a></p>
                            }
                            {/* <a onClick={this.toggleImg} href={`${mess.imgUrl}`}><img 
                            className= {this.state.fullImg === true ?  'fullSizePic' : 'chatImg' } alt="image sent in chat" src={`${mess.imgUrl}`} 
                            /></a>: 
                            <p><a href={`${mess.docUrl}`} target='_blank'>{mess.docName}</a></p>
                            } */}
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

    toggleImg = () => {
        this.setState({
            fullImg: true
        });
        console.log('clicked fullImg: true')
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
