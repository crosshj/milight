// repl_test.js
const repl = require('repl');
var msg = 'message';

repl.start('> ').context.m = msg;