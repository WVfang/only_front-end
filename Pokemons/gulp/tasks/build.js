// "use strict";

// var gulp = require('gulp');

// console.log("Mode: " + process.env.NODE_ENV + "\n");

// gulp.task('bundle', ['html', 'css'], function() { // , 'scripts', 'images', 'copy'
// 	if(devBuild) global.doBeep = true;
// 	gulp.run('webserver');
// });

// gulp.task('build', ['clean', 'lint'], function() {
// 	gulp.run('bundle');
// });

"use strict";

var gulp 		= require('gulp');

console.log(process.env.NODE_ENV);

gulp.task('bundle', ['scripts', 'css', 'images', 'html', 'copy'], function() {
	if(devBuild) global.doBeep = true;
	gulp.start('webserver');
});

gulp.task('build', ['clean'], function() { //'lint', 'sprite'
  	gulp.start('bundle');
});
