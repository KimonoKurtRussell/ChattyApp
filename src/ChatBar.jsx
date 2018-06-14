import React, { Component } from 'react';

class ChatBar extends Component {
  _onHandleKeyPressContent = (event) => {
    if(event.key === 'Enter') {
      this.props.submitMessage(this.props.currentUser.name, event.target.value)
      event.target.value ='';
    }
  }
  render() {
  return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
         <input className="chatbar-message" placeholder="Type a message" onKeyPress={this._onHandleKeyPressContent} />
      </footer>
        );
  }
}
export default ChatBar;