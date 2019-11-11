function request({
  url = '',
  data = {},
  method = 'POST',
  header = {
    'content-type': 'application/json' // 默认值
  }
}) {
  return new Promise(async (resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

module.exports = request;