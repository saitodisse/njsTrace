var path = require('path');
var fs = require('fs');
var rel = path.relative(process.cwd(), __dirname);
var source_files = path.join(rel, '**', '*.js');
var no_node_modules = '!' + path.join(rel, '**', 'node_modules', '**');

var njstrace = require('../../njstrace').inject({
  files: [source_files, no_node_modules],
  formatter: {
    onEntryCallback: function (result_json) {
      console.log('\n>>---------\n result_json:\n',
        require('util').inspect(result_json, {
          showHidden: false,
          depth: null,
          colors: true
        }),
        '\n>>---------\n');
    },
    onExitCallback: function (result_json) {
      console.log('\n>>---------\n result_json:\n',
        require('util').inspect(result_json, {
          showHidden: false,
          depth: null,
          colors: true
        }),
        '\n>>---------\n');
    },
  }
});

var f1 = require('./libs/f1');
var f2 = require('./libs/f2');

f1.a(function (result) {
  console.log( '\n !*!*!*!*!*!*!*! ', result );
  console.log( '\n !*!*!*!*!*!*!*! ', f1.b() );
  f2.c(function (result) {
    console.log( '\n !*!*!*!*!*!*!*! ', result );
  });
});
