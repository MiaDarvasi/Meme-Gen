'use strict'

var gCurrMemeId
var gCurrLineIdx
var gIsDrag = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function renderMeme(id, isEdit) {

    gCurrMemeId = id

    var meme = getMeme(gCurrMemeId)
    const elEditor = document.querySelector('.canvas-container')

    elEditor.innerHTML =
        `<canvas id="${gCurrMemeId}" width="300" height="300">
        Update your browser to enjoy canvas!
        </canvas>`

    const elCanvas = document.getElementById(`${gCurrMemeId}`);
    const ctx = elCanvas.getContext('2d')


    var img = setImg(gCurrMemeId)
    img.onload = function () {
        ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
        for (var i = 0; i < meme.lines.length; i++) {
            renderMemeTxt(ctx, 150, (30 * Math.pow((i + 1), 3.18)), i, isEdit)
        }
    }
    gCurrLineIdx = 0
    addEventListeners(id)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    const elCanvas = document.getElementById(`${gCurrMemeId}`);
    const ctx = elCanvas.getContext('2d')

    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')

    tempCanvas.width = elCanvas.width;
    tempCanvas.height = elCanvas.height;
    tempCtx.drawImage(elCanvas, 0, 0);

    elCanvas.width = elContainer.clientWidth
    elCanvas.height = elContainer.clientHeight

    ctx.drawImage(tempCanvas, 0, 0);
}

function renderMemeTxt(ctx, x, y, idx, isEdit) {
    setTxt(ctx, x, y, idx, isEdit)
}

function renderMemeEdits(id) {

    const elUserEdit = document.querySelector('.edit')
    elUserEdit.innerHTML =
        `<input id="text-input" oninput="onChangeTxt()" onchange="onClearBorder(${id})"
        placeholder="Enter text"/>
        <section>
        <button onclick="onSwitchLine()"><img src="img/icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
        <button onclick="onAddLine()"><img src="img/icons/add.png"></button>
        <button onclick="onClearMeme()"><img src="img/icons/trash.png"></button>
        </section>
        <section class="font-clr">
        <select onchange="onChangeFont()" name="fonts" id="font-select">
        <option value="Impact">Impact</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Arial">Arial</option>
        <option value="Cambria">Cambria</option>
        </select> 
        <label for="txt-clr-input"><img src="img/icons/paint-board-and-brush.png"></label>
        <input type="color" id="txt-clr-input" class="hidden" value="#ffffff" 
        onchange="onSetTxtClr(this.value)" />
        </section>
        <section>
        <button onclick="onIncreaseFont()"><img src="img/icons/increase font - icon.png"></button>
        <button onclick="onDecreaseFont()"><img src="img/icons/decrease font - icon.png"></button>
        </section>
        <button onclick="onShowShareModal(${id})" class="share">Share</button>`
}

function onClearMeme() {
    clearMeme()
    document.getElementById('text-input').value = ''
}

function onChangeTxt() {
    const txt = document.getElementById('text-input').value
    var meme = getMeme(gCurrMemeId)
    setMemeTxt(txt, meme.selectedLineIdx)
    renderMeme(gCurrMemeId, true)
}

function onClearBorder() {
    clearMeme()
    renderMeme(gCurrMemeId, false)
}

function onSetTxtClr(color) {
    var meme = getMeme(gCurrMemeId)
    setMemeTxtClr(color, meme.selectedLineIdx)
    renderMeme(gCurrMemeId, true)
}

function onChangeFont() {
    const font = document.getElementById('font-select').value
    var meme = getMeme(gCurrMemeId)
    changeMemeFont(font, meme.selectedLineIdx)
    renderMeme(gCurrMemeId, true)
}

function onIncreaseFont() {
    var meme = getMeme(gCurrMemeId)
    increaseMemeTxtSize(meme.selectedLineIdx)
    renderMeme(gCurrMemeId, true)
}

function onDecreaseFont() {
    var meme = getMeme(gCurrMemeId)
    decreaseMemeTxtSize(meme.selectedLineIdx)
    console.log(gMeme)
    renderMeme(gCurrMemeId, true)
}

function onAddLine() {
    document.getElementById('text-input').value = ''

    addLine()
    changeMemeLineIdx()
    gCurrLineIdx = getMemeLineIdx()
    changeMemeFont('Impact', gCurrLineIdx)
    renderMeme(gCurrMemeId, true)
}

function onSwitchLine() {
    gCurrLineIdx = getMemeLineIdx()
    changeMemeLineIdx()
    renderMeme(gCurrMemeId, true)
}

function onDown(ev) {

    const pos = getEvPos(ev)

    if (!isLineClicked(pos)){
        return
    }
    gIsDrag = true
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

    if(!gIsDrag) return
    const startPos = getMeme(gCurrMemeId).lines[gCurrLineIdx].linePos
    const pos = getEvPos(ev)

    const elCanvas = document.getElementById(`${gCurrMemeId}`);
    const ctx = elCanvas.getContext('2d')

    const dx = pos.x - startPos.x
    const dy = pos.y - startPos.y
    
    moveLine(gCurrLineIdx, dx, dy)
    setLinePose(gCurrLineIdx, pos.x, pos.y)
    renderMemeTxt(ctx, pos.x, pos.y, gCurrLineIdx, true)
}

function onUp() {
    gIsDrag = false
    document.body.style.cursor = 'grab'
}

function addEventListeners(id) {
    addMouseListeners(id)
    addTouchListeners(id)
}

function addMouseListeners(id) {
    const elCanvas = document.getElementById(`${id}`);

    elCanvas.addEventListener('mousedown', onDown)
    elCanvas.addEventListener('mousemove', onMove)
    elCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(id) {
    const elCanvas = document.getElementById(`${id}`);

    elCanvas.addEventListener('touchstart', onDown)
    elCanvas.addEventListener('touchmove', onMove)
    elCanvas.addEventListener('touchend', onUp)
}