var R = require('ramda');
var moment = require('moment');

// analiser
module.exports = {
  date_time_cmp: function(obj) {
    return obj.date.valueOf();
  },

  min: function (data) {
    var getMin = R.minBy(this.date_time_cmp);
    return moment(getMin(data).date);
  },

  max: function (data) {
    var getMax = R.maxBy(this.date_time_cmp);
    return moment(getMax(data).date);
  },

  byId: function (data) {
    return R.groupBy(function(item) {
      return item.sid;
    }, data);
  },
  
};
