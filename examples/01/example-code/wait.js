module.exports = {
  wait100: function (obj) {
    return new Promise(function(resolve){
      setTimeout(function () {
        resolve(obj);
      }, 100);
    });
  },
  wait200: function (obj) {
    return new Promise(function(resolve){
      setTimeout(function () {
        resolve(obj);
      }, 200);
    });
  },
  wait500: function (obj) {
    return new Promise(function(resolve){
      setTimeout(function () {
        resolve(obj);
      }, 500);
    });
  },
  wait1000: function (obj) {
    return new Promise(function(resolve){
      setTimeout(function () {
        resolve(obj);
      }, 1000);
    });
  },
};
