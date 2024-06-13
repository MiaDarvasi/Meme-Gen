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
    return img
}

function setTxt(ctx, text, txtClr, fontSize, x, y) {
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.fillStyle = txtClr
    ctx.font = `${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x, y)
    ctx.strokeText(text, x, y)
}

function setMemeTxt(text) {
    gMeme.txt = text
}

function setMemeImg(img) {
    gMeme.img = img
}

