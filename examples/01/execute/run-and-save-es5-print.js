module.exports = function runAndSave(callback) {
  // create njstrace
  var path = require('path');
  var rel = path.relative(process.cwd(), __dirname);
  var source_files = path.join(rel, '../example-code/**', '*.js');
  var njstrace = require('../../../njstrace').inject({ files: [source_files] });

  var f1 = require('../example-code/callback/f1');

  f1(function () {
    var save_path = path.join(__dirname, 'TRACE_RESULT.json');
    njstrace.save(save_path);
    callback(save_path);
  });

};
