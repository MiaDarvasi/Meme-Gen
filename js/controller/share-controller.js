'use strict'


function onShowShareModal(id) {
    document.querySelector('.share-modal').classList.remove('hidden')
    renderShareModal(id)
}

function renderShareModal(id) {
    const elModal = document.querySelector('.share-modal')
    elModal.innerHTML = 
    `<button class="exit" onclick="onExitModal()">x</button>
    <section class="modal-content">
    <a href="#" class="btn-dwnld clean-link" onclick="downloadImg(this,${id})" 
    download="my-img.jpg">Download</a>
    <button onclick="onUploadImg(${id})"><img src="img/icons/facebook-logo.png"></button>
    </section>`
}

function onExitModal() {
    document.querySelector('.share-modal').classList.add('hidden')
}

function downloadImg(elLink, id) {
    document.querySelector('.share-modal').classList.add('hidden')
    
    const elCanvas = document.getElementById(`${id}`);
    const meme = elCanvas.toDataURL('image/jpeg')
    elLink.href = meme

}