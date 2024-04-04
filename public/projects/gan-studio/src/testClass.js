
/*
	A mode for generating and viewing images
	Can also save images as a png

*/

class TestClass {
	constructor() {

		this.name = "Testing";

		this.buttons = [
			new Button({
				text: "Generate Image",
				rect: {x:180, y:300, h:40, w:250},
				action: function() {
					if (main.disNN != undefined) main.mode.generateImage();
				}
			}),
			new Button({
				text: "Download Image",
				rect: {x:180, y:350, h:40, w:250},
				action: function() {
					main.mode.downloadImage();
				}
			})
		];

		this.generatedImage = undefined;
		this.imageRect = {x:1120-448-68, y:114, w:448, h:448};


		// Add hidden HTML canvas element to document body
		// Image is drawn on hidden canvas which is downloaded as png
		this.downloadCanvas = document.createElement("canvas");
		this.downloadCtx = this.downloadCanvas.getContext('2d');
		this.downloadCanvas.style.display = "none";
		this.downloadCanvas.width = "448";
		this.downloadCanvas.height = "448";
		document.body.append(this.downloadCanvas);


	}
	render() {

		// Title
		drawText("Testing", 50, 120, 50, "black", "left");

		drawText("Use your trained GAN to generate", 50, 190, 24, "black", "left"); 
		drawText("and download images.", 50, 220, 24, "black", "left");

		// Draw generated image if one exists
		if (this.generatedImage != undefined) {
			main.drawImage(this.generatedImage, this.imageRect);

			let disOutput = main.disNN.getOutput(this.generatedImage, true)[0];
			if (disOutput >= 0) {
				disOutput = (100*disOutput).toFixed(2) + "% Real";
			} else {
				disOutput = (-100*disOutput).toFixed(2) + "% Fake"
			}
			drawText("Discriminator Thinks...", 305, 480, 24, "black", "center");
			drawText(disOutput, 305, 510, 24, "black", "center");

		}

		// Border around generated image
		drawRect(this.imageRect, "black", 1);


		// Render mode specific buttons
		for (let i in this.buttons) {	
			this.buttons[i].render();
		}

	}
	update() {
		
	}
	testButtons() {

		// Tests for clicks in buttons
		for (let i in this.buttons) {
			// If button clicked, stop checking for button presses
			if (this.buttons[i].testForClick()) break;
		}

	}
	testMouseDown() {
		
	}
	generateImage() {
		console.log("Generating Image");

		// Create noise and then feed through generator network
		let inputNoise = main.genNoise(main.genNN.structure[0]);
		this.generatedImage = main.genNN.getOutput(inputNoise, true);

	}
	downloadImage() {
		if (this.generatedImage != undefined) {
			// First draws image to hidden canvas
			// Sets href of hidden link to direct encoding of hidden canvas
			// Clicks the hidden link to initiate download
			main.drawImage(this.generatedImage, {x:0, y:0, w:448, h:448}, this.downloadCtx);
			main.downloadLink.href = this.downloadCanvas.toDataURL();
			main.downloadLink.download = "GAN_image.png";
			main.downloadLink.click();
		} else {
			console.log("Need to generate image before downloading")
		}
	}
}
