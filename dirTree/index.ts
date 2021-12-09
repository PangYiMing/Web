import path from "path";
import { walkSync } from "./readDirPaths";
import { stringMul } from "./strUtils";
import { execAbortArr, strNotIncludeStringInArr } from "./utils";

const dirPath = path.resolve(__dirname, '../')

let abortArr: string[] = execAbortArr(['.git', 'node_modules'])

console.log('abortArr', abortArr)

function callback(filePath: string, stat: any, treeOpt: { deep: number; }) {
    const { deep } = treeOpt
    // do something with "filePath"...
    if (filePath && strNotIncludeStringInArr(filePath, abortArr)) {
        console.log(stringMul('  ', deep - 1) + '|' + filePath.split(path.sep).pop())
    }
}

walkSync({
    dirPath, callback, maxDeep: 3, deep: 1
});
