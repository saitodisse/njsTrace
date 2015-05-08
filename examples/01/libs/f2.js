
module.exports = {
  c: function (callback) {
      setTimeout(function () {
        callback('f2.c  -- after 123');
      }, 123);
  },
};
