'use strict'

// let gImgs = []
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text',
            size: 40,
            clr: 'white',
            font: 'Impact',
            linePos: {},
            lineSize: {}
        },
    ],
}

function setLinePose(idx, x, y) {
    gMeme.lines[idx].linePos = { x, y }
}

function setLineSize(idx, width, height) {
    gMeme.lines[idx].lineSize = { width, height }
}

function getMeme(id) {
    gMeme.selectedImgId = id
    return gMeme
}

function setImg(id) {
    let img = new Image()
    img.src = `img/meme-imgs/${id}.jpg`
    return img
}

function setTxt(ctx, x, y, i, isEdit) {
    const currMemeLine = gMeme.lines[i]
    const padding = 5
    if (i === 0) {
        var textWidth = ctx.measureText(currMemeLine.txt).width * 4
    } else {
        textWidth = ctx.measureText(currMemeLine.txt).width
    }

    const textHeight = currMemeLine.size

    const rectX = x - textWidth / 2 - padding
    const rectY = y - textHeight / 2 - padding
    const rectWidth = textWidth + 2 * padding
    const rectHeight = textHeight + 2 * padding

    setLinePose(i, x, y)
    setLineSize(i, rectWidth, rectHeight)

    if (i === gMeme.selectedLineIdx && isEdit) {
        ctx.fillStyle = 'rgb(241, 241, 241, 0.5)'
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    }

    ctx.lineWidth = 2
    // ctx.lineWidth = (gMeme.lines[i].font === 'Impact')? 2 : 5

    ctx.strokeStyle = 'black'
    ctx.fillStyle = currMemeLine.clr
    ctx.font = `${currMemeLine.size}px ${gMeme.lines[i].font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(currMemeLine.txt, x, y)
    ctx.strokeText(currMemeLine.txt, x, y)
}

function setMemeTxt(text, idx) {
    gMeme.lines[idx].txt = text
}

function setMemeTxtClr(clr, idx) {
    gMeme.lines[idx].clr = clr
}

function changeMemeFont(font, idx) {
    gMeme.lines[idx].font = font
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
    if (gMeme.lines.length === 1) return

    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 0) ? 1 : 0
    return gMeme.selectedLineIdx
}

function getMemeLineIdx() {
    return gMeme.selectedLineIdx
}

function clearMeme() {
    const id = gMeme.selectedImgId
    const elCanvas = document.getElementById(`${id}`);
    const ctx = elCanvas.getContext('2d')

    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

    var img = setImg(id)
    img.onload = function () {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    }
}

function clearLine(idx) {
    // Find the index of the line with the given idx
    const line = gMeme.lines.find(line => line.index === idx);

    if (line) {
        const canvas = document.getElementById(`${gCurrMemeId}`);
        const ctx = canvas.getContext('2d');

        // Clear the text area on the canvas where the line is rendered
        ctx.clearRect(line.x, line.y - line.size, ctx.measureText(line.text).width, line.size);

        console.log(`Cleared line with index ${idx} on canvas.`);
    } else {
        console.log(`Line with index ${idx} not found.`);
    }

    // Example: Render the meme again after clearing the line
    // renderMeme(gCurrMemeId, true);
}


// function clearLine(idx) {
//     // const lineIndex = gMeme.lines.findIndex(line => line.selectedLineIdx === idx)

//     const lineIndex = gMeme.selectedLineIdx


//     console.log(lineIndex)

//     if (lineIndex !== -1) {
//         // Remove the line from the array
//         gMeme.lines.splice(lineIndex, 1);
//     } else {
//         console.log(`Line with index ${idx} not found.`);
//     }

//     // Example: Render the meme again after clearing the line
//     // renderMeme(gCurrMemeId, true);
// }


function moveLine(idx, dx, dy) {
    console.log('line.lineSize.width', gMeme.lines[idx].lineSize.width)
    console.log('line.lineSize.height', gMeme.lines[idx].lineSize.height)

    clearLine(idx)

    gMeme.lines[idx].linePos.x += dx
    gMeme.lines[idx].linePos.y += dy
}


function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isLineClicked(pos) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const linePos = gMeme.lines[gMeme.selectedLineIdx].linePos

    const distanceX = Math.abs(linePos.x - pos.x)
    const distanceY = Math.abs(linePos.y - pos.y)

    if (distanceX <= (line.lineSize.width) / 2 &&
        distanceY <= (line.lineSize.height) / 2) {
        console.log('true')
        return true
    } else {
        console.log('false')
        return false
    }
}


