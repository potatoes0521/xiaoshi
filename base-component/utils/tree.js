/*
 * @LastEditors: liu yang
 * @Description: 树形 / 线性  工具
 * @Date: 2022-03-10 10:10:28
 * @LastEditTime: 2022-03-10 11:47:41
 * @Author: liu yang
 */

// https://www.lodashjs.com/docs/lodash.unionBy
import _uniqBy from "lodash/unionBy";
// https://www.lodashjs.com/docs/lodash.differenceBy
import _differenceBy from "lodash/differenceBy";
// https://www.lodashjs.com/docs/lodash.orderBy#_orderbycollection-iteratees_identity-orders
import _orderBy from "lodash/orderBy";
// https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue
import _cloneDeep from "lodash/cloneDeep";

import { arrayToMapBy } from './array'

/**
 * @Author: liu yang
 * @Date: 2022-03-10 10:12:59
 * @description: 线性数据转树形
 * change: 
 *    1. 以前会带着父节点数据在parent 字段 => 现在通过 params.needParent 判断要不要带父节点数据
 *    2. params.orderBy 可以传入数组一起进行排序了  详情可以看相关文档
 * @param {Object} params = {} 参数
 * @param {Array} params.list = [] 要处理的线性数据
 * @param {String} [params.key] = "menuId" key 当前项的ID
 * @param {String} [params.Pkey] = "menuPid" key 用来判断父节点的ID
 * @param {Array, String} [params.orderBy] = ["order"] 排序的key 使用lodash/orderBy进行排序  可以按照多个字段综合排序 
 *    https://www.lodashjs.com/docs/lodash.orderBy#_orderbycollection-iteratees_identity-orders
 * @param {Array} [params.orderType] = ["asc"] 排序是升序还是降序  "desc" 降序， "asc" 升序
 * @param {String} [params.needParent] = false 是否需要父级节点数据 不推荐需要 容易造成数据臃肿 JSON.stringify(data) 的时候会报错
 * @param {String, Number} [params.pDefaultValue] = 0 默认顶层目录的值   比如 pid = 0  他就是顶级
 * @param {String} [params.childrenKey] = "children" 按照 key 创建子项
 * @param {String, Array, Number, Boolean} [params.childrenDefaultValue] = null 默认子节点的值 一般用于叶节点是否需要加个下级
 * @return {Array} 返回树形数据
 */
export function listToTree({
  list,
  key = "menuId",
  Pkey = "menuPid",
  orderBy = "order",
  orderType = ["asc"],
  needParent = false,
  pDefaultValue = 0,
  childrenKey = "children",
  childrenDefaultValue = null,
}) {
  let root = {};
  root[key] = pDefaultValue;
  root[Pkey] = pDefaultValue;
  root[childrenKey] = [];
  const group = {};
  for (let index = 0; index < list.length; index += 1) {
    if (!list[index][Pkey]) list[index][Pkey] = pDefaultValue || 0;
    if (list[index][Pkey] !== null && list[index][Pkey] !== undefined) {
      if (!group[list[index][Pkey]]) {
        group[list[index][Pkey]] = [];
      }
      group[list[index][Pkey]].push(list[index]);
    }
  }
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    node[childrenKey] =
      group[node[key]] && group[node[key]].length
        ? group[node[key]]
        : childrenDefaultValue;
    if (node[childrenKey]) {
      node[childrenKey] = _orderBy(node[childrenKey], orderBy, orderType).map(
        (item, index) => ({
          ...item,
          index, // 当前下标
          parent: needParent ? node : null, // 父级节点
          parentChildrenLength: node.length, // 父级节点的长度
        })
      );
      queue.push(...node[childrenKey]);
    }
  }
  return root[childrenKey];
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 10:39:33
 * @description: 树形数据转线性
 * @param {Array} arr 要处理的树形数据
 * @param {String} [key = "children"]  子项key
 * @param {String} [pkey] 生成一个 父级ID的key
 * @return {Array} 返回线性数据
 */
