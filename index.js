
var fs = require('fs');
var path = require('path');
var mkdir = require('mkdirp');
var templates = require('./templates');

module.exports = create;

function create(dir, conf, cb) {
  dir = path.join(dir, conf.name);
  var files = [];

  mkdir(path.join(dir, 'src'), history);

  function write(file, key, next) {
    var data = templates[key](conf);
    files.push(file);
    fs.writeFile(path.join(dir, file), data, next);
  }

  function history(err) {
    if (err) return cb(err);
    write('History.md', 'history', makefile);
  }

  function makefile(err) {
    if (err) return cb(err);
    write('Makefile', 'makefile', package);
  }

  function package(err) {
    if (err) return cb(err);
    write('package.json', 'package', readme);
  }

  function readme(err) {
    if (err) return cb(err);
    write('Readme.md', 'readme', test);
  }

  function test(err) {
    if (err) return cb(err);
    write('test.c', 'test', source);
  }

  function source(err) {
    if (err) return cb(err);
    write(path.join('src', conf.name + '.c'), 'source', header);
  }

  function header(err) {
    if (err) return cb(err);
    write(path.join('src', conf.name + '.h'), 'header', done);
  }

  function done(err) {
    if (err) return cb(err);
    cb(null, dir, files);
  }

}
