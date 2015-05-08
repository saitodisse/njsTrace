var path = require('path');
var fs = require('fs');
var rel = path.relative(process.cwd(), __dirname);
var source_files = path.join(rel, '**', '*.js');
var no_node_modules = '!' + path.join(rel, '**', 'node_modules', '**');

require('../../njstrace').inject({
  files: [source_files, no_node_modules],
  formatter: {
    stdout: 'trace_result.json',
    // onEntryCallback: function (result_json) {
    //   /**/console.log('\n>>---------\n result_json:\n', require('util').inspect(result_json, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
    // },
    // onExitCallback: function (result_json) {
    //   /**/console.log('\n>>---------\n result_json:\n', require('util').inspect(result_json, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
    // },
  }
});

var f1 = require('./f1');
// var f2 = require('./f2');

// chrome-cpu-profiler
var profiler = require('chrome-cpu-profiler');
profiler.startProfiling('cpu-block');

f1.a(function (result) {
  // console.log( '\n\n', result );
  // console.log( '\n\n', f1.b() );
  // f2.c(function (result) {
  //   console.log( '\n\n', result );

    // chrome-cpu-profiler
    var data = profiler.stopProfiling('cpu-block');
    // profiler.writeFile(data);

    fs.writeFile('CPU.profile', JSON.stringify(data, ' ', 2), function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  // });
});
