/*
 * @LastEditors: liu yang
 * @Description: 各种类型检测工具
 * @Date: 2022-03-10 14:18:23
 * @LastEditTime: 2022-03-10 14:20:58
 * @Author: liu yang
 */

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:19:10
 * @description: 判断类型
 * @param {Any} 要检测的数据
 * @return {String} 类型
 */
export const typeOf = (obj) => {
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object URLSearchParams]": "URLSearchParams",
  };
  return map[Object.prototype.toString.call(obj)];
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是function
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isFunction(obj) {
  return typeOf(obj) === "function";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 date
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isDate(obj) {
  return typeOf(obj) === "date";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 string
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isString(obj) {
  return typeOf(obj) === "string";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 array
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isArray(obj) {
  return typeOf(obj) === "array";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 object
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isObject(obj) {
  return typeOf(obj) === "object";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 null
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isNull(obj) {
  return typeOf(obj) === "null";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是 undefined
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isUndefined(obj) {
  return typeOf(obj) === "undefined";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是url
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export function isURLSearchParams(obj) {
  return typeOf(obj) === "URLSearchParams";
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:20:00
 * @description: 判断是否是false 类型
 * @param {Any} obj 要检测的数据
 * @return {Boolean} 结果
 */
export const valueIsFalse = (value) => {
  return isUndefined(value) || isNull(value) || value === "";
};