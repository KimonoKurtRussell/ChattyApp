import React, { Component } from 'react';

class ChatBar extends Component {
  _onHandleKeyPressContent = (event) => {
    if(event.key === 'Enter') {
      this.props.messageEntry(this.props.currentUser.username, event.target.value)
      event.target.value ='';
    }
  }
  _onHandleKeyPressUsername = (event) => {
    this.props.userEntry(event.target.value)

}


  render() {
  return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.username} onBlur={this._onHandleKeyPressUsername} />
         <input className="chatbar-message" placeholder="Type a message" onKeyPress={this._onHandleKeyPressContent} />
      </footer>
        );
  }
}
export default ChatBar;