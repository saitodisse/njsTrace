module.exports = function f1() {
  return new Promise(function(resolve, reject){
    try {
      resolve('f1_promise');
    } catch (err) {
      reject(err);
    }
  });
};
