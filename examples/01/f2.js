
module.exports = {
  c: function (callback) {
      setTimeout(function () {
        callback('f2.c  -- after 1.5 sec');
      }, 1500);
  },
};
