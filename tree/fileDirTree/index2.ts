import path from "path";
import { walkSync } from "./readDirPaths";
import { stringMul, stringMulLastEnd } from "./strUtils";
import { execAbortArr, strNotIncludeStringInArr } from "./utils";

const dirPath = path.resolve(__dirname, '../../')

let abortArr: string[] = execAbortArr(['.git', 'node_modules'])

console.log('abortArr', abortArr)

let isFirst = true
let dirTreeArr = []
function callback(filePath: string, stat: any, treeOpt: { deep: number; isEnd: boolean; }) {
    const { deep, isEnd } = treeOpt
    // do something with "filePath"...
    if (isFirst) {
        console.log(dirPath.split(path.sep).pop())
    }
    if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {
        dirTreeArr.push({
            filePath, stat, treeOpt
        })
        console.log('  ' + stringMulLastEnd('│    ', deep - 1, isEnd ? '└─' : '├─') + filePath.split(path.sep).pop())
    }
    isFirst = false

}

walkSync({
    dirPath, callback, maxDeep: 3, deep: 1
});

function print(arr: any[]) {

}







// var nodeSign = '├';
// var dashSign = '─';
// var bordSign = '└';
// var vertSign = '│';


// import path from "path";
// import { walkSync } from "./readDirPaths";
// import { stringMul, stringMulLastEnd } from "./strUtils";
// import { execAbortArr, strNotIncludeStringInArr } from "./utils";

// const dirPath = path.resolve(__dirname, '../../')

// let abortArr: string[] = execAbortArr(['.git', 'node_modules'])

// console.log('abortArr', abortArr)

// // 前面是否有文件。默认0，代表没有文件。 1 代表有文件， 2 代表有文件夹
// let preStatus = 0
// function callback(filePath: string, stat: any, treeOpt: { deep: number; isEnd: boolean; }) {
//     const { deep, isEnd } = treeOpt
//     // do something with "filePath"...
//     if (preStatus === 0) {
//         console.log(dirPath.split(path.sep).pop())
//     }
//     if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {
//         if (stat.isFile()) {
//             console.log('  |' + stringMulLastEnd('    |', deep - 2, isEnd ? '    └─' : '    ├─') + filePath.split(path.sep).pop())
//         } else {
//             console.log('  |' + stringMulLastEnd('    |', deep - 2, isEnd ? '    └─' : '    ├─') + filePath.split(path.sep).pop())
//         }
//     }
//     preStatus = stat.isFile()

// }

// walkSync({
//     dirPath, callback, maxDeep: 3, deep: 1
// });
