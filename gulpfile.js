var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    process = require('child_process');

gulp.task('default', ['lint']);

gulp.task('lint', ['test'], function() {
    return gulp.src(['**/*.js', '!node_modules/**/*'])
        .pipe(jshint({ node: true }))
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    return gulp.src('test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('watch', function() {
    gulp.watch(['test/*.js', 'src/*.js'], function() {
        process.spawn('gulp', ['test'], { stdio: 'inherit' });
    });
});