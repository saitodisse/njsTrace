var BB = require('bluebird');
var runAndSave = require('./execute/run-and-save');
var fileUtils = require('./execute/file-utils');
var analyser = require('./execute/analyser');

var main = BB.coroutine(function* () {
  var saved_path = yield runAndSave();
  var content = yield fileUtils.read(saved_path);
  var data = JSON.parse(content);

  /**/console.log('\n>>---------\n data:\n', require('util').inspect(data, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/

  var min_moment_date = analyser.min(data);
  console.log('min_moment_date:', min_moment_date.toISOString());

  var max_moment_date = analyser.max(data);
  console.log('max_moment_date:', max_moment_date.toISOString());

});

main();

// runAndSave()
//   .then(function (result) {
//     if(result) {
//       console.log('all done!');
//     }
//   })
//   .catch(function (err) {
//     console.log('rejected:', err.message);
//   });
//
// // function* runAsync() {
// //   yield runAndSave();
// //   yield analyse();
// // }
// //
// // runAsync();
