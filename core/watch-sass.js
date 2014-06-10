var fs        = require('fs');
var sass      = require('node-sass');
var Path      = require('path');
var rootPath  = Path.join(__dirname, "/src/main/web/app/");
var chokidar  = require('chokidar');
var watcher   = chokidar.watch(rootPath, {ignored: /[\/\\]\./, persistent: true});
var compiler  = require("./compile-css");

watcher.on('change', function(p, stats) {
  if (Path.extname(p) === ".scss") {
    console.log("Compiling "+p);
    compiler();
  }
});
