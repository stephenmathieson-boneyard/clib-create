
var fs = require('fs');
var read = fs.readFileSync;

var files = fs.readdirSync(__dirname).filter(function (f) {
  return f !== 'index.js';
});

for (var i = files.length - 1; i >= 0; i--) {
  var name = files[i];
  var data = read(__dirname + '/' + name);
  exports[name] = template.bind(null, data);
}

/**
 * Template `data` with `conf`
 *
 * @api private
 * @param {Buffer} data
 * @param {Object} conf
 * @return {String}
 */

function template(data, conf) {
  var d = new Date;
  return data
    .toString()
    .replace(/\{author\}/g, conf.author)
    .replace(/\{desc\}/g, conf.desc)
    .replace(/\{email\}/g, conf.email)
    .replace(/\{name\}/g, conf.name)
    .replace(/\{NAME\}/g, guard(conf.name))
    .replace(/\{repo\}/g, conf.repo)
    .replace(/\{year\}/g, d.getFullYear());
}

/**
 * Create a valid header guard from `name`
 *
 * @api private
 * @param {String} name
 * @return {String}
 */

function guard(name) {
  return name
    .toUpperCase()
    .replace(/\-/g, '_')
    .replace(/\./g, '_');
}
