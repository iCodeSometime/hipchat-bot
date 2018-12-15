const MultipartCommand = require('../shared/multipart_command.js')('add');


module.exports = {
  description: 'Adds a new item.',

  call: MultipartCommand.call,
  help: (args) => {
    let prefix = ''
    if (args.length < 1) {
      prefix = 'Adds a new item of the specified type. Options are:\n'
    }
    return prefix + MultipartCommand.help(args)
  }
};
