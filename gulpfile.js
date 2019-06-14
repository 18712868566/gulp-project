var gulp = require('gulp'),
    clean = require('gulp-clean'), //清空文件夹，避免文件冗余
    pump = require('pump'),
    browserSync = require('browser-sync').create(), // 浏览器运行
    uglify = require('gulp-uglify'), //压缩JS
    rename = require('gulp-rename'), //重命名
    changed = require('gulp-changed'), //监听文件发生改变
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

// css js html
var stylus = require('gulp-stylus'); //编译stylus
var minifyCss = require('gulp-clean-css'); // 压缩css
var autoprefixer = require('gulp-autoprefixer'); // css前缀
var postcss = require('gulp-postcss');
var htmlmin = require('gulp-htmlmin'); //压缩html

var rev = require('gulp-rev'); // 给文件加入版本号
var revCollector = require('gulp-rev-collector'); // 替换html中的文件名
var concat = require('gulp-concat'); // 合并
var runSequence = require('run-sequence'); //执行顺序，避免

const imagemin = require('gulp-imagemin'); // 压缩图片
const pngquant = require('imagemin-pngquant');

var del = require('del'); // 下面两个就是在管道中 进行文件删除操作
var vinylPaths = require('vinyl-paths');

// font字体压缩
var fontSpider = require('gulp-font-spider');

var config = {
    src: './app',
    src_css: './app/css',
    src_js: './app/js',
    src_img: './app/images',
    src_font: './app/font',
    src_css_all: './app/css/**/*.css',
    src_js_all: './app/js/**/*.js',
    src_img_all: './app/images/**/*.{png,jpg,gif,ico}',
    scr_font_all: './app/font/*.**',
    build: './dist',
    build_img: './dist/images',
    build_css: './dist/css',
    build_js: './dist/js'
};

// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算

/* 
    清空目标目录
*/
gulp.task('del', function(cb) {
    pump([gulp.src('./dist/*'), gulp.src('./rev/*'), clean()], cb);
});

/*
 *   ==================================css
 *   https://github.com/postcss/autoprefixer#gulp
 */

gulp.task('css', function() {
    const autoprefixer = require('autoprefixer');
    const sourcemaps = require('gulp-sourcemaps');
    const postcss = require('gulp-postcss');

    return (
        gulp
        .src(config.src_css_all)
        // .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        // .pipe(sourcemaps.write('.'))
        //合并为一个css
        // .pipe(concat('main.css'))
        // 合并后的css 保存到 dist/css 下
        // .pipe(gulp.dest(config.build_css))
        // 重命名
        // .pipe(rename({ suffix: '.min' }))
        // 压缩css
        .pipe(minifyCss())
        //添加hash(哈希值)版本号
        .pipe(rev())
        .pipe(gulp.dest(config.build_css))
        //CSS 生成文件 hash 编码并生成 rev-manifest.json 文件，里面定义了文件名对照映射
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
        .pipe(notify({ message: 'css 文件压缩完成' }))
    );
});

/*
 * ========================= Js 控制压缩
 */
gulp.task('js', function() {
    return (
        gulp
        .src(config.src_js_all)
        //编译es6
        .pipe(babel())
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest('dist/js'))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest(config.build_js))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .pipe(notify({ message: 'js文件编译完成' }))
    );
});
/*
 *   ==================================HTML压缩
 */
gulp.task('testHtmlmin', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp
        .src(['rev/**/*.json', 'app/*.html'])
        .pipe(
            revCollector({
                replaceReved: true // 设置replaceReved标识, 用来说明模板中已经被替换的文件是否还能再被替换,默认是false
            })
        )
        .pipe(htmlmin(options))
        .pipe(gulp.dest(config.build));
});

/**
 * 下面是独立的功能 压缩图片
 */
gulp.task('min-img', function() {
    return gulp
        .src(config.src_img_all)
        .pipe(
            imagemin({
                svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })
        )
        .pipe(gulp.dest(config.build_img));
});

/**
 * 不用编译的文件复制到生成环境中
 * */
gulp.task('copy-layer', function() {
    return gulp
        .src([config.src + '/layer/**/*.*'])
        .pipe(gulp.dest(config.build + '/layer'));
});
/**
 * =======================  字体拷贝之前记得 字蛛 压缩下字体包
 * =======================  参考链接 http://font-spider.org/
 */
gulp.task('copy-font', function() {
    return gulp
        .src([config.src + '/font/*.*'])
        .pipe(gulp.dest(config.build + '/font'));
});

gulp.task('fontspider', function() {
    return gulp.src(config.src + '/*.html').pipe(fontSpider());
});

/**
 * ======================最终打包压缩流程
 */
gulp.task(
    'default',
    gulp.series(
        'del',
        'fontspider',
        gulp.parallel('css', 'js', 'min-img', 'copy-layer', 'copy-font'),
        'testHtmlmin',
        done => {
            console.log('-----------全部执行完毕------------------');
            done();
        }
    )
);

/*
 * ==================== 本地服务器 实施刷
 */

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
    gulp.watch('./app').on('change', browserSync.reload);
});