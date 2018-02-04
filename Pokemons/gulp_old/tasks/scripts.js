"use strict";

var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	watchify	= require('watchify'),
	uglify 		= require('gulp-uglify'),
	gulpif 		= require('gulp-if'),
	derequire	= require('gulp-derequire'),
	sourcemaps 	= require('gulp-sourcemaps'),
	rename		= require('gulp-rename'),
	source		= require('vinyl-source-stream'),
	buffer		= require('vinyl-buffer'),
	notifier 	= require('../helpers/notifier'),
	config		= require('../config').scripts;

gulp.task('scripts', function(cb) {

	var queue = config.bundles.length;

	var buildJS = function(bundle) {
		
		var pack = browserify({
			cache: {},
			packageCache: {},
			fullPath: devBuild,
			entries: bundle.src,
			standalone: bundle.global,
			extensions: config.extensions,
			debug: devBuild
		});

		var build = function() {
			return (
				pack.bundle()
					.pipe(source(bundle.destFile))
					.pipe(derequire())
					.pipe(gulpif(bundle.compress, buffer()))
					.pipe(gulpif(bundle.compress && devBuild, sourcemaps.init({loadMaps: true})))
					.pipe(gulpif(bundle.compress, uglify()))
					.pipe(gulpif(bundle.compress, rename({suffix: '.min'})))
					.pipe(gulpif(bundle.compress && devBuild, sourcemaps.write('./')))
					.pipe(gulp.dest(bundle.dest))
					.on('end', handleQueue)
			);
		};

		if(isWatching) {
			console.log("watching");
			pack = watchify(pack);
			pack.on('update', build);
		}

		var handleQueue = function() {
			notifier(bundle.destFile);
			if(queue) {
				queue--;
				if (queue === 0) cb();
			}
		};

		return build();

	}

	config.bundles.forEach(buildJS);

});