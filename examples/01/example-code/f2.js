var wait = require('./wait');

module.exports = function f2() {
  return wait.wait100()
    .then(wait.wait100)
    .then(function () {
      return new Promise(function(resolve, reject){
        try {
          resolve('f2_promise');
        } catch (err) {
          reject(err);
        }
      });
    });
};
