var fs        = require('fs');
var sass      = require('node-sass');
var path      = require('path');

var rootPath  = path.join(__dirname, "/src/main/web/app/");

var css = sass.renderSync({
  data: fs.readFileSync(path.join(rootPath, "app.scss"), "utf8")
});

fs.writeFileSync(path.join(rootPath, "app.css"), css);
