#!/usr/local/bin/node
var glob = require("glob");
var child_process = require('child_process');

var dir_path = process.argv[2];
var username = process.argv[3];

glob(`${dir_path}/**/*.js`, function (er, paths) {
  paths.forEach(function(path) {
    var result = child_process.spawnSync('git', ['blame', path]);

    var out_str = result.output.toString();
    var i = out_str.search(/[0-9]{4}-[0-9]{2}-[0-9]{2} /);
    var name_part = out_str.slice(0,i);

    if(new RegExp(username, 'i').exec(name_part))
      console.log(path);
  });
});
