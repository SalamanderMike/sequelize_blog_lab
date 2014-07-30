var repl = require('repl');
var db = require('./models/index.js');
var newREPL = repl.start("Database> ");

newREPL.context.db = db;