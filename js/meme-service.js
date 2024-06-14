'use strict'

let gImgs
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        { txt: 'Enter text', size: 40, clr: 'white' },
    ],
}

function getGallery(imgNum) {
    var imgId = 1
    for (var i = 1; i <= imgNum; i++) {
        if (!gImgs) {
            gImgs = [{ id: imgId, url: `img/meme-imgs(square)/${imgId}.jpg` }]
        } else {
            gImgs.push([{ id: imgId, url: `img/meme-imgs(square)/${imgId}.jpg` }])
        }
        imgId++
    }
}

function getMeme(id) {
    gMeme.selectedImgId = id
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

function setMemeTxt(text, idx) {
    gMeme.lines[idx].txt = text
}

function setMemeTxtClr(clr, idx) {
    gMeme.lines[idx].clr = clr
}

function increaseMemeTxtSize(idx) {
    gMeme.lines[idx].size++
}

function decreaseMemeTxtSize(idx) {
    gMeme.lines[idx].size--
}

function addLine() {
    gMeme.lines.push({ txt: 'Enter text', size: 40, clr: 'white' })
}

function changeMemeLineIdx() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 0) ? 1 : 0
}

