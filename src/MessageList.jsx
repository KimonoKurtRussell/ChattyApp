import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((chatData, index) =>
            <Message key= {index}
            Username= {chatData.username}
            Message={chatData.content} />)
        }
        <div className="message system"/>
      </main>
        )}
  }
export default MessageList;