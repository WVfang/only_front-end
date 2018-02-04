"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

			var failReporter = other.map(function(file, cb) {
				if (!file.plugins.jshint.success) other.notifier(file.relative, true, 'Ooooooops!');
				cb(null, file);
			});

			return (
				gulp.src(other.finder(other.config.dir, 'js'))
					.pipe(plugins.jshint(other.config.options))
					.pipe(plugins.jshint.reporter())
					.pipe(failReporter)
			);

	};

};