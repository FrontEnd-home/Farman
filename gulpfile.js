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
        "src/lib/Class.js"
    ],
    seajs: [
        "src/mod/routes.js",
        "src/mod/parser.js",
        "src/mod/view.js",
        "src/mod/storage.js",
        "src/mod/model.js",
        "src/index.js",
        "src/config.js"
    ]
};
var output = {
    dir: "dest",
    libs:"farman.libs.js",
    seajs:"farman.sea-mods.js",
    main: "farman.js",
    mainmin: "farman.min.js"
};

gulp.task('beakup', function(){
    var now = new Date();
    var date = [now.getFullYear(),"-",now.getMonth()+1,"-", now.getDay()," ", now.getHours(),":", now.getMinutes(),":", now.getSeconds()].join("");
    return gulp.src("dest/*")
    .pipe(gulp.dest("beakup/" + date));
});

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

gulp.task('sea-contact',['sea-dev'], function() {
  var src = [
    [output.dir, output.libs].join("/"),
    [output.dir, output.seajs].join("/")
  ];
  return gulp.src(src)
    .pipe(concat(output.main))
    .pipe(gulp.dest(output.dir));
});

gulp.task('libs-uglify',['sea-contact'], function() {
  var src = [
    [output.dir, output.main].join("/"),
  ];
  return gulp.src(src)
    .pipe(uglify())
    .pipe(concat(output.mainmin))
    .pipe(gulp.dest(output.dir));
});

gulp.task("dev", ["sea-contact"]);
gulp.task("online", ["libs-uglify"]);
gulp.task("default", ["jshint","libs-uglify"]);