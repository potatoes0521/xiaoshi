/*
 * @LastEditors: liu yang
 * @Description: 金额处理
 * @Date: 2022-03-10 15:42:25
 * @LastEditTime: 2022-03-10 15:55:59
 * @Author: liu yang
 */

// https://github.com/scurker/currency.js

/**
 * @Author: liu yang
 * @Date: 2022-03-10 15:42:51
 * @description: 分转元
 * @param {Number} val
 * @return {String} 元
 */
export function changeYuan(val) {
  if (val || val === 0) {
    //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
    const str = (val / 100).toFixed(2) + "";
    const intSum = str
      .substring(0, str.indexOf("."))
      .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
    const dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
    const ret = intSum + dot;
    return ret + "元";
  } else {
    return "-";
  }
};
