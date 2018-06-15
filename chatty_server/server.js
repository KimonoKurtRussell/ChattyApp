// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  users = {
    type: "userCount",
    userCount: wss.clients.size
  };
  console.log(users)
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });

ws.on('message', message => {
  const newMessage = JSON.parse(message)
  const uniqueKey = uuidv4();
  newMessage.id = uniqueKey;
  if (newMessage.type === 'postMessage') {
    newMessage.type = 'incomingMessage'
  } else {
    newMessage.type = 'incomingNotification'
  }
   console.log('Server Recived: ', newMessage)

wss.clients.forEach(client => {
      client.send(JSON.stringify(newMessage, wss.clients.size));
    })
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
     users = {
       type: "userCount",
       userCount: wss.clients.size
     };
     wss.clients.forEach(client => {
      client.send(JSON.stringify(users));
     });
  });
});

