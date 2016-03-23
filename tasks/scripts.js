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

const buildHbs = () => (
    gulp.src('./src/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('hbs.default.template(<%= contents %>)'))
        .pipe(declare({
            root: 'exports',
            noRedeclare: true,
        }))
        .pipe(concat('templates.js'))
        .pipe(wrap('import hbs from \'handlebars/runtime\'\n <%= contents %>'))
        .pipe(gulp.dest('tmp/'))
);

const streamJs = () => (
    browserify('./src/scripts/index.js', { debug: true })
        .transform(babel, {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
);

const prodJs = () => {
    buildHbs();
    streamJs()
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
};

const devJs = () => {
    buildHbs();
    streamJs()
    .pipe(gulp.dest('./dist/'))

    watch(['./src/scripts/*.js', './src/templates/*.hbs'],() => {
        buildHbs()
        streamJs()
            .pipe(gulp.dest('./dist/'))
        console.log('Script rebuild');
    });
};

module.exports = {devJs, prodJs};
