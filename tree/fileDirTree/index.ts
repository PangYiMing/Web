import path from "path";
import { walkSync } from "../utils/readDirPaths";
import { stringMul, stringMulLastEnd } from "../utils/strUtils";
import { execAbortArr, strNotIncludeStringInArr } from "../utils/utils";

const dirPath = path.resolve(__dirname, '../../')

let abortArr: string[] = execAbortArr(['.git', 'node_modules'])

console.log('abortArr', abortArr)

let pre = undefined
function callback(filePath: string, stat: any, treeOpt: { deep: number; }) {
    const { deep } = treeOpt
    // do something with "filePath"...
    if (pre === undefined) {
        console.log(dirPath.split(path.sep).pop())
    }
    if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {
        if (stat.isFile()) {
            // console.log('  | ' + stringMul('    ', deep - 1) + filePath.split(path.sep).pop())
            console.log('  |' + stringMulLastEnd('    |', deep - 1, deep === 1 ? '--' : '--') + filePath.split(path.sep).pop())
        } else {
            // console.log('  | ' + stringMul('    ', deep - 1) + filePath.split(path.sep).pop())
            if (pre !== undefined && pre) {
                console.log('  |' + stringMulLastEnd('    |', deep - 1, '--') + filePath.split(path.sep).pop())

            } else {
                console.log('  |' + stringMulLastEnd('    |', deep - 1, '--') + filePath.split(path.sep).pop())

            }
        }
    }
    pre = stat.isFile()

}

walkSync({
    dirPath, callback, maxDeep: 3
});
