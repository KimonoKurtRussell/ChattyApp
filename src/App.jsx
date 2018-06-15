import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { IncomingMessage } from "http";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username:"Anonymous"},
      messages:[],
      activeUsers: {}
    }
  }

componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {
      const parsedContent = JSON.parse(event.data)
        if (parsedContent.type === "incomingNotification"){
          parsedContent.content =`${this.state.currentUser.username}'s username has changed to ${parsedContent.username}`
          const newMessage = {id: parsedContent.id, username: parsedContent.username, content: parsedContent.content, type: parsedContent.type};
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages, currentUser: {username: parsedContent.username}})
        } else {
        // console.log("parsedContent", parsedContent)
          const newMessage = {id: parsedContent.id, username: parsedContent.username, content: parsedContent.content, type: parsedContent.type};
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages, currentUser: {username: parsedContent.username}})
        }
    }
      this.socket.onopen = (event) => {

      }
}

_handleKeyPressContent = (userContent) => {
  const newMessage = {username: this.state.currentUser.username, content: userContent, type: "postMessage"};
  this.socket.send(JSON.stringify(newMessage))
}

_handleKeyPressUserName = (username) => {
  const newUsername = {username: username, type: "postNotification"};
  this.socket.send(JSON.stringify(newUsername))
}

render() {
    return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <div className="message system">
             <span className="notification-content"></span>
           </div>
          <ChatBar userEntry={this._handleKeyPressUserName} messageEntry={this._handleKeyPressContent} currentUser={this.state.currentUser}/>
        </div>
        );
   }
 }

export default App;