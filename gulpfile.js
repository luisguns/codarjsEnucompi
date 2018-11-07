const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const minify = require('gulp-minify-css');
const del = require('del');

gulp.task('clean-js', function () {
    return del(
        'js/min/*'
    );
});

gulp.task('clean-css', function () {
    return del(
        'css/min/*'
    );
});

gulp.task('js', ['clean-js'], function () {
    gulp.src('js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min/'));
});

gulp.task('css', ['clean-css'], function () {
    gulp.src('css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('css/min/'));
});

gulp.task('default', ['js', 'css'], function () {
});