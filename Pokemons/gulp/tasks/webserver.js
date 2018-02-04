"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		return gulp.src(other.config.app)
			.pipe(plugins.webserver({
				livereload: {
					enable: true
				},
				directoryListing: {
					enable: true,
					path: other.config.app
				},
				open: true
			}));

	};
	
};