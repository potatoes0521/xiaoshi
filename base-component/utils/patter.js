/*
 * @LastEditors: liu yang
 * @Description: 正则文件
 * @Date: 2022-03-10 13:41:38
 * @LastEditTime: 2022-03-10 13:41:42
 * @Author: liu yang
 */

// url
const urlReg =
  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

/**
 * 判断是不是url
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isUrl = (value) => {
  return urlReg.test(value);
};

/**
 * 表单验证是不是URL
 * @return {void}
 */
export const formValidateIsURL = (rule, value, callback) => {
  if (!isUrl(value)) {
    callback(new Error("请输入正确的链接地址"));
  } else {
    callback();
  }
};

// 数字
const numberReg = /^\d+$/;
/**
 * 判断是不是数字
 * @param {Number} value 参数描述
 * @return {Boolean}
 */
export const isNumber = (value) => {
  return numberReg.test(value);
};

/**
 * 表单验证是不是正确数字
 * @return {void}
 */
export const formValidateIsNumber = (rule, value, callback) => {
  if (!isNumber(value)) {
    callback(new Error("请输入正确的数字"));
  } else {
    callback();
  }
};

// 汉字
const chineseReg = /^(([\u4E00-\u9FA5])|(\d))+$/;

/**
 * 判断是不是汉字
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isChinese = (value) => {
  return chineseReg.test(value);
};

/**
 * 表单验证是不是正确数字
 * @return {void}
 */
export const formValidateIsChinese = (rule, value, callback) => {
  if (!isChinese(value)) {
    callback(new Error("只能输入汉字"));
  } else {
    callback();
  }
};

// 英文名  字母、数字、下划线
const codeNumberLineReg = /^[A-Za-z0-9_]+$/;

/**
 * 判断是不是英文 字母、 数字、 下划线
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isCodeNumberLine = (value) => {
  return codeNumberLineReg.test(value);
};

/**
 * 表单验证是不是正确英文字符
 * @return {void}
 */
export const formValidateIsCodeNumberLine = (rule, value, callback) => {
  if (!isCodeNumberLine(value)) {
    callback(new Error("只能输入字母、数字、下划线"));
  } else {
    callback();
  }
};

// 姓名正则
const realNameReg = /^[\u4E00-\u9FA5]{1,16}$/;

/**
 * 判断是不是名字
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isName = (value) => {
  return realNameReg.test(value);
};

// 手机号正则
const phoneNumberReg = /^1[3456789]\d{9}$/;

/**
 * 判断是不是手机号
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isPhoneNumber = (value) => {
  return phoneNumberReg.test(value);
};
/**
 * 表单验证是不是一串已逗号分隔的手机号
 * @return {void}
 */
const phoneStrReg = /^1[3456789]\d{9}(?:,1[3456789]\d{9})*$/;
export const validatePhoneStr = (rule, value, callback) => {
  if (!phoneStrReg.test(value)) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
// 验证码正则
// const verificationCodeReg = /^\d{4,6}\b/

// 邮箱正则
const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

/**
 * 判断是不是邮箱
 * @param {String} value 参数描述
 * @return {Boolean}
 */
export const isEmail = (value) => {
  return emailReg.test(value);
};

/**
 * 判断是不是连接或者电话
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const passwordReg =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_~@#$^]+$)(?![a-z0-9]+$)(?![a-z\\W_~@#$^]+$)(?![0-9\\W_~@#$^]+$)[a-zA-Z0-9\\W_~@#$^]{6,16}$/;

export function isStrongPasswordReg(value) {
  return passwordReg.test(value);
}

export const formValidateIsStrongPassword = (rule, value, callback) => {
  if (!isStrongPasswordReg(value)) {
    callback(new Error("密码需使用大写字母、小写字母、数字及特殊字符至少三种"));
  } else {
    callback();
  }
};
