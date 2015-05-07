var path = require('path');
var rel = path.relative(process.cwd(), __dirname);
var source_files = path.join(rel, '**', '*.js');
var no_node_modules = '!' + path.join(rel, '**', 'node_modules', '**');

require('../../njsTrace').inject({
  files: [source_files, no_node_modules],
  formatter: {
    // stdout: 'trace_result.json',
    onEntryCallback: function (result) {
      /**/console.log('\n>>---------\n result:\n', require('util').inspect(result, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
    },
    onExitCallback: function (result) {
      /**/console.log('\n>>---------\n result:\n', require('util').inspect(result, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
    },
  }
});

var profiler = require('chrome-cpu-profiler');
profiler.startProfiling('cpu-block');

var f1 = require('./f1');
var f2 = require('./f2');

console.log( '\n\n', f1.a() );
console.log( '\n\n', f1.b() );
console.log( '\n\n', f2.c() );

var data = profiler.stopProfiling('cpu-block');
profiler.writeFile(data);
