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
    return
}
export function getArrayFromArrByKeyValue(array, key, value) {
    const newArr = []
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item && Array.isArray(key)) {
            let value = item
            for (let i = 0; i < key.length; i++) {
                const cKey = key[i];
                value = value[cKey]
            }
            if (value.toString() === value.toString()) {
                newArr.push(item)
            }
        }
        else if (item && item[key].toString() === value.toString()) {
            newArr.push(item)
        }
    }
    return newArr
}

export function getArrFromArrByKey(array, key) {
    return array.map((it) => {
        return it[key]
    })
}
export function getStrArrFromArrByKey(array, key) {
    return array.map((it) => {
        return it[key].toString()
    })
}




// const arr = [
//     {
//         "docId": 718,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 11:12:14",
//         "modifyTime": "2021-08-16 11:12:14",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T03:12:14.439Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_718",
//         "isFile": true
//     },
//     {
//         "docId": 717,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 11:10:32",
//         "modifyTime": "2021-08-16 11:10:32",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T03:10:32.142Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_717",
//         "isFile": true
//     },
//     {
//         "docId": 716,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 11:10:03",
//         "modifyTime": "2021-08-16 11:10:03",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T03:10:03.312Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_716",
//         "isFile": true
//     },
//     {
//         "docId": 715,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 11:09:43",
//         "modifyTime": "2021-08-16 11:09:43",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T03:09:43.572Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_715",
//         "isFile": true
//     },
//     {
//         "docId": 714,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:35",
//         "modifyTime": "2021-08-16 10:58:35",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:35.896Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_714",
//         "isFile": true
//     },
//     {
//         "docId": 713,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:35",
//         "modifyTime": "2021-08-16 10:58:35",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:35.230Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_713",
//         "isFile": true
//     },
//     {
//         "docId": 712,
//         "title": "71222",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "tripdoc/712.json",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:34",
//         "modifyTime": "2021-08-16 11:00:40",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T03:00:40.560Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_712",
//         "isFile": true
//     },
//     {
//         "docId": 711,
//         "title": "711",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "tripdoc/711.json",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:33",
//         "modifyTime": "2021-08-16 10:59:36",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:59:36.043Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_711",
//         "isFile": true
//     },
//     {
//         "docId": 710,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:33",
//         "modifyTime": "2021-08-16 10:58:33",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:33.166Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_710",
//         "isFile": true
//     },
//     {
//         "docId": 709,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:32",
//         "modifyTime": "2021-08-16 10:58:32",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:32.607Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_709",
//         "isFile": true
//     },
//     {
//         "docId": 708,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:32",
//         "modifyTime": "2021-08-16 10:58:32",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:32.057Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_708",
//         "isFile": true
//     },
//     {
//         "docId": 707,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:31",
//         "modifyTime": "2021-08-16 10:58:31",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:31.434Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_707",
//         "isFile": true
//     },
//     {
//         "docId": 706,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:30",
//         "modifyTime": "2021-08-16 10:58:30",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:30.980Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_706",
//         "isFile": true
//     },
//     {
//         "docId": 705,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:29",
//         "modifyTime": "2021-08-16 10:58:29",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:29.577Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_705",
//         "isFile": true
//     },
//     {
//         "docId": 704,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:28",
//         "modifyTime": "2021-08-16 10:58:28",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:28.922Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_704",
//         "isFile": true
//     },
//     {
//         "docId": 703,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:28",
//         "modifyTime": "2021-08-16 10:58:28",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:28.254Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_703",
//         "isFile": true
//     },
//     {
//         "docId": 702,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:27",
//         "modifyTime": "2021-08-16 10:58:27",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:27.819Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_702",
//         "isFile": true
//     },
//     {
//         "docId": 701,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:26",
//         "modifyTime": "2021-08-16 10:58:26",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:26.943Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_701",
//         "isFile": true
//     },
//     {
//         "docId": 700,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:26",
//         "modifyTime": "2021-08-16 10:58:26",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:26.352Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_700",
//         "isFile": true
//     },
//     {
//         "docId": 699,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:25",
//         "modifyTime": "2021-08-16 10:58:25",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:25.758Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_699",
//         "isFile": true
//     },
//     {
//         "docId": 698,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:25",
//         "modifyTime": "2021-08-16 10:58:25",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:25.245Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_698",
//         "isFile": true
//     },
//     {
//         "docId": 697,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:24",
//         "modifyTime": "2021-08-16 10:58:24",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:24.246Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_697",
//         "isFile": true
//     },
//     {
//         "docId": 696,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:23",
//         "modifyTime": "2021-08-16 10:58:23",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:23.644Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_696",
//         "isFile": true
//     },
//     {
//         "docId": 695,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:22",
//         "modifyTime": "2021-08-16 10:58:22",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:22.803Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_695",
//         "isFile": true
//     },
//     {
//         "docId": 694,
//         "title": "未命名文档",
//         "mOwner": "TR005496-pym庞熠明",
//         "source": "",
//         "collaborator": "",
//         "createTime": "2021-08-16 10:58:22",
//         "modifyTime": "2021-08-16 10:58:22",
//         "historyId": 0,
//         "workSpace": "",
//         "summary": "",
//         "searchid": 0,
//         "searchtype": "",
//         "searchpath": "",
//         "treepath": [
//             "root"
//         ],
//         "tag": "",
//         "datachange_lasttime": "2021-08-16T02:58:22.104Z",
//         "parentId": null,
//         "delTime": "",
//         "key": "#doc_694",
//         "isFile": true
//     },

// ]

// console.log('this.state.orderedData', getItemFromArrByKeyValue(arr, 'docId', 694).title)

// export default {
//     getItemFromArrByKeyValue
// }