'use strict'

let gElCanvas
let gCtx
let gCurrShape = ''
let gPen = { pos: null, isDown: false }
let gLine = []

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}


function onStartLine(ev) {
    gPen.pos = { x: ev.offsetX, y: ev.offsetY }
    gPen.isDown = true
    // gCtx.strokeStyle = 'green'

    gLine = []
    gLine.push(gPen.pos)
    // console.log(gCtx);
    // console.log(gLine);
    // gCtx.drawArc()
    console.log(gPen);
    gCtx.beginPath()
    gCtx.moveTo(gPen.pos.x, gPen.pos.y)
}

function onDrawLine(ev) {
    if (!gPen.isDown) return
    const { offsetX, offsetY } = ev

    onDraw(ev)
    gPen.pos = { x: offsetX, y: offsetY }
    gLine.push(gPen.pos)

    // gLine.

    gCtx.lineTo(offsetX, offsetY)
    gCtx.stroke()
}

function onEndLine(ev) {
    gPen.isDown = false
    gCtx.closePath()
}

function drawRect(x, y) {
    gCtx.beginPath()

    gCtx.lineWidth = 4
    gCtx.strokeRect(x, y, 120, 120)

    gCtx.fillRect(x, y, 120, 120)
}

function drawArc(x, y) {
    gCtx.beginPath()

    // The x,y cords of the center, radius,
    // starting angle & ending angle, in radians

    gCtx.arc(x, y, 70, 0, 2 * Math.PI) // draws a circle

    gCtx.lineWidth = 4
    gCtx.stroke()

    // gCtx.fill()
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
    const { offsetX, offsetY } = ev

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'line':
            drawLine(offsetX, offsetY)
            break
    }
}
