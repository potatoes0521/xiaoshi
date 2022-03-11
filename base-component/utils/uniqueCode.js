/*
 * @LastEditors: liu yang
 * @Description: 处理浏览器指纹
 * @Date: 2022-03-10 13:42:50
 * @LastEditTime: 2022-03-10 15:25:04
 * @Author: liu yang
 */

import { setLocal, getLocal } from "./storage";

export function createUniqueCode (app_code) {
  const visitorIdInLocal = getLocal(`${app_code}_visitorId`);
  if (visitorIdInLocal) {
    return visitorIdInLocal;
  } else {
    //一段产生canvas元素的javascript代码：
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const txt = companyName + "qishi";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "tencent";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    //获取绘画的内容，需要使用到canvas.toDataURL()方法，该方法返回的是图片内容的base64编码字符串。对于PNG文件格式，以块(chunk)划分，最后一块是一段32位的CRC校验，提取这段CRC校验码便可以用于用户的唯一标识：
    //.toDataURL()返回 "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
    const b64 = canvas.toDataURL().replace("data:image/png;base64,", ""); //提取CRC校验码
    const bin = atob(b64); //解码一个已经被base-64编码过的数据
    const crc = bin2hex(bin.slice(-16, -12)); //bin2hex() 函数是把ASCII 字符的字符串转换为十六进制值

    setLocal(`${app_code}_visitorId`, crc);
    return crc;
  }
};

function bin2hex(s) {
  let i;
  let l;
  let o = "";
  let n;

  s += "";

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? "0" + n : n;
  }

  return o;
}
