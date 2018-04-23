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
        if (option.beforeSend) {
            option.beforeSend();
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.readyState == 4 && (xhr.status == '200' || xhr.status == '304')) {
                    let data = JSON.parse(xhr.responseText)
                    if (option.success) {
                        option.success(data);
                    }
                } else {
                    if (option.fail) {
                        option.fail(xhr.status);
                    }
                }
            }

        };
        xhr.open('GET', option.url);
        xhr.send();
    }
};
module.exports = currency