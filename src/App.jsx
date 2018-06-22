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
      activeUsers: 1
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {
      const parsedContent = JSON.parse(event.data)
      let newMessage = null
      let messages = null
      switch (parsedContent.type) {
      case "incomingNotification" :
        parsedContent.content =`${parsedContent.oldUserName}'s username has changed to ${parsedContent.username}`
        newMessage = {id: parsedContent.id, content: parsedContent.content, type: parsedContent.type};
        messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break
      case "incomingMessage" :
        newMessage = {id: parsedContent.id, username: parsedContent.username, content: parsedContent.content, type: parsedContent.type};
        messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break
      case "userCount" :
        this.setState({activeUsers: parsedContent.userCount})

      }
    }
    this.socket.onopen = (event) => {

    }
  }

_handleKeyPressContent = (userContent) => {
  const newMessage = {username: this.state.currentUser.username, content: userContent, type: "postMessage"};
  this.socket.send(JSON.stringify(newMessage))
  // console.log("message send", newMessage)
}

_handleKeyPressUserName = (username) => {
  const newUsername = {username: username, oldUserName:this.state.currentUser.username, type: "postNotification"};
  this.socket.send(JSON.stringify(newUsername))
  const newCurrentUser = {username: username}
  this.setState({currentUser: newCurrentUser})

  // console.log("username:", newUsername)
}

render() {
    return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <h3 className = "activeUsers">Current Users Online {this.state.activeUsers}</h3>

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