export function treeToList(arr, key = "children", pkey) {
  let queen = [];
  let result = [];
  queen = _cloneDeep(arr);
  while (queen.length) {
    let item = queen.shift();

    if (item[key]) {
      // 生成一个 父级的key  
      // 类似于动态组件那  需要父节点的后端id  然后又需要前端自己生成的uuid 和知道 当前节点的puuid
      if (pkey) {
        item[key] = item[key].map((ite) => ({
          ...ite,
          ["p" + pkey]: item[pkey],
        }));
      }
      // 根据ID 生成 pid  如果本身数据没有ID这个字段正好用上面这个 pkey 搞一个
      if (item["id"]) {
        item[key] = item[key].map((ite) => ({
          ...ite,
          pid: item["id"] || 0,
        }));
      }
      queen = queen.concat(item[key]);
      delete item[key];
    }

    result.push(item);
  }
  return result;
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 10:53:31
 * @description: 树形数据转为线性数据  只保留叶节点数据  父级节点全部都不保留的
 * @param {Array} arr 要处理的树形数据
 * @param {String} [key = "children"] 子项key
 * @return {Array} 线性数据
 */
export function flatten(arr, key = "children") {
  if (!arr || !arr.length) return [];
  return (
    arr.reduce((result, item) => {
      return result.concat(
        Array.isArray(item[key]) ? flatten(item[key]) : item
      );
    }, []) || []
  );
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:05:50
 * @description: 根据目标数据查找到相同/不同的数据 
 *  eg:
 *    const arr1 = [ 1, 2, 3, 4, 5]
 *    const arr2 = [ 2, 3]
 *    const {same, different} = findSameDifferent(arr1, arr2)
 *    same // [2, 3]
 *    different // [1, 4, 5]
 *  change:
 *    1. 返回值key变换
 *      targetArr => same
 *      lastArr => different
 *    2. 函数Name handleCancelCheckedByArr => findSameDifferent
 * @param {Array} arr1 目标数据
 * @param {Array} arr2 查找数据
 * @param {String} [sameKey = "id"] 查找同一数据数据的key
 * @param {String} [uniqKey = "same"] 去重数据的key
 * @return {Object} result
 * @return {Array} result.same 相同的数据
 * @return {Array}  result.different 不同的数据
 */
export function findSameDifferent(
  List,
  List2,
  sameKey = "id",
  uniqKey = "id"
) {
  let same = [];
  const mapData = List.reduce(
    (res, item) => ({
      ...res,
      [item]: item,
    }),
    {}
  );
  List2.forEach((item) => {
    for (const ite of item[sameKey]) {
      if (ite in mapData) {
        item.checked = false;
        same.push(item);
      }
    }
  });
  return {
    same: _uniqBy(same, uniqKey) || [],
    different: _differenceBy(List2, same, uniqKey) || [],
  };
}

/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:18:43
 * @description: 处理同步选中
 *  一般应用于处理根据线性数据选中tree里面的某一部分数据
 *  会直接修改原数据
 * @param {Array[Object]} needCleanData 需要处理的树形数据
 * @param {Array[Object]} checkedData 需要参照处理的线性数据
 * @param {String} [statusKey='checked'] 需要处理的属性
 * @param {String} [idKey='id'] 关键字
 * @return {void}
 */
export function SyncSelection({
  needCleanData,
  checkedData,
  statusKey = "checked",
  idKey = "id",
}) {
  if (!needCleanData || !needCleanData.length) {
    return;
  }
  const mapData = arrayToMapBy(checkedData, idKey);
  handleCheck({
    needCleanData,
    mapData,
    statusKey,
    idKey,
  });
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:19:50
 * @description: 递归处理选中态
 * @param {Array[Object]} arr 要处理的数据
 * @param {Map} mapData map类型的参照数据
 * @param {String} [statusKey='checked'] 需要处理的属性
 * @param {String} [idKey='id'] 关键字
 * @return {void}
 */
function handleCheck({
  needCleanData,
  mapData,
  statusKey = "checked",
  idKey = "id",
}) {
  for (const item of needCleanData) {
    if (item.children) {
      handleCheck({
        needCleanData: item.children,
        mapData,
        statusKey,
        idKey,
      });
    }
    if (item[idKey] in mapData) {
      item[statusKey] = true;
    } else {
      item[statusKey] = false;
    }
  }
};

/**
 * 根据目标查找tree里面所有路径

 * @return {Object}

 */
/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:31:19
 * @description: 根据关键字查找tree里面所有路径
 * @param {Array[Object]} tree 参数描述
 * @param {Number | String} idNum 参数描述
 * @param {String} idKey='id' 参数描述
 * @return {Object} result
 * @return {Object} result.path
 * @return {Object} result.pathList
 *  path = [path1, path2, path3, ...]
 *  pathList = [...path1, ...path2, ...path3, ...xxx]
 */
export function findAllPathById(tree, idNum, idKey = "id") {
  if (!tree || !tree.length || isNaN(idNum)) {
    return {
      path: [],
      pathList: [],
    };
  }
  let path = [];
  let pathList = [];
  const findPath = (tree, idNum, arr) => {
    for (let i = 0; i < tree.length; i++) {
      let tempPath = [...arr];
      tempPath.push(tree[i][idKey]);
      if (tree[i][idKey] === idNum) {
        return tempPath;
      }
      if (tree[i].children) {
        let result = findPath(tree[i].children, idNum, tempPath);
        if (result) {
          path.push(result);
          pathList = [...pathList, ...result];
        }
      }
    }
  };
  findPath(tree, idNum, []);
  return {
    path,
    pathList,
  };
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:24:51
 * @description: 根据目标查找tree里面单条路径
 *  change:
 *    1. allData => needData 
 * @param {Array[Object]} tree 树形数据
 * @param {Number | String} idNum 关键字
 * @param {String} [idKey='id'] 关键字的key
 * @param {String} arr 保存数据用的变量
 * @param {String} [needData] 是否要数据
 * @return {Array} [xxx, xxx, xxx, id] 路径
 */
export function findOnePathById({
  tree,
  idNum,
  idKey = "id",
  arr = [],
  needData = false,
}) {
  if (!tree || !tree.length || isNaN(idNum)) {
    return [];
  }
  for (let i = 0; i < tree.length; i++) {
    let tempPath = [...arr];
    if (needData) {
      tempPath.push(tree[i]);
    } else {
      tempPath.push(tree[i][idKey]);
    }
    if (tree[i][idKey] === idNum) {
      return tempPath;
    }
    if (tree[i].children) {
      let result = findOnePathById({
        tree: tree[i].children,
        idNum,
        idKey,
        arr: tempPath,
        needData,
      });
      if (result) {
        return result;
      }
    }
  }
};

/**
 * @Author: liu yang
 * @Date: 2021-11-20 10:55:40
 * @description: 删除所有空数组的节点
 * @param {Array} treeData 树形数据
 * @param {String} childrenKey 子节点的key
 * @return {Array} 处理后的数据
 */
export function deleteEmptyChildren(treeData, childrenKey = "children") {
  if (treeData.length) {
    treeData.forEach((ele) => {
      if (Array.isArray(ele[childrenKey]) && ele[childrenKey].length) {
        deleteEmptyChildren(ele[childrenKey]);
      } else {
        delete ele[childrenKey];
      }
    });
  }
  return treeData;
};

/**
 * @Author: liu yang
 * @Date: 2021-11-20 10:55:16
 * @description: 根据ID  删除当前树节点和他的子节点
 * @param {Array} treeData
 * @param {String} id
 * @return {Array} 处理后的数据
 */
export function deleteLikeIdInTree(treeData, id) {
  let newData = treeData.filter((x) => x.id !== id);
  newData.forEach(
    (x) => x.children && (x.children = deleteLikeIdInTree(x.children, id))
  );
  return newData;
};

/**
 * @Author: liu yang
 * @Date: 2022-03-10 11:43:40
 * @description: 处理el-tree显示子节点数量，输入树结构节点，获取节点下所有子节点数量
 * @param {Object[Node]} node el-tree树结构节点
 * @return {Number}
 */
export function childNodesNum(node) {
  if (!(node && node.data)) return 0;
  if (node.data.length <= 0) return 0;
  let nums = 0;
  let queue = [{ ...node }];
  while (queue.length) {
    let item = { ...queue.shift() };
    if (item.childNodes && [...item.childNodes].length > 0) {
      queue.push(...item.childNodes);
    }
    if ([...item.childNodes].length === 0) {
      if (item.visible) {
        nums++;
      }
    }
  }
  return nums;
};