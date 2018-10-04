'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');
const watch = require('gulp-watch');
const browserify = require('browserify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');
const clean = require('gulp-rimraf');
const flatten = require('gulp-flatten');
const htmlBeautify = require('gulp-html-beautify');

gulp.task('clean', [], () => {
  gulp
    .src('build/*', {read: false})
    .pipe(clean());
});

gulp.task('html', () => {
  gulp
    .src('src/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(flatten())
    .pipe(htmlBeautify({indentSize: 2}))
    .pipe(gulp.dest('build/'));
});

gulp.task('css', () => {
  return gulp
    .src('src/less/app.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(concatCss('js2angular.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('images', () => {
  gulp
    .src('src/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('js', () => {
  browserify(['./src/js/index.js'])
    .transform(babelify)
    .bundle()
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('watch:css', () => {
  gulp.watch(['src/**/*.less'], ['css']);
});

gulp.task('watch:html', function () {
  gulp.watch(['src/**/*.pug'], ['html']);
});

gulp.task('watch:js', () => {
  gulp.watch(['src/js/**/*.js'], ['js']);
});

gulp.task('default', ['html', 'css', 'images', 'js', 'watch:css', 'watch:js', 'watch:html']);
