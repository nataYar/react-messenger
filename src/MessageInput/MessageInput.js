import React from "react";
import MessageInput from './MessageInput.css';

class MessageInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgText: '',
            file: null
        }
        this.onType = this.onType.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.textValidFn = this.textValidFn.bind(this);
        this.addDocFn = this.addDocFn.bind(this);
    }

    render () {
        if (this.props.visibility && this.props.selected != null ) {
            return (
                <main className='txtInputContainer'>
                    <div className='txtInputContainerFlex'>
                        <textarea id='txtInput' placeholder="Write a message..." type="text" 
                        onKeyUp={e => this.onType(e)} 
                        onFocus={this.userClickedInput}>
                        </textarea>
                        <input type='file' className='attachBtn' 
                        onChange={e => this.addDocFn(e)}/> 
                        <button className='messSendBtn' 
                        onClick={this.sendMsg}></button>
                        
                        
                    </div>
                </main>
            )
        } else {
            return (
                <h1></h1>
            )
        }
    }
    // we set up message text to an input
    onType = (e) => e.keyCode === 13? this.sendMsg() : this.setState({msgText: e.target.value}); 

    textValidFn = (msg) => msg && msg.trim().length;

    addDocFn = (e) => {
        this.props.addDocFn(e)
    }

    sendMsg = () => {
        console.log('clicked send');
        //checking if the message id valid
        if (this.textValidFn(this.state.msgText)) {
            //here should submit function from its parent(Dashboard)
            this.props.addMsgFn(this.state.msgText);
            //clear the input area
            document.getElementById('txtInput').value = '';
        };
    };
    } 

export default MessageInputComponent;