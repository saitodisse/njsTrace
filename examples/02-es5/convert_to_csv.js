// var moment = require('moment');
var fs = require('fs');
var json2csv = require('json2csv');
var fields = [
  'id',
  'sid',
  'stack',
  'file',
  'line',
  'name',
];

var content = fs.readFileSync('/home/julio/_git/njstrace/examples/02-es5/execute/TRACE_RESULT.json');
var data = JSON.parse(content);

var data_formated = [];
for (var i = 0; i < data.length; i++) {
  data_formated.push(
    {
      id:    i,
      sid:   data[i].sid,
      stack: data[i].stack.length,
      file:  data[i].file,
      line:  data[i].line,
      name:  data[i].name,
    }
  );
}

json2csv({ data: data_formated, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  fs.writeFileSync('/home/julio/_git/njstrace/examples/02-es5/execute/TRACE_RESULT.csv', csv);
});
