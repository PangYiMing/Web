import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { walkSync } from "../../utils/readDirPaths";

// console.log(uuidv4())
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
const dirPath = path.resolve(__dirname, '../../../')

const rootName = 'Web'
const rootNodes = {
    "id": "rmind_root_node", "text": rootName, "showChildren": true, "children": []
}
let root: Element = rootNodes
walkSync({
    dirPath, callback: function (filePath, stat) {
        // do something with "filePath"...
        if (filePath.indexOf(dirPath + '/.git') === -1) {
            var relative = filePath.replace(dirPath + '/', '')
            const pathArr: string[] = relative.split('/')
            // console.log('path', pathArr)

            const node = {
                "id": uuidv4(), "text": pathArr[pathArr.length - 1],
                "showChildren": true,
                "children": [],
                filePath: relative,
                isDir: stat.isDirectory()
            }
            // TODO 找到对应的节点
            if (pathArr.length !== 1) {
                // console.log('path', pathArr)
                root = getByKeyValue(rootNodes, pathArr.slice(0, -1), 'text')
            } else {
                root = rootNodes
            }
            root.children.push(node)


        }

    }, maxDeep: -1
});
console.log(JSON.stringify(rootNodes));

fs.writeFileSync(dirPath + '/目录大纲.rmf', JSON.stringify(rootNodes))

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