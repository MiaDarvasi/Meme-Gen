'use strict'


function renderGallery(imgNum) {
    var elGallery = document.querySelector('.gallery')
    var elGalleryHTML = ``
    for (var i = 1; i <= imgNum; i++) {
        elGalleryHTML += `<img src="img/meme-imgs(square)/${i}.jpg"
                         onclick="onImgSelect(${i})" alt="Meme pic"></img>`
    }
    elGallery.innerHTML = elGalleryHTML

    getGallery(imgNum)
}

function onImgSelect(id) {
    var img = setImg(id)
    img.onload = function () {
        var elGallery = document.querySelector('.gallery')
        var elNav = document.querySelector('.main-nav')
        var elEditor = document.querySelector('.meme-editor')

        elNav.classList.add('hidden')
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')

        renderMeme(id)
        renderMemeEdits(id)
    }
}

function onShowGallery() {
    var elGallery = document.querySelector('.gallery')
    var elNav = document.querySelector('.main-nav')
    var elEditor = document.querySelector('.meme-editor')

    elNav.classList.remove('hidden')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}
