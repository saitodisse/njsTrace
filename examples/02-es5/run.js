var fs = require('fs');
// var runAndSaveES5 = require('./execute/run-and-save');
var analyser = require('./execute/analyser');

// runAndSaveES5(function (file_path) {
  var content = fs.readFileSync('/home/julio/_git/njstrace/examples/02-es5/execute/TRACE_RESULT.json');
  var data = JSON.parse(content);

  var min_moment_date = analyser.minDate(data);
  console.log('min_moment_date:', min_moment_date.toISOString());

  var max_moment_date = analyser.maxDate(data);
  console.log('max_moment_date:', max_moment_date.toISOString());

  var total = max_moment_date - min_moment_date;

  analyser.printTimespan(data, total);

// });
