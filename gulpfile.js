'use strict';

const watch = require('gulp-watch');
const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babel = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');

const lessTasks = require('./tasks/styles');
const scriptsTasks = require('./tasks/scripts');

gulp.task('build-style-dev', lessTasks.devLess);

gulp.task('build-style-prod',lessTasks.prodLess);

gulp.task('build-js-dev', scriptsTasks.devJs);

gulp.task('build-js-prod', scriptsTasks.prodJs);

gulp.task('dev', ['build-js-dev', 'build-style-dev']);

gulp.task('prod', ['build-js-prod', 'build-style-prod']);

gulp.task('default', ['dev']);
