console.log('Z-Music 1.0')
import '../sass/style.scss'
let currency = require('./currency')

const albumUrl = '//api.jirengu.com/fm/getChannels.php'
const songUrl = '//api.jirengu.com/fm/getSong.php'
const lyricUrl = '//api.jirengu.com/fm/getLyric.php'
class zMusic {
    constructor() {
        this.ct = document.getElementById('z-music')

        this.albumData = {}
        this.songData = {}
        this.music = new Audio()

        this.ct.innerHTML = '<div class="zmusic-loading"><p>LOADING...</p></div>';
        currency.ajax({
            url: albumUrl,
            beforeSend:()=>{console.log('正在获取专辑数据')}
        }).then((data)=>{
            console.log('成功获得专辑数据')
            this.albumData = data.channels
            console.log(this.albumData)
            return currency.ajax({
                url: songUrl,
                songId:this.albumData[0].channel_id,
                beforeSend:()=>{console.log('正在获取歌曲数据')}
            })
        },(err)=>{
            console.log('获取专辑好像出错了!状态码:'+err)
        }).then((data)=>{
            console.log('成功获得歌曲数据')
            this.songData = data.song
            this.ct.innerHTML=this.template()
            console.log(this.songData[0].url)
            this.music.src=this.songData[0].url
            this.play()
            this.init()
            this.bind()
        },(err)=>{
            console.log('获取歌曲好像出错了!状态码:'+err)
        })
    }
    template() {
        let html = ` 
                <div id="player">
                    <div class="music-photo"><img src="${this.songData[0].picture}" alt=""></div>
                    <h3>${this.songData[0].title}</h3>
                    <p>${this.songData[0].artist}</p>
                    <div class="line">
                        <div class="line-loading"></div>
                        <div class="play-time">1:30/4:30</div>
                    </div>
                    <div class="btns">
                        <div class="btn loop">
                            <img src="./src/imgs/random.png" alt="">
                        </div>
                        <div class="btn play">
                            <img src="./src/imgs/play.png" alt="play">
                        </div>
                        <div class="btn next">
                            <img src="./src/imgs/next.png" alt="play">
                        </div>
                        <div class="collect"><img src="./src/imgs/collect-yes.png" alt=""></div>
                    </div>
                </div>
                <div id="album-list">
                    <div class="list-ct">
                        <ul class="clearfix">`

        for (let key in this.albumData) {
            html += `<li>
                        <h4>${this.albumData[key].name}</h4>
                        <div>
                            <img src="${this.albumData[key].cover_small}" alt="">
                        </div>
                        <span class="ds"></span>
                    </li>`
        }
        html += `
                        </ul>
                    </div >
                </div > `
        return html
    }
    init() {
        console.log('init')
        this.dom = {
            btn_play:this.ct.querySelector('.btns>.play'),
            btn_next:this.ct.querySelector('.btns>.next'),
            btn_loop:this.ct.querySelector('.btns>.loop'),
            albums: this.ct.querySelectorAll('.list-ct>ul>li'),
            albumCt:this.ct.querySelector('.list-ct>ul')
        }
        console.log(this.dom)
        this.layout()// 通过js设置album-list的宽度
    }
    bind() {
        console.log('bind')
        // this.updateLine = () => {
        //     let percent = this.audio.buffered.length ? (this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration) : 0;
        //     this.dom.timeline_loaded.style.width = Util.percentFormat(percent);
        // };

        this.music.addEventListener('durationchange', (e) => { //duration属性改变（媒体总播放时间）
            // this.dom.timetext_total.innerHTML = Util.timeFormat(this.audio.duration);
            // this.updateLine();
        });
        this.music.addEventListener('progress', (e) => { //正在下载
            // this.updateLine();
        });
        this.music.addEventListener('canplay', (e) => { //缓存达到可以播放时候触发
            // if(this.option.autoplay && !this.isMobile){
            //     this.play();
            // }
        });
        this.music.addEventListener('timeupdate', (e) => {//currentTime（已播放时间）不合理或意外方式更新
            // let percent = this.audio.currentTime / this.audio.duration;
            // this.dom.timeline_played.style.width = Util.percentFormat(percent);
            // this.dom.timetext_played.innerHTML = Util.timeFormat(this.audio.currentTime);
        });
        this.music.addEventListener('seeked', (e) => {
            // this.play();
        });
        this.music.addEventListener('ended', (e) => {
            // this.next();
        });
        //---
        console.log(this.dom.btn_loop)

        this.dom.btn_play.addEventListener('click', ()=>{
            this.playToggle()
        });
        this.dom.btn_loop.addEventListener('click', ()=>{
            console.log('单击循环')
            this.loopToggle()
            console.log(this.music.loop)
        });
    }
    play() {
        if(this.music.paused){
            this.music.play()
        }
    }
    pause() {
        if(!this.music.paused){
            this.music.pause()
        }
    }
    playToggle(){
        console.log('进入切换')
        this.music.paused ? this.play() : this.pause();
    }

    loopOn(){
        this.music.loop=true
    }
    loopOff(){
        this.music.loop=false
    }
    loopToggle(){
        this.music.loop ? this.loopOff() : this.loopOn()
    }


    layout(){
        function style(element,pseduoElement){
            return element.currentStyle ? element.currentStyle : window.getComputedStyle(element,pseduoElement);
        };
        let albumTotal = this.albumData.length
        let theCSS=style(this.dom.albums[1],null);
        let albumWidth =parseInt(theCSS.width)
        let albumMargin =parseInt(theCSS.marginLeft)
        // console.log(theCSS)
        this.dom.albumCt.style.width=(albumTotal+1)*(albumWidth+albumMargin)+'px'
    }
}
module.exports = zMusic