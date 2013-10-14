
var fs = require('fs');
var read = fs.readFileSync;

var header = read(__dirname + '/header');
var history = read(__dirname + '/history');
var makefile = read(__dirname + '/makefile');
var package = read(__dirname + '/package');
var readme = read(__dirname + '/readme');
var source = read(__dirname + '/source');
var test = read(__dirname + '/test');
var gitignore = read(__dirname + '/gitignore');

exports.header = template.bind(null, header);
exports.history = template.bind(null, history);
exports.makefile = template.bind(null, makefile);
exports.package = template.bind(null, package);
exports.readme = template.bind(null, readme);
exports.source = template.bind(null, source);
exports.test = template.bind(null, test);
exports.gitignore = template.bind(null, gitignore);

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
