import path from 'path'
import fs from 'fs'
import uuid from 'uuid'



/*------- 初始数据

const docConfig = [{ "title": "docs", "type": "root", "id": null, "children": [{ "title": "im", "type": "directory", "id": "241", "children": [{ "title": "README", "type": "doc", "id": "838", "children": [] }] }, { "title": "im", "type": "directory", "id": "241", "children": [{ "title": "README", "type": "doc", "id": "838", "children": [] }] }] }]
*/
/* -----------------目标
module.exports = {
  mySidebar: [
    {
      type: 'category',
      label: '快速入门',
      items: [ {
        type: 'category',
        label: '快速入门',
        items: ['u6d4bu8bd51/u672au547du540du6587u6863'],
      }],GG
    },

  ],
}; */

function walkSync(currentDirPath, callback) {

    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (filePath.indexOf(path.sep + '.git') === -1 && filePath.indexOf(path.sep + 'node_modules') === -1) {

            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                callback(filePath, stat);
                walkSync(filePath, callback);
            }
        }
    });
}
const dirPath = 'E:\\work\\Web'
interface Element {
    type: string;
    items: any[]
    label: string;
}

function start() {

    const rootNodes = []
    let root: any[] = rootNodes

    // 深度优先遍历
    walkSync(dirPath, function (filePath, stat) {
        // do something with "filePath"...
        var relative = filePath.replace(dirPath + path.sep, '')
        const pathArr: string[] = relative.split(path.sep)
        console.log('path', pathArr)

        let node: Element | string

        if (stat.isDirectory()) {
            node = {
                label: pathArr[pathArr.length - 1],
                items: [],
                type: 'category'
            }
        } else {
            node = pathArr[pathArr.length - 1]
        }
        //  找到对应的节点，root是不断变化的

        console.log('rootNodes', rootNodes, 'path', pathArr)
        if (pathArr.length > 1) {
            root = getArrByStrPath(rootNodes, pathArr.slice(0, -1), 'label')
        } else {
            root = rootNodes
        }

        root.push(node)
        console.log('rootNodes result', rootNodes)


    });

    fs.writeFileSync(dirPath + '/目录大纲.rmf', JSON.stringify(rootNodes))

    console.log(JSON.stringify(rootNodes));

}

start()


function getArrByStrPath(root: any[], path: string[], key: string): any[] {
    let node = root

    for (let i = 0; i < path.length; i++) {

        const p = path[i]
        if (p === '') {
            return node
        }
        //  根据 label 找到数组
        console.log('getItemFromArrByKeyValue', node, key, p)
        // item有Element，string内部报错
        const [item, array, index] = getItemFromArrByKeyValue(node, key, p)
        // 结果不是Element. item.items不是数组一律报错，除非刚好是最后一个
        if (typeof item === 'object' && Array.isArray(item.items)) {
            // update node
            node = item.items
        } else {
            console.error(
                `Cannot find a descendant at path [${path}] in node: ${JSON.stringify(root)}`
            )
            return
        }

    }

    return node
}

/**
 * 跟数组中item的key和value拿到对应的item object。如果拿到string感觉没有用，因为str不可以被改，只有引用地址可以，直接报错
 * @param array 源数据数组
 * @param key 要找的key
 * @param value 要找的value，源数据数组中item的key的value和他相等时候会返回
 * @returns 
 */
export function getItemFromArrByKeyValue(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        const item: string | Element = array[i];
        if (typeof item === 'object' && item[key].toString() === value.toString()) {
            return [item, array, i]
        } /* else if (item === value.toString()) {
            return [item, array, i]
        } */
    }
    console.error(
        `Cannot find a descendant at path [${value}] in node: ${JSON.stringify(array)}`
    )
    return []
}