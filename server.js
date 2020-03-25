const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', socket => {
  // Emit to the user who has connected
  socket.emit('message', 'Welcome to ChatCord!');

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat.');

  // Runs when client/user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
