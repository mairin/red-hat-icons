var gulp = require('gulp');
var svgSymbols = require('gulp-svg-symbols');
var util = require('gulp-util');
var cheerio = require('gulp-cheerio');
var rename = require("gulp-rename");
var path = require("path")

if (util.env.iconset) {
    var iconset = path.basename(util.env.iconset)
}

if (util.env.dest && iconset ) {
    var dist = util.env.dest + '/' + iconset + '/sprite';
} else {
    var err = new Error( 'parameter "--iconset" and "--dest" folder required ');
    throw err;
}

gulp.task('sprites', function () {
  return gulp.src('**/' + iconset + '/*.svg')
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[stroke-width]').removeAttr('stroke-width');
            $('[stroke-width]').removeAttr('stroke-width');
            $('[fill-rule]').removeAttr('fill-rule');
            $('[stroke-width]').removeAttr('stroke-width');
            $('[stroke-linecap]').removeAttr('stroke-linecap');
            $('[stroke-linejoin]').removeAttr('stroke-linejoin');
            $('[height]').removeAttr('height');
            $('[width]').removeAttr('width');
            $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(rename(function (path) {
        path.basename = path.basename.replace("Icon_RH_", "");
        path.basename = path.basename.replace("_RGB_", "-");
        path.basename = path.basename.replace(/_/g, " ");
        path.basename = path.basename.replace(/-/, " ");
        path.basename = path.basename.replace(/-/g, " - ");
    }))
    .pipe(svgSymbols({
        title: '%f'
    }))
    // .pipe(rename(util.env.iconset + '-symbols.svg'))
    .pipe(gulp.dest(dist));
});

gulp.task('default', ['sprites']);
