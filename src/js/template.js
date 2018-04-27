function template() {
    
    let html = ` 
            <div id="player">
                <div class="music-photo"><img src="${this.songData[0].picture}" alt=""></div>
                <h3>${this.songData[0].title}</h3>
                <p>${this.songData[0].artist}</p>
                <div class="line">
                    <div class="line-loading"></div>
                    <div class="play-time"><span class="cur">--:--</span> / <span class="total">--:--</span></div>
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
        html += `<li data-index="${key}">
                    <h4 data-index="${key}">${this.albumData[key].name}</h4>
                    <div>
                        <img data-index="${key}"src="${this.albumData[key].cover_small}" alt="">
                    </div>
                    <span class="ds"></span>
                </li>`
    }

    html += `
                    </ul>
                </div >
            </div > `

    return html
};

module.exports = template