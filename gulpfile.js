// import packages
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var cssNano = require("gulp-cssnano");
var del = require("del");
var gIf = require("gulp-if");
var ghPages = require("gulp-gh-pages");
var htmlMinifier = require("gulp-html-minifier");
var useRef = require("gulp-useref");
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");

// init browser sync
gulp.task("_browserSync", function() {
  browserSync.init({
    port: 5500,
    logPrefix: "USAAPIWA",
    server: {
      baseDir: "./app"
    }
  });
});

// copy bower_components
gulp.task("_copy", function() {
  return gulp.src([
      "./app/bower_components/**/*.min.js",
      "./app/bower_components/**/*.min.js.map",
      "./app/bower_components/**/*.min.css"
    ])
    .pipe(gulp.dest("dist/bower_components"));
});

gulp.task("_copyHtml", function() {
  return gulp.src("./app/js/**/*.html")
    .pipe(gIf("*.html", htmlMinifier({
      collapseWhitespace: true, 
      removeComments: true,
      removeRedundantAttributes: true 
    })))
    .pipe(gulp.dest("dist/js"));
});

// clean build folder
gulp.task("clean", function() {
  return del.sync(["dist", ".publish"]);
});

// minify HTML, CSS and JS
gulp.task("minify", ["clean", "_copy", "_copyHtml"], function() {
  return gulp.src("./app/*.html")
    .pipe(useRef())
    .pipe(gIf("*.css", cssNano()))
    .pipe(gIf("*.js", ngAnnotate()))
    .pipe(gIf("*.js", uglify({
       preserveComments: 'license'
    })))
    .pipe(gIf("*.html", htmlMinifier({
      collapseWhitespace: true, 
      removeComments: true,
      removeRedundantAttributes: true 
    })))
    .pipe(gulp.dest("dist"));
});

// deploy to gh pages
gulp.task("deploy", ["minify"], function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages());
});

// serve production build
gulp.task("serve", ["minify"], function() {
   browserSync.init({
    port: 5501, 
    logPrefix: "USAAPIWA",
    server: {
      baseDir: "./dist"
    }
  });
});

// watch changes on HTML, CSS and JS
gulp.task("watch", ["_browserSync"], function() {
  gulp.watch("./app/*.html", browserSync.reload);
  gulp.watch("./app/js/**/*.html", browserSync.reload);
  gulp.watch("./app/js/**/*.js", browserSync.reload);
  gulp.watch("./app/styles/**/*.css", browserSync.reload);
});