const {
  task,
  src,
  dest,
  series,
  parallel,
  watch
} = require("gulp");
const clean = require("gulp-clean");
const replace = require("gulp-replace");
const changed = require("gulp-changed");
const rename = require("gulp-rename");
// const uglify = require("gulp-uglify"); // 压缩 js （es6 语法不支持压缩，故用：gulp-uglify-es）
const uglify = require("gulp-uglify-es").default;
const cleanCss = require("gulp-clean-css"); // 压缩 css
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const prettyData = require("gulp-pretty-data");
const eslint = require("gulp-eslint");
const imagemin = require("gulp-imagemin");

const less = require("gulp-less");
// const LessAutoprefix = require("less-plugin-autoprefix");
// const autoprefix = new LessAutoprefix({
//   browsers: ["last 2 versions"]
// });
// 用 less-plugin-autoprefix @import 会有问题，@import 语句会被删除。换用 gulp-autoprefixer
const autoprefixer = require("gulp-autoprefixer");

const baseConfig = require("./baseConfig");

class TaskControler {
  constructor(id) {
    this.id = id;
    this.isDev = baseConfig.isDev;
    this.init();
  }

  init() {
    const id = this.id || "";

    /**
     * 清空目标目录 dist --> 统一在 node clean.js 中处理
     */
    task("clean:dist", done => {
      // console.log(":::: clean:dist");

      src(baseConfig.distPath, {
          read: true,
          allowEmpty: true,
        })
        .pipe(clean())

      done();
    })

    /**
     * less 文件处理
     * 1. 支持 less
     * 2. 支持 autoprefixer
     * 3. dev 开发环境不压缩代码
     * 4. prod 生产环境压缩代码
     */
    task("compile:less", done => {
      // console.log(":::: compile:less");

      src(baseConfig.lessPath, {
          base: "src"
        })
        .pipe(changed(baseConfig.distPath))
        .pipe(autoprefixer())
        .pipe(less())
        .pipe(gulpif(!this.isDev, cleanCss()))
        .pipe(rename(function (path) { // 更改 .less 文件后缀为 .wxss
          path.extname = ".wxss";
        }))
        .pipe(replace(/\.less/g, ".wxss")) // 修改 less 文件内部的引用 .less 文件后缀为 .wxss
        .pipe(dest(baseConfig.distPath));

      done();
    })

    /**
     * js 文件处理
     * 1. 支持 async/await 
     * 2. dev 开发环境不压缩代码
     * 3. prod 生产环境压缩代码
     */
    task("compile:js", done => {
      // console.log(":::: compile:js");

      src(baseConfig.jsPath, {
          base: "src"
        })
        .pipe(changed(baseConfig.distPath))
        // .pipe(babel({ // 先通过 babel 转化语法然后才能进行压缩 --> 微信开发者工具有 es6 转 es5 功能
        //   presets: ["@babel/env"]
        // }))
        .pipe(eslint())
        // .pipe(eslint.format())
        .pipe(gulpif(!this.isDev, uglify()))
        .pipe(dest(baseConfig.distPath));

      done();
    })


    /**
     * wxml 文件处理 
     * 1. dev 开发环境不压缩代码
     * 2. prod 生产环境压缩代码
     */
    task("compile:wxml", done => {
      // console.log(":::: compile:wxml");

      src(baseConfig.wxmlPath, {
          base: "src"
        })
        .pipe(changed(baseConfig.distPath))
        .pipe(gulpif(!this.isDev, htmlmin({
          collapseWhitespace: true
        })))
        .pipe(dest(baseConfig.distPath));

      done();
    })

    /**
     * json 文件处理 
     * 1. dev 开发环境不压缩代码
     * 2. prod 生产环境压缩代码
     */
    task("compile:json", done => {
      // console.log(":::: compile:json");

      src(baseConfig.jsonPath, {
          base: "src"
        })
        .pipe(changed(baseConfig.distPath))
        .pipe(gulpif(!this.isDev, prettyData({
          type: "minify",
          preserveComments: true,
          extensions: {
            "json": "json",
          }
        })))
        .pipe(dest(baseConfig.distPath));

      done();
    })

    /**
     * 其他文件
     */
    task("compile:other", done => {
      // console.log(":::: compile:other");

      src(baseConfig.otherPath, {
          base: "src"
        })
        .pipe(changed(baseConfig.distPath))
        .pipe(dest(baseConfig.distPath));

      done();
    })

    /**
     * 图片压缩
     * "gifsicle" "optipng"
     */
    task("minify:image", async done => {
      // console.log(":::: minify:image");

      src(baseConfig.imagePath, {
          base: "src"
        })
        .pipe(imagemin([imagemin.optipng(), imagemin.gifsicle(), imagemin.jpegtran()]))
        .pipe(dest(baseConfig.distPath))

      done();
    })

    /**
     * 监控
     */
    task("watch", done => {
      // console.log(":::: compile:other");

      watch(baseConfig.basePath, {
        base: "src"
      }, series("compile:less", "compile:js", "compile:wxml", "compile:json", "compile:other", "minify:image"))

      done();
    })

    /**
     * 构建相关任务
     */
    task("default", parallel("compile:less", "compile:js", "compile:wxml", "compile:json", "compile:other", "minify:image"));
    task(`dev-${id}`, series("default", "watch"));
    task(`prod-${id}`, series("default"));
  }
}

module.exports = TaskControler;