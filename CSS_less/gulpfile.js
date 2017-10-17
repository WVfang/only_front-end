// grab our gulp packages
var gulp  = require('gulp'),
	gutil = require('gulp-util');

// create a default task and just log a message
gulp.task('default', ["watch"]);

// configure the jshint task
gulp.task('jshint', function() {
	return gulp.src('source/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use of file changes
gulp.task('watch', function() {
	gulp.watch('source.javascript/**/*.js', ['jshint']);
});