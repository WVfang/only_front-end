"use strict";

// Solving require.extensions.hasOwnproperty is not a function
// https://github.com/aseemk/requireDir/pull/46/files

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		var queue = other.config.bundles.length;

		var buildJS = function(bundle) {
			
			var pack = other.browserify({
				cache: {},
				packageCache: {},
				fullPath: devBuild,
				entries: bundle.src,
				standalone: bundle.global,
				extensions: other.config.extensions,
				debug: devBuild
			});

			var build = function() {
				return (
					pack.bundle()
						.pipe(other.source(bundle.destFile))
						// .pipe(plugins.derequire())
						// .pipe(plugins.if(bundle.compress, other.buffer()))
						//.pipe(plugins.if(bundle.compress && devBuild, plugins.sourcemaps.init({loadMaps: true})))
						//.pipe(plugins.if(bundle.compress, plugins.uglify()))
						.pipe(plugins.if(bundle.compress, plugins.rename({suffix: '.min'})))
						//.pipe(plugins.if(bundle.compress && devBuild, plugins.sourcemaps.write('./')))
						.pipe(gulp.dest(bundle.dest))
						.on('end', handleQueue)
				);
			};

			if(isWatching) {
				pack = other.watchify(pack);
				pack.on('update', build);
			}

			var handleQueue = function() {
				other.notifier(bundle.destFile);
				if(queue) {
					queue--;
					if (queue === 0) cb();
				}
			};

			return build();

		}

		other.config.bundles.forEach(buildJS);

	};
	
};
