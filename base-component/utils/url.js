/*
 * @LastEditors: liu yang
 * @Description: 针对URL参数的处理
 * @Date: 2022-03-10 15:48:59
 * @LastEditTime: 2022-03-10 16:07:27
 * @Author: liu yang
 */

/**
 * @Author: liu yang
 * @Date: 2022-03-10 15:49:50
 * @description: 获取URL里的参数并且转换成对象
 * @param {URL} url
 * @return {*}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 16:05:17
 * @description: 将JSON数据转换为URL参数
 * @param {*} obj
 * @return {*}
 */
export function getQueryString(obj) {
  return Object.keys(obj)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}

