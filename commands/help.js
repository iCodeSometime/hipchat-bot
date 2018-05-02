// Gives the names of available commands, and description.
// If arguments are passed, it calls the help function of the first argument,
// passing the remainder of the arguments.

module.exports = {
  description: 'Displays a list of commands.',
  call: help,
  help: () => { return genericHelp(); } // can we get more detailed..?
};

function help(args, callback) {
  console.log('in help')
  // Must be required in the function, or else the export will still be empty.
  const commands = require('../command_loader.js');
  if (commands.hasOwnProperty(args[0])) {
    callback(commands[args[0]].help(args.slice(1)));
  } else {
    callback(genericHelp(commands));
  }
}

// Handles the generic case where no valid arguments are given.
// TODO: use reduce
function genericHelp(commands) {
  var message = '';
  for (let command in commands) {
    message += command + ': ' + commands[command].description + '\n';
  }
  message += '\nFor more information about specific commands, use `help <command>`';
  return message;
}
