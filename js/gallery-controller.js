'use strict'


renderGallery()
function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var elGalleryHTML = ``
    for (var i = 1; i <= 2; i++) {
        elGalleryHTML += `<img src="img/meme-imgs(square)/${i}.jpg"
                         onclick="onImgSelect(${i})" alt="Meme pic"></img>`
    }
    elGallery.innerHTML = elGalleryHTML

    getGallery(2)
}

function onImgSelect(id) {
    var img = setImg(id)
    img.onload = function () {
        var elGallery = document.querySelector('.gallery')
        var elEditor = document.querySelector('.meme-editor')
        
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')
        
        renderMeme(id)
        renderMemeEdits(id)
    }
}
