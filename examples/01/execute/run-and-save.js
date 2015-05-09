module.exports = function runAndSave() {
  // create njstrace
  var path = require('path');
  var rel = path.relative(process.cwd(), __dirname);
  var source_files = path.join(rel, '../example-code/**', '*.js');
  var njstrace = require('../../../njstrace').inject({ files: [source_files] });

  // execute code
  var f1 = require('../example-code/f1');
  var f2 = require('../example-code/f2');
  var wait = require('../example-code/wait');
  var print = require('../example-code/print');

  // run
  return f1()
    .then(print)
    .then(wait.wait500)
    .then(f2)
    .then(print)
    .then(wait.wait200)
    .then(function () {
      // save
      var save_path = path.join(__dirname, 'TRACE_RESULT.json');
      njstrace.save(save_path);
      return save_path;
    })
    .catch(function (err) {
      throw err;
    });
};
