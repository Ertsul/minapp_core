const {
  task,
  series
} = require("gulp");
const TaskControler = require("./gulpTask/taskControler");
// 项目 ID
const id = require("./package.json").name || "min-program";

new TaskControler(id);

/*---------- 相关的 gulp 任务 ----------*/

// dev 开发环境任务
task("dev", series(`dev-${id}`));

// prod 生产环境任务
task("prod", series(`prod-${id}`));