var del = require('del')
var gulp = require('gulp')
var concat = require('gulp-concat')
var minifyHtml = require('gulp-minify-html')
var uglify = require('gulp-uglify')
var uncss = require('gulp-uncss')
var csso = require('gulp-csso')

gulp.task('clean', function (callback) {
  return del(['dist/'])
})

gulp.task('html', ['clean'], function () {
  return gulp.src('src/index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'))
})

gulp.task('scripts', ['clean'], function () {
  return gulp.src([
      'src/scripts/jquery.min.js',
      'src/scripts/jquery.throttle-debounce.min.js',
      'src/scripts/jquery.nav.min.js',
      'src/scripts/owl-carousel.min.js',
      'src/scripts/nivo-lightbox.min.js',
      'src/scripts/bootstrap.min.js',
      'src/scripts/wow.min.js',
      'src/scripts/matchMedia.min.js',
      'src/scripts/app.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('styles', ['clean'], function () {
  return gulp.src([
      'src/styles/elegant-icons.css',
      'src/styles/bootstrap.min.css',
      'src/styles/owl-carousel.css',
      'src/styles/owl-theme.css',
      'src/styles/nivo-lightbox.css',
      'src/styles/nivo-theme.css',
      'src/styles/animate.min.css',
      'src/styles/styles.css',
      'src/styles/responsive.css',
      'src/styles/colors/amber-blue.css'
    ])
    .pipe(concat('main.css'))
    .pipe(uncss({
      html: ['dist/index.html'],
      ignore: [/\.nivo-lightbox-.*/, /\.owl-.*/]
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/css/'))
})

gulp.task('assets', ['clean'], function () {
  return gulp.src([
      'src/apple-touch-icon.png',
      'src/favicon.ico',
      'src/fonts/**/*',
      'src/images/**/*'
    ], { base: 'src/' })
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['html', 'scripts', 'styles', 'assets'])
