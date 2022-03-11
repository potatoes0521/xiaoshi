/*
 * @LastEditors: liu yang
 * @Description: 纯数组类型数据   线性数据对线性数据的处理  不存在树形结构
 * @Date: 2022-03-10 11:14:23
 * @LastEditTime: 2022-03-10 14:36:56
 * @Author: liu yang
 */
/**
 * 将一个数组转化为map类型
 * @param {Array[Object]} arrayData
 * @param {String} idKey='id' 关键字
 * @return {Map} map类型的数据
 */
/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:15:12
 * @description: 线性数据换成hashmap结构
 * @param {Array} arrayData 要处理的数组
 * @param {String} [idKey = 'id'] 关键字
 * @return {Object}
 */
export function arrayToMapBy({ arrayData, idKey = "id" }) {
  const mapData = arrayData.reduce(
    (res, item) => ({
      ...res,
      [item[idKey]]: item,
    }),
    {}
  );
  return mapData;
};