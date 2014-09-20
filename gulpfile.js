var gulp = require('gulp'),
    concat = require('gulp-concat'),
    php2html = require("gulp-php2html"),
    scss = require('gulp-sass'),
    changed = require('gulp-changed'),
    csso = require('gulp-csso'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    prettify = require('gulp-prettify'),
    cssmin = require('gulp-cssmin'),
    browserify = require('browserify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    pngcrush = require('imagemin-pngcrush'),
    react = require('gulp-react'),
    browserSync = require('browser-sync'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reload = browserSync.reload,
    shell = require('gulp-shell');

var paths = {
    scripts: ['./.build/js/libs.js', './.build/js/app.js'],
    jslibs: [
        'bower_components/jquery/dist/jquery.js',
        //'bower_components/react/react.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    images: 'src/img/**/*',
    jsx: './src/jsx/app.jsx',
    distJs: './dist/js',
    distCss: './dist/css',
    html: 'src/**/*.html',
    bundle: 'app.js',
    buildJs: './.build/js',
    php: 'src/**/*.php',
    less: 'src/bootstrap/less/bootstrap.less',
    fonts: [
        'src/fonts/**/*',
        'bower_components/font-awesome/fonts/**/*',
        'bower_components/bootstrap/fonts/**/*'
    ],
    scss: ['bower_components/font-awesome/scss/font-awesome.scss',
        'src/scss/main.scss'
    ]
};




gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    })
});

gulp.task('clean', function (cb) {
    del(['dist', '.build'], cb);
});



gulp.task('styles', function () {
    (function () {
        return gulp.src(paths.scss)
            .pipe(changed(paths.distCss))
            .pipe(scss({errLogToConsole: true}))
            .on('error', notify.onError())
            .pipe(autoprefixer('last 1 version'))
            .pipe(csso())
            .pipe(gulp.dest('src/css'));
    })();

    (function () {
        return gulp.src(paths.less)
            .pipe(changed(paths.distCss))
            .pipe(less({errLogToConsole: true}))
            .on('error', notify.onError())
            .pipe(autoprefixer('last 1 version'))
            .pipe(csso())
            .pipe(gulp.dest('src/css'));
    })();

    return gulp.src([
        'src/css/bootstrap.css',
        'src/css/font-awesome.css',
        'src/css/main.css'
    ])
        .pipe(changed(paths.distCss))
        .on('error', notify.onError())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.distCss));

});

/** WATCH **/
gulp.task('watchify', function () {
    var bundler = watchify(browserify(paths.jsx, watchify.args));

    function rebundle() {
        return bundler
            .bundle()
            .on('error', notify.onError())
            .pipe(source(paths.bundle))
            .pipe(gulp.dest('src/js'))
            .pipe(reload({stream: true}));
    }

    bundler.transform(reactify)
        .on('update', rebundle);
    return rebundle();
});

gulp.task('php', function () {
    return gulp.src(paths.php)
        .pipe(gulp.dest('dist'));
});

//gulp.task('php2html', function () {
//    return gulp.src(paths.php)
//        .pipe(php2html())
//        .pipe(prettify())
//        .pipe(gulp.dest('dist'))
//        .pipe(reload({stream: true}));
//});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulp.dest('./.build/fonts'));
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
});

gulp.task('css', ['less', 'sass'], function () {
    return gulp.src([
        'src/css/bootstrap.css',
        'src/css/font-awesome.css',
        'src/css/main.css'
    ])
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('./.build/css'));
});


// Copy all static images
gulp.task('images', function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false}
            ],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.dest('./.build/img'));
});

// Cat the JavaScripts
gulp.task('scripts', ['jsx','libs'], function () {
    return gulp.src(['.build/js/libs.js', '.build/js/app.js'])
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        //.pipe(uglify())
        .pipe( sourcemaps.write( './', { includeContent: false } ) )
        .pipe(gulp.dest('./dist/js'));
});



// Copy all static libraries
gulp.task('libs', function () {
    return gulp.src(paths.jslibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./.build/js'));
});

gulp.task('jsx', function () {
    return browserify(paths.jsx)
        .transform(reactify)
        .bundle()
        .pipe(source(paths.bundle))
        //.pipe(buffer())
        .pipe(gulp.dest(paths.buildJs));
});

gulp.task('heroku', shell.task([
    'git add .',
    'git commit -am"autocommit"',
    'git subtree push --prefix dist heroku master'
]));

// Rerun the task when a file changes
gulp.task('watch4changes', function () {
    gulp.watch('src/jsx/**/*', ['jsx']);
    gulp.watch('.build/js/app.js', ['scripts']);
    gulp.watch(paths.php, ['php']);
    gulp.watch(paths.images, ['images']);
});

// gulp main tasks
gulp.task('default', ['styles','jsx', 'php', 'images', 'scripts']);
gulp.task('push', ['default', 'heroku']);
gulp.task('watch', ['watch4changes','default']);
gulp.task('watch_', function () {
    gulp.start(['styles', 'jsx', 'libs', 'php', 'images', 'scripts','watchify','watch4changes']);
});
