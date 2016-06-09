var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    htmlreplace = require('gulp-html-replace'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
    open = require('gulp-open'),
    runSequence = require('run-sequence'),
    stripDebug = require('gulp-strip-debug'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    del = require('del'),
    config = require('./gulpConfig');

gulp.task('server', function() {
  connect.server({
    root: config.serverRoot,
    livereload: true,
    debug: true,
    port: config.serverPort
  });

  return gulp.src(config.staticIndex).pipe(open({ uri: 'http://localhost:8000/#/' }));
});

gulp.task('sass', function () {
    var configSass = config.sass;

    return gulp.src(configSass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: configSass.outputStyle }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configSass.dest))
        .pipe(connect.reload());
});

gulp.task('templateCache', function(cb){
    var configTemplate = config.htmlTemplate;

    return gulp.src(configTemplate.src)
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(configTemplate.dest))
        .pipe(connect.reload());

    cb(err);
});

gulp.task('reload', function(){
  return gulp.src(config.staticIndex)
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    var configWatch = config.watch;

    gulp.watch(configWatch.sass, ['sass-dev']);
    gulp.watch(configWatch.templates, ['templateCache']);
    gulp.watch(configWatch.js, ['app', 'reload']);
});

gulp.task('app', ['templateCache'], function(){
    var configScripts = config.js.app;

    return gulp.src(configScripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat(configScripts.outputName))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(configScripts.dest));
});

gulp.task('jshint', function(){
    var configJshint = config.js.app;

    configJshint.src.push('!./client/app/templates.js');

    return gulp.src(configJshint.src)
        .pipe(jshint())
        .pipe(jshint.reporter())
});

gulp.task('jscs', function(){
    var configJscs = config.js.app;

    configJscs.src.push('!./client/app/templates.js');

    return gulp.src(configJscs.src)
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('vendors', function(){
    var configVendors = config.js.vendor,
        filterJS = gulpFilter('**/*.js', { restore: true });
    
    return gulp.src(configVendors.src)
        .pipe(mainBowerFiles({
            paths: {
                bowerDirectory: './client/vendor',
                bowerrc: './.bowerrc',
                bowerJson: './bower.json'
            },

            overrides: {
                angular: {
                    ignore: true
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat(configVendors.outputName))
        .pipe(uglify())
        .pipe(gulp.dest(configVendors.dest));
});

gulp.task('delMaps', function() {
    del(config.del);

    return gulp.src(config.js.app.dest + config.js.app.outputName)
        .pipe(stripDebug())
})

gulp.task('default', devTask);
gulp.task('build', buildTask);

function devTask () {
    runSequence('vendors', 'app', 'sass', 'templateCache', 'watch', 'server');
}

function buildTask () {
    runSequence('vendors', 'app', 'sass', 'templateCache', 'delMaps', 'server');
}