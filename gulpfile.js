var gulp  = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel  = require('gulp-babel');

gulp.task('default', ['jshint', 'build-js', 'watch']);

gulp.task('jshint', ()=> {
	gulp.src('./public/assets/js/app.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', ()=> {
	gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/vue/dist/vue.min.js',
		'./node_modules/vue-resource/dist/vue-resource.min.js',
		'./public/assets/js/app.js'
	])
//	.pipe(sourcemaps.init())
	.pipe(concat('app.min.js'))
    .pipe(babel({presets: ['es2015-script'], compact: false}))
	.pipe(uglify()) 
//	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public/assets/js'));
});

gulp.task('watch', ()=> {
	gulp.watch('./public/assets/js/app.js', ['jshint', 'build-js']);
});