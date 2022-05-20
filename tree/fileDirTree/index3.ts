import path from "path";
import { walkSync } from "../utils/readDirPaths";
import { stringMul, stringMulLastEnd } from "../utils/strUtils";
import { execAbortArr, strNotIncludeStringInArr } from "../utils/utils";

// TODO 如果指定层级在当前行无下一个子元素应该为空格缩进，如果当前行是最后一个子元素应该是回车符号+空格缩进，如果其他，应该是竖线+空格缩进
const dirPath = path.resolve(__dirname, '../../')

let abortArr: string[] = execAbortArr(['.git', 'node_modules'])

console.log('abortArr', abortArr)

let isFirst = true
function callback(filePath: string, stat: any, treeOpt: { deep: number; isEnd: boolean; parent: any; }) {
    const { deep, isEnd, parent } = treeOpt
    // do something with "filePath"...
    if (isFirst) {
        console.log(dirPath.split(path.sep).pop())
    }
    if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {

        let printStr = '  '
        if (!parent.isEndArr) {
            parent.isEndArr = []
        }
        for (let i = 0; i < parent.isEndArr.length; i++) {
            const isEndEL = parent.isEndArr[i];
            printStr = printStr + (isEndEL ? '     ' : '│    ')
        }

        printStr = printStr + (isEnd ? '└─' : '├─')
        console.log(printStr + filePath.split(path.sep).pop())
    }
    isFirst = false

}

walkSync({
    dirPath, callback, maxDeep: 5
});








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
