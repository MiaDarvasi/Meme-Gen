'use strict'

renderMeme()
function renderMeme() {

    var meme = getMeme()
    const elEditor = document.querySelector('.canvas-container')

    elEditor.innerHTML =
        `<canvas id="${meme.id}" width="300" height="300">
        Update your browser to enjoy canvas!
        </canvas>`

    const elCanvas = document.getElementById(`${meme.id}`);
    const ctx = elCanvas.getContext('2d')

    setImg(ctx, elCanvas, meme.img, function () {
        setLineTxt(ctx, meme.txt, 40, 30)
    })
}

// function onChangeTxt() {
//     var txt = this.value
//     console.log(txt)
// }
