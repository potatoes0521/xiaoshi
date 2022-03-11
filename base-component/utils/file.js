/*
 * @LastEditors: liu yang
 * @Description: 文件相关
 * @Date: 2022-03-10 11:46:44
 * @LastEditTime: 2022-03-10 14:37:49
 * @Author: liu yang
 */
/**
 * @Author: liu yang
 * @Date: 2021-10-26 14:32:12
 * @description: 从url获取文件名
 * @param {String} url 文件路径/带有后缀的文件
 * @return {String} 文件名
 */
export function getFilenameFromUrl(url) {
  const pathname = url.replace(/(.*\/)*([^.]+)/i, "$2");
  return pathname;
};

/**
 * @Author: liu yang
 * @Date: 2021-10-26 14:32:53
 * @description: 下载文件
 * @param {String} url 要下载的文件
 * @return {void}
 */
export function downloadFile (url, name) {
  const elt = document.createElement("a");
  elt.setAttribute("href", url);
  const fileName = name || getFilenameFromUrl(url);
  elt.setAttribute("download", fileName);
  elt.style.display = "none";
  document.body.appendChild(elt);
  elt.click();
  document.body.removeChild(elt);
};
