"use strict";

var gulp = require('gulp');

console.log("Mode: " + process.env.NODE_ENV + "\n");

gulp.task('bundle', ['html', 'css', 'scripts', 'images', 'copy'], function() {
	if(devBuild) global.doBeep = true;
	gulp.run('webserver');
});

gulp.task('build', ['clean', 'lint'], function() {
	gulp.run('bundle');
});