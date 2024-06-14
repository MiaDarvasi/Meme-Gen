'use strict'

function renderMeme(id, isEdit) {

    var meme = getMeme(id)
    const elEditor = document.querySelector('.canvas-container')

    elEditor.innerHTML =
        `<canvas id="${id}" width="300" height="300">
        Update your browser to enjoy canvas!
        </canvas>`

    const elCanvas = document.getElementById(`${id}`);
    const ctx = elCanvas.getContext('2d')


    var img = setImg(id)
    img.onload = function () {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
        for (var i = 0; i < meme.lines.length; i++) {
            setTxt(ctx, meme.lines[i].txt, meme.lines[i].clr, meme.lines[i].size, 150, 30 * Math.pow((i + 1), 3.18), i, isEdit)
        }
    }
}

function renderMemeEdits(id) {

    const elUserEdit = document.querySelector('.edit')
    elUserEdit.innerHTML =
        `<input id="text-input" oninput="onChangeTxt(${id})" onchange="onClearBorder(${id})"
        placeholder="Enter text"/>
        <button onclick="onAddLine(${id})">Add Line</button>
        <button onclick="onSwitchLine(${id})">Switch Line</button>
        <button onclick="onClearMeme(${id})">Clear</button>
        <input type="color" id="txt-clr-input" value="#ffffff" 
        onchange="onSetTxtClr(this.value, ${id})" />
        <button onclick="onIncreaseFont(${id})">Increase Font</button>
        <button onclick="onDecreaseFont(${id})">Decrease Font</button>
        <a href="#" class="btn-dwnld clean-link" onclick="downloadImg(this,${id})" 
        download="my-img.jpg">Download</a>`
}

function onClearMeme(id) {
    clearMeme(id)
}

function onChangeTxt(id) {
    var txt = document.getElementById('text-input').value
    var meme = getMeme(id)
    setMemeTxt(txt, meme.selectedLineIdx)
    renderMeme(id, true)
}

function onClearBorder(id) {
    clearMeme(id)
    renderMeme(id, false)
}

function onSetTxtClr(color, id) {
    var meme = getMeme(id)
    setMemeTxtClr(color, meme.selectedLineIdx)
    renderMeme(id, true)
}

function onIncreaseFont(id) {
    var meme = getMeme(id)
    increaseMemeTxtSize(meme.selectedLineIdx)
    renderMeme(id, true)
}

function onDecreaseFont(id) {
    var meme = getMeme(id)
    decreaseMemeTxtSize(meme.selectedLineIdx)
    console.log(gMeme)
    renderMeme(id, true)
}

function onAddLine(id) {
    // console.log(document.getElementById('text-input').value)
    // document.getElementById('text-input').value = ''
    addLine()
    changeMemeLineIdx()
    renderMeme(id, true)
}

function onSwitchLine(id) {
    changeMemeLineIdx()
    renderMeme(id, true)
}

function downloadImg(elLink, id) {
    const elCanvas = document.getElementById(`${id}`);
    const meme = elCanvas.toDataURL('image/jpeg')
    elLink.href = meme
}

// function onDown(ev) {
//     //* console.log('onDown')
//     //* Get the ev pos from mouse or touch
//     const pos = getEvPos(ev)
//     //* console.log('pos', pos)
//     if (!isLineClicked(pos)) return

//     setCircleDrag(true)
//     //* Save the pos we start from
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     const { isDrag } = getCircle()
//     if (!isDrag) return

//     const pos = getEvPos(ev)
//     //* Calc the delta, the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveCircle(dx, dy)
//     //* Save the last pos, we remember where we`ve been and move accordingly
//     gStartPos = pos
//     //* The canvas is render again after every move
//     renderCanvas()
// }

// function onUp() {
//     setCircleDrag(false)
//     document.body.style.cursor = 'grab'
// }


// function addEventListeners() {
//     addMouseListeners()
//     addTouchListeners()
// }

// function addMouseListeners() {
//     const elCanvas = document.getElementById(`${id}`);

//     elCanvas.addEventListener('mousedown', onDown)
//     elCanvas.addEventListener('mousemove', onMove)
//     elCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     const elCanvas = document.getElementById(`${id}`);

//     elCanvas.addEventListener('touchstart', onDown)
//     elCanvas.addEventListener('touchmove', onMove)
//     elCanvas.addEventListener('touchend', onUp)
// }

