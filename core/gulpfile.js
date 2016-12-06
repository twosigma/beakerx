/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var argv      = require('yargs').argv;
var gulp      = require('gulp');
var sass      = require('gulp-ruby-sass');
var cssWrap  = require('gulp-css-wrap');
var template  = require('gulp-template-compile');
var concat    = require('gulp-concat');
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
var pluginPath  = Path.join(__dirname, "/src/main/web/plugin/");
var rootPath  = Path.join(__dirname, "/src/main/web/app/");
var IPythonCssPath  = Path.join(__dirname, "/src/main/web/app/styles/ipython/style");
var root2Path  = Path.join(__dirname, "/src/main/web/outputdisplay/");
var buildPath = Path.join(__dirname, "/src/main/web/app/dist/");
var tempPath = Path.join(__dirname, "/src/main/web/app/genweb/");

var banner = ['/*',
              ' *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC',
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
var gulpSrc = function () {
  var paths = es.through();
  var files = es.through();

  paths.pipe(es.writeArray(function (err, srcs) {
    var ls = [];
    for (var i=0; i<srcs.length; i++) {
      ls.push(srcPath + srcs[i]);
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

gulp.task("namespaceIPythonCss", function() {
  return gulp.src(Path.join(IPythonCssPath, "**.css"))
      .pipe(replace('../components/bootstrap/fonts/', '../../app/fonts/'))
      .pipe(cssWrap({selector:'.ipy-output'}))
      .pipe(concat('ipython.min.css'))
      .pipe(gulp.dest(buildPath));
});

gulp.task("compileBeakerScss", function() {
  return sass([].concat(Path.join(rootPath, "app.scss"),
                        Path.join(rootPath, "vendor.scss")))
  .on('error', handleError)
  .pipe(importCss())
  .pipe(stripCssComments())
  .pipe(gulp.dest(tempPath));
});

gulp.task('prepareCssForNamespacing', function(){
  gulp.src(Path.join(buildPath, '*.css')).
    pipe(rename(function(path) {
      path.basename = "_" + path.basename;
      path.extname = ".scss";
    }))
    .pipe(replace('@charset "UTF-8";',''))
    .pipe(gulp.dest(Path.join(tempPath, "namespacedCss")))
    .on('error', handleError);
});
gulp.task("namespacePreparedCss", function() {
  return sass("beaker-sandbox.scss")
    .on('error', handleError)
    // Only set html/body styles if the body is the .beaker-sandbox
    .pipe(replace('.beaker-sandbox html {', 'html.beaker-sandbox {'))
    .pipe(replace('.beaker-sandbox body {', 'body.beaker-sandbox {'))
    .pipe(replace('.beaker-sandbox html body {', 'html body.beaker-sandbox {'))
    // Scope styles usually scoped to html/body to the sandbox
    .pipe(replace('.beaker-sandbox html', '.beaker-sandbox'))
    .pipe(replace('.beaker-sandbox body', '.beaker-sandbox'))
    // Modal stuff is outside of the main sandbox, so change it from scoping
    // inside beaker-sandbox to styling based on the classes we add (core.js)
    .pipe(replace('.beaker-sandbox .modal-backdrop',
                  '.beaker-sandbox.modal-backdrop'))
    .pipe(replace('.beaker-sandbox .modal-',
                  '.beaker-sandbox.modal .modal-'))
    .pipe(replace('.beaker-sandbox .modal',
                  '.beaker-sandbox.modal'))
    .pipe(replace('.beaker-sandbox.modal .modal-open',
                  'body.modal-open'))
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

function getFilePathArrayFromList(basePath, listPath) {
  return fs.readFileSync(basePath + listPath)
  .toString().split('\n')
  .filter(function(n) {
    return n !== undefined && n.trim() !== ''
  });
}

gulp.task('buildOutputDisplayTemplate', function () {
  var thePath = pluginPath + 'template/';

  if (argv.outdisp) {
    thePath = argv.outdisp + '/';
  }

  var cssarray = getFilePathArrayFromList(thePath, 'addoutputdisplays_css.list');
  var jsarray = getFilePathArrayFromList(thePath, 'addoutputdisplays_javascript.list');
  var vendorjsarray = getFilePathArrayFromList(thePath, 'addoutputdisplays_vendorjs.list');

  gulp.src(vendorjsarray.map(function(v) {
    return Path.join(srcPath, v);
  }))
  .pipe(concat('beakerOutputDisplayVendor.js'))
  .pipe(gulp.dest(buildPath));

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
    gulp.src(cssarray.map(function(v) {
      return Path.join(srcPath, v);
    }))
    .pipe(stripCssComments())
    .pipe(concat('beakerOutputDisplay.css'))
    .pipe(header(banner))
    .pipe(gulp.dest(buildPath));

    gulp.src(jsarray.map(function(v) {
      return Path.join(srcPath, v);
    }))
//    .pipe(stripJsComments())
    .pipe(concat('beakerOutputDisplay.js'))
    .pipe(header(banner))
    .pipe(gulp.dest(buildPath));

    cssfiles = '"app/dist/beakerOutputDisplay.css"';
    jsfiles = '"app/dist/beakerOutputDisplay.js"';
  }

  if (vendorjsarray.length) {
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
        if (argv.debug) {
          return block.pipe(block);
        }

        block.pipe(gulpSrc())
          .pipe(concat('beakerVendor.js'))
          .pipe(gulp.dest(buildPath));
        block.end('app/dist/beakerVendor.js');
      }),

      // build js with preprocessor
      beakerjs: htmlbuild.preprocess.js(function (block) {
        if (argv.debug) {
          block.pipe(block);
        } else {
          block.pipe(gulpSrc())
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
          block.pipe(gulpSrc())
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
  argv.debug = true;
  gulp.watch(["**/*.scss", "**/*.jst.html", rootPath + "template/index_template.html"], ["compile"]);
});

gulp.task("watchClient", function() {
  gulp.watch([srcPath+"outputdisplay/**/*.js"], ["buildOutputDisplayTemplate"]);
  gulp.watch([srcPath+"app/**/*.js", "!"+srcPath+"app/dist/**/*.js"], ["buildIndexTemplate"]);
  gulp.watch([rootPath+ "/**/*.jst.html",root2Path+ "/**/*.jst.html"], ["compileBeakerTemplates"]);
});

gulp.task('default', ['compile', 'watch']);

gulp.task("namespaceCss", function(cb) {
  runSequence("prepareCssForNamespacing",
              "namespacePreparedCss",
              cb);
});

gulp.task("compile", function(cb) {
  var seq = ["namespaceIPythonCss", "compileBeakerScss", "compileBeakerTemplates"];
  if (argv.embed) {
    seq.push("namespaceCss");
  }
  seq = seq.concat("buildIndexTemplate",
                   "buildOutputDisplayTemplate",
                   cb);
  runSequence.apply(this, seq);
});

