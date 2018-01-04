"use strict";

var gulp		= require('gulp'),
	gulpif		= require('gulp-if'),
	changed		= require('gulp-changed'),
	filter		= require('gulp-filter'),
	notifier	= require('../helpers/notifier'),
	config		= require('../config').html;
	
gulp.task('html', function(cb){
	
	gulp.src(config.src + "*.html")
		.pipe(gulpif(devBuild, changed(config.dest)))
		.pipe(filter(function(file) {
			return !/\/_/.test(file.path) || !/^_/.test(file.relative);
		}))
		.pipe(gulp.dest(config.dest))
		.on('end', function() {
			notifier('html');
			cb();
		})
});