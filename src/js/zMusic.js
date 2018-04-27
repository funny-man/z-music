console.log('Z-Music 1.0')
import '../sass/style.scss'
let currency = require('./currency')
let template = require('./template')


const albumUrl = '//api.jirengu.com/fm/getChannels.php'
const songUrl = '//api.jirengu.com/fm/getSong.php'
const lyricUrl = '//api.jirengu.com/fm/getLyric.php'
class zMusic {
    constructor() {
        this.ct = document.getElementById('z-music')

        this.albumData = {}
        this.songData = {}
        this.albumIndex = 0 //默认专辑列表
        this.music = new Audio()

        this.ct.innerHTML = '<div class="zmusic-loading"><p>LOADING...</p></div>';
        currency.ajax({
            url: albumUrl,
            beforeSend: () => { console.log('正在获取专辑数据') }
        }).then((data) => {
            console.log('成功获得专辑数据')
            this.albumData = data.channels
            return currency.ajax({
                url: songUrl,
                songId: this.albumData[this.albumIndex].channel_id,
                beforeSend: () => { console.log('正在获取歌曲数据') }
            })
        }, (err) => {
            console.log('获取专辑好像出错了!状态码:' + err)
        }).then((data) => {
            console.log('成功获得歌曲数据')
            this.songData = data.song
            this.ct.innerHTML = template.call(this)
            this.music.src = this.songData[0].url
            this.play()
            this.init()
            this.bind()
        }, (err) => {
            console.log('获取歌曲好像出错了!状态码:' + err)
        })
    }
    init() {
        console.log('init')
        this.dom = {
            albums: this.ct.querySelectorAll('.list-ct>ul>li'),
            albumCt: this.ct.querySelector('.list-ct>ul'),
            btn_play: this.ct.querySelector('.btns>.play'),
            btn_next: this.ct.querySelector('.btns>.next'),
            btn_loop: this.ct.querySelector('.btns>.loop'),
            time_cur: this.ct.querySelector('.line>.play-time>.cur'),
            time_total: this.ct.querySelector('.line>.play-time>.total'),

        }
        this.layout()// 通过js设置album-list的宽度
    }
    bind() {
        console.log('bind')
        // this.updateLine = () => {
        //     let percent = this.audio.buffered.length ? (this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration) : 0;
        //     this.dom.timeline_loaded.style.width = Util.percentFormat(percent);
        // };

        this.music.addEventListener('durationchange', (e) => { //duration属性（媒体总播放时间）改变触发

            console.log(new Date(this.music.duration))
            this.dom.time_total.innerHTML = this.music.duration
            // this.dom.timetext_total.innerHTML = Util.timeFormat(this.audio.duration);
            // this.updateLine();
        });
        let shouldUpdate = true
        this.music.addEventListener('timeupdate', (e) => {//currentTime（已播放时间）不合理或意外方式更新触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次
            if (shouldUpdate) {
                shouldUpdate = false
                setTimeout(() => {
                    console.log(this.music.currentTime)
                    this.dom.time_cur.innerHTML = this.music.currentTime
                    shouldUpdate = true
                }, 1000)
            }
            // let percent = this.audio.currentTime / this.audio.duration;
            // this.dom.timeline_played.style.width = Util.percentFormat(percent);
            // this.dom.timetext_played.innerHTML = Util.timeFormat(this.audio.currentTime);
        });
        // this.music.addEventListener('progress', (e) => { //正在下载
        //     // this.updateLine();
        // });
        // this.music.addEventListener('canplay', (e) => { //缓存达到可以播放时候触发
        //     // if(this.option.autoplay && !this.isMobile){
        //     //     this.play();
        //     // }
        // });

        // this.music.addEventListener('seeked', (e) => {
        //     // this.play();
        // });
        // this.music.addEventListener('ended', (e) => {
        //     // this.next();
        // });
        //---

        this.dom.btn_play.addEventListener('click', () => {
            this.playToggle()
        });
        this.dom.btn_loop.addEventListener('click', () => {
            console.log('单击循环')
            this.loopToggle()
            console.log(this.music.loop)
        });
        this.dom.btn_next.addEventListener('click', () => {
            console.log('下一曲')
            this.getMusic(this.albumIndex)
        });
        this.dom.albumCt.addEventListener('click', (event) => {
            let e = event || window.event;
            let _target = e.target
            let index = _target.getAttribute('data-index')
            if (index) {
                this.albumIndex = index
                this.getMusic(this.albumIndex)
            }
        });
    }

    play() {
        if (this.music.paused) {
            this.music.play()
        }
    }
    pause() {
        if (!this.music.paused) {
            this.music.pause()
        }
    }

    getMusic(index) {//index参数只是用来确定专辑；由于接口原因确定专辑后每次next都是在该专辑里随机播放一首歌曲
        currency.ajax({
            url: songUrl,
            songId: this.albumData[index].channel_id,
            beforeSend: () => { console.log('正在获取歌曲数据') }
        }).then((data) => {
            console.log('成功获得歌曲数据')
            this.songData = data.song
            this.ct.innerHTML = template.call(this)
            this.music.src = this.songData[0].url
            this.play()
            this.init()
            this.bind()
        }, (err) => {
            console.log('获取歌曲好像出错了!状态码:' + err)
        })
    }

    playToggle() {
        console.log('进入切换')
        this.music.paused ? this.play() : this.pause();
    }

    loopOn() {
        this.music.loop = true
    }
    loopOff() {
        this.music.loop = false
    }
    loopToggle() {
        this.music.loop ? this.loopOff() : this.loopOn()
    }


    layout() {
        function style(element, pseduoElement) {
            return element.currentStyle ? element.currentStyle : window.getComputedStyle(element, pseduoElement);
        };
        let albumTotal = this.albumData.length
        let theCSS = style(this.dom.albums[1], null);
        let albumWidth = parseInt(theCSS.width)
        let albumMargin = parseInt(theCSS.marginLeft)
        // console.log(theCSS)
        this.dom.albumCt.style.width = (albumTotal + 1) * (albumWidth + albumMargin) + 'px'
    }
}
module.exports = zMusic