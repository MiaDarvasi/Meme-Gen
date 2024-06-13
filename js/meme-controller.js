'use strict'

let gInputTxt = 'Enter text'

renderMeme(2)
renderMemeTxt(2)

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
        setTxt(ctx, gInputTxt, 150, 30)
    }


}

function renderMemeTxt(id) {
    setMemeTxt(gInputTxt)

    const elUserEdit = document.querySelector('.edit')
    elUserEdit.innerHTML =
        `<input id="text-input" oninput="onChangeTxt(${id})"
        placeholder="Enter text" />`
}

function onChangeTxt(id) {
    gInputTxt = document.getElementById('text-input').value
    setMemeTxt(gInputTxt)
    renderMeme(id)
}
