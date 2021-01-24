const { readFileSync } = require('fs');
const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const htmlmin = require('gulp-htmlmin');
const minifyjs = require('gulp-minify');
const svgmin = require('gulp-svgmin');
const rev = require('gulp-rev');
const rewrite = require('gulp-rev-rewrite');

// Gulp task to minify the HTML files
function minHTML() {
	return gulp.src(['./**/*.html', '!./node_modules/**/*.html'])
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,

		}))
		.pipe(gulp.dest('./docs'));
}

// Gulp task to minify the css file and remove all unused css
function postCSS() {
	const plugin = [
		autoprefixer(),
		cssnano(),
		purgecss({
			content: ['./**/*.html'],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/.]+/g) || []
		})
	];
	return gulp.src(['./assets/styles/styles.css'])
		.pipe(postcss(plugin))
		// .pipe(gulp.dest('./docs/assets/styles'))
		.pipe(rev())
		.pipe(gulp.dest('./docs/assets/styles'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('./docs/assets'));
}

// Gulp task to minify JavaScript files
function minJS() {
	return gulp.src('./assets/js/*js')
		.pipe(minifyjs({
			noSource: true,
			ext: {
				min: '.js'
			},
			compress: {
				dead_code: true,
				unused: true,
				drop_debugger: true
			}
		}))
		.pipe(rev())
		.pipe(gulp.dest('./docs/assets/js'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('./docs/assets'));
}

// Gulp task to copy images, minify SVGs
function copyImages() {
	return gulp.src('./assets/images/**/*.{png,jpg,jpeg,gif,svg}')
		.pipe(svgmin())
		.pipe(rev())
		.pipe(gulp.dest('./docs/assets/images'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('./docs/assets'));
}

// Gulp task to revision all assets and create manifest for rewriting references
function revision() {
	return gulp.src(['./docs/assets/**/*.{css,js}'], { base: 'docs' })
		// return gulp.src(['./docs/assets/**/*.{html,css,js,png,jpg,jpeg,gif,svg,webp}'])
		.pipe(rev())
		.pipe(gulp.dest('/docs/assets'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./docs/assets'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./docs/assets'));
}

// Gulp task to rewrite references to files in the manifest
function revRewrite() {
	const manifest = readFileSync('./docs/assets/rev-manifest.json');
	return gulp.src('./docs/**/*.html')
		.pipe(rewrite({ manifest }))
		.pipe(gulp.dest('./docs'));
}

// Gulp task to remove all contents of the 'docs' folder
function clean() {
	return del(['./docs/**', '!./docs', '!./docs/CNAME']);
}

// Gulp default task (run by typing 'gulp' in the console)
gulp.task('default', gulp.series(clean, gulp.parallel(postCSS, minHTML, minJS, copyImages), revRewrite));

gulp.task('minHTML', minHTML);
gulp.task('postCSS', postCSS);
gulp.task('minJS', minJS);
gulp.task('copyImages', copyImages);
gulp.task('revision', revision);
gulp.task('revRewrite', revRewrite);