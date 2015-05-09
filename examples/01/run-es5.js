var fs = require('fs');
var runAndSaveES5 = require('./execute/run-and-save-es5');
var analyser = require('./execute/analyser');

runAndSaveES5(function (file_path) {
  var content = fs.readFileSync(file_path);
  var data = JSON.parse(content);

  /**/console.log('\n>>---------\n data:\n', require('util').inspect(data, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/

  var min_moment_date = analyser.minDate(data);
  console.log('min_moment_date:', min_moment_date.toISOString());

  var max_moment_date = analyser.maxDate(data);
  console.log('max_moment_date:', max_moment_date.toISOString());

  var grouped = analyser.byId(data);
  /**/console.log('\n>>---------\n grouped:\n', require('util').inspect(grouped, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/

});
