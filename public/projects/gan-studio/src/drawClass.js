
/*
	
	Also change colour darkness
	
*/

class DrawClass {
	constructor() {

		this.name = "Draw";

		this.buttons = [
			new Button({
				text: "/\\",
				rect: {x:0, y:140-30, h:20, w:40},
				action: function() {
					main.mode.scrollImageListUp();
				}
			}),
			new Button({
				text: "\\/",
				rect: {x:0, y:140+396+10, h:20, w:40},
				action: function() {
					main.mode.scrollImageListDown();
				}
			}),
			new Button({
				text: "New Image",
				rect: {x:70, y:300, h:35, w:170},
				action: function() {
					main.mode.newImage();
				}
			}),	
				new Button({
				text: "Delete Image",
				rect: {x:260, y:300, h:35, w:170},
				action: function() {
					main.mode.deleteImage();
				}
			}),
			new Button({
				text: "Clear Image",
				rect: {x:70, y:350, h:35, w:170},
				action: function() {
					main.mode.clearImage();
				}
			}),
			new Button({
				text: "Copy Image",
				rect: {x:260, y:350, h:35, w:170},
				action: function() {
					main.mode.copyImage();
				}
			})
		];

		this.sliders = [
			new Slider({
				rect: {x:90, y:515, w:275, h:10},
				radius: 10,
				bounds: {min:0, max:10},
				value: function() {
					return main.mode.brushSize;
				},
				setValue: function(newValue) {
					main.mode.brushSize = newValue;
				}
			})
		];

		// List of pixels stored as a reference pointer to arrays in training data
		this.drawCanvas = undefined;		

		this.canvasRect = {x:1120-448-68, y:114, w:448, h:448};		// Rectangle of canvas on screen
		this.canvasDim = {x:28, y:28};	// Dimentions of canvas (pixel dimentions)

		this.brushSize = 2;

		this.canvasSelected = false;	// Only draw if mouse went down inside of canvas


		// Variables for interactive list of training data images
		this.listImageScrollIndex = 0;	// Current scroll position (top/end of list is 0)
		this.listImageLength = 6;	// Number of images displayed at once

		this.listImageSelected = undefined;		// Selected image to edit, undefined = no image selected
		this.colourSelectedImageBorder = "#009900";	// Colour of border surrounding selected image in imageList

		this.listImageGapSize = 10;		// Gap in pixels between images

		this.listImageRect = {	// Rectangle holding a one wide list of all images
			x:500, 
			y:338 - 396/2, 
			w:(396-this.listImageGapSize*(this.listImageLength-1)) / this.listImageLength, 
			h:396
		};
		// Centre imageList nav buttons
		this.buttons[0].rect.x = this.listImageRect.x + (this.listImageRect.w - this.buttons[0].rect.w)/2;
		this.buttons[1].rect.x = this.listImageRect.x + (this.listImageRect.w - this.buttons[1].rect.w)/2;


		this.scrollers = [
			new Scroller({
				rect: {x:570, y:140, w:15, h:396},
				displayPortion: this.listImageLength,
				getBounds: function() {
					return {min:0, max:main.trainingData.length};
				},
				getValue: function() {
					return main.mode.listImageScrollIndex;
				},
				setValue: function(newValue) {
					main.mode.listImageScrollIndex = newValue;
				}
			})
		];

	}
	render() {

		// Title
		drawText("Drawing", 50, 120, 50, "black", "left");

		drawText("Draw your own training data", 50, 190, 24, "black", "left"); 
		drawText("for your GAN to use.", 50, 220, 24, "black", "left");

		// Renders selected image text bottom right of draw canvas
		if (this.listImageSelected != undefined) {
			let text = "Selected Image: " + (main.trainingData.length-this.listImageSelected);
			text = text + " / " + main.trainingData.length;
			let drawPos = {
				x: this.canvasRect.x + this.canvasRect.w - 5,
				y: this.canvasRect.y + this.canvasRect.h + 25
			}
			drawText(text, drawPos.x, drawPos.y, 20, "black", "right");
		}

		// Brush size slider title
		drawText("Brush Size", 90, 500, 20, "black", "left");
		
		// Draw canvas image
		if (this.drawCanvas) {
			main.drawImage(this.drawCanvas, this.canvasRect);
		} else {
			drawText("Click Here To", this.canvasRect.x + this.canvasRect.w/2, 320, 35, "black", "center");
			drawText("Create New Image", this.canvasRect.x + this.canvasRect.w/2, 360, 35, "black", "center");
		}

		// Border around generated image
		drawRect(this.canvasRect, "black", 1);

		// Draw training data list of images
		this.drawImageList();

		// Render mode specific buttons
		this.renderButtons();

		// Render sliders
		this.renderSliders();

		// Render scrollers
		this.renderScrollers();

	}
	update() {

		// Only allow drawing if mouse down within drawing canvas
		if (!main.mouseDown.state) this.canvasSelected = false;
		if (this.canvasSelected && pointInRect(main.mousePos, this.canvasRect)) {
			if (this.listImageSelected == undefined) {	
				// If no image selected, create new image
				this.newImage();
				this.canvasSelected = false;
			} else {	
				// If image selected, draw on it
				this.drawOnCanvas();
			}
		}

		// Update sliders
		for (var i in this.sliders) {
			this.sliders[i].update();
		}

		// Update scrollers
		for (var i in this.scrollers) {
			this.scrollers[i].update();
		}
	}

