'use strict'

let gMeme

function getMeme() {
    gMeme = {
        id: getRandomIntInclusive(0, 9),
        txt: 'momo',
        img: getImageSrc(2),
    }
    return gMeme
}

function setImg(ctx, canvas, imgSrc, callback) {
    let img = new Image()
    img.src = imgSrc
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        if (callback) callback()
    }
}

function getImageSrc(imgNum) {
    return `img/meme-imgs(square)/${imgNum}.jpg`
}

function setTxt(ctx, text, x, y) {
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'white'
    ctx.font = '40px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x, y)
    ctx.strokeText(text, x, y)
}

function setMemeTxt(text) {
    gMeme.txt = text
}

