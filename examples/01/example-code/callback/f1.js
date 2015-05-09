module.exports = function f1(callback) {
  setTimeout(function () {
    callback();
  }, 500);
};
