#!/usr/bin/env node

var prompt = require('prompt');
var isEmail = require('is-email');
var create = require('./');

var schema = {
  properties: {
    name: {
      pattern: /^[a-z\-\d\.]+$/i,
      // idk why
      message: 'Name must only contain letters, numbers, dashes, or periods',
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
    for (var i = 0, len = files.length; i < len; i++) {
      console.log('wrote:  '.grey + files[i]);
    }
  });
});
