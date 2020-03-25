const path = require('path');
const http = require('http');
const express = require('express');
const wsServer = require('./config/socket');

const app = express();
const httpServer = http.createServer(app);
wsServer(httpServer);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
