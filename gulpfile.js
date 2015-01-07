var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var transport = require("gulp-cmd-transport");
var uglify = require('gulp-uglify');
//var copyTo = require('gulp-copy');
var clean = require('gulp-clean');

var paths = [
    "src/*"
];

gulp.task('beakup', function(){
    var now = new Date();
    var date = [now.getFullYear(),"-",now.getMonth()+1,"-", now.getDay()," ", now.getHours(),":", now.getMinutes(),":", now.getSeconds()].join("");
    return gulp.src("dest/*")
    .pipe(gulp.dest("beakup/" + date));
});

gulp.task('clean', [], function(cb){
	return gulp.src('dest/*.js', {read: false})
    .pipe(clean());
});

gulp.task('jshint',['clean'], function() {
  return gulp.src(paths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('libs-uglify',[], function() {
  return gulp.src(paths)
    .pipe(transport())
    .pipe(concat("libs.js"))
    .pipe(gulp.dest("dest"));
    .pipe(uglify())
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest('dest'));
});

gulp.task("default", ["beakup","jshint","libs-uglify"]);