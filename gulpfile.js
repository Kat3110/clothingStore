let projectFolder = require("path").basename(__dirname); //папка разраба
let sourceFolder = "#src";

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/scss/style.scss",
    js: sourceFolder + "/js/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/**/*.**",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
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
//обработка html
function html() {
  //пути к файлам и выполнение команд
  return src(path.src.html) //обращение к исходнику
    .pipe(fileinclude()) //собираем файлы
    .pipe(webphtml()) //автоматически добавление source в html разметку(в браузере)
    .pipe(dest(path.build.html)) //выгрузка исходников в результат
    .pipe(browsersync.stream()); //обновлние страницы
}
//обработка Css
function css() {
  return src(path.src.css) //обращение к исходнику
    .pipe(
      scss({ outputStyle: "expanded" }).on("error", scss.logError) // формирование развернутого css для удобства чтения
    )
    .pipe(group_media()) //объединение медиа-запросов
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      }) //поддержка 5версий браузера
    )
    .pipe(webpcss()) //для backgraund добавления source автоматом
    .pipe(dest(path.build.css)) //выгрузка исходников в результат
    .pipe(clean_css()) //сжатие и очищение css файла
    .pipe(
      rename({
        extname: ".min.css", // второй файл не сжатый переименовываем
      })
    )
    .pipe(dest(path.build.css)) //выгрузка исходников в результат
    .pipe(browsersync.stream()); //обновлние страницы
}
//обработка js
function js() {
  //пути к файлам и выполнение команд
  return src(path.src.js) //обращение к исходнику
    .pipe(fileinclude()) //собираем файлы
    .pipe(dest(path.build.js)) //выгрузка исходников в результат
    .pipe(uglify()) //для синтакс. анализа, минимизации, сжатия и улучшения JS
    .pipe(rename({ extname: ".min.js" })) // второй файл не сжатый переименовываем
    .pipe(dest(path.build.js)) //выгрузка исходников в результат
    .pipe(browsersync.stream()); //обновлние страницы
}
// gulp.task("fonts:copy", function () {
//   gulp
//     .src("src/fonts/**/*.{eot,svg,ttf,woff,woff2}")
//     .pipe(gulp.path("**/fonts/"));
// });
//изображения
function images() {
  //пути к файлам и выполнение команд
  return src(path.src.img) //обращение к исходнику
    .pipe(
      webp({
        quality: 70, //оптимизированное расширение(меньшн в два раза)
      })
    )
    .pipe(dest(path.build.img)) //выгрузка исходников в результат
    .pipe(src(path.src.img)) //обращение к исходнику
    .pipe(
      imagemin({
        //плагины для сжатия и оптимизации
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, //от 0 до 7
      })
    )
    .pipe(dest(path.build.img)) //выгрузка исходников в результат
    .pipe(browsersync.stream()); //обновлние страницы
}

//слежка за  файлами(быстрое обновление страницы) прослушка
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  // return del(path.clean);
}
//сценарий выполнения
let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
