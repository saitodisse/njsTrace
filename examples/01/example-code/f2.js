module.exports = function f2() {
  return new Promise(function(resolve, reject){
    try {
      resolve('f2_promise');
    } catch (err) {
      reject(err);
    }
  });
};
