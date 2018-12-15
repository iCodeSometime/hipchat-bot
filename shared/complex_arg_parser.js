module.exports = {
  // Parses out the command options and returns them as an object.
  // parameters:
  // args [Array<String>] - The args array as it was passed to the command.
  // required_args [Array<String>] - A list of arguments that are required.
  parse: function(args, required_args) {
    console.log('required args: ' + required_args);
    ret = {};
    args = args.join(' ').split('\n');
    // Build return object
    for (let arg in args) {
      let temp = args[arg].split(' ');
      let name = temp.shift().trim();
      ret[name] = temp.join(' ').trim();
    }
    // Check that all required args are present
    for (let arg in required_args) {
      arg = required_args[arg];
      if (!ret.hasOwnProperty(arg) || ret[arg].length < 1) {
        return {
          failed: true,
          fail_message: arg + ' is a required command.\n' +
                        'The help command can provide more details.'
        }
      }
    }
    return ret;
  },

  // Builds a help message describing how to submit options that can be parsed.
  // parameters:
  // command [String] - the entire command without options
  //                    e.g. '/smartcop add environment'
  // options [Object] - an object where the keys are the option name, and the
  //                    values are objects with the keys example and description
  help: function(command, options) {
    let message = 'Arguments must be each on a separate line. e.g.\n' + command;
    for (let option in options) {
      message += '\n' + option + ' ' + options[option].example;
    }
    message += '\n\n This command accepts the following options.'
    for (let option in options) {
      message += '\n' + option + ' - ' + options[option].description
    }
    
    return message;
  }
};
