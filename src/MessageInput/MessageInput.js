import React from "react";
import MessageInput from './MessageInput.css';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-element';

// import 'tinymce/tinymce';
// import { Editor } from '@tinymce/tinymce-react';

class MessageInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgText: '',
            chosenEmoji: '',
            showEmojiPicker: false,
        }
        this.onType = this.onType.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.textValidFn = this.textValidFn.bind(this);
        this.addDocFn = this.addDocFn.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    }
    //height: 300
    render () {

        if (this.props.visibility && this.props.selected != null ) {
            return (
                <main className='txtInputContainer'>
                    
                    <div className='txtInputContainerFlex'>
                        <button type='button' className='icon toggle-emoji'
                        onClick={this.toggleEmojiPicker}>
                        
                        </button>
                        {this.state.showEmojiPicker ? <EmojiPicker pickerStyle={{ position:'absolute', width:'20rem', height:'20rem', bottom:'6rem', boxShadow: 'none'}} 
                        id='emojiPicker' onEmojiClick={ this.addEmoji }
                        groupVisibility={{flags: false,symbols: false, objects: false }}
                         /> : null}
                        {/* {this.state.showEmojiPicker ? <emoji-picker onEmojiClick={ this.addEmoji }></emoji-picker>
                         : null} */}
                        
                        <textarea autoFocus={true} id='txtInput' placeholder="Write a message..." type="text"
                        onKeyUp={e => this.onType(e)} ></textarea>
                        
                        {/* <Picker onEmojiClick={this.addEmoji} /> */}

                        {/* <Editor  
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
                        }}/> */}
                        <input type='file' className='icon attDoc' 
                        onChange={e => this.addDocFn(e)}/> 

                        {/* <input type='file' className='icon attImg' 
                        onChange={e => this.addDocFn(e)}/>  */}
                        
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
    
    toggleEmojiPicker = () => {
        this.setState({
          showEmojiPicker: !this.state.showEmojiPicker,
        });
      }
    
    addEmoji = (code, emoji) => {
        console.log(emoji.unified);
        // let emojiPic = jsemoji.replace_colons(`:${emoji.names[0]}:`);
        let emojiPic = emoji.unified;
        //fromCodePointFrom - decimal code point to string; parseInt  - grom hexadecimal to decimal code point
        let emog = String.fromCodePoint(parseInt (emojiPic, 16));
        console.log(emog);
        let text = this.state.msgText + `${emog}`
        this.setState({
            msgText: text,
            showEmojiPicker: false,
        })
        document.getElementById('txtInput').value = text;
        document.getElementById('txtInput').focus();
        console.log(text);
    };

    // we set up message text to an input
    onType = (e) => e.keyCode === 13? this.sendMsg() : this.setState({msgText: e.target.value}); 

    textValidFn = (msg) => msg && msg.trim().length;

    addDocFn = (e) => {
        this.props.addDocFn(e)
    }

    sendMsg = () => {
        //checking if the message id valid
        if (this.textValidFn(this.state.msgText)) {
            //here should submit function from its parent(Dashboard)
            this.props.addMsgFn(this.state.msgText);
            //clear the input area
            document.getElementById('txtInput').value = '';
            this.setState({
                msgText: ''
            })
        };
    };
    } 

export default MessageInputComponent;