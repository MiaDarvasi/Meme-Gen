'use strict'

const gQueryOptions = {
    filterBy: { key: '', }
}


function renderGallery() {
    const gallery = getGallery(gQueryOptions)
    var elGallery = document.querySelector('.gallery')
    var elGalleryHTML = ``
    for (var i = 0; i < gallery.length; i++) {
        if (!gallery[i].url) continue
        elGalleryHTML += `<img src=${gallery[i].url}
        onclick="onImgSelect(${i + 1})" alt="Meme pic"></img>`
    }
    elGallery.innerHTML = elGalleryHTML
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

        renderMeme(id, false)
        renderMemeEdits(id)
    }
}

function onGetRandomMeme() {
    const id = Math.round(getRandomIntInclusive(0, 18))
    onImgSelect(id)
}

function onShowGallery() {
    onClearMeme()
    var elGallery = document.querySelector('.gallery')
    var elNav = document.querySelector('.main-nav')
    var elEditor = document.querySelector('.meme-editor')

    elNav.classList.remove('hidden')
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}

function onSearchInput(filterBy) {
    if (filterBy) {
        if (filterBy.txt !== undefined) {
            gQueryOptions.filterBy.key = filterBy.txt
        }
    }
    setQueryParams()
    renderGallery()
}

function onFilterByWord(word) {
    gQueryOptions.filterBy.key = (word === 'all') ? '' : word
    setQueryParams()
    renderGallery()
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        txt: queryParams.get('searchkey') || ''
    }
    renderQueryParams()
}

function renderQueryParams() {
    document.querySelector('.filter-by input[type="text"]').value = gQueryOptions.filterBy.key
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('searchkey', gQueryOptions.filterBy.key)

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function clearQueryParams() {
    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

