var R = require('ramda');
var moment = require('moment');
var table = require('text-table');

// analiser
module.exports = {
  date_time_cmp: function(obj) {
    return obj.date.valueOf();
  },

  minDate: function (data) {
    var getMin = R.minBy(this.date_time_cmp);
    return moment(getMin(data).date);
  },

  maxDate: function (data) {
    var getMax = R.maxBy(this.date_time_cmp);
    return moment(getMax(data).date);
  },

  byId: function (data) {
    return R.groupBy(function(item) {
      return item.sid;
    }, data);
  },

  // http://stackoverflow.com/a/14428340/66428
  format: function(number, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  },

  printTimespan: function (data, total) {
    var all_results = [];
    for (var i = 0; i < data.length; i++) {

      var item = data[i];

      var sid = item.sid;
      // var date = moment(item.date).toISOString();
      var timespan = 0;
      var timespan_percent = 0;

      // indentation
      var stack_size = item.stack.length;
      if (item.direction === 'in') {
        stack_size = item.stack.length - 1;
      }
      // var indentation = '';
      // for (var i_ident = 0; i_ident < stack_size; i_ident++) {
      //   indentation += ' ';
      // }

      var filename = item.file.replace(/^.*[\\\/]/, '');

      if (i > 0) {
        timespan = item.date - data[i-1].date;
        timespan_percent = (timespan / total) * 100;
        timespan = timespan/1000;
      }

      // format numbers
      timespan = this.format(timespan, 3, 3, ',', '.');
      timespan_percent = this.format(timespan_percent, 2, 3, ',', '.');

      all_results.push([
        stack_size,
        // sid,
        filename + ':' + item.line,
        item.name,
        item.direction,
        timespan + ' sec',
        timespan_percent + '%'
      ]);
    }

    /**/console.log('\n>>---------\n all_results:\n', require('util').inspect(all_results, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/
    var t = table(all_results, { align: [ 'l', 'l', 'l', 'l', 'r', 'r' ] });
    console.log(t);
    //
    // /**/console.log('\n>>---------\n data:\n', require('util').inspect(data, { showHidden: false, depth: null, colors: true }), '\n>>---------\n');/*-debug-*/

  },

};
