import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message" key={this.props.index}>
        <span className="message-username">{this.props.Username}</span>
        <span className="message-content">{this.props.Message}</span>
      </div>
      );
  }
}
export default Message;