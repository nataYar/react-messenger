import React from "react";
import NewChat from './NewChat.css';
const firebase = require('firebase');

class NewChatComponent extends React.Component {
  constructor(){
    super();
    this.state={

    }
    }
    render() {
      return (
          <div className='newChatContainer'>
            <form className='submitForm'>
                <input className='userInput' type='text' placeholder="Friend's email"></input>
                <input className='userInput' type='text' placeholder="Your message"></input>
                <input type="submit" value="Send"></input>
            </form> 
          </div>
      )
    }  
};

  export default NewChatComponent;