var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var transport = require("gulp-cmd-transport");
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

var paths = {
    libs: [
        "src/libs/zepto.js",
        "src/libs/sea-debug.js",
        "src/libs/class.js"
    ],
    seajs: [
        "src/mod/*",
        "src/app.js"
    ],
    page:[
        "mods/routes.js",
        "mods/common/*",
        "mods/page/*"
    ]
};
var output = {
    dir: "dest",
    libs:"farman.libs.js",
    seajs:"farman.sea-mods.js",
    pagejs:"farman.page.js",
    main: "farman.js",
    mainmin: "farman.min.js"
};

gulp.task('clean', [], function(cb){
	return gulp.src(output.dir, {read: false})
    .pipe(clean());
});

gulp.task('jshint',['clean'], function() {
  return gulp.src(paths.seajs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('libs-dev',['clean'], function() {
  return gulp.src(paths.libs)
    .pipe(concat(output.libs))
    .pipe(gulp.dest(output.dir));
});

gulp.task('sea-dev',['libs-dev'], function() {
  return gulp.src(paths.seajs)
    .pipe(transport())
    .pipe(concat(output.seajs))
    .pipe(gulp.dest(output.dir));
});

gulp.task('page-dev', function() {
  return gulp.src(paths.page)
    .pipe(transport())
    .pipe(concat(output.pagejs))
    .pipe(gulp.dest(output.dir));
});

gulp.task('dev',['sea-dev', 'page-dev'], function() {
  var src = [
    [output.dir, output.libs].join("/"),
    [output.dir, output.seajs].join("/")
  ];
  return gulp.src(src)
    .pipe(concat(output.main))
    .pipe(gulp.dest(output.dir));
});

gulp.task('online',['dev'], function() {
  var src = [
    [output.dir, output.main].join("/"),
  ];
  return gulp.src(src)
    .pipe(uglify())
    .pipe(concat(output.mainmin))
    .pipe(gulp.dest(output.dir));
});

gulp.task("default", ["jshint","online"]);