	renderButtons() {
		for (let i in this.buttons) {	
			// Only render up/down image list nav buttons at certain times
			if (this.buttons[i].text == "/\\") {
				if (this.listImageScrollIndex > 0) {
					this.buttons[i].render();
				}
			} else if (this.buttons[i].text == "\\/") {
				if (this.listImageScrollIndex + this.listImageLength < main.trainingData.length) {
					this.buttons[i].render();
				}
			} else {
				this.buttons[i].render();
			}
		}
	}
	renderSliders() {
		for (let i in this.sliders) {
			this.sliders[i].render();
		}
	}
	renderScrollers() {
		for (var i in this.scrollers) {
			this.scrollers[i].render();
		}
	}

	testMouseDown() {	// Run when mouse is down
		if (pointInRect(main.mousePos, this.canvasRect)) {
			this.canvasSelected = true;
		}

		// Test for holding of sliders
		for (var i in this.sliders) {
			if (this.sliders[i].testForHold()) break;
		}

		// Test for holding of scrollers
		for (var i in this.scrollers) {
			if (this.scrollers[i].testForHold()) break;
		}
	}
	testButtons() {		// Tests for click in any buttons throughout mode
		for (let i in this.buttons) {
			// If button clicked, stop checking for button presses
			if (this.buttons[i].text == "/\\") {	// Scroll up button
				// Only render if can scroll up
				if (this.listImageScrollIndex > 0) {
					if (this.buttons[i].testForClick()) break;
				}
			} else if (this.buttons[i].text == "\\/") {		// Scroll down button
				// Only render if can scroll down
				if (this.listImageScrollIndex + this.listImageLength < main.trainingData.length) {
					if (this.buttons[i].testForClick()) break;
				}
			} else {
				if (this.buttons[i].testForClick()) break;
			}
		}

		// mouseUp means sliders are unselected
		for (var i in this.sliders) {
			this.sliders[i].testForLift();
		}

		// mouseUp means scrollers are unselected
		for (var i in this.scrollers) {
			this.scrollers[i].testForLift();
		}

		// Test for clicking of image list if mouse did not move during click
		if (main.mousePos.x == main.mouseDown.x && main.mousePos.y == main.mouseDown.y) {
			this.testImageListSelection();
		}
	}

	testImageListSelection() {
		for (var i=0; i<this.listImageLength; i++) {
			// Starts from final image when (this.listImageScrollIndex==0) and works backwards
			let imageIndex = main.trainingData.length-1 - i - this.listImageScrollIndex;
			
			if (imageIndex < 0) break;	// Stop testing if images doesn't exist

			// Rectangle of individual image in image list
			let imageRect = {
				x: this.listImageRect.x,
				y: this.listImageRect.y + i*(this.listImageRect.w+this.listImageGapSize),
				w: this.listImageRect.w,
				h: this.listImageRect.w
			}

			// If clicked, select image and stop testing
			if (pointInRect(main.mousePos, imageRect)) {
				if (this.listImageSelected == imageIndex) {
					this.selectImage(undefined);
				} else {
					this.selectImage(imageIndex);
				}
				break;
			}
		}
	}

