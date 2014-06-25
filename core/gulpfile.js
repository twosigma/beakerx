var gulp      = require('gulp');
var sass      = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var Path      = require('path');
var rootPath  = Path.join(__dirname, "/src/main/web/app/");

function handleError(e) {
  console.log('\u0007', e.message);
}

gulp.task("compile", function() {
  gulp.src(Path.join(rootPath, "app.scss"))
  .pipe(sass().on('error', handleError))
  .pipe(minifyCSS())
  .pipe(gulp.dest(rootPath))
});

gulp.task("watch", function() {
  var watchPath = rootPath + "/**/*.scss";
  gulp.watch(watchPath, ["compile"])
});
