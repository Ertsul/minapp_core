const path = require("path");

const srcPath = path.resolve(__dirname, "../src");
const distPath = path.resolve(__dirname, "../dist");
const isDev = process.argv.includes("--development");

module.exports = {
  isDev, // 当前环境
  srcPath, // src 源路径
  distPath, // dist 编译目标路径
  basePath: [
    srcPath
  ],
  otherPath: [
    srcPath,
    `!${srcPath}/**/**/*.less`,
    `!${srcPath}/**/**/*.wxml`,
    `!${srcPath}/**/**/*.json`,
    `!${srcPath}/**/**/*.js`,
    `!${srcPath}/static/icons/*.jpg`,
    `!${srcPath}/static/icons/*.png`,
    `!${srcPath}/static/images/*.jpg`,
    `!${srcPath}/static/images/*.png`,
  ],
  lessPath: [ // less blob
    `${srcPath}/**/**/*.less`,
  ],
  jsPath: [ // js blob
    `${srcPath}/**/**/*.js`,
  ],
  wxmlPath: [ // wxml blob
    `${srcPath}/**/**/*.wxml`,
  ],
  jsonPath: [ // json blob
    `${srcPath}/**/**/*.json`,
  ],
  lessImportPath: [
    `${srcPath}/common/less/*.less`
  ],
  iconPath: [
    `${srcPath}/static/icons/*.jpg`,
    `${srcPath}/static/icons/*.png`
  ],
  imagePath: [
    `${srcPath}/static/images/*.jpg`,
    `${srcPath}/static/images/*.gif`,
    `${srcPath}/static/images/*.png`
  ]
}