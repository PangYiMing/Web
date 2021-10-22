
let countOkNum = [...document.body.innerText.matchAll(/OK/ig)].length

setInterval(()=>{
    const num  = [...document.body.innerText.matchAll(/OK/ig)].length
   console.log('num',num,[...document.body.innerText.matchAll(/OK/ig)])
    if (num>countOkNum&&num!=0) {
        console.log('gogogo')
        new Audio('https://downsc.chinaz.net/Files/DownLoad/sound1/202110/14893.mp3').play()
    }
    countOkNum= num

},1000)