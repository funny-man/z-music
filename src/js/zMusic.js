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
        this.albumIndex = 36 //默认专辑列表
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
            this.init()
            this.bind()
        }, (err) => {
            console.log('获取歌曲好像出错了!状态码:' + err)
        })
    }
    init() {
        this.dom = {
            albums: this.ct.querySelectorAll('.list-ct>ul>li'),
            albumCt: this.ct.querySelector('.list-ct>ul'),
            btn_play: this.ct.querySelector('.btns>.play'),
            btn_play_icon: this.ct.querySelector('.btns>.play>.icon-play'),
            btn_next: this.ct.querySelector('.btns>.next'),
            btn_random: this.ct.querySelector('.btns>.random'),
            btn_collect: this.ct.querySelector('.btns>.collect'),
            play_line: this.ct.querySelector('.line'),
            play_line_loading: this.ct.querySelector('.line>.line-loading'),
            play_time: this.ct.querySelector('.line>.play-time'),
            play_loading: this.ct.querySelector('.line>.play-time>div'),
            time: this.ct.querySelectorAll('.line>.play-time>span'),
            time_cur: this.ct.querySelector('.line>.play-time>.cur'),
            time_total: this.ct.querySelector('.line>.play-time>.total'),
            player_h3: this.ct.querySelector('#player>h3'),
            player_p: this.ct.querySelector('#player>p'),
            player_music_photo_ct: this.ct.querySelector('#player>.music-photo-ct'),
            player_music_photo: this.ct.querySelector('#player>.music-photo-ct>.music-photo'),
        }
        this.layout()// 通过js设置album-list的宽度
    }
    bind() {
        this.music.addEventListener('durationchange', (e) => { //duration属性（媒体总播放时间）改变触发
            let dateStr = this.music.duration.toString()
            this.dom.time_total.innerHTML = currency.getTime(dateStr)
        });
        let shouldUpdate = true
        this.music.addEventListener('timeupdate', (e) => {//currentTime（已播放时间）不合理或意外方式更新触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次
            if (shouldUpdate) {
                shouldUpdate = false
                setTimeout(() => {
                    let dateStr = this.music.currentTime.toString()
                    this.dom.time_cur.innerHTML = currency.getTime(dateStr)
                    this.dom.play_time.style.left = this.music.currentTime / this.music.duration * 100 + '%'
                    shouldUpdate = true
                }, 1000)
            }
        });
        this.music.addEventListener('progress', (e) => { //正在下载缓存
            let percent = this.music.buffered.length ? (this.music.buffered.end(this.music.buffered.length - 1) / this.music.duration) : 0;
            this.dom.play_line_loading.style.width = percent * 100 + '%'
        });
        this.music.addEventListener('waiting', (e) => { //没有数据而不能播放用来设置加载中动画
            console.log('不能播放哦')
            this.dom.play_loading.classList.add('loading');
        });
        this.music.addEventListener('canplay', (e) => { //缓存可以播放但是但是网速不好会停止删除加载动画
            console.log('可以播放哦')
            this.dom.play_loading.classList.remove('loading');
        });
        this.music.addEventListener('ended', (e) => {//当前歌曲播放结束触发
            this.getMusic(this.albumIndex)
        });
        //---
        this.dom.btn_play.addEventListener('click', () => {
            this.playToggle()
        });
        this.dom.btn_random.addEventListener('click', () => {
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
        this.dom.play_line.addEventListener('click', (event) => {
            let e = event || window.event;
            let percent = (e.clientX - currency.leftDistance(this.dom.play_line)) / this.dom.play_line.clientWidth;
            if (!isNaN(this.music.duration)) {
                this.dom.play_time.style.left = percent*100+'%';
                this.dom.time_cur.innerHTML = currency.getTime(percent * this.music.duration);
                this.music.currentTime = percent * this.music.duration;
            }
        });
        //测试用按钮
        this.dom.btn_collect.addEventListener('click', (event) => {
            console.log('测试')
        });
    }

    play() {
        if (this.music.paused) {
            this.music.play()
            this.dom.btn_play_icon.classList.add('icon-pause');
            this.dom.player_music_photo.classList.add('disk');
        }
    }
    pause() {
        if (!this.music.paused) {
            this.music.pause()
            this.dom.btn_play_icon.classList.remove('icon-pause');
            this.setTransform()
            this.dom.player_music_photo.classList.remove('disk');
        }
    }
    playToggle() {
        console.log('进入切换')
        this.music.paused ? this.play() : this.pause();
    }
    getMusic(index) {//index参数只是用来确定专辑；由于接口原因确定专辑后每次next都是在该专辑里随机播放一首歌曲
        currency.ajax({
            url: songUrl,
            songId: this.albumData[index].channel_id,
            beforeSend: () => { console.log('正在获取歌曲数据') }
        }).then((data) => {
            console.log('成功获得歌曲数据')
            this.songData = data.song
            this.render_player()
            this.music.src = this.songData[0].url
            this.play()
        }, (err) => {
            console.log('获取歌曲好像出错了!状态码:' + err)
        })
    }
    loopOn() {
        this.music.loop = true
        this.dom.btn_random.classList.add('loop');
    }
    loopOff() {
        this.music.loop = false
        this.dom.btn_random.classList.remove('loop');
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
        this.dom.albumCt.style.width = (albumTotal + 1) * (albumWidth + albumMargin) + 'px'
    }

    render_player() {
        this.dom.player_music_photo.setAttribute("style", `background-image:url(${this.songData[0].picture})`);
        this.dom.player_h3.innerHTML = this.songData[0].title
        this.dom.player_p.innerHTML = this.songData[0].artist
    }
    setTransform() {
        let photoTransform = document.defaultView.getComputedStyle(this.dom.player_music_photo, null).transform;
        let ctTransform = document.defaultView.getComputedStyle(this.dom.player_music_photo_ct, null).transform;
        this.dom.player_music_photo_ct.style.transform = ctTransform === 'none'
            ? photoTransform
            : photoTransform.concat(ctTransform);
        //String.concat(要添加的str)方法就是在原有的String添加一个的str组成一个新的str（通Array.concat一样）
        //本质上是因为 CSS 里 transform 可以接受多种变换的叠加
        //例如 this.dom.player_music_photo_ct.style.transform = 'matrix(0.904848, 0.425734, -0.425734, 0.904848, 0, 0)matrix(0.904848, 0.425734, -0.425734, 0.904848, 0, 0)'
    }
}
module.exports = zMusic