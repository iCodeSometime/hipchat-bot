module.exports = function(name) {
  const SubCommands = require(`../commands/${name}_commands`);


  function call(args, res) {
    sub_command_name = args.shift();
    if (SubCommands[sub_command_name]) {
      SubCommands[sub_command_name].call(args, res);
    } else {
      res.sendMessage(sub_command_name +
        " is not a valid type, or hasn't been implemented yet.\n" +
        "Use help available options."
      );
    }
  }
  
  function help(args) {
    sub_command_name = args.shift();
    if (SubCommands[sub_command_name] &&
        SubCommands[sub_command_name].hasOwnProperty('help')) {
      return SubCommands[sub_command_name].help(args);
    } else {
      let message = ''
      for (let command in SubCommands) {
        message += command + ': ' + SubCommands[command].description + '\n';
      }
      return message;
    }
  }

  return {
    call: call,
    help: help
  }
}
