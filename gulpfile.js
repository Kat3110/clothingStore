let projectFolder = require("path").basename(__dirname); //папка разраба
let sourceFolder = "#src";

let path = {
  build: {
    // html: projectFolder + "/",
    html: `${projectFolder}/`,
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: `${sourceFolder}/*.html`,
    // html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/scss/style.scss",
    js: sourceFolder + "/js/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/**/*.**",
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    // html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/scss/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + projectFolder + "/",
};

const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
const webpcss = require("gulp-webpcss");

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}
//обработка Css
function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: "expanded" }).on("error", scss.logError))
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(webpcss())
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}
//изображения
function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream()); //обновлние страницы
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  // return del(path.clean);
}
let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
