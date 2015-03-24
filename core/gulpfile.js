var argv      = require('yargs').argv;
var gulp      = require('gulp');
var sass      = require('gulp-sass');
var template  = require('gulp-template-compile');
var concat    = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyJS  = require('gulp-uglify');
var htmlmin   = require('gulp-htmlmin');
var htmlClass = require('html-classer-gulp');
var importCss = require('gulp-import-css');
var rename    = require('gulp-rename');
var replace   = require('gulp-replace');
var Path      = require('path');
var debug     = require('gulp-debug');
var gtemplate = require('gulp-template');
var runSequence = require('run-sequence');
var stripCssComments = require('gulp-strip-css-comments');
var stripJsComments = require('gulp-strip-comments');
var header = require('gulp-header');
var plugins = require('gulp-load-plugins');
var htmlbuild = require('gulp-htmlbuild');
var es = require('event-stream');
var fs = require('fs');

var srcPath  = Path.join(__dirname, "/src/main/web/");
var vendorPath  = Path.join(__dirname, "/src/");
var pluginPath  = Path.join(__dirname, "/src/main/web/plugin/");
var rootPath  = Path.join(__dirname, "/src/main/web/app/");
var root2Path  = Path.join(__dirname, "/src/main/web/outputdisplay/");
var buildPath = Path.join(__dirname, "/src/main/web/app/dist/");
var tempPath = Path.join(__dirname, "/src/main/web/app/temp/");

var banner = ['/*',
              ' *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC',
              ' *',
              ' *  Licensed under the Apache License, Version 2.0 (the "License");',
              ' *  you may not use this file except in compliance with the License.',
              ' *  You may obtain a copy of the License at',
              ' *',
              ' *         http://www.apache.org/licenses/LICENSE-2.0',
              ' *',
              ' *  Unless required by applicable law or agreed to in writing, software',
              ' *  distributed under the License is distributed on an "AS IS" BASIS,',
              ' *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
              ' *  See the License for the specific language governing permissions and',
              ' *  limitations under the License.',
              ' */',
              ''].join('\n');

if (argv.help) {
  console.log("");
  console.log("OPTIONS:");
  console.log("--debug            enable debugging version");
  console.log("--outdisp=path     directory containint the output display file list(s)");
  console.log("--embed=fname      compile embedded version with a list of languages");
  console.log("");
  return(20);
}

if (argv.debug && argv.embed) {
  console.log("");
  console.log("ERROR: you cannot use --debug and --embed at the same time");
  console.log("");
  return (20);
}

if (argv.embed) {
  var p;
  if( fs.existsSync(argv.embed)) {
    p = argv.embed;
  } else {
    p = srcPath + 'plugin/init/embeddedBeakerConfig.js';
  }
  if( ! fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }
  fs.createReadStream(p).pipe(fs.createWriteStream(buildPath+'beakerConfig.js'));
}

function handleError(e) {
  console.log('\u0007', e.message);
}

//pipe a glob stream into this and receive a gulp file stream
var gulpSrc = function (isvendor) {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {
    var ls = [];
    for (var i=0; i<srcs.length; i++) {
      ls.push((isvendor ? vendorPath : srcPath) + srcs[i]);
    }
    gulp.src(ls).pipe(files);
  }));

  return es.duplex(paths, files);
};


