import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log("messages", this.props.messages);
    return (
      <main className="messages">
        {
          this.props.messages.map((chatData, index) =>
            <Message key={index} Username={chatData.username} Message={chatData.content} type={chatData.type} />)
        }
        <div className="message system"/>
      </main>
    )}
  }
export default MessageList;