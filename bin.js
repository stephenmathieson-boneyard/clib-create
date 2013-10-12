#!/usr/bin/env node

var prompt = require('prompt');
var isEmail = require('is-email');
var create = require('./');

var schema = {
  properties: {
    name: {
      pattern: /^[a-z\-\d]+$/i,
      // idk why
      message: 'Name must be only letters, numbers or dashes',
      required: true
    },
    repo: {
      pattern: /^[a-z\d\-\_\.]+\/[a-z\d\-\_\.]+$/i,
      message: 'Repo must be a {owner}/{repository}',
      required: true
    },
    email: {
      required: true,
      conform: isEmail
    },
    author: {
      required: true
    },
    desc: {
      description: 'description',
      required: false
    }
  }
};

prompt.start();
prompt.message = '';
prompt.get(schema, function (err, conf) {
  if (err) throw err;
  create(process.cwd(), conf, function (err, dir, files) {
    if (err) throw err;
    files.forEach(function (file) {
      console.log('wrote'.grey + ': '.grey + file);
    });
  });
});
