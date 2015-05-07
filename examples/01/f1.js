var f1_1 = require('./f1-1');

module.exports = {
  a: function () {
      return 'f1.a';
  },

  b: function () {
    return f1_1.b();
  },
};
