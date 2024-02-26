'use strict'

let gElCanvas
let gCtx
let gCurrShape = ''
let gPen = { pos: null, isDown: false }
let gLine = []

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // const touchArea = document.querySelector('.touch')

    addListeners()
    resizeCanvas()

}
function addListeners() {
    addTouchListeners()
    addMouseListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        //Calc the center of the canvas
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function addMouseListeners() {
    gElCanvas.addEventListener('click', onDraw)
    gElCanvas.addEventListener('mousedown', onStartLine)
    gElCanvas.addEventListener('mousemove', onDrawLine)
    gElCanvas.addEventListener('mouseup', onEndLine)
}


function addTouchListeners() {

    gElCanvas.addEventListener('touchstart', onStartLine)
    gElCanvas.addEventListener('touchmove', onDrawLine)
    gElCanvas.addEventListener('touchend', onEndLine)
}


function onStartLine(ev) {
    gPen.pos = { x: ev.offsetX, y: ev.offsetY }
    gPen.isDown = true

    gLine = []
    gLine.push(gPen.pos)

    console.log(gPen);
    gCtx.beginPath()
    gCtx.moveTo(gPen.pos.x, gPen.pos.y)
}

function onDrawLine(ev) {
    if (!gPen.isDown) return

    gPen.pos = getEvPos(ev)
    gCtx.beginPath()
    // gCtx.lineWidth = 4
    // if (!onDraw(ev)) gCtx.stroke()
    // if (!onDraw(ev)) gCurrShape = 'pen'
    onDraw(ev)
    // console.log(gCurrShape);
    console.log(gPen.pos.x, gPen.pos.y);
    gLine.push(gPen.pos.x, gPen.pos.y)
    
    // gLine.
}

function onEndLine(ev) {
    gPen.isDown = false
    gCtx.closePath()
}

function drawPen(x, y){
    
    gCtx.beginPath()
    
    gCtx.lineWidth = 4
    
    gCtx.stroke()

    gCtx.lineTo(gPen.pos.x, gPen.pos.y)
}

function drawRect(x, y) {
    gCtx.beginPath()

    gCtx.lineWidth = 4
    gCtx.strokeRect(x - 60, y - 60, 120, 120)

    gCtx.fillRect(x - 60, y - 60, 120, 120)
}

function drawArc(x, y) {
    gCtx.beginPath()

    gCtx.arc(x, y, 70, 0, 2 * Math.PI)

    gCtx.lineWidth = 4
    gCtx.stroke()
}

function onSetShape(shape) {
    gCurrShape = shape
}

function onSetShapeStyle(ev) {
    gCtx.strokeStyle = ev.value
}

function onSetShapeFill(ev) {
    gCtx.fillStyle = ev.value
}

function onClearCanvas() {
    gLine = []
    gCurrShape = ''
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDraw(ev) {
    // const { offsetX, offsetY } = ev
    
    console.log(gCurrShape);
    //In touch event were not using the offset. instead we need to use the func getEvPos!
    const pos = getEvPos(ev)

    switch (gCurrShape) {
        case 'pen':
            drawPen(pos.x, pos.y)
            break
        case 'rect':
            drawRect(pos.x, pos.y)
            break
        case 'circle':
            drawArc(pos.x, pos.y)
            break
        case 'line':
            drawLine(pos.x, pos.y)
            break
    }
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]
        // Calc pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}


// DOWNLOAD CANVAS
function downloadImg() {
    const imgContent = gElCanvas.toDataUrl()
    elLink.href = imgContent
}

// UPLOAD TO CANVAS
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

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