console.log('Z-Music 1.0')
import '../sass/style.scss'
let currency = require('./currency')

const albumUrl = 'http://api.jirengu.com/fm/getChannels.php'
const songUrl = 'http://api.jirengu.com/fm/getSong.php'
const lyricUrl = 'http://api.jirengu.com/fm/getLyric.php'
class zMusic {
    constructor() {
        this.ct = document.getElementById('z-music')
        
        this.albumData = {}
        this.songData = {}

        this.ct.innerHTML = '<p class="z-music-loading">LOADING</p>';
        currency.ajax({
            url: albumUrl,
            beforeSend: () => {
                console.log('正在获取专辑数据')
            },
            success: (data) => {
                console.log('成功获得专辑数据')
                this.albumData = data.channels
                console.log(data.channels)
                this.init()
                this.bind()
            },
            fail: (state) => {
                console.log('好像出了点错误!错误原因是:' + state)
            }
        })
    }
    template() {
        let html = ` 
                <div id="player">
                    <div class="music-photo"><img src="./src/imgs/music-photo.png" alt=""></div>
                    <h3>Nassun Dorma</h3>
                    <p>Luciano Pavarottl</p>
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
                        <ul class="clearfi">
                            <li>
                                <h4>R&B</h4>
                                <div>
                                    <img src="./src/imgs/album-1.png" alt="">
    
                                </div>
                                <span class="ds"></span>
                            </li>
                            <li>
                                <h4>热歌劲舞</h4>
                                <div>
                                    <img src="./src/imgs/album-2.png" alt="">
                                </div>
                            </li>
                            <li>
                                <h4>火爆新歌</h4>
                                <div>
                                    <img src="./src/imgs/album-3.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>`
        return html
    }
    init() {
        this.music=new Audio()
        currency.ajax({
            url: songUrl+'?channel='+this.albumData[3].channel_id,
            beforeSend: () => {
                console.log('正在获取歌曲数据')
            },
            success: (data) => {
                console.log('成功获得歌曲数据')
                this.songData = data.song
                this.ct.innerHTML = this.template()
                this.music.src=this.songData[0].url
                this.music.play()
                console.log(data.song)
                console.log(this.songData)
            },
            fail: (state) => {
                console.log('获取歌曲出了点错误!错误原因是:' + state)
            }
        })
        console.log('init')
    }
    bind() {
        console.log('bind')
    }
}
module.exports = zMusic