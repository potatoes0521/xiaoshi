/*
 * @LastEditors: liu yang
 * @Description: ...
 * @Date: 2022-03-10 14:18:08
 * @LastEditTime: 2022-03-10 15:14:48
 * @Author: liu yang
 */
import Cookies from "js-cookie";

import { aesDecrypt, aesEncrypt } from "./encryption";
import { valueIsFalse } from './typeOf'

//  ----------------------------------------------- cookie start --------------------------------------------------

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:34:42
 * @description: 设置一个cookie
 * @param {String} name cookie名字
 * @param {String || Object} value 值
 * @param {Number} time 存储时长
 * @param {String} aes 加密解密的标识 不传就不加密
 * @return {void}
 */
export function setCookie(name, value, time, aes = "") {
  if (valueIsFalse(value)) return;
  value = JSON.stringify(value);
  aes && (value = aesEncrypt(value, aes));
  Cookies.set(name, value, {
    expires: time || 1,
  });
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:31:20
 * @description: 获取一个cookie
 * @param {String} name cookie名字
 * @param {String} aes 加密解密的标识 不传就不解密
 * @return {Object} 获取到的cookie
 */
export function getCookie(name, aes = "") {
  const data = Cookies.get(name) || false;
  if (valueIsFalse(data)) {
    return false;
  } else {
    try {
      return JSON.parse(aes ? aesDecrypt(data, aes) : data);
    } catch (error) {
      return aes ? aesDecrypt(data, aes) : data;
    }
  }
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:52:44
 * @description: 移除一个cookie
 * @param {*} name
 * @return {*}
 */
export function removeCookie(name) {
  Cookies.remove(name)
}

//  ----------------------------------------------- cookie end --------------------------------------------------

//  ----------------------------------------------- sessionStorage start --------------------------------------------------

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:40:57
 * @description: 设置sessionStorage
 * @param {String} name sessionStorage名字
 * @param {String || Object} value 值
 * @param {String} aes 加密解密的标识 不传就不加密
 * @return {void}
 */
export function setSession(name, value, aes) {
  if (valueIsFalse(value)) return;
  value = JSON.stringify(value);
  aes && (value = aesEncrypt(value, aes));
  window.sessionStorage.setItem(name, value);
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:41:00
 * @description: 获取sessionStorage
 * @param {String} name sessionStorage名字
 * @param {String} aes 加密解密的标识 不传就不解密
 * @return {Object} 获取到的sessionStorage
 */
export function getSession(name, aes = "") {
  const data = window.sessionStorage.getItem(name) || false;
  if (valueIsFalse(data)) {
    return false;
  } else {
    try {
      return JSON.parse(aes ? aesDecrypt(data, aes) : data);
    } catch (err) {
      return aes ? aesDecrypt(data, aes) : data;
    }
  }
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:53:23
 * @description: 移除指定的sessionStorage
 * @param {String} name sessionStorage名字
 * @return {void}
 */
export function removeSession(name) {
  window.sessionStorage.removeItem(name);
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:55:10
 * @description: 检查sessionStorage是否存在
 * @param {String} name sessionStorage名字
 * @return {Boolean} 存在返回true 不存在返回false
 */
export function checkSession(name) {
  const val = window.sessionStorage.getItem(name);
  if (val && val !== JSON.stringify({})) {
    return true;
  }
  return false;
}

//  ----------------------------------------------- sessionStorage end --------------------------------------------------

//  ----------------------------------------------- localStorage start --------------------------------------------------

/**
 * @Author: liu yang
 * @Date: 2022-03-10 14:59:00
 * @description: 设置指定的localStorage
 * @param {String} name localStorage名字
 * @param {String || Object} value 值
 * @param {String} aes 加密解密的标识 不传就不加密
 * @return {void}
 */
export function setLocal(name, value, aes) {
  if (valueIsFalse(value)) return;
  value = JSON.stringify(value);
  aes && (value = aesEncrypt(value, aes));
  window.localStorage.setItem(name, value);
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 15:00:54
 * @description: 获取指定的localStorage
 * @param {String} name localStorage名字
 * @param {String} aes 加密解密的标识 不传就不加密
 * @return {Object} 获取到的localStorage
 */
export function getLocal(name, aes) {
  const data = window.localStorage.getItem(name) || false;
  if (valueIsFalse(data)) {
    return false;
  } else {
    try {
      return JSON.parse(aes ? aesDecrypt(data, aes) : data);
    } catch (err) {
      return aes ? aesDecrypt(data, aes) : data;
    }
  }
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 15:08:08
 * @description: 移除指定的localStorage
 * @param {String} name localStorage名字
 * @return {void} 
 */
export function removeLocal(name) {
  window.localStorage.removeItem(name);
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 15:09:49
 * @description: 检查指定的localStorage
 * @param {*} name localStorage名字
 * @return {*}
 */
export function checkLocal(name) {
  const val = window.localStorage.getItem(name);
  if (val && val !== JSON.stringify({})) {
    return true;
  }
  return false;
}

//  ----------------------------------------------- localStorage end --------------------------------------------------

/**
 * 清除全部cookie sessionStorage localStorage
 * @param {Array} exceptCookieArr 除了key为XXX的Cookie全部删除
 * @param {Array} exceptSessionArr 除了key为XXX的全部删除
 * @param {Array} exceptLocalArr 除了key为XXX的全部删除
 * @return void
 */
export function clearAllStorage(
  exceptCookieArr = [],
  exceptSessionArr = [],
  exceptLocalArr = []
) {

  exceptCookieArr = exceptCookieArr.map((item) => item);
  const date = new Date();
  date.setTime(date.getTime() - 10000);
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    keys.forEach((item) => {
      if (!exceptCookieArr.includes(item)) {
        Cookies.remove(item, {
          path: "",
        });
      }
    });
  }

  exceptSessionArr = exceptSessionArr.map((item) => item);
  if (exceptSessionArr.length) {
    for (let i in sessionStorage) {
      const has = exceptSessionArr.some(
        (item) => item === i || i.indexOf(item) !== -1
      );
      if (i.startsWith(storageName) && !has) {
        sessionStorage.removeItem(i);
      }
    }
  } else {
    sessionStorage.clear();
  }

  exceptLocalArr = exceptLocalArr.map((item) => item);
  if (exceptLocalArr.length) {
    for (let i in localStorage) {
      const has = exceptLocalArr.some(
        (item) => item === i || i.indexOf(item) !== -1
      );
      if (i.startsWith(storageName) && !has) {
        localStorage.removeItem(i);
      }
    }
  } else {
    localStorage.clear();
  }
  console.log(
    "%c [ clear all cookie ]: ",
    "color: #fff; background: #bf2c9f; font-size: 13px;",
    "clear all cookie"
  );
}

export default {
  setCookie,
  getCookie,
  removeCookie,
  setSession,
  getSession,
  removeSession,
  checkSession,
  setLocal,
  getLocal,
  removeLocal,
  checkLocal,
  clearAllStorage,
}