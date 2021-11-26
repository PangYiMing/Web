
interface Window {
    [key: string]: any;
}

window.countOkNum = 0


var interval = setInterval(() => {
    if (window.countOkNum < 30 * 60) {
        window.countOkNum += 1
        console.log('beat..', window.countOkNum)
    } else {
        window.countOkNum = 0
        new Audio('https://downsc.chinaz.net/Files/DownLoad/sound1/202110/14893.mp3').play()
        clearInterval(interval)
    }
}, 1000)