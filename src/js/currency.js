console.log('currency')
const currency = {
    // leftDistance: (el) => {
    //     let left = el.offsetLeft;
    //     let scrollLeft;
    //     while (el.offsetParent) {
    //         el = el.offsetParent;
    //         left += el.offsetLeft;
    //     }
    //     scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    //     return left - scrollLeft;
    // },
    // timeFormat: (time) => {
    //     let tempMin = parseInt(time / 60);
    //     let tempSec = parseInt(time % 60);
    //     let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
    //     let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
    //     return curMin + ':' + curSec;
    // },
    // percentFormat: (percent) => {
    //     return (percent * 100).toFixed(2) + '%';
    // },
    ajax: (option) => {//传入的option是一个对象包括url和回调函数
        if(option.beforeSend){
            option.beforeSend()
        }
        let url=option.url
        if(option.songId){
            url+='?channel='+option.songId
        }
        console.log(url)
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.readyState == 4 && (xhr.status >= '200' || xhr.status == '304')) {
                        let data = JSON.parse(xhr.responseText)
                        resolve(data)//当得到数据时候数据传入这个回调函数
                    }else {
                        reject(xhr.status);
                    }
                }
            }
            xhr.onerror=()=>{
                reject('ajax error')//出现错误调用这个回调函数
            }
            xhr.open('get', url, true)
            xhr.send()
        })



        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4) {
        //         if (xhr.readyState == 4 && (xhr.status == '200' || xhr.status == '304')) {
        //             let data = JSON.parse(xhr.responseText)
        //             if (option.success) {
        //                 option.success(data);
        //             }
        //         } else {
        //             if (option.fail) {
        //                 option.fail(xhr.status);
        //             }
        //         }
        //     }

        // };
        // xhr.open('GET', option.url);
        // xhr.send();
    }
};
module.exports = currency