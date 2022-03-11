/*
 * @LastEditors: liu yang
 * @Description: 异步队列-顺序执行
 * @Date: 2021-11-18 22:53:26
 * @LastEditTime: 2022-03-11 10:54:36
 * @Author: liuyang
 */

const asyncQueue = () => {
  const list = []; // 队列
  let status = false;

  // 添加任务
  const add = (...fn) => {
    list.push(...fn);
    if (!status) {
      run();
    }
  };

  // 执行
  const run = async () => {
    if (status) return console.log("运行中...");
    status = true;
    while (list.length) {
      let fn = list.shift();
      await fn();
    }
    status = false;
  };

  // 返回一个对象
  return {
    add,
    run,
  };
};

// 生成异步任务
// const testAsync = (x) => {
//   return () =>
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(x);
//         resolve(x);
//       }, 1000);
//     });
// };

// const q = asyncQueue();
// const funs = "123".split("").map((x) => testAsync(x));
// console.log(funs);
// q.add(...funs);
// q.run();
// setTimeout(() => q.add(...funs), 6000);

export default asyncQueue();
