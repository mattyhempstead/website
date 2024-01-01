/**
 * A drawing canvas for the nn
 */
class DrawCanvas {
    constructor() {

        this.canvasGrid = [];
		for (let y=0; y<28; y++) {
			let row = []
			for (let x=0; x<28; x++) {
				row.push([0])
			}
			this.canvasGrid.push(row)
        }
        
		// image = tf.tensor4d([image])

        this.renderRect = {x:5,y:5,w:16*28/9.6,h:16*28/9.6}
    }
    update() {

    }
    render() {
        setScaleEqual()
        drawRect(this.renderRect,"white", "black", 1)

        for (let y=0; y<28; y++) {
			for (let x=0; x<28; x++) {
                let colour = 255 - 255*this.canvasGrid[y][x][0]
                colour = `rgb(${colour},${colour},${colour})`

                drawRect({
                    x: this.renderRect.x + this.renderRect.w * (x/28),
                    y: this.renderRect.y + this.renderRect.h * (y/28),
                    w: this.renderRect.w / 28,
                    h: this.renderRect.h / 28
                }, colour, false)

			}
        }

        setScaleRatio()
    }
    clearCanvas() {
        for (let y=0; y<28; y++) {
			for (let x=0; x<28; x++) {
				this.canvasGrid[y][x][0] = 0
			}
        }
    }
	drawOnCanvas() {
		if (main.mouseDown && pointInRect(main.mousePosEqual, this.renderRect)) {
            let gridPosX = main.mousePosEqual.x
            gridPosX -= this.renderRect.x
            gridPosX /= this.renderRect.w
            gridPosX *= 28
            gridPosX = Math.min(28,Math.floor(gridPosX))

            let gridPosY = main.mousePosEqual.y
            gridPosY -= this.renderRect.y
            gridPosY /= this.renderRect.h
            gridPosY *= 28
            gridPosY = Math.floor(gridPosY)

            // Draw a nice blur around the cursor
            let spread = 2
            for (let y=-spread; y<=spread; y++) {
                for (let x=-spread; x<=spread; x++) {
                    let drawX = x + gridPosX
                    let drawY = y + gridPosY
                    if (drawX < 0 || drawX >= 28 || drawY < 0 || drawY >= 28) continue

                    let strength = 1 - (Math.hypot(x,y) / Math.sqrt(2 * spread**2))**1.8
                    this.canvasGrid[drawY][drawX][0] = Math.max(strength, this.canvasGrid[drawY][drawX][0])
                }
            }

            main.predict()
        }
	}
}