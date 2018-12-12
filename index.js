// Main file for chatbot. Configures and launches express.
// Also parses the message data and dispatches it to the appropriate location.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commands = require('./command_loader.js');

let port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.sendMessage = function(messageText) {
    let message = {
      color: 'green',
      message_format: 'text',
      notify: 'false',
      message: 'no message. something weird happened'
    };
    if (messageText) {
      message.message = messageText
    }
    console.log('Send and die. Sending:\n' + JSON.stringify(message));
    self.json(message)
  };
});

// Define root route.
app.post('/', (req, res) => {
  if (req.body.event != 'room_message') {
    res.sendMessage('Oops! Something went wrong. Event is not a room message');
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
    commands[command].call(args, res);
  } else {
    res.sendMessage('Oops! ' + command + ' is not a valid command.');
  }
});


// Start the server with above routes and settings.
app.listen(port, () => console.log('Listening on port ' + port));
