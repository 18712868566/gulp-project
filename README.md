# 2019 年 6 月 13 日 17:28:59 更新

1. 把项目拉到本地文件夹下 -- 注意文件夹命名 不要有中文字符 防止报错
2. 检查 node,gulp 是否安装

- 未安装 node 自行百度 , [gulp 文档](https://www.gulpjs.com.cn/docs/getting-started/)

3. 先全局安装

```
    npm install --global gulp
    cnpm install --global gulp
```

4. 直接 npm install 会自行根据 package.json 中列表安装

5. 安装完毕之后 常用 命令

```
    gulp del  --------------  手动删除 编译到 dist下的所有文件

    gulp --------------------   默认打包压缩 最后上线前 dist目录

    gulp serve  -----------------  调试命令 自动打开调试界面 监听app下所有文件变化实时更新到浏览器 -- 支持多个设备同时同步预览
```

6. 已加入字蛛 检测字体 打包时自动压缩字体

---

[参考链接--博客园](https://www.cnblogs.com/cckui/p/10913040.html)

创建 .babelrc 文件
type null>.babelrc

使用 npm info jquery
这种方式和第一种类似，也可以查看 jquery 所有的版本，
但是能查出更多的关于 jquery 的信息；

安装指定版本包
npm install --save-dev jquery@1.0.0

```
npm install --save-dev gulp browser-sync gulp-autoprefixer gulp-clean-css gulp-stylus gulp-concat gulp-uglify gulp-htmlmin gulp-rev gulp-rev-collector gulp-imagemin imagemin-pngquant gulp-clean run-sequence del vinyl-paths

作者：sdupidBoby
链接：https://www.jianshu.com/p/fe865297c575
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

```

# 前端自动化构建工具 gulp

##2018 年 12 月 28 日 11:04:51 新增逐步运行 gulp

```
npm install --save-dev gulp-sequence
```

## gulp 的优势(为什么使用 gulp)

- images/css/js/html 压缩
  - css 压缩合并实现
  - js 压缩合并实现
  - images 压缩 -- gulp-imagemin 因 node 版本问题,未实现--可自己尝试
    - 在线压缩 https://tinypng.com/
    - 彩色笔在线压缩:http://www.secaibi.com/tools/
- 页面加载减少请求
  - 多 `<link rel="stylesheet" href="css/style1.css">` 合并压缩到生产环境目录
  - 多 `<script src="js/jquery-2.1.3.min.js"></script>` 合并压缩到生产环境目录
  - 生产环境下 html 文件直接引用一个 css 文件一个 js 文件
- 局域网内多人多屏同时访问,修改 css/html/js 动态刷新
- 开发环境支持 ES6/7 语法,编译到生产环境自动转换为 ES5 语法规范
  - 未添加 jslint 语法检查
- 支持编辑 sass/less/postcss,生成到开发环境,自动拷贝到生产环境

  - 本例仅支持 sass 更多请自行搜索 gulp 插件解决

- 自动为 css 添加浏览器前缀。

  - gulp-autoprefixer -- 完成自动添加
  - 有个问题,就是首次执行的时候,没有自动压缩,css,实时更改是,保存自动压缩

- gulp.spritesmith //- 把所有的小图标一起做成雪碧图
  - [参考链接](https://www.cnblogs.com/lakeInHeart/p/7252240.html)
  - 现在在 执行 gulp sprite 自动生成雪碧图和对应的 css 文件, 不过要手动添加到 style
    - 解决手动问题, 在执行 gulp 默认任务时,先手动执行下 gulp spriter,先生成雪碧图和对应的样式文件
    - 可以引入 gulp if 解决

## 准备工作

[参考链接](https://w3ctrain.com/2015/12/22/gulp-for-beginners/?utm_source=tuicool&utm_medium=referral)

[gulp 的 Github 主页](https://github.com/gulpjs/gulp)

[npm 上得 gulp 组件](https://www.npmjs.com/search?q=gulpplugin)

[精通 gulp 常用插件](https://www.cnblogs.com/linxin/p/6482513.html)

## 目录结构说明

- App // 开发环境目录
  - css
  - js
  - images
  - fonts
  - sass
  - index.html
- dist // 生产环境目录
- .gitgonore // github 忽略文件
- package.json // ..
- README.md // 介绍

## gulp 插件说明

- gulp-uglify //- 压缩 JS
- gulp-minify-css || gulp-clean-css //- 压缩 CSS 为一行； gulp-minify-css 已经被废弃
- gulp-concat //- 文件合并
- gulp-rev //- 对文件名加 MD5 后缀 给 css,js,html 加上 hash 版本号
- gulp-rev-collector //- 路径替换
- gulp-autoprefixer //- 自动为 css 添加浏览器前缀。
- gulp-useref //- 它可以把 html 里零碎的这些引入合并成一个文件，但是它不负责代码压缩。
- gulp-babel //- 将 ES6 代码编译成 ES5。
- babel-preset-es2015 //- //es2015 转码规则
- babel-core //- gulp-babel 的依赖文件
- gulp-rev-replace //- 重写被 gulp-rev 重命名的文件名。
- gulp-if //- 有条件地运行一个任务。
- gulp-css-spriter //- 把所有的小图标一起做成雪碧图 -- 弃用 使用 pngjs \* deprecate gulp-css-spriter@0.4.0 › spritesmith@1.5.0 › pixelsmith@1.3.4 › get-pixels@3.2.3 › pngjs2@^1.0.0 pngjs2 has
  now taken over the original pngjs package on npm. Please change to use pngjs dependency, version 2+.

** gulp-rev-replace 未成功使用--待研究--随机生产 hash,能解决换成问题!! **

> 例子参考

```
gulp-rev-replace
描述：重写被gulp-rev重命名的文件名。

var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');

gulp.src('index.html')
    .pipe(useref())                         // 替换HTML中引用的css和js
    .pipe(rev())                            // 给css,js,html加上hash版本号
    .pipe(revReplace())                     // 把引用的css和js替换成有版本号的名字
    .pipe(gulp.dest('./dist'))

```

## 完整的 gulpfile.js

```
//dist是生成版本的目标文件夹,就是最终要部署到线上的文件夹
var dist = "./dist";
//src目录是我们的源代码
var src = "./App";

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    spritesmith = require("gulp.spritesmith"),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'); //清空dist文件夹

// Browser Sync 帮助我们搭建简单的本地服务器并能实时刷新浏览器，它还能 同时刷新多个设备
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: src
        }
    })
});

// 编译sass下的.scss文件,输出到 App/css 目录下
gulp.task('sass', function() {
    return gulp.src(src + '/sass/**/*.scss') //用gulp.src获取源文件
        .pipe(sass()) //将sass转换为css并使用gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(src + '/css')) //处理完毕,生成到 开发环境 css目录下
        // .pipe(gulp.dest(dist + '/css')) //处理完毕,生成到 生产环境 css目录下
        .pipe(browserSync.reload({
            stream: true
        }));
})

// 删除dist下的所有文件
gulp.task('delete', function(cb) {
    return del([dist + '/*', dist + '/images'], cb);
});

// 压缩js文件
gulp.task('jsmin', function() {
    return gulp.src(src + '/js/**.*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'))
});

// ES6语法转换ES5语法 js
gulp.task('es6', function() {
    return gulp.src(src + '/js/style.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('newStyleES6.js'))
        .pipe(uglify())
        .pipe(gulp.dest(src + '/js'))
});


// 雪碧图
gulp.task('sprite', function() {
    gulp.src(src + '/images/**.*')
        .pipe(spritesmith({
            imgName: 'images/sprite.png', //合并后大图的名称
            cssName: 'css/sprite.css',
            padding: 2, // 每个图片之间的间距，默认为0px
            cssTemplate: (data) => {
                // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
                let arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url = data.spritesheet.image
                    // console.log(data)

                data.sprites.forEach(function(sprite) {
                    arr.push(
                        ".icon-" + sprite.name +
                        "{" +
                        "background: url('" + url + "') " +
                        "no-repeat " +
                        sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                        "background-size: " + width + " " + height + ";" +
                        "width: " + sprite.px.width + ";" +
                        "height: " + sprite.px.height + ";" +
                        "}\n"
                    )
                });
                return arr.join("")
            }
        }))
        .pipe(gulp.dest(src))
})


// 压缩css
gulp.task('minCss', function() {
    return gulp.src(src + '/css/**.*')
        .pipe(cssmin({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(dist + '/css'));
});

//不用编译的文件复制到生成环境中
gulp.task('copy', function() {
    gulp.src(src + '/*.html')
        .pipe(useref()) // 替换HTML中引用的css和js
        .pipe(gulp.dest(dist));
    gulp.src(src + '/images/**.*')
        .pipe(gulp.dest(dist + '/images'));
    // gulp.src(src + '/css/**.*')
    // .pipe(gulp.dest(dist + '/css'));
    // gulp.src(src + '/js/**.*')
    // .pipe(gulp.dest(dist + '/js'));
    gulp.src(src + '/fonts/**.*')
        .pipe(gulp.dest(dist + '/fonts'));
});

// gulp 默认执行
gulp.task('default', ['delete', 'browserSync', 'jsmin', 'sass', 'minCss', 'copy'], function() {
    console.log('welcome gulp!');
    // watch监视的使用
    // 监听scss文件的变化
    gulp.watch(src + '/sass/**/*.scss', ['sass']);
    // 监听html文件的变化
    gulp.watch(src + '/*.html', ['copy']);
    // 监听images文件的变化
    gulp.watch(src + '/images/**.*', ['copy']);
    // 监听css文件的变化
    gulp.watch(src + '/css/**.*', ['minCss']);
    // 监听js文件的变化
    gulp.watch(src + '/js/**.*', ['jsmin']);
    // 监听字体,字体图标
    gulp.watch(src + '/fonts/**.*', ['copy']);

    // 每当html或js|css|images|fonts文件更改时重新加载浏览器
    gulp.watch(src + '/*.html', browserSync.reload);
    gulp.watch(src + '/css/**.*', browserSync.reload);
    gulp.watch(src + '/js/**.*', browserSync.reload);
    gulp.watch(src + '/js/**.*', browserSync.reload);
    gulp.watch(src + '/images/**.*', browserSync.reload);

});
```
