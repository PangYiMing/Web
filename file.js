"use strict";
exports.__esModule = true;
exports.getItemFromArrByKeyValue = void 0;
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
// console.log(uuid.v4())
// sync version
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        }
        else if (stat.isDirectory()) {
            callback(filePath, stat);
            walkSync(filePath, callback);
        }
    });
}
var dirPath = '/Users/lyndonpang/workspace/Web';
var rootName = 'Web';
var rootNodes = {
    "id": "rmind_root_node", "text": rootName, "showChildren": true, "children": []
};
var root = rootNodes;
walkSync(dirPath, function (filePath, stat) {
    // do something with "filePath"...
    if (filePath.indexOf(dirPath + '/.git') === -1) {
        var relative = filePath.replace(dirPath + '/', '');
        var pathArr = relative.split('/');
        // console.log('path', pathArr)
        var node = {
            "id": uuid.v4(), "text": pathArr[pathArr.length - 1],
            "showChildren": true,
            "children": [],
            filePath: relative,
            isDir: stat.isDirectory()
        };
        // TODO 找到对应的节点
        if (pathArr.length !== 1) {
            // console.log('path', pathArr)
            root = getByKeyValue(rootNodes, pathArr.slice(0, -1), 'text');
        }
        else {
            root = rootNodes;
        }
        root.children.push(node);
    }
});
console.log(JSON.stringify(rootNodes));
fs.writeFileSync(dirPath + '/目录大纲.rmf', JSON.stringify(rootNodes));
function getByKeyValue(root, path, key) {
    var node = root;
    for (var i = 0; i < path.length; i++) {
        var p = path[i];
        // TODO 根据 text 找到数组
        node = getItemFromArrByKeyValue(node.children, key, p);
    }
    return node;
}
/**
 * 跟数组中item的key和value拿到对应的item
 * @param array 源数据数组
 * @param key 要找的key
 * @param value 要找的value，源数据数组中item的key的value和他相等时候会返回
 * @returns
 */
function getItemFromArrByKeyValue(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item && item[key].toString() === value.toString()) {
            return item;
        }
    }
    console.error("Cannot find a descendant at path [" + value + "] in node: " + JSON.stringify(array));
    return;
}
exports.getItemFromArrByKeyValue = getItemFromArrByKeyValue;
