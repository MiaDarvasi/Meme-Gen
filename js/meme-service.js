'use strict'

let gMeme

function getMeme(id) {
    gMeme = {
        id: id,
        txt: '',
        img: setImg(id),
    }
    return gMeme
}

function setImg(id) {
    let img = new Image()
    img.src = `img/meme-imgs(square)/${id}.jpg`
    // img.onload = function () {
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    //     if (callback) callback()
    // }
    return img
}

// function getImageSrc(id) {
//     return `img/meme-imgs(square)/${id}.jpg`
// }

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

