
/*
	Maybe eventually to save processing power for rendering/averaging data during scaling
	Each graph has a variable which keeps track of when graph needs to render again
	This probably can't work with all other items rendering on screen so maybe have
	 some secondary 'canvas' which is then drawn to screen each frame instead.
*/

class Graph {
	constructor(name, rect) {
		/*
			buttons is the array of buttons which the zoom buttons will be tested within
		*/

		this.name = name;	// Name of graph (what the data represents)

		this.min = 0;
		this.max = 0;

		this.rect = rect;

		this.data = [];
		this.scaleFactor = 0;

		this.buttons = [
			new Button({
				text: "+",
				rect: {x:this.rect.x+this.rect.w-3.5, y:this.rect.y-3.5*screenRatio, w:3, h:3*screenRatio},
				action: () => {
					this.zoomIn();
				}
			}),
			new Button({
				text: "-",
				rect: {x:this.rect.x+this.rect.w-7, y:this.rect.y-3.5*screenRatio, w:3, h:3*screenRatio},
				action: () => {
					this.zoomOut();
				} 
			})
		];
	}
	render() {

		// Average all data points based on the scaleFactor
		this.max = 0;
		let averagedData = [];
		// For as many averaged point as there will be => floor(num points / averaging size)
		for (let i=0; i<Math.floor(this.data.length/(10**this.scaleFactor)); i++) {
			averagedData.push(0)

			// Sum all data points used for a single averaged point
			for (let j=0; j<10**this.scaleFactor; j++) {
				averagedData[i] += this.data[i*(10**this.scaleFactor) + j];
			}
			averagedData[i] /= 10**this.scaleFactor;	// Divide by num of points to get average

			// Set new max averaged value
			this.max = Math.max(averagedData[i], this.max);	
		}

		// Main rectangle
		drawRect(this.rect, "white", "black", 1);	

		// // Draw lines connecting data points
		// ctx.lineCap = "round";
		// ctx.lineWidth = 2;
		// ctx.strokeStyle = "red";
		// ctx.beginPath();
		// for (let i=0; i<averagedData.length; i++) {
		// 	// Find position of data point scaled based on max value and num of points
		// 	let plotPos = {		
		// 		x: this.rect.x + this.rect.w * i/(averagedData.length-1),
		// 		y: this.rect.y + this.rect.h * (1 - averagedData[i]/this.max)
		// 	}
			
		// 	if (i==0) ctx.moveTo(plotPos.x, plotPos.y);
		// 	else ctx.lineTo(plotPos.x, plotPos.y);
		// }
		// ctx.stroke();


		let graphPoints = []
		for (let i=0; i<averagedData.length; i++) {
			// Find position of data point scaled based on max value and num of points
			let plotPos = {		
				x: this.rect.x + this.rect.w * i/(averagedData.length-1),
				y: this.rect.y + this.rect.h * (1 - averagedData[i]/this.max)
			}
			
			graphPoints.push(plotPos)
		}
		drawLines(graphPoints, "red", 0.2) 


		// -- Render text --

		// Render name in top middle
		drawText(this.name, {x: this.rect.x + this.rect.w*0.5, y: this.rect.y-3}, 3, "black", "center");

		// Render data length bottom right
		let dataLengthString = averagedData.length + (this.scaleFactor?(" ("+this.data.length+")"):"");
		drawText(dataLengthString, {x:this.rect.x+this.rect.w-0.5, y:this.rect.y+this.rect.h+1}, 2, "black", "right");

		// Render max value top left
		drawText(this.max.toFixed(2), {x: this.rect.x+0.5, y: this.rect.y-4}, 2, "black", "left");

		// Render scale top right
		drawText(10**this.scaleFactor + "x", {x: this.rect.x+this.rect.w-8, y: this.rect.y-5}, 2, "black", "right");

		// Render graph buttons (for zooming in and out)
		for (let i in this.buttons) {	
			this.buttons[i].render();
		}

	}
	onClick() {

		// Tests for clicks in buttons inside graph
		for (let i in this.buttons) {
			// If button clicked, stop checking for button presses
			if (this.buttons[i].onClick()) return;
		}

	}
	addData(dataItem) {
		this.data.push(dataItem);

		// Check if too many points
		//while (Math.floor(this.data.length/(10**this.scaleFactor)) >= 5000) {
		//	this.zoomIn();
		//} 
	}
	zoomIn() {
		this.scaleFactor ++;
		console.log("Zoomed in: " + this.scaleFactor);
	}
	zoomOut() {
		this.scaleFactor --;
		this.scaleFactor = Math.max(this.scaleFactor, 0);	// Scale factor must be positive
		console.log("Zoomed out: " + this.scaleFactor);
	}
	newestDataItem() {
		return this.data[this.data.length-1];
	}

	resetData() {
		this.data = [];
	}
}