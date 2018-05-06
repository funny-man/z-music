const currency = {
    getTime: (time) => {
        let min = Math.floor(time / 60)
        let sec = Math.floor(time % 60)
        let minStr=min>=10? min:'0'+min
        let secStr=sec>=10? sec:'0'+sec
        return minStr+':'+secStr
    },
    leftDistance: (el) => {
        let left = el.offsetLeft;
        let scrollLeft;
        while (el.offsetParent) {
            el = el.offsetParent;
            left += el.offsetLeft;
        }
        scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        return left - scrollLeft;
    },
    ajax: (option) => {//传入的option是一个对象包括url和回调函数
        if (option.beforeSend) {
            option.beforeSend()
        }
        let url = option.url
        if (option.songId) {
            url += '?channel=' + option.songId
        }
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.readyState == 4 && (xhr.status >= '200' || xhr.status == '304')) {
                        let data = JSON.parse(xhr.responseText)
                        resolve(data)//当得到数据时候数据传入这个回调函数
                    } else {
                        reject(xhr.status);
                    }
                }
            }
            xhr.onerror = () => {
                reject('ajax error')//出现错误调用这个回调函数
            }
            xhr.open('get', url, true)
            xhr.send()
        })
    }
};
module.exports = currency