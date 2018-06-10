const del = require('del')
const gulp = require('gulp')
const minifyHtml = require('gulp-minify-html')
const uglify = require('gulp-uglify')
const uncss = require('gulp-uncss')
const csso = require('gulp-csso')

gulp.task('clean', () =>
  del(['dist/'])
)

gulp.task('html', ['clean'], () =>
  gulp
    .src('src/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'))
)

gulp.task('scripts', ['clean'], () =>
  gulp
    .src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
)

gulp.task('styles', ['clean'], () =>
  gulp
    .src('src/*.css')
    .pipe(uncss({
      html: ['dist/index.html']
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/'))
)

gulp.task('assets', ['clean'], () =>
  gulp
    .src('src/*.{ico,png,svg}')
    .pipe(gulp.dest('dist/'))
)

gulp.task('default', ['html', 'scripts', 'styles', 'assets'])
