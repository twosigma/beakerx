var fs        = require('fs');
var sass      = require('node-sass');
var Path      = require('path');

var rootPath  = Path.join(__dirname, "/src/main/web/app/");

var css = sass.renderSync({
  data: fs.readFileSync(Path.join(rootPath, "app.scss"), "utf8"),
  includePaths: [rootPath]
});

fs.writeFileSync(path.join(rootPath, "app.css"), css);
