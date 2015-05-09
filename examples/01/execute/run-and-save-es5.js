module.exports = function runAndSave(callback) {
  // create njstrace
  var path = require('path');
  var rel = path.relative(process.cwd(), __dirname);
  var source_files = path.join(rel, '../example-code/**', '*.js');

  /**/console.log('\n>>---------\n rel:\n', rel, '\n>>---------\n');/*-debug-*/
  /**/console.log('\n>>---------\n source_files:\n', source_files, '\n>>---------\n');/*-debug-*/

  var njstrace = require('../../../njstrace').inject({ files: [source_files] });

  var f1 = require('../example-code/callback/f1');

  f1(function () {
    var save_path = path.join(__dirname, 'TRACE_RESULT.json');
    njstrace.save(save_path);
    callback(save_path);
  });

};
