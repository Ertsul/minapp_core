const request = require('../http/request');
const baseConfig = require('../http/baseConfig');

// get 例子
const getList = request({
  method: 'GET',
  url: baseConfig.baseUrl + '/list?page=1&size=10',
})

// post 例子
const updateInfo = request({
  method: 'POST',
  url: baseConfig.baseUrl + '/updateInfo',
  data: {
    name: 'Ertsul',
    age: 23
  }
})

module.exports = {
  getList,
  updateInfo
}