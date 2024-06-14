'use strict'

function renderMeme(id) {

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
            setTxt(ctx, meme.lines[i].txt, meme.lines[i].clr, meme.lines[i].size, 150, 30 * Math.pow((i + 1), 3.2))
        }
    }
}

function renderMemeEdits(id) {

    const elUserEdit = document.querySelector('.edit')
    elUserEdit.innerHTML =
        `<input id="text-input" oninput="onChangeTxt(${id})"
        placeholder="Enter text"/>
        <button onclick="onAddLine(${id})">Add Line</button>
        <button onclick="onSwitchLine(${id})">Switch Line</button>
        <input type="color" id="txt-clr-input" value="#ffffff" 
        onchange="onSetTxtClr(this.value, ${id})" />
        <button onclick="onIncreaseFont(${id})">Increase Font</button>
        <button onclick="onDecreaseFont(${id})">Decrease Font</button>
        <a href="#" class="btn-dwnld clean-link" onclick="downloadImg(this,${id})" 
        download="my-img.jpg">Download</a>`
}

function onChangeTxt(id) {
    var txt = document.getElementById('text-input').value
    var meme = getMeme(id)
    setMemeTxt(txt, meme.selectedLineIdx)
    renderMeme(id)
    console.log(gMeme)
}

function onSetTxtClr(color, id) {
    var meme = getMeme(id)
    setMemeTxtClr(color, meme.selectedLineIdx)
    renderMeme(id)
}

function onIncreaseFont(id) {
    var meme = getMeme(id)
    increaseMemeTxtSize(meme.selectedLineIdx)
    renderMeme(id)
}

function onDecreaseFont(id) {
    var meme = getMeme(id)
    decreaseMemeTxtSize(meme.selectedLineIdx)
    console.log(gMeme)
    renderMeme(id)
}

function onAddLine(id) {
    addLine()
    changeMemeLineIdx()
    renderMeme(id)
}

function onSwitchLine(id) {
    changeMemeLineIdx()
    renderMeme(id)
}

function downloadImg(elLink, id) {
    const elCanvas = document.getElementById(`${id}`);
    const meme = elCanvas.toDataURL('image/jpeg')
    elLink.href = meme
}

