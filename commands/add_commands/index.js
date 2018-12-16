const requireDirectory = require('require-directory');

module.exports = requireDirectory(module);

console.log('*****' + JSON.stringify(module.exports));

for (key in module.exports) {
  console.log(module.exports[key]);
}
