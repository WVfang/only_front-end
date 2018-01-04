"use strict";

var gulp 		= require('gulp'),
	minify		= require('gulp-imagemin'),
	gulpif		= require('gulp-if'),
	changed		= require('gulp-changed'),
	finder		= require('../helpers/finder'),
	notifier	= require('../helpers/notifier'),
	config		= require('../config').img;

gulp.task('images', function(cb) {

	gulp.src(finder(config.src))
		.pipe(gulpif(devBuild, changed(config.dest)))
		.pipe(minify(config.imagemin))
		.pipe(gulp.dest(config.dest))
		.on('end', function(){
			notifier('Images');
			cb();
		})
})