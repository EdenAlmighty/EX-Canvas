

//DRAG AND DROP - CENTER DIV AFTER LEAVING CANVAS :)
function moveCircle(dx, dy) {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    gCircle.pos.x += dx
    gCircle.pos.y += dy

    if (gCircle.pos.y > gElCanvas.height - (Math.sqrt(gCircle.size)) ||
        gCircle.pos.x > gElCanvas.width - (Math.sqrt(gCircle.size)) ||
        gCircle.pos.y < (Math.sqrt(gCircle.size)) ||
        gCircle.pos.x < (Math.sqrt(gCircle.size))) {
        gCircle.pos = center
        console.log(gCircle.pos);
        gCircle.isDrag = false
    }
}
