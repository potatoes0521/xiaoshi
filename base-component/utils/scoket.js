/*
 * @LastEditors: shenjilin
 * @Description: ...
 * @Date: 2022-03-10 15:39:32
 * @LastEditTime: 2022-03-10 15:39:50
 * @Author: shenjilin
 */

import EventCenter from "./eventCenter";
let instance = null;
class Ws {
  // 要连接的URL
  url;
  // 一个协议字符串或一个协议字符串数组。
  // 这些字符串用来指定子协议，这样一个服务器就可以实现多个WebSocket子协议
  protocols;
  // WebSocket 实例
  ws;
  // 是否在重连中
  isReconnectionLoading = false;
  // 延时重连的 id
  timeId = null;
  // 是否是用户手动关闭连接
  isCustomClose = false;
  // 错误消息队列
  errorStack = [];
  // 消息管理中心
  eventCenter = new EventCenter();

  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    this.createWs();
  }

  createWs() {
    if ("WebSocket" in window) {
      if (instance) return;
      instance = true;
      // 实例化
      this.ws = new WebSocket(this.url, this.protocols);
      // 监听事件
      this.onopen();
      this.onerror();
      this.onclose();
      this.onmessage();
    } else {
      console.log("你的浏览器不支持 WebSocket");
    }
  }

  // 监听成功
  onopen() {
    this.ws.onopen = () => {
      // console.log(this.ws, 'onopen')
      // 发送成功连接之前所发送失败的消息
      this.errorStack.forEach((message) => {
        this.send(message);
      });
      this.errorStack = [];
      this.isReconnectionLoading = false;
    };
  }

  // 监听错误
  onerror() {
    this.ws.onerror = (err) => {
      console.log(err, "onerror");
      this.reconnection();
      this.isReconnectionLoading = false;
    };
  }

  // 监听关闭
  onclose() {
    this.ws.onclose = () => {
      console.log("onclose");

      // 用户手动关闭的不重连
      if (this.isCustomClose) return;

      this.reconnection();
      this.isReconnectionLoading = false;
    };
  }

  // 接收 WebSocket 消息
  async onmessage() {
    this.ws.onmessage = (event) => {
      try {
        this.eventCenter.emit("message", event);
        // this.eventCenter.emit(data.type, data.data)
      } catch (error) {
        console.log(error, "error");
      }
    };
  }

  // 重连
  reconnection() {
    // 防止重复
    if (this.isReconnectionLoading) return;
    this.isReconnectionLoading = true;
    instance = null;
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.createWs();
    }, 3000);
  }

  // 发送消息
  send(message) {
    // 连接失败时的处理
    if (this.ws.readyState !== 1) {
      this.errorStack.push(message);
      return;
    }

    this.ws.send(message);
  }

  // 手动关闭
  close() {
    instance = null;
    this.isCustomClose = true;
    this.ws.close();
  }

  // 手动开启
  start() {
    this.isCustomClose = false;
    this.reconnection();
  }

  // 订阅
  subscribe(eventName, cb) {
    this.eventCenter.on(eventName, cb);
  }

  // 取消订阅
  unsubscribe(eventName, cb) {
    this.eventCenter.off(eventName, cb);
  }

  // 销毁
  destroy() {
    this.close();
    this.ws = null;
    this.errorStack = null;
    this.eventCenter = null;
  }
}

export default Ws;
