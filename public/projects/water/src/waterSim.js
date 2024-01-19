
class WaterSim {
	constructor() {
		
		this.paused = false
		this.raining = false

		this.buttons = [];


		this.rect = {x:0, y:0, w:100, h:100}

		this.MAIN_SPRING = 250
		this.NEIGHBOUR_SPRING = 250

		// Just a huge 2D grid of particles with a spring to the center and springs with eachother
		this.GRID_WIDTH = 96
		this.GRID_HEIGHT = 96
		this.amplitudeGrid = []
		for (let y=0; y<this.GRID_HEIGHT; y++) {
			let row = []
			for (let x=0; x<this.GRID_WIDTH; x++) {
				row.push(0)
			}
			this.amplitudeGrid.push(row)
		}

		this.velocityGrid = []
		for (let y=0; y<this.GRID_HEIGHT; y++) {
			let row = []
			for (let x=0; x<this.GRID_WIDTH; x++) {
				row.push(0)
			}
			this.velocityGrid.push(row)
		}

	}
	update(dt=1/60) {

		if (main.keyPressed["KeyP"]) {
			this.paused = !this.paused
		}
		if (main.keyPressed["KeyR"]) {
			this.raining = !this.raining
		}
		if (main.keyPressed["KeyC"]) {
			this.clearGrid()
		}


		if (this.paused) return

		for (let y=0; y<this.GRID_HEIGHT; y++) {
			for (let x=0; x<this.GRID_WIDTH; x++) {
				let amplitude = this.amplitudeGrid[y][x]
				let accel = 0


				// Add acceleration towards equilibrium
				// accel += -amplitude * this.MAIN_SPRING

				// Add acceleration towards neighbours
				if (x>0) accel += this.NEIGHBOUR_SPRING * (this.amplitudeGrid[y][x-1] - amplitude)
				if (y>0) accel += this.NEIGHBOUR_SPRING * (this.amplitudeGrid[y-1][x] - amplitude)
				if (x<this.GRID_WIDTH-1) accel += this.NEIGHBOUR_SPRING * (this.amplitudeGrid[y][x+1] - amplitude)
				if (y<this.GRID_HEIGHT-1) accel += this.NEIGHBOUR_SPRING * (this.amplitudeGrid[y+1][x] - amplitude)

				this.velocityGrid[y][x] += dt * accel
			}
		}

		for (let y=0; y<this.GRID_HEIGHT; y++) {
			for (let x=0; x<this.GRID_WIDTH; x++) {
				this.amplitudeGrid[y][x] += dt * this.velocityGrid[y][x]

				this.velocityGrid[y][x] *= 0.99
			}
		}
		
		// If raining, spawn random rain drops
		if (this.raining) {
			if (Math.random() < 5*dt) {
				let x = Math.floor(Math.random()*this.GRID_WIDTH)
				let y = Math.floor(Math.random()*this.GRID_HEIGHT)
				this.amplitudeGrid[y][x] = 2
			}
		}


	}
	render() {
		fillCanvas("#eee")

		setScaleEqual()

		drawRect(this.rect, "white", "black")

		let square = {
			x:0,
			y:0,
			// w: this.rect.w / this.GRID_WIDTH,
			// h: this.rect.h / this.GRID_HEIGHT
			w: Math.floor(canvas.width / this.GRID_WIDTH),
			h: Math.floor(canvas.width / this.GRID_HEIGHT)
		}

		// let square = {
		// 	x:0,
		// 	y:0,

		// }


		for (let y=0; y<this.GRID_HEIGHT; y++) {
			for (let x=0; x<this.GRID_WIDTH; x++) {
				square.x = x*square.w
				square.y = y*square.h

				let colour = Math.tanh(this.amplitudeGrid[y][x])
				colour = `rgb(${160 + 96*colour},${224 + 32*colour},${224 + 32*colour})`
				// colour = `rgb(${96 + 32*colour},${208 + 48*colour},${208 + 48*colour})`


				// Slightly faster to use fillRect instead of custom drawRect :/
				// The fastest method is probably to edit an array of pixel data directly and draw that image onto the canvas

				// drawRect(square, colour, false)
				
				ctx.fillStyle = colour
				ctx.fillRect(
					square.x, 
					square.y, 
					square.w, 
					square.h
				);
				

			}
		}

		setScaleRatio()

		drawText("Rain: " + ((this.raining) ? "On" : "Off"), {x:2, y:2}, 3, "rgba(0,0,0,0.5)")
		drawText("Paused: " + ((this.paused) ? "True" : "False"), {x:2, y:6}, 3, "rgba(0,0,0,0.5)")

	}
	clearGrid() {
		for (let y=0; y<this.GRID_HEIGHT; y++) {
			for (let x=0; x<this.GRID_WIDTH; x++) {
				this.velocityGrid[y][x] = 0
				this.amplitudeGrid[y][x] = 0
			}
		}
	}
	onClick() {
		// Spawn a new droplet
		setScaleEqual()
		if (pointInRect(main.clickPosEqual, this.rect)) {
			let x = Math.floor((main.clickPosEqual.x - this.rect.x) / this.rect.w * this.GRID_WIDTH)
			let y = Math.floor((main.clickPosEqual.y - this.rect.y) / this.rect.h * this.GRID_HEIGHT)
			this.amplitudeGrid[y][x] = 3
		}
		setScaleRatio()
	}
	onMouseDown() {
	}
}

