console.log('template')


function template() {
    let html = `
            <audio src=""></audio>
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
module.exports = template