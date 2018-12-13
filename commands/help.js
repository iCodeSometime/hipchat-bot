// Gives the names of available commands, and description.
// If arguments are passed, it calls the help function of the first argument,
// passing the remainder of the arguments.

module.exports = {
  description: 'Displays a list of commands.',
  call: help,
  help: help
};

function help(args, res) {
  console.log('in help')
  // todo: figure out why this doesn't work with the require at the top.
  const commands = require('.');

  if (commands.hasOwnProperty(args[0]) &&
      commands[args[0]].hasOwnProperty('help')) {
    res.sendMessage(commands[args[0]].help(args.slice(1)));
  } else {
    res.sendMessage(genericHelp(commands));
  }
}

// Handles the generic case where no valid arguments are given.
// TODO: use reduce
function genericHelp(commands) {
  var message = '';
  for (let command in commands) {
    if (!command.hasOwnProperty('description')) continue;
    message += command + ': ' + commands[command].description + '\n';
  }
  message += '\nFor more information about specific commands, use `help <command>`';
  return message;
}
