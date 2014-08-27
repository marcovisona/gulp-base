var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css')
var coffee = require('gulp-coffee');
var exec = require('child_process').exec;
var sys = require('sys');

var srcDir = 'app';
var targetDir = 'build';

// Where do you store your Sass files?
var sassDir = srcDir + '/assets/sass';

// Which directory should Sass compile to?
var targetCSSDir = targetDir + '/css';

// Where do you store your CoffeeScript files?
var coffeeDir = srcDir + '/assets/coffee';

// Which directory should CoffeeScript compile to?
var targetJSDir = targetDir + '/js';


// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
    return gulp.src(sassDir + '/main.scss')
        .pipe(sass({ style: 'compressed' }).on('error', gutil.log))
        .pipe(autoprefix('last 10 version'))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS minified'))
});

// Handle CoffeeScript compilation
gulp.task('js', function () {
    return gulp.src(coffeeDir + '/**/*.coffee')
        .pipe(coffee().on('error', gutil.log))
        .pipe(gulp.dest(targetJSDir))
});

// Run all PHPUnit tests
gulp.task('phpunit', function() {
    exec('phpunit', function(error, stdout) {
        sys.puts(stdout);
    });
});

// Keep an eye on Sass, Coffee, and PHP files for changes...
gulp.task('watch', function () {
    gulp.watch(sassDir + '/**/*.scss', ['css']);
    gulp.watch(coffeeDir + '/**/*.coffee', ['js']);
    gulp.watch('app/**/*.php', ['phpunit']);
});

// What tasks does running gulp trigger?
gulp.task('default', ['css', 'js', 'phpunit', 'watch']);
