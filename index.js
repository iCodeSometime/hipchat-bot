// Main file for chatbot. Configures and launches express.
// Also parses the message data and dispatches it to the appropriate location.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commands = require('./command_loader.js');

let port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define root route.
app.post('/', (req, res) => {
  if (req.body.event != 'room_message') {
    sendAndDie(res, 'Oops! Something went wrong. Event is not a room message');
  }

  // Parse the message sent to us from hipchat.
  let message = req.body.item.message.message.toLowerCase().split(' ');
  if (message.shift() != '/smartcop') return;
  let command = message.shift();
  let args = message;

  // show help if no command given
  if (command == undefined) {
    command = 'help';
  }

  // Pass control to the command.
  if (commands.hasOwnProperty(command)) {
    commands[command].call(args, (message) => { sendAndDie(res, message); });
  } else {
    sendAndDie(res, 'Oops! ' + command + ' is not a valid command.');
  }
});

// Might be better added to res as middleware.
function sendAndDie(res, messageText) {
  console.log('sendAndDie');
  let message = {
    color:          'green',
    message_format: 'text',
    notify:         'false',
    message:    'no message: something really weird happened'
  };
  message.message = messageText;
  console.log(JSON.stringify(message))
  res.json(message);
}

// Start the server with above routes and settings.
app.listen(port, () => console.log('Listening on port ' + port));
