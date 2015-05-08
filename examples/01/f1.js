var f1_1 = require('./f1-1');

module.exports = {
  a: function (callback) {
      setTimeout(function () {
        callback('f1.a  -- after 1 sec');
      }, 1000);
  },

  b: function () {
    return f1_1.b();
  },
};