gulp.task("buildSingleOutDispCss", function() {
  return gulp.src(outdispcsslist)
  .pipe(stripCssComments())
  .pipe(concat('beakerOutDisp.css'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("buildSingleOutDispJs", function() {
  return gulp.src(outdispjslist)
  .pipe(concat('beakerOutDisp.js'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("compileBeakerScss", function() {
  return gulp.src(Path.join(rootPath, "**.scss"))
  .pipe(sass().on('error', handleError))
  .pipe(importCss())
  .pipe(stripCssComments())
  .pipe(gulp.dest(tempPath))
});

gulp.task('prepareCssForNamespacing', function(){
  gulp.src(Path.join(buildPath, '*.css')).
    pipe(rename(function(path) {
      path.basename = "_" + path.basename;
      path.extname = ".scss";
    }))
    .pipe(gulp.dest(Path.join(tempPath, "namespacedCss")))
    .on('error', handleError);
});
gulp.task("namespacePreparedCss", function() {
  return gulp.src("beaker-sandbox.scss")
    .pipe(sass()).on('error', handleError)
    .pipe(replace('.beaker-sandbox html', '.beaker-sandbox'))
    .pipe(replace('.beaker-sandbox body', '.beaker-sandbox'))
    .pipe(replace('.beaker-sandbox .modal-backdrop',
                  '.beaker-sandbox.modal-backdrop'))
    .pipe(gulp.dest(buildPath));
});

gulp.task("compileBeakerTemplates", function() {
  return gulp.src([rootPath+ "/**/*.jst.html",root2Path+ "/**/*.jst.html"])
  .pipe(htmlClass({klass: "bkr"}))
  .pipe(htmlmin({removeComments: true}))
  .pipe(template({
    name: function (file) {
      return file.relative.split(".")[0];
    }
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(tempPath));
});

gulp.task('buildOutputDisplayTemplate', function () {
  
  var thePath = pluginPath + 'template/';
  
  if (argv.outdisp) {
    thePath = argv.outdisp + '/';
  }

  var cssarray = fs.readFileSync(thePath + 'addoutputdisplays_css.list').toString().split("\n").filter(function(n){ return n !== undefined && n.trim() !== '' });
  var jsarray = fs.readFileSync(thePath + 'addoutputdisplays_javascript.list').toString().split("\n").filter(function(n){ return n !== undefined && n.trim() !== '' });
  var vendorcssarray = fs.readFileSync(thePath + 'addoutputdisplays_vendorcss.list').toString().split("\n").filter(function(n){ return n !== undefined && n.trim() !== '' });
  var vendorjsarray = fs.readFileSync(thePath + 'addoutputdisplays_vendorjs.list').toString().split("\n").filter(function(n){ return n !== undefined && n.trim() !== '' });

  var ca = [];
  if (vendorcssarray.length > 0) {
    for (var i=0; i<vendorcssarray.length; i++) {
      ca.push(Path.join(srcPath,vendorcssarray[i]));
    }
    gulp.src(ca)
      .pipe(concat('beakerOutputDisplayVendor.css'))
      .pipe(gulp.dest(buildPath));
  }

  ca = [];
  if (vendorjsarray.length > 0) {
    for (var i=0; i<vendorjsarray.length; i++) {
      ca.push(Path.join(srcPath,vendorjsarray[i]));
    }
    gulp.src(ca)
      .pipe(concat('beakerOutputDisplayVendor.js'))
      .pipe(gulp.dest(buildPath));
  }

  var cssfiles, jsfiles;

  if (argv.debug) {
    cssfiles = '';
    for (var i=0; i<cssarray.length; i++) {
      cssfiles = cssfiles + '"' + cssarray[i] + '", ';
    }

    jsfiles = '';
    for (var i=0; i<jsarray.length; i++) {
      jsfiles = jsfiles + '"' + jsarray[i] + '", ';
    }
  } else {
    ca = [];
    for (var i=0; i<cssarray.length; i++) {
      ca.push(Path.join(srcPath,cssarray[i]));
    }
    gulp.src(ca)
      .pipe(stripCssComments())
      .pipe(concat('beakerOutputDisplay.css'))
      .pipe(header(banner ))
      .pipe(gulp.dest(buildPath));

    ca = [];
    for (var i=0; i<jsarray.length; i++) {
      ca.push(Path.join(srcPath,jsarray[i]));
    }
    gulp.src(ca)
      .pipe(stripJsComments())
      .pipe(concat('beakerOutputDisplay.js'))
      .pipe(header(banner ))
      .pipe(gulp.dest(buildPath));

    cssfiles = '"app/dist/beakerOutputDisplay.css"';
    jsfiles = '"app/dist/beakerOutputDisplay.js"';
  }

  if (vendorcssarray.length > 0) {
    cssfiles = '"app/dist/beakerOutputDisplayVendor.css", ' + cssfiles;
  }

  if (vendorjsarray.length > 0) {
    jsfiles = '"app/dist/beakerOutputDisplayVendor.js", ' + jsfiles;
  }

  gulp.src(pluginPath + 'template/addoutputdisplays.js')
    .pipe(gtemplate({
      cssfiles : cssfiles,
      jsfiles  : jsfiles
    }))
    .pipe(gulp.dest(pluginPath + 'init/'));
});

function filterLines(line) {
  if (!argv.embed)
    return line;
}

function filterLinesBis(line) {
  if (argv.embed)
    return line;
}

function copyLine(line) {
  return line;
}


gulp.task('buildIndexTemplate', function () {
  gulp.src([rootPath + 'template/index_template.html'])
    .pipe(htmlbuild({
      // build js with preprocessor
      vendorjs: htmlbuild.preprocess.js(function (block) {
        block.pipe(gulpSrc(true))
          .pipe(concat('beakerVendor.js'))
          .pipe(gulp.dest(buildPath));
        block.end('app/dist/beakerVendor.js');
      }),

      // build js with preprocessor
      beakerjs: htmlbuild.preprocess.js(function (block) {
        if (argv.debug) {
          block.pipe(block);
        } else {
          block.pipe(gulpSrc(false))
            .pipe(stripJsComments())
            .pipe(concat('beakerApp.js'))
            .pipe(header(banner ))
            .pipe(gulp.dest(buildPath));
          block.end('app/dist/beakerApp.js');
        }
      }),

      // build css with preprocessor
      css: htmlbuild.preprocess.css(function (block) {
        if (argv.debug) {
          block.pipe(block);
        } else if (argv.embed) {
          block.end('app/dist/beaker-sandbox.css');
        } else {
          block.pipe(gulpSrc(false))
            .pipe(stripCssComments())
            .pipe(concat('beakerApp.css'))
            .pipe(header(banner ))
            .pipe(gulp.dest(buildPath));
          block.end('app/dist/beakerApp.css');
        }
      }),
      
      embedremove:  function (block) {
        var filterSrc = es.mapSync(filterLines),
            copySrc = es.mapSync(copyLine);
        block.pipe(filterSrc);
        copySrc.pipe(block);
        b = es.duplex(copySrc, filterSrc);
        b.pipe(b);
      },
      
      embedinclude:  function (block) {
        var filterSrc = es.mapSync(filterLinesBis),
            copySrc = es.mapSync(copyLine);
        block.pipe(filterSrc);
        copySrc.pipe(block);
        b = es.duplex(copySrc, filterSrc);
        b.pipe(b);
      }
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task("watch", function() {
  gulp.watch(["**/*.scss", "**/*.jst.html"], ["compile"]);
});

gulp.task("namespaceCss", function(cb) {
  runSequence("prepareCssForNamespacing",
              "namespacePreparedCss",
              cb);
});

gulp.task("compile", function(cb) {
  var seq = ["compileBeakerScss", "compileBeakerTemplates"];
  if (argv.embed) {
    seq.push("namespaceCss");
  }
  seq = seq.concat("buildIndexTemplate",
                   "buildOutputDisplayTemplate",
                   cb);
  runSequence.apply(this, seq);
});

