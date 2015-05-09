module.exports = function print(obj) {
  return new Promise(function(resolve){
    console.log(obj);
    resolve(obj);
  });
};
