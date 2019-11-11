const devConfig = require('./devConfig');
const prodConfig = require('./proConfig');

const env = 'dev'; // 开发
// const env = 'prod'; // 生产

const baseConfig = env === 'dev' ? {
  ...devConfig
} : {
  ...prodConfig
};

module.exports = baseConfig;