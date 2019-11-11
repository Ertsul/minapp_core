const routerPath = require('./routerPath');

/**
 * 处理路由参数，拼接成字符串形式
 * @param {*} queryObj ： 路由参数
 */
function dealQuery(queryObj) {
  let tempArr = [];
  for (let key in queryObj) {
    if (queryObj.hasOwnProperty(key)) {
      const value = queryObj[key];
      const item = `${key}=${value}`;
      tempArr.push(item);
    }
  }
  return "?" + tempArr.join("&");
}

let Router = {
  /**
   * 
   * @param {String} param0 : 路径
   * @param {Object} param1 : 参数
   * @param {String} param2 : 类型，redirectTo/reLaunch/back/navigateTo
   */
  push({
    path = "",
    query = {},
    type = "navigateTo"
  }) {
    if (!path) {
      return;
    }
    // 获取对应的小程序路径
    let url = routerPath[path] || routerPath['index'];
    let params = "";
    // 处理 query 
    if (Object.keys(query) && Object.prototype.toString.call(query) == '[object Object]') {
      params = dealQuery(query);
    } else {
      console.error("路由参数类型错误！");
      return;
    }
    url += params;
    this.to(url, type); // 执行跳转
  },
  /**
   * 
   * @param {*} url : 路径 + 参数
   * @param {*} type : 类型，redirectTo/reLaunch/back/navigateTo
   */
  to(url, type = "") {
    switch (type) {
      case "redirectTo":
        wx.redirectTo({
          url
        });
        break;
      case "reLaunch":
        wx.reLaunch({
          url
        });
        break;
      case "back":
        wx.navigateBack({
          delta: 1
        });
        break;
      case "navigateTo":
        wx.navigateTo({
          url
        });
        break;
    }
  }
}

module.exports = Router;