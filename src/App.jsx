import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';



const chattyUsers = {
  currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
    ]
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = chattyUsers;
    console.log("constructor")
  }


componentDidMount() {
  console.log("componentDidMount");
  setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: 3, username: "Michelle", content: "Hello there! This will take 3 seconds to show up."};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 3000);
}

_handleKeyPress = (username, userContent) => {
  const newMessage = {username: username, content: userContent};
  const messages = this.state.messages.concat(newMessage)
  this.setState({messages:messages})

}


  render() {
    console.log("did render")
    return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar submitMessage={this._handleKeyPress} currentUser={this.state.currentUser}/>
        </div>
        );
   }
 }




export default App;