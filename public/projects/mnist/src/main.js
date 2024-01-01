/*
	Should move the sim stuff related to generations into here
	sim.js should remain as a class specifically for the simulation (game) that the bot participates in
	main.js should be a class which handles creating/selecting new bots based on their performance in sim.js
	sim.js should be global to many different main.js evolution methods
*/
class Main extends Environment {
	constructor() {
		super()

		this.buttons = [
			new Button({
				text: "Clear Canvas",
				rect: { x: 60, y: 8, w: 16, h: 7 },
				action: (button) => {
					this.drawCanvas.clearCanvas()
					this.predict()
				}
			}),
		]

		this.drawCanvas = new DrawCanvas()

		this.prediction = [0,0,0,0,0,0,0,0,0,0]

		// Load model from file
		tf.loadLayersModel('model/model.json').then(evt=>{
			this.model = evt
			this.predict()
		})

	}
	update() {

		this.drawCanvas.update()

	}
	render() {

		this.drawCanvas.render()

		for (let i in this.prediction) {
			drawText(i, {x:60,y:20+i*7})

			let barRect = {x:65, y:20+i*7, w:20, h:4}
			let predictionRect = {
				x: barRect.x,
				y: barRect.y,
				w: barRect.w * this.prediction[i],
				h: barRect.h
			}

			drawRect(predictionRect, "black")
			drawRect(barRect, false, "black")
		}

	}
	predict() {
		let image = this.drawCanvas.canvasGrid
		image = tf.tensor4d([image])

		this.model.predict(image).data().then(evt => {
			this.prediction = evt
			// console.log(evt)
		})

	}
	onMouseMove() {
		this.drawCanvas.drawOnCanvas()
	}
	onMouseDown() {
		this.drawCanvas.drawOnCanvas()
	}
}

let main = new Main();
main.init();
