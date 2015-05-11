var R = require('ramda');
var moment = require('moment');
var table = require('text-table');
var chalk = require('chalk');

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

  getChalkFuncByHash: function(id) {
    var stringHash = require('string-hash');
    var hash_number_id = stringHash(id);
    return this.getNextChalkFunc(hash_number_id);
  },

  getNextChalkFunc: function(index) {
    var all_colors = [
      chalk.red,
      chalk.green,
      chalk.yellow,
      chalk.blue,
      chalk.magenta,
      chalk.cyan,
      // chalk.white,
      // chalk.gray,
    ];

    return all_colors[index % all_colors.length];
  },

  printTimespan: function (data, total) {
    var all_results = [];
    var colorFunc = null;


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

      colorFunc = this.getChalkFuncByHash(sid);

      // var indentation = '';
      // for (var i_ident = 0; i_ident < stack_size; i_ident++) {
      //   indentation += ' ';
      // }

      var filename = item.file.replace(/^.*[\\\/]/, '');

      if (i > 0) {
        timespan = item.date - data[i - 1].date;
        timespan_percent = (timespan / total) * 100;
      }

      // format numbers
      timespan_percent = this.format(timespan_percent, 2, 3, ',', '.');

      var timespan_color_func = chalk.gray;
      if (        timespan_percent < 1 ) {
        timespan_color_func = chalk.gray;
      } else if ( timespan_percent >= 1 && timespan_percent < 2 ) {
        timespan_color_func = chalk.white;
      } else if ( timespan_percent >= 2 && timespan_percent < 3 ) {
        timespan_color_func = chalk.yellow;
      } else if ( timespan_percent >= 3 ) {
        timespan_color_func = chalk.red;
      }

      all_results.push([
        '  ' + stack_size,
        colorFunc(sid.substring(0, 3)),
        colorFunc(filename + ':' + item.line),
        colorFunc(item.name),
        item.direction,
        timespan_color_func(moment(item.date).format('ss:SSS')),
        timespan_color_func(timespan),
        timespan_color_func(timespan_percent + '%'),
      ]);
    }

    all_results.unshift([
      'stack',
      colorFunc('sid'),
      colorFunc('filename'),
      colorFunc('name'),
      'direction',
      timespan_color_func('date'),
      timespan_color_func('ts'),
      timespan_color_func(''),
    ]);

    var t = table(all_results, { align: [
          'c',
          'c',
          'l',
          'l',
          'c',
          ':',
          '.',
          '.',
        ]
      }
    );

    console.log(t);

  },

  printIdTime: function (data) {

    var grouped = this.byId(data);
    var this_getChalkFunc = this.getChalkFuncByHash;
    R.mapObj(function (item) {

      var item_obj = {
        name: item[0].name,
        file: item[0].file,
        line: item[0].line,
        args: item[0].args,
        stack: item[0].stack,
        sid: item[0].sid,
        direction: item[0].direction,
        date: item[0].date,
        ts: item[1].date - item[0].date
      };

      var colorFunc = this_getChalkFunc(item_obj.sid);
      console.log(colorFunc(item_obj.sid), item_obj.date);
    }, grouped);

  },
};
