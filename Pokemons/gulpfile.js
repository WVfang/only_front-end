"use strict";

// var requireDir = require('require-dir');

global.devBuild = process.env.NODE_ENV === 'development';
console.log("Mode: " + process.env.NODE_ENV + "\n");

// requireDir('./gulp/tasks', {recurse: true});

var gulp		= require('gulp'),
	plugins		= require('gulp-load-plugins')(),
	gulpsync	= require('gulp-sync')(gulp);

var notifier 	= require('./gulp/helpers/notifier'),
	finder		= require('./gulp/helpers/finder'),
	del 		= require('del'),
	map			= require('map-stream'),
	config		= require('./gulp/config');


var	browserify 	= require('browserify'),
	watchify	= require('watchify'),
	source		= require('vinyl-source-stream'),
	buffer		= require('vinyl-buffer');



gulp.task('html', getTask('html', { "notifier": notifier, "config": config.html }));
gulp.task('css', getTask('css', { "notifier": notifier, "config": config.css }));
gulp.task('scripts', getTask('scripts', { "notifier": notifier,
										  "config": config.scripts,
										  "browserify": browserify,
										  "watchify": watchify,
										  "source": source,
										  "buffer": buffer 
										}));
gulp.task('images', getTask('images', { "notifier": notifier, "config": config.img, "finder": finder }));

gulp.task('clean', getTask('clean', { "config": config.clean, "del": del }));
gulp.task('lint', getTask('lint', { "config": config.clean,
									"finder": finder,
									"notifier": notifier,
									"map": map }));
gulp.task('copy', getTask('copy', { "config": config.copy }));
gulp.task('webserver', getTask('webserver', { "config": config.server }));
gulp.task('watching', function() {
	global.isWatching = true;
});


 
// gulp.task('watch', ['watching', 'build'], getTask('watch', { "config": config, "finder": finder }));
gulp.task('watch', ['watching', 'build'], function() {

	gulp.watch(finder(config.html.src), ['html']);
	gulp.watch(finder(config.css.src), ['css']);
	gulp.watch(finder(config.img.src), ['images']);

});

gulp.task('build', gulpsync.sync(['clean', 'lint', 'bundle']));

gulp.task('bundle', gulpsync.sync(['html', 'css', 'scripts', 'images', 'copy', 'webserver']), function() {
	if(devBuild) global.doBeep = true;
});





gulp.task('default', ['watch']);



function getTask(task, other) {
	return require('./gulp/tasks/' + task)(gulp, plugins, other);
}