function template() {
    
    let html = ` 
            <div id="player">
                <div class="music-photo-ct">
                    <div class="music-photo" style="background-image: url(${this.songData[0].picture});"></div>
                </div>
                <h3>${this.songData[0].title}</h3>
                <p>${this.songData[0].artist}</p>
                <div class="line">
                    <div class="line-loading"></div>
                    <div class="play-time">
                        <div></div>
                        <span class="cur">--:--</span>/<span class="total">--:--</span>
                    </div>
                </div>
                <div class="btns">
                    <div class="btn random"></div>
                    <div class="btn play">
                        <div class="icon-play"></div>
                    </div>
                    <div class="btn next"></div>
                    <div class="collect"><img src="./src/imgs/collect-yes.png" alt=""></div>
                </div>
            </div>
            <div id="album-list">
                <div class="list-ct">
                    <ul class="clearfix">`

    for (let key in this.albumData) {
        html += `<li data-index="${key}">
                    <h4 data-index="${key}">${this.albumData[key].name}</h4>
                    <div data-index="${key}" style="background-image: url(${this.albumData[key].cover_small});">
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