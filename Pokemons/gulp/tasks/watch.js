"use strict";

var gulp	= require('gulp'),
	config	= require('../config'),
	finder	= require('../helpers/finder');

gulp.task('watch', ['watching', 'build'], function() {

	gulp.watch(finder(config.html.src), ['html']);
	gulp.watch(finder(config.css.src), ['css']);
	gulp.watch(finder(config.img.src), ['images']);

});

gulp.task('watching', function() {
	global.isWatching = true;
});