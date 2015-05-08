window.a = function (callback) {
  setTimeout(function () {
    callback('f1.a  -- after 1 sec');
  }, 1000);
};
