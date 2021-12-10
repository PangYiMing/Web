import fs from 'fs'
import path from 'path'

const uuid = require('uuid');
// console.log(uuid.v4())
// sync version
export function walkSync({
    dirPath, callback, maxDeep, deep
}) {

    if (typeof dirPath !== 'string') {
        return
    } else if (!fs.existsSync(dirPath)) {
        console.error('walkSync fs error, file no exist', {
            dirPath, callback, maxDeep, deep
        })
        return
    }
    if (typeof maxDeep !== 'number') {
        maxDeep = -1
    } else if (maxDeep <= 0) {
        console.error('walkSync maxDeep error, maxDeep invail', {
            dirPath, callback, maxDeep, deep
        })
        return
    }

    if (typeof deep !== 'number') {
        deep = 1
    } else if (deep <= 0) {
        console.error('walkSync deep error, deep invail', {
            dirPath, callback, maxDeep, deep
        })
        return
    }

    if (typeof callback !== 'function') {
        callback = function () { }
    }



    fs.readdirSync(dirPath).forEach(function (name) {
        var filePath = path.join(dirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat, { deep });
        } else if (stat.isDirectory()) {
            callback(filePath, stat, { deep });
            if (maxDeep < 0 || maxDeep > deep) {
                walkSync({
                    dirPath: filePath, callback, maxDeep, deep: deep + 1
                });
            }
        }
    });
}
