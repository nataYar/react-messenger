import React from "react";
import MessageInput from './MessageInput.css';
import EmojiPicker from 'emoji-picker-react';

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
   
    render () {

        if (this.props.visibility && this.props.selected != null ) {
            return (
                <main className='txtInputContainer'>
                    <div className='txtInputContainerFlex'>
                        <textarea autoFocus={true} id='txtInput' placeholder="Write a message..." type="text"
                        onKeyUp={e => this.onType(e)}></textarea>
                        
                        <button type='button' className='icon toggle-emoji'
                        onClick={this.toggleEmojiPicker}></button>

                        {this.state.showEmojiPicker ? 
                        <EmojiPicker pickerStyle={{ position:'absolute', width:'20rem', height:'20rem', bottom:'15%', boxShadow: 'none',
                        right: "20%"}} 
                        id='emojiPicker' onEmojiClick={ this.addEmoji }
                        groupVisibility={{flags: false,symbols: false, objects: false }}
                         /> : null}
                         
                        <input type='file' className='icon attDocBtn' 
                        onChange={e => this.addDocFn(e)}/> 
                        
                        <button className='icon messSendBtn' id='goFS' 
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

    //don't delete event, otherwise won't work
    addEmoji = (event, emoji) => {
        let emojiPic = emoji.unified;
        console.log(emoji);

        // fromCodePointFrom - decimal code point to string; 
        // parseInt  - grom hexadecimal to decimal code point
        let emog = String.fromCodePoint(parseInt (emojiPic, 16));
       
        let text = this.state.msgText + `${emog}`
        this.setState({
            msgText: text,
            showEmojiPicker: false,
        })
        document.getElementById('txtInput').value = text;
        document.getElementById('txtInput').focus();
    };

    // we set up message text to an input
    onType = (e) => {
        e.keyCode === 13 ? this.sendMsg() : this.setState({msgText: e.target.value}); 
    }
   
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