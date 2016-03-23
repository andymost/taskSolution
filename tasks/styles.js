'use strict';

const less = require('gulp-less');
const cssNano = require('gulp-cssnano');
const watch = require('gulp-watch');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

const streamLess = () => (
    gulp.src(['./src/styles/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 5%']
        }))
);

const prodLess = () => (
    streamLess()
        .pipe(cssNano())
        .pipe(gulp.dest('./dist/'))
);

const devLess = () => {
    streamLess()
        .pipe(gulp.dest('./dist/'));

    watch('./src/styles/*.less', () => {
        streamLess()
            .pipe(gulp.dest('./dist/'));
        console.log('Styles rebuild');
    });
};

module.exports = {prodLess, devLess};
