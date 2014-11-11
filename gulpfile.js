var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    filter = require('gulp-filter'),
    mocha = require('gulp-mocha');

gulp.task('default', ['lint', 'test']);

gulp.task('test', function() {
    gulp.src('test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', function() {
    gulp.src('**/*.js')
        .pipe(filter([ '*', '!node_modules/**/*']))
        .pipe(jshint({ node: true }))
        .pipe(jshint.reporter('default'));
});