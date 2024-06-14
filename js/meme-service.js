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

function setTxt(ctx, text, txtClr, fontSize, x, y, i, isEdit) {
    const padding = 5
    const textWidth = ctx.measureText(text).width * 4

    const textHeight = fontSize

    const rectX = x - textWidth / 2 - padding
    const rectY = y - textHeight / 2 - padding
    const rectWidth = textWidth + 2 * padding
    const rectHeight = textHeight + 2 * padding;

    if (i === gMeme.selectedLineIdx && isEdit) {
        ctx.fillStyle = 'rgb(241, 241, 241, 0.5)'
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.fillStyle = txtClr
    ctx.font = `${fontSize}px Impact`
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

function clearMeme(id) {
    const elCanvas = document.getElementById(`${id}`);
    const ctx = elCanvas.getContext('2d')

    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

    var img = setImg(id)
    img.onload = function () {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    }
}

// function getEvPos(ev) {

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     if (TOUCH_EVS.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]

//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
// }

// function isLineClicked(clickedPos) {
//     const { pos } = gCircle
//     //* Calc the distance between two dots
//     const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
//     //* If its smaller then the radius of the circle we clicked inside the circle
//     return distance <= gCircle.size
// }
