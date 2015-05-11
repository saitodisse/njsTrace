// run with: iojs

var BB = require('bluebird');
var runAndSave = require('./execute/run-and-save');
var fileUtils = require('./execute/file-utils');
var analyser = require('./execute/analyser');

var main = BB.coroutine(function* () {

  // run and save
  var saved_path = yield runAndSave();

  // read from disk
  var content = yield fileUtils.read(saved_path);
  var data = JSON.parse(content);

  // analyse
  console.log('');
  var min_moment_date = analyser.minDate(data);
  console.log('min_moment_date:', min_moment_date.toISOString());

  var max_moment_date = analyser.maxDate(data);
  console.log('max_moment_date:', max_moment_date.toISOString());

  var total = max_moment_date - min_moment_date;
  console.log('total time ellapsed:', total, 'ms');

  // var grouped = analyser.byId(data);

  analyser.printTimespan(data, total);
  //analyser.printIdTime(data);

});

main();
