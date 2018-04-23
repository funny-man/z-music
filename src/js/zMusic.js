import '../sass/style.scss'
let currency = require('./currency')
let template = require('./template')

const albumUrl = 'http://api.jirengu.com/fm/getChannels.php'
const songUrl = 'http://api.jirengu.com/fm/getSong.php'
const lyricUrl = 'http://api.jirengu.com/fm/getLyric.php'
class zMusic {
    constructor(data) {
        this.ct = document.getElementById('z-music')



        this.ct.innerHTML = template()

        currency.ajax({
            url: songUrl,
            beforeSend: () => {
                console.log('正在拉取数据')
            },
            success: (data) => {
                console.log('成功获得数据'+':')
                console.log(data)
            },
            fail: (state) => {
                console.log('出错啦'+state)
            }
        })
    }
    // init() {
    // }
    // bind() {
    // }
}
module.exports = zMusic