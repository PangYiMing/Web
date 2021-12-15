import fs from 'fs'
import path from 'path'

const uuid = require('uuid');
// console.log(uuid.v4())
// sync version

interface walkSyncProps {
    dirPath: string;
    callback: Function;
    maxDeep?: number;
}
interface readFileSystemProps {
    dirPath: string;
    callback: Function;
    maxDeep?: number;
    deep: number;
}

/**
 * 
 * @param walkSyncProps
 *  dirPath 指定tree的根目录
 *  callback 遇到文件或者文件夹的回调
 *  maxDeep 最大回调次数，默认-1（无限层级请设为-1）  ——可选
 * @returns 
 */
export function walkSync({
    dirPath, callback, maxDeep,
}: walkSyncProps) {
    readFileSystem({
        dirPath, callback, maxDeep, deep: 1
    })
}
/**
 * 
 * @param readFileSystemProps
 *  dirPath 指定tree的根目录
 *  callback 遇到文件或者文件夹的回调
 *  maxDeep 最大回调次数，默认-1（无限层级请设为-1）  ——可选
 *  deep 当前深度  ——可选
 * @returns 
 */
function readFileSystem({
    dirPath, callback, maxDeep, deep = 1
}: readFileSystemProps) {

    if (typeof dirPath !== 'string') {
        return
    } else if (!fs.existsSync(dirPath)) {
        console.error('readFileSystem fs error, file no exist', {
            dirPath, callback, maxDeep, deep
        })
        return
    }
    if (typeof maxDeep !== 'number') {
        maxDeep = -1
    } else if (maxDeep === 0) {
        console.error('readFileSystem maxDeep error, maxDeep invail', {
            dirPath, callback, maxDeep, deep
        })
        return
    }

    if (typeof deep !== 'number') {
        deep = 1
    } else if (deep <= 0) {
        console.error('readFileSystem deep error, deep invail', {
            dirPath, callback, maxDeep, deep
        })
        return
    }

    if (typeof callback !== 'function') {
        callback = function () { }
    }

    const fileArr = fs.readdirSync(dirPath)

    fileArr.forEach(function (name, index) {
        var filePath = path.join(dirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat, { deep, isEnd: (fileArr.length - 1) === index });
        } else if (stat.isDirectory()) {
            callback(filePath, stat, { deep, isEnd: (fileArr.length - 1) === index });
            if (maxDeep < 0 || maxDeep > deep) {
                readFileSystem({
                    dirPath: filePath, callback, maxDeep, deep: deep + 1
                });
            }
        }
    });
}
