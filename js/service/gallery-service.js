'use strict'

let gImgs = []

function getGallery(options = {}) {
    gImgs = []
    for (let i = 1; i <= 18; i++) {
        let keywords = [];
        if (i === 6 || i === 8 || i === 10 || i === 11 || i === 12 ||
            i === 13 || i === 14 || i === 15 || i === 16 || i === 17) {
            keywords = ['funny', 'crazy']
        } else if (i === 2 || i === 3 || i === 4) {
            keywords = ['cute', 'animal']
        } else if (i === 5 || i === 7 || i === 9 || i === 18) {
            keywords = ['cute', 'baby']
        }
        gImgs.push({ id: i, url: `img/meme-imgs/${i}.jpg`, keyWords: keywords })
    }

    const filterBy = options.filterBy
    var imgs = gImgs
    imgs = filterImgs(filterBy)

    return imgs
}

function filterImgs(filterBy) {
    var imgs = gImgs
    if (filterBy.key) imgs = imgs.filter(img => img.keyWords.includes(filterBy.key.toLowerCase()))

    return imgs
}