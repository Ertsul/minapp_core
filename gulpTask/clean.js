// gulp-clean 清空 dist 命令会有权限等一系列问题，故：直接用 node 进行删除 dist
const path = require("path");
const chalk = require("chalk");
const rimraf = require("rimraf");

const distPath = path.resolve(__dirname, '../dist');
rimraf(distPath, err => {
  if (err) {
    console.log(chalk.red(err));
  }
})