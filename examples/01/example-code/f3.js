module.exports = function f2() {
  return new Promise(function(resolve, reject){
    try {
      resolve('f3_promise');
    } catch (err) {
      reject(err);
    }
  });
};
