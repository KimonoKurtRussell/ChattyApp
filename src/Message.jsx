import React, { Component } from 'react';


class Message extends Component {
  render() {
    console.log("message", this.props.Username)
    if (this.props.type === "incomingMessage") {
    return (
        <div className="message" key={this.props.index}>
        <span className="message-username">{this.props.Username}</span>
        <span className="message-content">{this.props.Message}</span>
      </div>
      );
   } else {
    return (
    <div className="message system" key={this.props.index}>
    <span className="message-content">{this.props.Message}</span>
      </div>)

  }
}
}
export default Message;