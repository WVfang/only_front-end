"use strict";

var gulp 		= require('gulp'),
	webserver	= require('gulp-webserver'),
	config		= require('../config').server;

gulp.task('webserver', function() {
	gulp.src(config.app)
		.pipe(webserver({
			livereload: {
				enable: true
			},
			directoryListing: {
				enable: true,
				path: config.app
			},
			open: true
		}));
});