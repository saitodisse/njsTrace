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
    .then(wait.wait200)
    .then(f1)
    .then(print)
    .then(wait.wait100)
  ;
  all_promises.push(promise1);

  // 02
  var promise2 = f2()
    .then(print)
    .then(wait.wait200)
    .then(f2)
    .then(print)
    .then(wait.wait100)
  ;
  all_promises.push(promise2);

  // 02
  var promise3 = f3()
    .then(print)
    .then(wait.wait200)
    .then(f3)
    .then(print)
    .then(wait.wait100)
  ;
  all_promises.push(promise3);

  // all
  return Promise.all(all_promises);

};
