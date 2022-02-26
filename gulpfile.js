
let project_folder = require('path').basename(__dirname);//папка разраба
let source_folder = '#src';//папка для сдачи
let fs = require('fs');


let path = {
    build: {  //хронятся пути выводов для галп(обработанные)
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {//исходник
        html: [source_folder + '/*.html' , '!' + source_folder + '/_*.html'],// в массиве поставили исключение на файлы html которые начинаются с _ что бы они не шли в итоговую папку
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {//прослушивать
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + '/' 
};

let { src, dest } = require('gulp'),//для помощи в написании сценария
    gulp = require('gulp'),//для выполнения каких либо отдельных задач
    browsersync = require('browser-sync').create(),//плагин для обновления браузера
    fileinclude = require('gulp-file-include'),// плагин для сборки html блоков
    del = require('del'),// плагин для удаление папки dist
    scss = require('gulp-sass')(require('sass')),//плагин scss
    autoprefixer = require('gulp-autoprefixer'),//поддержка браузеров( 5версий)
    group_media = require('gulp-group-css-media-queries'),//объединение медиа-запросов
    clean_css = require('gulp-clean-css'),//сжатие и очищение Css файла
    rename = require('gulp-rename'),//создание второго НЕ сжатого файла
    uglify = require('gulp-uglify-es').default,//плагин для синтакс. анализа, минимизации, сжатия и улучшения JS
    imagemin = require('gulp-imagemin'),//плагины для оптимизации изображений
    webp = require('gulp-webp'),//конвертирование в новый формат
    webphtml = require('gulp-webp-html'),//плагин добавления source в разметку автоматом
    webpcss = require('gulp-webpcss');//плагин для backgraund добавления source автоматом

    


//работа в браузере
function browserSync() { //функция для обновления
    browsersync.init({
        server: { //базовая папка
            baseDir: './' + project_folder + '/'
        },
        port: 3000, // порт по которому будет открываться браузер
        notify: false//отключаем табличку в браузере"браузер обновися"
    })
};
//обработка html
function html() { //пути к файлам и выполнение команд
    return src(path.src.html)//обращение к исходнику
    .pipe(fileinclude())//собираем файлы
    .pipe(webphtml())//автоматически добавление source в html разметку(в браузере)
    .pipe(dest(path.build.html))//выгрузка исходников в результат
    .pipe(browsersync.stream())//обновлние страницы
};
//обработка Css
function css() {
    return src(path.src.css)//обращение к исходнику
        .pipe(
            scss({outputStyle: 'expanded'}).on('error', scss.logError)// формирование развернутого css для удобства чтения
        )
        .pipe (group_media())//объединение медиа-запросов
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
            })//поддержка 5версий браузера
        )
        .pipe(webpcss())//для backgraund добавления source автоматом
        .pipe(dest(path.build.css))//выгрузка исходников в результат
        .pipe(clean_css())//сжатие и очищение css файла
        .pipe(
            rename({
                extname: '.min.css' // второй файл не сжатый переименовываем
            })
        )
        .pipe(dest(path.build.css))//выгрузка исходников в результат
        .pipe(browsersync.stream())//обновлние страницы
};
//обработка js
function js() { //пути к файлам и выполнение команд
    return src(path.src.js)//обращение к исходнику
    .pipe(fileinclude())//собираем файлы
    .pipe(dest(path.build.js))//выгрузка исходников в результат
    .pipe(uglify())//для синтакс. анализа, минимизации, сжатия и улучшения JS
    .pipe(rename({extname: '.min.js'}))// второй файл не сжатый переименовываем
    .pipe(dest(path.build.js))//выгрузка исходников в результат
    .pipe(browsersync.stream())//обновлние страницы
};

//изображения
function images() { //пути к файлам и выполнение команд
    return src(path.src.img)//обращение к исходнику
        .pipe(
            webp({
                quality: 70 //оптимизированное расширение(меньшн в два раза)
        }))
        .pipe(dest(path.build.img))//выгрузка исходников в результат
        .pipe(src(path.src.img))//обращение к исходнику
        .pipe( 
            imagemin ({ //плагины для сжатия и оптимизации
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 //от 0 до 7
            })
        )
        .pipe(dest(path.build.img))//выгрузка исходников в результат
        .pipe(browsersync.stream())//обновлние страницы
};

//слежка за  файлами(быстрое обновление страницы) прослушка
function watchFiles() {
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.img],images);
};
// //очищение dist от ненужных файлов
// function clean() {
//     return del(path.clean);
// };
//сценарий выполнения
let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;// когда запускаем галп выполняется эта 
//переменная по умолчанию и будет выполнятся watch который в свою 
//очередь будет запускать browserSync(функция), который в свою
//очередь будет делать все что нам нужно