/*
 * @LastEditors: liu yang
 * @Description: 各种html render
 * @Date: 2022-03-10 13:39:47
 * @LastEditTime: 2022-03-10 14:38:41
 * @Author: liu yang
 */

/**
 * @Author: liu yang
 * @Date: 2022-03-10 13:39:55
 * @description: 对话框
 * @param {String} icon icon
 * @param {String} message 内容
 * @param {String} title 标题
 * @return {String}
 */
export const messageContentRender = ({
  icon,
  title = "提示",
  message = "",
}) => {
  return `
    <div class="message-box-wrapper">
      <div class="message-title">
        <span class="${icon} message-icon-style"></span>
        <span>${title}</span>
      </div>
      <div class="message-content">
        ${message}
      </div>
    </div>
  `;
};
