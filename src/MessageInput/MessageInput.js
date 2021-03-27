import React from "react";
import MessageInput from './MessageInput.css';
import 'tinymce/tinymce';

import { Editor } from '@tinymce/tinymce-react';

class MessageInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgText: ''
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
                        
                        <textarea id='txtInput' placeholder="Write a message..." type="text"></textarea>
                        <Editor  
                        apiKey="rlih7as5ochef82j5pprn4nrsqdu9egw9z3niba0uzuafqp0"
                        onKeyUp={e => this.onType(e)}
                        init={{
                            height: 200,
                            width: 200,
                            menubar: false,
                            plugins: "emoticons",
                            toolbar: "emoticons",
                            toolbar_location: "left",
                            statusbar: false,
                            selector: '#txtInput',
                            
                        }}/>
 

                        <input type='file' className='icon attDoc' 
                        onChange={e => this.addDocFn('doc', e)}/> 

                        <input type='file' className='icon attImg' 
                        onChange={e => this.addDocFn('img', e)}/> 
                        
                        <button className=' icon messSendBtn' 
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

    // tinymce.init({
        
    // })

    // we set up message text to an input
    onType = (e) => e.keyCode === 13? this.sendMsg() : this.setState({msgText: e.target.value}); 

    textValidFn = (msg) => msg && msg.trim().length;

    addDocFn = (inputType, e) => {
        this.props.addDocFn(inputType, e)
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