module.exports = function main() {
  // execute code
  var f1 = require('./f1');
  var f2 = require('./f2');
  var f3 = require('./f3');
  var wait = require('./wait');
  var print = require('./print');

  var all_promises = [];

  // 01
  var promise1 = f1()
    .then(print)
    .then(wait.wait100)
    .then(f1)
    .then(wait.wait100)
    .then(print)
    .then(f2)
    .then(print)
    .then(f2)
    .then(print)
  ;
  all_promises.push(promise1);

  // 02 - sync with f1() promise part
  var promise2 = f3()
    .then(wait.wait100)
    .then(print)
    .then(wait.wait100)
    .then(f3)
    .then(print)
  ;
  all_promises.push(promise2);

  // run all async
  return Promise.all(all_promises);

};