	newImage() {	// Creates and adds a new image to training data
		let newImage = new Array(28*28);
		newImage.fill(-1);
		main.trainingData.push(newImage);

		this.listImageScrollIndex = 0;	// Scroll to top
		this.selectImage(main.trainingData.length-1);	// Select the new image
	}
	deleteImage() {		// Deletes the selected image
		// Can't delete image if nothing selected
		if (this.listImageSelected == undefined) return;

		// Remove image from training data array
		main.trainingData.splice(this.listImageSelected, 1);	

		// Select image below previous selection
		if (main.trainingData.length == 0) {
			// If no more images left, select nothing
			this.selectImage(undefined);	
		} else if (this.listImageSelected > 0) {
			// Otherwise select below image unless already at bottom
			this.selectImage(this.listImageSelected - 1);
		}	

		// Scroll up if last image was removed 
		if (this.listImageScrollIndex + this.listImageLength > main.trainingData.length) {
			this.listImageScrollIndex = main.trainingData.length - this.listImageLength;

			// Stop scroll index going negative when not enough image already exist after removal
			this.listImageScrollIndex = Math.max(0, this.listImageScrollIndex);
		}
	}
	copyImage() {	// Copies selected image into training data and selects it
		// Can't copy image if nothing selected
		if (this.listImageSelected == undefined) return;

		let copyImage = [];
		for (let i=0; i<this.drawCanvas.length; i++) {
			copyImage.push(this.drawCanvas[i]);
		}
		main.trainingData.push(copyImage);

		this.listImageScrollIndex = 0;	// Scroll to top
		this.selectImage(main.trainingData.length-1);	// Select the new image
	}
	clearImage() {		// Sets image to all black
		// Can't clear if no image to clear
		if (this.drawCanvas) this.drawCanvas.fill(-1);
	}

	selectImage(index) {	// Selects image
		this.listImageSelected = index;	
		this.drawCanvas = main.trainingData[index];	
	}

	scrollImageListUp() {
		if (this.listImageScrollIndex > 0) {
			this.listImageScrollIndex -= 1;
		}
	}
	scrollImageListDown() {
		if (this.listImageScrollIndex < main.trainingData.length-1) {
			this.listImageScrollIndex += 1;
		}
	}
	drawImageList() {	// Draws list of images
		for (var i=0; i<this.listImageLength; i++) {
			// Starts from final image when (this.listImageScrollIndex==0) and works backwards
			let imageIndex = main.trainingData.length-1 - i - this.listImageScrollIndex;

			let imageRect = {
				x: this.listImageRect.x,
				y: this.listImageRect.y + i*(this.listImageRect.w+this.listImageGapSize),
				w: this.listImageRect.w,
				h: this.listImageRect.w
			}

			// Render empty square if no image exists for this place yet
			if (imageIndex < 0) {
				drawRect(imageRect, "black", 1);
				continue;
			}

			// Black background to stop glitchy rendering
			drawRect(imageRect, false, 1, "black");

			// Draw actual image from training data
			main.drawImage(main.trainingData[imageIndex], imageRect);

			// Draw border around image
			if (this.listImageSelected == imageIndex) {
				drawRect(imageRect, this.colourSelectedImageBorder, 3);
			} else {
				drawRect(imageRect, "black", 1);
			}
		}
	}

	drawOnCanvas() {	// Draws on canvas based on mouse position

		// Relative (x,y) of mousePos to canvas as a decimal between 0 and 1
		let relMousePos = {
			x: this.canvasDim.x * (main.mousePos.x - this.canvasRect.x) / this.canvasRect.w, 
			y: this.canvasDim.y * (main.mousePos.y - this.canvasRect.y) / this.canvasRect.h
		};	

		// For all possible pixels within rectangular brush size radius
		for (var y=-Math.floor(this.brushSize); y<=Math.ceil(this.brushSize); y++) {
			for (var x=-Math.floor(this.brushSize); x<=Math.ceil(this.brushSize); x++) {

				// Coordinates of pixel
				let pixelCoords = {
					x: Math.floor(relMousePos.x + x),
					y: Math.floor(relMousePos.y + y)
				}

				// Skip check if outside canvas
				if (relMousePos.x + x < 0 || relMousePos.x + x >= 28) continue;
				if (relMousePos.y + y < 0 || relMousePos.y + y >= 28) continue;

				// Find distance between mousePos and center of pixel
				let centerDist = Math.hypot(pixelCoords.x+0.5-relMousePos.x, pixelCoords.y+0.5-relMousePos.y);

				// Distance determines if coloured (and what darkness)
				if (centerDist <= this.brushSize) {
					let colour = 1 - 2*(centerDist/this.brushSize)**2;
					let pixelIndex = this.canvasDim.y*pixelCoords.y + pixelCoords.x;
					this.drawCanvas[pixelIndex] = Math.max(colour, this.drawCanvas[pixelIndex]);
				}
			}
		}
	}

	resetAll() {	// Resets entire mode
		this.drawCanvas = undefined;		
		this.brushSize = 2;
		this.canvasSelected = false;	// Only draw if mouse went down inside of canvas

		// Variables for interactive list of training data images
		this.listImageScrollIndex = 0;	// Current scroll position (top/end of list is 0)
		this.listImageLength = 6;	// Number of images displayed at once

		this.listImageSelected = undefined;		// Selected image to edit, undefined = no image selected
	}
}
