// This file is responsible for loading the commands, and making them available
// in one object.
//
// Commands should each be in their own file located in the commands folder.
// The name of the file (minus extension) is used as the command name.
// In order to be included, commands must export an object with specific
// properties - description, call, and help.
// - description should just be a string description.
// - call should be a function that accepts an array of args and a callback.
// It should pass the message to be sent to the callback.
// - help should be a function that accepts an array of args. It should return
// a string.

// Load the commands
const commands = require('require-all')({
  dirname: __dirname + '/commands',
  filter: /.+\.js$/,
  recursive: true,
  map: function(name) {
    // Could just grab split('.')[0], but why disallow commands with a '.'?
    return name.split('.').slice(0, -1).join('.');
  }});

// Remove the ones that don't meet our requirements
// TODO: This seems messy.
let exportBuilder = {};
for (let command in commands) {
  if (!commands[command].hasOwnProperty('description')) return;
  if (!commands[command].hasOwnProperty('call')) return;
  if (!commands[command].hasOwnProperty('help')) return;

  exportBuilder[command] = commands[command];
}

// The important bit.
module.exports = exportBuilder;
console.log('commands: >>> ' + JSON.stringify(exportBuilder));
