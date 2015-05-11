module.exports = function runAndSave() {
  // create njstrace
  var path = require('path');
  var rel = path.relative(process.cwd(), __dirname);
  var source_files = path.join(rel, '../example-code/**', '*.js');
  var njstrace = require('../../../njstrace').inject({ files: [source_files] });

  // execute code
  var main = require('../example-code/main');

  // all
  return main()
    .then(function () {
      // save
      var save_path = path.join(__dirname, 'TRACE_RESULT.json');
      njstrace.save(save_path);
      return save_path;
    })
    .catch(function (err) {
      throw err;
    })
  ;

};
