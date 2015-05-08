var path = require('path');
var fs = require('fs');
var rel = path.relative(process.cwd(), __dirname);
var source_files = path.join(rel, '**', '*.js');

/**/console.log('\n>>---------\n source_files:\n', source_files, '\n>>---------\n');/*-debug-*/

var njstrace = require('../../njstrace').inject({ files: [source_files] });

var f1 = require('./libs/f1');
var f2 = require('./libs/f2');

f1.a(function (result) {
  console.log( '\n !*!*!*!*!*!*!*! ', result );
  console.log( '\n !*!*!*!*!*!*!*! ', f1.b() );
  f2.c(function (result) {
    njstrace.save(path.join(__dirname, 'trace_result.json'));
    console.log( '\n !*!*!*!*!*!*!*! ', result );
  });
});
