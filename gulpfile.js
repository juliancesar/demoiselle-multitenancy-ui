var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var paths = {
};

gulp.task('default', ['update-imports']);

gulp.task('watch', function () {
	gulp.watch(['update-imports']);
});

// More info: https://www.npmjs.com/package/gulp-inject
// More info: http://jasonbrown.io/using-wiredep-and-gulp-to-manage-your-ionic-app-dependencies/
gulp.task('update-imports', [], function () {
	var target = gulp.src('./source/index.html');
	
	// IMPORT libs
	target
		.pipe(wiredep())
		.pipe(gulp.dest('./source')
		);

	// Import others files
	// It's not necessary to read the files (will speed up things), we're only after their paths: 
	var sources = gulp.src(['./source/app/**/*.js', './source/css/**/*.css'], { read: false });
	return target
		.pipe(inject(sources, { relative: true }))
		.pipe(gulp.dest('./source'));
});
