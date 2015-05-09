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
};

// module.exports = function analyse() {
//   var path = require('path');
//   var fs = require('fs');
//   var R = require('ramda');
//   var moment = require('moment');
//
//   var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'trace_result.json')));
//   /**/console.log('\n>>---------\n data:\n', require('util').inspect(data, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
//   /**/console.log('\n>>---------\n data.length:\n', data.length, 'itens\n>>---------\n');/*-debug-*/
//
//   var all_dates = R.map(R.compose(function (x) {
//     return moment(x).toISOString();
//   }, R.prop('date')), data);
//
//   function date_time_cmp(obj) { return obj.date.valueOf(); }
//
//   var getMin = R.minBy(date_time_cmp);
//   var min = moment(getMin(data).date);
//
//   var getMax = R.maxBy(date_time_cmp);
//   var max = moment(getMax(data).date);
//
//   var total = max - min;
//
//   /**/console.log('\n>>---------\n total:\n', total, 'ms\n>>---------\n');/*-debug-*/
// };
