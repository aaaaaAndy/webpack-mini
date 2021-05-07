#!/usr/bin/env node

const user_config = require('./config');
const Compiler = require('./Compiler');

function webpackMini() {
  const compiler = new Compiler(user_config);

  compiler.run();
}

webpackMini();