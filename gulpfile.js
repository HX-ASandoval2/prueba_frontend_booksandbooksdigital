const { server } = require('browser-sync/dist/default-config');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browsersync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/styles/'))
        .pipe(browsersync.stream())
})

gulp.task('pug', () => {
    return gulp.src('dev/pug/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest('public/'))
})

gulp.task('default', () => {
    gulp.watch('dev/**/*.pug', gulp.series('pug'))
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('public/**/*.html').on('change', browsersync.reload)
    browsersync.init({
        server: {
            baseDir:'./public/'
        }
    })
})