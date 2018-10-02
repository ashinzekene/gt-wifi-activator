#!/usr/bin/env node

var locateChrome = require('./');

locateChrome().then(function(r) {
  console.log(r);
});
