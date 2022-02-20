const { readFileSync } = require("fs");
const gulp = require("gulp");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");
const htmlmin = require("gulp-htmlmin");
const minifyjs = require("gulp-minify");
const svgmin = require("gulp-svgmin");
const rev = require("gulp-rev");
const rewrite = require("gulp-rev-rewrite");
const replace = require("gulp-replace");

// Gulp task to minify the HTML files
function minHTML() {
  return gulp
    .src(["./**/*.html", "!./node_modules/**/*"])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
      })
    )
    .pipe(gulp.dest("./docs"));
}

// Gulp task to minify the css file and remove all unused css
function postCSS() {
  const plugins = [
    autoprefixer(),
    cssnano(),
    purgecss({
      content: ["./**/*.html"],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/.]+/g) || [],
    }),
  ];
  return gulp
    .src(["./assets/styles/styles.css"])
    .pipe(postcss(plugins))
    .pipe(rev())
    .pipe(gulp.dest("./docs/assets/styles"))
    .pipe(rev.manifest({ merge: false }))
    .pipe(gulp.dest("./"));
}

// Gulp task to minify JavaScript files
function minJS() {
  const options = {
    noSource: true,
    ext: {
      min: ".js",
    },
    compress: {
      dead_code: true,
      unused: true,
      drop_debugger: true,
    },
  };
  return gulp
    .src("./assets/js/*js")
    .pipe(minifyjs(options))
    .pipe(rev())
    .pipe(gulp.dest("./docs/assets/js"))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest("./"));
}

function minNodeMods() {
  const options = {
    noSource: true,
    ext: {
      min: ".js",
    },
    compress: {
      dead_code: true,
      unused: true,
      drop_debugger: true,
    },
  };
  return gulp
    .src(["./node_modules/theaterjs/dist/theater.min.js"])
    .pipe(minifyjs(options))
    .pipe(rev())
    .pipe(gulp.dest("./docs/assets/js"))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest("./"));
}

// Gulp task to copy images
function copyImages() {
  return gulp
    .src("./assets/images/**/*.{png,jpg,jpeg,gif,webp,pdf}")
    .pipe(rev())
    .pipe(gulp.dest("./docs/assets/images"))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest("./"));
}

// Gulp task to minify SVGs
function minSVG() {
  return gulp
    .src("./assets/images/svg/*.svg")
    .pipe(svgmin())
    .pipe(rev())
    .pipe(gulp.dest("./docs/assets/images/svg"))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest("./"));
}

// Gulp task to rewrite references to files in the manifest
function revRewrite() {
  const manifest = readFileSync("./rev-manifest.json");
  return gulp
    .src("./docs/**/*.html")
    .pipe(rewrite({ manifest }))
    .pipe(gulp.dest("./docs"));
}

// Gulp task to remove all contents of the 'docs' folder
function clean() {
  return del(["./docs/**", "!./docs", "!./docs/CNAME"]);
}

function fixPaths() {
  return gulp
    .src(["./docs/**/*.html"])
    .pipe(
      replace(
        "./node_modules/theaterjs/dist/theater.min.js",
        "./assets/js/theater.min.js"
      )
    )
    .pipe(gulp.dest("./docs"));
}

// Gulp default task (run by typing 'gulp' in the console)
gulp.task(
  "default",
  gulp.series(
    clean,
    postCSS,
    minHTML,
    minJS,
    minNodeMods,
    copyImages,
    minSVG,
    fixPaths,
    revRewrite
  )
);

gulp.task("minHTML", minHTML);
gulp.task("postCSS", postCSS);
gulp.task("minJS", minJS);
gulp.task("copyImages", copyImages);
gulp.task("minSVG", minSVG);
gulp.task("minNodeMods", minNodeMods);
gulp.task("fixPaths", fixPaths);
gulp.task("revRewrite", revRewrite);
