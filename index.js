// Main file for chatbot. Configures and launches express.
// Also parses the message data and dispatches it to the appropriate location.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commands = require('./commands');

let port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('in middleware');
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
    res.json(message)
  };
  console.log('done with middleware');
  next();
});

// Define root route.
app.post('/', (req, res) => {
  console.log('in post');
  if (req.body.event != 'room_message') {
    res.sendMessage('Oops! Something went wrong. Event is not a room message');
  }
  console.log('event is room_message');
  // Parse the message sent to us from hipchat.
  let message = req.body.item.message.message.toLowerCase().split(' ');
  if (message.shift() != '/smartcop') return;
  let command = message.shift();
  let args = message;
  console.log('parsed command');
  
  // show help if no command given
  if (command == undefined) {
    command = 'help';
  }

  // Pass control to the command.
  if (commands.hasOwnProperty(command) &&
      commands[command].hasOwnProperty('call')) {
    commands[command].call(args, res);
  } else {
    res.sendMessage('Oops! ' + command + ' is not a valid command.');
  }
});


// Start the server with above routes and settings.
app.listen(port, () => console.log('Listening on port ' + port));
