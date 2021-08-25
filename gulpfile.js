const {series, parallel, dest, src} = require('gulp'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglifyjs = require('uglify-js'),
    composer = require('gulp-uglify/composer'),
    uglify = composer(uglifyjs, console),
    scss = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    gzip = require('gulp-gzip'),
    del = require('del');

function baseLibCss() {
    return src('node_modules/normalize.css/normalize.css')
        .pipe(concatCss('lib.css'))
        .pipe(cleanCSS())
        .pipe(dest('docs/tmp/base/css'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/base/css'));
}

function baseMainCss() {
    return src('docs/css/basis/base-style.scss')
        .pipe(scss())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(cleanCSS())
        .pipe(dest('docs/tmp/base/css'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/base/css'));
}

function homeLibJs() {
    return src('node_modules/swiper/swiper-bundle.min.js')
        .pipe(concat('lib.js'))
        .pipe(dest('docs/tmp/home/js'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/home/js'));
}

function homeLibCss() {
    return src('node_modules/swiper/swiper-bundle.min.css')
        .pipe(concat('lib.css'))
        .pipe(dest('docs/tmp/home/css'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/home/css'));
}

function homeMainJs() {
    return src('docs/js/pages/home.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('docs/tmp/home/js'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/home/js'));
}

function homeMainCss() {
    return src('docs/css/pages/home.scss')
        .pipe(scss())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(cleanCSS())
        .pipe(dest('docs/tmp/home/css'))
        .pipe(gzip())
        .pipe(dest('docs/tmp/home/css'));
}

function cleanTmpFolder() {
    return del('docs/tmp')
}



exports.baseFileProcess = parallel(baseMainCss, baseLibCss);
exports.homeFileProcess = parallel(homeMainJs, homeMainCss, homeLibJs, homeLibCss);

exports.default = series(cleanTmpFolder,
    parallel(exports.baseFileProcess, exports.homeFileProcess));

exports.cleanTmpFolder = cleanTmpFolder;