"use strict";

var gulp		= require('gulp'),
	less		= require('gulp-less'),
	prefix		= require('gulp-autoprefixer'),
	minify		= require('gulp-minify-css'),
	rename		= require('gulp-rename'),
	plumber		= require('gulp-plumber'),
	gulpif		= require('gulp-if'),
	notifier	= require('../helpers/notifier'),
	config		= require('../config').css;

gulp.task('css', function(cb) {
	
	var queue = config.bundles.length;

	var buildCSS = function(bundle) {
		var build = function() {
			return (
				gulp.src(bundle.src)
					.pipe(plumber())
					.pipe(less())
					.pipe(prefix(config.autoprefixer))
					.pipe(gulpif(bundle.compress, minify()))
					.pipe(gulpif(bundle.compress, rename({suffix: '.min'})))
					.pipe(gulp.dest(bundle.dest))
					.on('end', handleQueue)
			)
		}

		var handleQueue = function() {
			notifier(bundle.destFile);
			if(queue) {
				queue--;
				if(queue === 0) cb();
			}
		};

		return build();
	}
	
	config.bundles.forEach(buildCSS);

});