
/*
	
	The main class for the program
	 - Contains the update and render loop
	 - Handles all the modes
	 - Holds the GAN and training data
	 - Also contains any other functions related to the project and univeral to multiple modes

*/


class Main {
	constructor() {

		this.mousePos = {x:-1,y:-1};	// Position from top left (start off screen to prevent dropdown hover)
		this.mouseOffset = {x:0,y:0};	// Relative offset from center of canvas
		this.mouseDown = {state:false, x:0, y:0};	// If and where mouse held down

		this.buttons = [
		
		];

		this.trainingData = [];

		this.disNN = undefined;
		this.genNN = undefined;

		// List of modes
		this.modeList = [
			new HomeClass(),
			new DrawClass(),
			new TrainClass(),
			new TestClass()
		];

		// Extra network creation mode
		this.networkCreationMode = new NetworkCreationClass();

		this.mode = this.modeList[0];

		this.navBar = new NavBar();

		// Link to press for image donwload
		this.downloadLink = document.createElement("a");
		this.downloadLink.style.display = "none";

		this.uploadType = undefined;	// Set to determine what type of upload is occuring

	}
	init() {

		this.networkCreationMode.initCreation();

	}
	render() {

		fillCanvas("#DDDDDD");

		this.mode.render();

		// Render buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].render();
		}

		// Render navigation bar last so that dropdown overlays other screen elements
		this.navBar.render();
		
	}
	update() {

		this.mode.update();

	}
	testButtons() {
		// Only check button presses if not selecting options in nav bar
		if (main.navBar.topOptionSelected == undefined) {
			// Tests for clicks in global buttons
			for (let i in this.buttons) {
				// If button clicked, stop checking for button presses
				if (this.buttons[i].testForClick()) return;
			}

			// Tests for clicks in mode buttons
			this.mode.testButtons();
		} else {
			main.navBar.testForClick();
		}
	}
	testMouseDown() {
		this.mode.testMouseDown();
	}

	genNoise(length) {	// Returns noise of given length used for input to the generator
		let input = new Array(length);
		for (let i=0; i<length; i++) {
			input[i] = Math.random()*2 - 1;		// Scale values between -1 and 1
		}
		return input;
	}

	drawImage(pixelArray, rect, _ctx=ctx) {		// Draws an image inside a rectangle from a given pixel array
		// Find rectangle of pixel
		let pixelRect = {	
			x: 0, 
			y: 0, 
			w: rect.w/28, 
			h: rect.h/28
		};

		// For each individual pixel
		for (let y=0; y<28; y++) {	
			for (let x=0; x<28; x++) {

				// Convert pixel greyscale to HTML RGB colour format
				let pixelColour = Math.round(255 * (pixelArray[y*28+x]+1)/2);
				pixelColour = "rgb(" + pixelColour + "," + pixelColour + "," + pixelColour + ")";
				
				// Get pixel position based on its (x,y) index
				pixelRect.x = rect.x + x*pixelRect.w;
				pixelRect.y = rect.y + y*pixelRect.h;

				// Draw pixel
				drawRect(pixelRect, false, 0, pixelColour, false, _ctx);
			}
		}
	}

	downloadGAN() {		// Downloads GAN (both disNN and genNN) to a text file
		if (this.disNN) {
			console.log("Downloading GAN");
			let textFile = JSON.stringify({		// Get JSON string of GAN
				"type": "gan",
				"dis_structure": this.disNN.structure,
				"dis_learning-rate": this.disNN.LEARNING_RATE,
				"dis_network": this.disNN.network,
				"gen_structure": this.genNN.structure,
				"gen_learning-rate": this.genNN.LEARNING_RATE,
				"gen_network": this.genNN.network
			});	
			textFile = new Blob([textFile], {type:"text/plain"});		// Convert to Blob
			this.downloadLink.href = URL.createObjectURL(textFile);		// Get URL form
			this.downloadLink.download = "GAN-Saved.JSON";				// File name
			this.downloadLink.click();	// Download file
		} else {
			console.log("Need to create a GAN to save it...");
		}
	}
	downloadData() {
		if (this.trainingData.length > 0) {
			console.log("Downloading Training Data");
			let textFile = JSON.stringify({		// Get JSON string of training data
				"type": "data",
				"width": 28, 
				"height": 28, 
				"dataLength": this.trainingData.length, 
				"data": this.trainingData
			});	
			textFile = new Blob([textFile], {type:"text/plain"});		// Convert to Blob
			this.downloadLink.href = URL.createObjectURL(textFile);		// Get URL form
			this.downloadLink.download = "GAN-Training-Data-Saved.JSON";// File name
			this.downloadLink.click();	// Download file
		} else {
			console.log("No training data exists to be downloaded...")
		}
	}

	uploadFile(data) {		// Function that gets run when file is uploaded
		try {
			data = JSON.parse(data);
		} catch(err) {
			console.log(err);
			console.log("File is not of JSON format");
			return;
		}

		if (this.uploadType == "gan") {
			// Checks for validity
			if (data.type == "gan") {
				this.disNN = new NN(data["dis_structure"], data["dis_learning-rate"]);
				this.disNN.network = data["dis_network"];
				this.genNN = new NN(data["gen_structure"], data["gen_learning-rate"]);
				this.genNN.network = data["gen_network"];
				this.initNewGAN();
			}

		} else if (this.uploadType == "data") {
			// Checks for validity based on given info about data
			if (data.type == "data") {
				this.trainingData = data.data;
				main.modeList[1].resetAll();	// Reset drawing mode
				main.modeList[2].sample = 0;	// Go back to first sample because length of data may have changed
			}

		}
		console.log("Sucessfully uploaded " + this.uploadType);
	}

	initNewGAN() {	// Run when new GAN is created
		// Reset training mode
		main.modeList[2].resetAll();

		// Enable user prompt in network creation mode
		this.networkCreationMode.userPrompt = true;
	}
}

