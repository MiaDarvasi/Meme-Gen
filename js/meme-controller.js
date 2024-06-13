'use strict'

let gUserInputs = {
    txt: 'Enter text',
    txtClr: 'white',
    fontSize: 40,
}

function renderMeme(id) {

    var meme = getMeme(id)
    const elEditor = document.querySelector('.canvas-container')

    elEditor.innerHTML =
        `<canvas id="${id}" width="300" height="300">
        Update your browser to enjoy canvas!
        </canvas>`

    const elCanvas = document.getElementById(`${id}`);
    const ctx = elCanvas.getContext('2d')

    var img = meme.img
    img.onload = function () {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
        setTxt(ctx, gUserInputs.txt, gUserInputs.txtClr, gUserInputs.fontSize, 150, 30)
    }
}

function renderMemeEdits(id) {
    setMemeTxt(gUserInputs.txt)

    const elUserEdit = document.querySelector('.edit')
    elUserEdit.innerHTML =
        `<input id="text-input" oninput="onChangeTxt(${id})"
        placeholder="Enter text"/>
        <input type="color" id="txt-clr-input" value="#ffffff" 
        onchange="onSetTxtClr(this.value, ${id})" />
        <button onclick="onIncreaseFont(${id})">Increase Font</button>
        <button onclick="onDecreaseFont(${id})">Decrease Font</button>
        <a href="#" class="btn-dwnld clean-link" onclick="downloadImg(this,${id})" 
        download="my-img.jpg">Download</a>`
}

function onChangeTxt(id) {
    gUserInputs.txt = document.getElementById('text-input').value
    setMemeTxt(gUserInputs.txt)
    renderMeme(id)
}

function onSetTxtClr(color, id) {
    gUserInputs.txtClr = color
    renderMeme(id)
}

function onIncreaseFont(id) {
    gUserInputs.fontSize++
    renderMeme(id)
}

function onDecreaseFont(id) {
    gUserInputs.fontSize--
    renderMeme(id)
}

function downloadImg(elLink, id) {
    const elCanvas = document.getElementById(`${id}`);
    const meme = elCanvas.toDataURL('image/jpeg')
    elLink.href = meme
}

