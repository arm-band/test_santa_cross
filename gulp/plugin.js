module.exports = {
    gulp:  require('gulp'),
    plumber: require('gulp-plumber'),
    notify: require('gulp-notify'),
    concat: require('gulp-concat'),
    sass:  require('gulp-sass'),
    autoprefixer: require('gulp-autoprefixer'),
    rename: require('gulp-rename'),
    ejs: require('gulp-ejs'),
    data: require('gulp-data'),
    browserSync: require('browser-sync').create()
};
