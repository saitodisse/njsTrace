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

  printaTable: function (data, configTable) {
    var headerTableArray = [];
    var alignTableArray = [];

    for (var i = 0; i < configTable.length; i++) {
      headerTableArray.push(configTable[i][1]);
      alignTableArray.push(configTable[i][0]);
    }

    data.unshift(headerTableArray);
    var t = table(data, { align: alignTableArray });

    console.log(t);
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
      var timespan_color_func;

      // indentation
      var stack_size = item.stack.length;
      if (item.direction === 'in') {
        stack_size = item.stack.length - 1;
      }

      colorFunc = this.getChalkFuncByHash(sid);

      var filename = item.file;//.replace(/^.*[\\\/]/, '');

      if (i > 0) {
        timespan = item.date - data[i - 1].date;
        timespan_percent = (timespan / total) * 100;
      }

      // format numbers
      timespan_percent = this.format(timespan_percent, 2, 3, ',', '.');

      timespan_color_func = chalk.gray;
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

    this.printaTable(all_results, [
      ['c', 'stack'],
      ['c', colorFunc('sid')],
      ['l', colorFunc('filename')],
      ['l', colorFunc('name')],
      ['c', 'direction'],
      [':', chalk.gray('date')],
      ['r', chalk.gray('ts')],
      ['.', chalk.gray('%.%')],
    ]);

    return all_results;
  },

  printIdTime: function (data, total) {
    var all_results = [];
    var colorFunc = null;

    var grouped = this.byId(data);

    var newData = R.values(R.mapObj(function (item) {
      var item_obj = {
        name: item[0].name,
        file: item[0].file,
        line: item[0].line,
        args: item[0].args,
        stack: item[0].stack,
        sid: item[0].sid,
        date: item[0].date,
        ts: item[1].date - item[0].date
      };

      return item_obj;

    }, grouped));

    data = newData;

    for (var i = 0; i < data.length; i++) {

      var item = data[i];

      var sid = item.sid;
      // var date = moment(item.date).toISOString();
      var timespan = 0;
      var timespan_percent = 0;
      var timespan_color_func;

      colorFunc = this.getChalkFuncByHash(item.file + item.line);

      var filename = item.file.replace(/^.*[\\\/]/, '');

      if (i > 0) {
        timespan = item.date - data[i - 1].date;
        timespan_percent = (timespan / total) * 100;
      }

      // format numbers
      timespan_percent = this.format(timespan_percent, 2, 3, ',', '.');

      timespan_color_func = chalk.gray;
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
        '  ' + item.stack.length - 1,
        colorFunc(sid.substring(0, 3)),
        colorFunc(filename + ':' + item.line),
        colorFunc(item.name),
        timespan_color_func(moment(item.date).format('ss:SSS')),
        timespan_color_func(timespan),
        timespan_color_func(timespan_percent + '%'),
      ]);
    }

    return all_results;
  },

};
