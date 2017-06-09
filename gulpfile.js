'use strict';

var buildRollup = require('metal-tools-build-rollup');
var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var metal = require('gulp-metal');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');

 var options = {
	dest: 'build/globals',
	src: 'src/main.js',
	bundleCssFileName: 'usb.css',
	bundleFileName: 'usb.js',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'metal-usb',
	rollupConfig: {
		exports: 'named'
	}
};

metal.registerTasks(options);

// gulp.task('build:globals:js', function(done) {
// 	return buildRollup(options, function() {
// 		done();
// 	});
// });

gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			open: 'http://localhost:8000/demos/index.html'
		}));
});

gulp.task('default', function(done) {
	runSequence('clean', ['build:globals'], done);
});
