module.exports = {
  wait100: function (obj) {
    console.log('  >> 100 ms (wait call)', obj);
    return new Promise(function(resolve){
      setTimeout(function () {
        console.log('  << 100 ms (wait result)', obj);
        resolve(obj);
      }, 100);
    });
  },
  wait200: function (obj) {
    console.log('  >> 200 ms (wait call)', obj);
    return new Promise(function(resolve){
      setTimeout(function () {
        console.log('  << 200 ms (wait result)', obj);
        resolve(obj);
      }, 200);
    });
  },
  wait500: function (obj) {
    console.log('  >> 500 ms (wait call)', obj);
    return new Promise(function(resolve){
      setTimeout(function () {
        console.log('  << 500 ms (wait result)', obj);
        resolve(obj);
      }, 500);
    });
  },
  wait1000: function (obj) {
    console.log('  >> 1000 ms (wait call)', obj);
    return new Promise(function(resolve){
      setTimeout(function () {
        console.log('  << 1000 ms (wait result)', obj);
        resolve(obj);
      }, 1000);
    });
  },
};
