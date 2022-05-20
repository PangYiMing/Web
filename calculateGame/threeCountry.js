/*
 * @Author: pym
 * @Date: 2022-04-01 21:59:47
 * @LastEditors: pym
 * @Description: TODO xxx
 * @LastEditTime: 2022-04-02 00:04:24
 */
// calculate common attack
// 每12次伤害计算


const params = {
    doubleHit: 0.35, // 暴击概率
    commonAttack: 2.2, // 普通攻击增幅
    commonAttackRate: 0, // 普通攻击增幅
    extraCommonAttack: 0, // 额外的普通攻击
    treasure1: {
        ready: function () {

        },
        go: function () {

        },
    },
    treasures: [],



    ready: function () {

    }
}
function lifeCycle() {
    let person = []
    let count = 12
    function init() {
        person = [params]

    }
    function ready() {
        params.ready()
    }
    function go() {
        for (let i = 1; i <= params.count; i++) {
            hurt += jinqiang(params, i)
            hurt += shuangqiang(params, i)
            hurt += commonAttck(params)
        }

        console.log(hurt)
    }

    init()
    ready()
    go()
}


let hurt = 0
// 双枪
function shuangqiang(params, count) {
    console.log(`shuangqiang ${count} % ${4}:`, count % 4)
    if (count % 4 === 0) {
        return 2.6 * params.commonAttack
    }
    return 0
}
// 金枪
function jinqiang(params, count) {
    const rate = 0.2 + params.commonAttackRate
    const AttackCount = 1 / rate
    // console.log(`jinqiang ${count} % ${AttackCount}:`, count % AttackCount)
    if (count % AttackCount === 0) {
        return commonAttck(params)
    }
    return 0
}
function jinqiangPre(params) {
    params.commonAttack += 0.9
}

function commonAttck(params) {
    console.log('commonAttck', params.commonAttack)
    return params.commonAttack
}
jinqiangPre(params)
console.log('params jinqiangPre', params)



//  hurt = (params.commonAttack * params.count + params.extraCommonAttack * params.commonAttack) * (doubleHit + 1)
