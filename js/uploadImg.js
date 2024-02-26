'use strict'
// Read the file from the input
// When done send the image to the callback function

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])

}

function renderImg(img){
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

// UPLOAD TO CANVAS
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}