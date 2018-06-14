import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Bob"},
    messages: []
    }
    console.log("constructor")
  }


componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onContent = (event) => {
      const parsedContent = JSON.parse(event.data)
      const newMessage = {content: parsedContent.content};
      const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    }
    this.socket.onopen = (event) => {
      console.log("Connected to Server")
    }
    console.log("DidMount")
}

_handleKeyPressContent = (username, userContent) => {
  const newMessage = {username: username, content: userContent};
  this.socket.send(JSON.stringify(newMessage))


}


  render() {
    console.log("did render")
    return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar submitMessage={this._handleKeyPressContent} currentUser={this.state.currentUser}/>
        </div>
        );
   }
 }




export default App;