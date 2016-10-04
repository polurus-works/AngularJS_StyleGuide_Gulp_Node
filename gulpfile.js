/**
 * Gulp Packages
 */

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    serve = require('gulp-serve'),
    //inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    bower = require('gulp-bower'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    merge = require('merge-stream'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    minify = require('gulp-minify'),
    express = require('gulp-express');

/**
 * File Paths
 */

var paths = {
    landing: 'index.html',
    server: 'server.js',
    input: 'app/**/*',
    output: 'dist/',
    outputJs: 'dist/js',
    localhost: "http://localhost:9091/#/",
    js: {
        core: 'app/js/core/*.js',
        constant: 'app/js/constants/*.js',
        application: 'app/js/*.js',
        services: 'app/js/services/*.js',
        controllers: 'app/js/controllers/*.js',
        directives: 'app/js/directives/*.js',
        filters: 'app/js/filters/*.js'
    },
    appjs: 'app.js',
    vendorsjs: 'vendors.js',
    views: {
        pages: 'app/views/pages/**.html',
        helpers: 'app/views/helpers/**.html',
        pagesOutput: 'dist/views/pages',
        helpersOutput: 'dist/views/helpers'
    },
    styles: {
        input: 'app/sass/*.{scss,sass}',
        output: 'dist/css/'
    },
    vendorcss: {
        input: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        output: 'base.css'
    },
    fonts: {
        input: 'bower_components/bootstrap/dist/fonts/*.*',
        output: 'dist/fonts'
    },
    images: {
        input: 'app/images/*.*',
        output: 'dist/images/'
    },
    mock: {
        input: 'data/*',
        output: 'dist/data'
    },
    vendors: {
        jquery: 'bower_components/jquery/dist/jquery.js',
        angular: 'bower_components/angular/angular.js',
        ngRouters: 'bower_components/angular-route/angular-route.js',
        uiRouters: 'bower_components/angular-ui-router/release/angular-ui-router.js',
        ngCookies: 'bower_components/angular-cookies/angular-cookies.js',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min.js'
    }
};

/**
 * gulp default
 */

gulp.task("default",function(callback){
  runSequence('copy', 'host', 'server', 'watch', 'open', callback);
 //runSequence('build',callback);
});

/**
 * gulp build
 */

gulp.task("build",function(callback){
  runSequence('copy',callback);
});

/**
 * gulp host
 */

gulp.task('host', serve({
  root:['dist'],
  port:9091
  }));

/**
 * gulp server
 */

gulp.task('server', function(){
  express.run([paths.server]);
  gulp.watch([paths.server],[express.run]);
});

/**
 * gulp open
 */

gulp.task("open", function(){
 gulp.src(paths.output)
   .pipe(open("", {
     url: paths.localhost,
     app: ""
   })
 );
});

/**
 * gulp clean
 */

gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});

/**
 * gulp copy
 */

gulp.task('copy',function(callback){
  runSequence('clean', 'vendorjs', 'appjs', 'htmls', 'pics', 'styles', 'vendorcss', 'copyindex', callback);
});

/**
 * gulp vendorjs
 */

gulp.task('vendorjs', function () {
  	return gulp.src([paths.vendors.jquery,
  	  paths.vendors.angular,
  	  paths.vendors.uiRouters,
  	  paths.vendors.ngRouters,
  	  paths.vendors.ngCookies,
  	  paths.vendors.bootstrap
  	])
    .pipe(concat(paths.vendorsjs))
    // .pipe(minify({
    //   ext:{
    //         src:'.js',
    //         min:'.min.js'
    //     }
    // }))
    .pipe(gulp.dest(paths.outputJs));
});

/**
 * gulp appjs
 */

 gulp.task('appjs', function () {
  	return gulp.src([paths.js.core, 
      paths.js.constant, 
      paths.js.application, 
      paths.js.services, 
      paths.js.controllers, 
      paths.js.directives, 
      paths.js.filters])
    .pipe(concat(paths.appjs))
    .pipe(gulp.dest(paths.outputJs));
});

/**
 * gulp htmls
 */

gulp.task('htmls', function () {
  	gulp.src([paths.views.pages])
    .pipe(gulp.dest(paths.views.pagesOutput));
    gulp.src([paths.views.helpers])
    .pipe(gulp.dest(paths.views.helpersOutput));
    return;
});


/**
 * gulp pics
 */

gulp.task('pics', function () {
  	return gulp.src([paths.images.input])
    .pipe(gulp.dest(paths.images.output));
});

/**
 * gulp styles
 */

gulp.task('styles', function() {
    return gulp.src(paths.styles.input)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.output));
});

/**
 * gulp vendorcss
 */

gulp.task('vendorcss', function() {
    gulp.src([paths.vendorcss.input])
        .pipe(concat(paths.vendorcss.output))
        .pipe(gulp.dest('dist/css'));
    gulp.src([paths.fonts.input])
        .pipe(gulp.dest(paths.fonts.output));
    return;
});



/**
 * gulp copyindex
 */

gulp.task('copyindex', function () {
  	return gulp.src(paths.landing)
    .pipe(gulp.dest(paths.output));
});

/**
 * gulp mock
 */

gulp.task('mock', function () {
  	return gulp.src([paths.mock.input])
    .pipe(gulp.dest(paths.mock.output));
});


/**
 * gulp watch
 */

gulp.task('watch', function(){
  gulp.watch(['index.html','images/*.*','app/*.*','app/**/*.*','data/*'],['copy']);
});
