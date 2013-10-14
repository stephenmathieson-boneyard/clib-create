
var fs = require('fs');
var exists = fs.existsSync;
var rimraf = require('rimraf');
var assert = require('better-assert');
var create = require('./');

var conf = {
  author: 'Stephen Mathieson',
  desc: 'Test lib',
  email: 'me@stephenmathieson.com',
  name: 'test',
  repo: 'stephenmathieson/test.c'
};

rimraf.sync(__dirname + '/fixture');

create(__dirname + '/fixture', conf, function (err, dir) {
  if (err) throw err;
  assert(__dirname + '/fixture/test' === dir);
  assert(exists(__dirname + '/fixture/test/.gitignore'));
  assert(exists(__dirname + '/fixture/test/History.md'));
  assert(exists(__dirname + '/fixture/test/Makefile'));
  assert(exists(__dirname + '/fixture/test/package.json'));
  assert(exists(__dirname + '/fixture/test/Readme.md'));
  assert(exists(__dirname + '/fixture/test/test.c'));
  assert(exists(__dirname + '/fixture/test/src/test.c'));
  assert(exists(__dirname + '/fixture/test/src/test.h'));
});
