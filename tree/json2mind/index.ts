const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
import { data } from '../../data'
// console.log(uuid.v4())
// sync version
// function walkSync(currentDirPath, callback) {

//     fs.readdirSync(currentDirPath).forEach(function (name) {
//         var filePath = path.join(currentDirPath, name);
//         var stat = fs.statSync(filePath);
//         if (stat.isFile()) {
//             callback(filePath, stat);
//         } else if (stat.isDirectory()) {
//             callback(filePath, stat);
//             walkSync(filePath, callback);
//         }
//     });
// }


function walkSync2(curArr, callback, pathArr = []) {

    curArr.forEach(function (item, index) {
        // var filePath = path.join(curArr, name);
        // var stat = fs.statSync(filePath);

        if (item.isFile) {
            callback(item, item.isFile, [...pathArr, item.key]);
        } else {
            callback(item, item.isFile, [...pathArr, item.key]);
            walkSync2(item.children, callback, [...pathArr, item.key]);
        }
    });
}
const dirPath = path.resolve(__dirname, '../../')
const rootName = 'root'
const rootNodes = {
    "id": "rmind_root_node", "text": rootName, "showChildren": true, "children": [], key: 'shared-root'
}
let root: Element = rootNodes
data[0].children[0].title.props.children[0].props.children.props.title.props.children[0].props.children
walkSync2(data[0].children, function (item, isFile, pathArr) {
    // do something with "filePath"...
    // var relative = item.replace(dirPath + '/', '')
    // const pathArr: string[] = relative.split('/')
    // console.log('path', pathArr)
    const node = {
        "id": uuid.v4(), "text": item.title.props.children[0].props.children.props.title.props.children[0].props.children.replace('标题：', ''),
        "showChildren": true,
        "key": item.key,
        "children": [],
        // item: JSON.stringify(item),
        isDir: !isFile
    }
    // TODO 找到对应的节点
    if (pathArr.length !== 1) {
        // console.log('path', pathArr)
        root = getByKeyValue(rootNodes, pathArr.slice(0, -1), 'key')
    } else {
        root = rootNodes
    }
    root.children.push(node)



});
console.log(JSON.stringify(rootNodes));

fs.writeFileSync(dirPath + '/tree目录大纲.rmf', JSON.stringify(rootNodes))

interface Element {
    children: Element[]
    [key: string]: unknown
}

function getByKeyValue(root: Element, path: string[], key: string): Element {
    let node = root

    for (let i = 0; i < path.length; i++) {
        const p = path[i]
        // TODO 根据 text 找到数组
        node = getItemFromArrByKeyValue(node.children, key, p)
    }

    return node
}

/**
 * 跟数组中item的key和value拿到对应的item
 * @param array 源数据数组
 * @param key 要找的key
 * @param value 要找的value，源数据数组中item的key的value和他相等时候会返回
 * @returns 
 */
export function getItemFromArrByKeyValue(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item && item[key].toString() === value.toString()) {
            return item
        }
    }
    console.error(
        `Cannot find a descendant at path [${value}] in node: ${JSON.stringify(array)}`
    )
    return
}