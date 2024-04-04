
/*
	A "Mode" for creating new GANs

*/

class NetworkCreationClass {
	constructor() {

		this.name = "GAN Creation";

		this.buttons = [
			new Button({
				text: "Create GAN",
				rect: {x:700, y:530, h:40, w:250},
				action: function() {
					main.mode.createGAN();
				}
			}),
			new Button({
				text: "Default Parameters",
				rect: {x:100, y:530, h:40, w:250},
				action: function() {
					main.mode.initCreation();
				}
			}),
			new Button({
				text: "Edit Generator",
				rect: {x:700, y:100, h:40, w:250},
				action: function() {
					if (main.mode.currentNetwork == "Discriminator") {
						main.mode.currentNetwork = "Generator";
						this.text = "Edit Discriminator";
					} else {
						main.mode.currentNetwork = "Discriminator";
						this.text = "Edit Generator";
					}
				}
			})
		];
		this.userPromptButtons = [	// Buttons that appear only on the Warning prompt
			new Button({
				text: "Save and Continue",
				rect: {x:560-150, y:340, h:40, w:300},
				action: function() {
					main.downloadGAN();		// Download current GAN before creating new
					main.mode.initCreation();
				}
			}),
			new Button({
				text: "Continue",
				rect: {x:560-150, y:390, h:40, w:300},
				action: function() {
					main.mode.initCreation();
				}
			}),
			new Button({
				text: "Cancel",
				rect: {x:560-150, y:440, h:40, w:300},
				action: function() {
					main.mode = main.modeList[0];
				}
			})
		];

		this.sliders = [
			new Slider({	// Hidden layer count
				rect: {x:100, y:300, w:300, h:10},
				radius: 10,
				bounds: {min:0, max:5},
				value: function() {
					return main.mode.getHiddenLayerCount();
				},
				setValue: function(newValue) {
					main.mode.setHiddenLayerCount(newValue);
				},
				intValue: true
			}),
			new Slider({	// Learning rate
				rect: {x:100, y:375, w:300, h:10},
				radius: 10,
				bounds: {min:0, max:5},
				value: function() {
					return main.mode.getLearningRate();
				},
				setValue: function(newValue) {
					main.mode.setLearningRate(newValue);
				},
				hideText: true
			}),
			new Slider({	// Generator Input Size
				rect: {x:100, y:450, w:300, h:10},
				radius: 10,
				bounds: {min:1, max:128},
				value: function() {
					return main.mode.getGenInputSize();
				},
				setValue: function(newValue) {
					main.mode.setGenInputSize(newValue);
				},
				intValue: true
			})
		];

		this.layerSliders = [];
		for (let i=0; i<5; i++) {	// Add 5 hidden layer sliders
			this.layerSliders.push(
				new Slider({
					rect: {x:650, y:230 + 40*i, w:300, h:10},
					radius: 10,
					bounds: {min:1, max:128},
					value: function() {
						return main.mode.getHiddenNeuronCount(i);
					},
					setValue: function(newValue) {
						main.mode.setHiddenNeuronCount(newValue, i);
					},
					intValue: true
				})
			);
		}


		// User initially asked if sure about creating new GAN
		// Once agreed, userPrompt set to true and current GAN is removed until new one is created
		this.userPrompt = false;
		this.userPromptBackgroundRect = {x:canvas.width*0.2, y:canvas.height*0.2, w:canvas.width*0.6, h:canvas.height*0.6};

		this.currentNetwork = "Discriminator";

		// Reference structure for both networks
		this.disStructure = [];
		this.genStructure = [0];	// Stops breaking before initCreation() has been run

		// Learning rates 
		this.disLearningRate = 0.01;
		this.genLearningRate = 0.01;

	}
	render() {

		//drawRect(this.imageRect, "black", 1);

		drawText("Tweaking Parameters for", 100, 120, 24, "#555555");
		drawText(this.currentNetwork + " Network", 100, 165, 35);

		// Display current network structure as text
		drawText("Structure:", 100, 210, 20, "#555555");
		if (this.currentNetwork == "Discriminator") {
			drawText("[" + this.disStructure.join(", ") + "]", 100, 240, 20, "#777777");
		} else {
			drawText("[" + this.genStructure.join(", ") + "]", 100, 240, 20, "#777777");
		}


		// Text above hidden layer count slider
		drawText("Hidden Layer Count", 100, 285, 20);

		// Text above learning rate slider
		drawText("Learning Rate", 100, 360, 20);
		// Learning rate (rounded to 1 sig fig)
		let text = (10**(-this.getLearningRate())).toFixed(Math.ceil(this.getLearningRate()));
		drawText(text, 100+300+25, 375+11, 20);

		// Text above generator input size
		if (this.currentNetwork == "Generator") {
			drawText("Generator Input Length", 100, 435, 20);
		}


		// Text above hidden layer neuron count sliders
		drawText("Neurons per Hidden Layer", 650, 200, 20);


		// Render sliders
		for (let i in this.sliders) {
			// Skip generator input length slider for discriminator
			if (i==2 && this.currentNetwork=="Discriminator") continue;	

			this.sliders[i].render(!this.userPrompt);
		}

		// Render sliders for neuron count in hidden layers
		if (this.currentNetwork == "Discriminator") {
			for (let i=0; i<this.disStructure.length-2; i++) {
				this.layerSliders[i].render(!this.userPrompt);
			}
		} else {
			for (let i=0; i<this.genStructure.length-2; i++) {
				this.layerSliders[i].render(!this.userPrompt);
			}
		}

		// Render mode specific buttons
		for (let i in this.buttons) {	
			this.buttons[i].render(!this.userPrompt);
		}


		// Render user prompt over everything including UI elements
		if (this.userPrompt) {
			this.renderUserPrompt();
		}
	}
	update() {

		if (!this.userPrompt) {
			
			// Update sliders
			for (var i in this.sliders) {
				// Skip generator input length slider for discriminator
				if (i==2 && this.currentNetwork=="Discriminator") continue;	

				this.sliders[i].update();
			}

			// Update sliders for neuron count in hidden layers
			if (this.currentNetwork == "Discriminator") {
				for (let i=0; i<this.disStructure.length-2; i++) {
					this.layerSliders[i].update();
				}
			} else {
				for (let i=0; i<this.genStructure.length-2; i++) {
					this.layerSliders[i].update();
				}
			}

		}
		
	}

	testButtons() {
		// Tests for clicks in buttons

		if (this.userPrompt) {	// If user prompt open, remove other button functionality
				for (let i in this.userPromptButtons) {
				// If button clicked, stop checking for button presses
				if (this.userPromptButtons[i].testForClick()) break;
			}
		} else {
			for (let i in this.buttons) {
				// If button clicked, stop checking for button presses
				if (this.buttons[i].testForClick()) break;
			}

			// mouseUp means sliders are unselected
			for (var i in this.sliders) {
				this.sliders[i].testForLift();
			}

			// All neuron count sliders are unselected
			for (let i in this.layerSliders) {
				this.layerSliders[i].testForLift();
			}
		}

	}
	testMouseDown() {
		if (!this.userPrompt) {
			// Test for holding of sliders
			for (var i in this.sliders) {
				// Skip generator input length slider for discriminator
				if (i==2 && this.currentNetwork=="Discriminator") continue;	

				if (this.sliders[i].testForHold()) break;
			}

			// Test for holding of sliders for neuron count in hidden layers
			if (this.currentNetwork == "Discriminator") {
				for (let i=0; i<this.disStructure.length-2; i++) {
					this.layerSliders[i].testForHold();
				}
			} else {
				for (let i=0; i<this.genStructure.length-2; i++) {
					this.layerSliders[i].testForHold();
				}
			}
		}
	}

	renderUserPrompt() {
		fillCanvas("rgba(0,0,0,0.5)")

		drawRect(this.userPromptBackgroundRect, "black", 1, "#AAAAAA");

		drawText("Warning", 560, 180, 30, "black", "center");
		drawText("You currently have a GAN already in use.", 560, 230, 24, "#111111", "center");
		drawText("It is recommended that you save your current", 560, 270, 24, "#111111", "center");
		drawText("GAN before creating a new one.", 560, 300, 24, "#111111", "center");


		// Render user prompt buttons
		for (let i in this.userPromptButtons) {	
			this.userPromptButtons[i].render();
		}
	}

	initCreation() {	// Initialise program for a new network
		// Remove user prompt
		this.userPrompt = false;

		// Remove old GAN
		main.disNN = undefined;
		main.genNN = undefined;

		// Set to default structure
		this.disStructure = [28*28, 16, 16, 1];
		this.genStructure = [128, 16, 28*28];

		// Reset learning rates
		this.disLearningRate = 0.01;
		this.genLearningRate = 0.01;

		// Reset testing mode
		main.modeList[3].generatedImage = undefined;

		// Reset training mode
		main.modeList[2].resetAll();

	}

	setHiddenLayerCount(newValue) {
		// Sets the hidden layer count of either network by altering its structure

		if (this.currentNetwork == "Discriminator") {
			if (this.disStructure.length-2 == newValue) return;		// No change required

			if (this.disStructure.length-2 < newValue) {	
				// Make network larger by adding empty layer
				this.disStructure.splice(this.disStructure.length-1, 0, 1);
			} else if (this.disStructure.length >= 3) {		
				// Make network smaller by removing 2nd last layer
				// Only remove if atleast 1 hidden exists already
				this.disStructure.splice(this.disStructure.length-2, 1);
			}
		} else {
			if (this.genStructure.length-2 == newValue) return;		// No change required

			if (this.genStructure.length-2 < newValue) {	// Make network larger by adding empty layer
				this.genStructure.splice(this.genStructure.length-1, 0, 1);
			} else if (this.genStructure.length >= 3) {		
				// Make network smaller by removing 2nd last layer
				// Only remove if atleast 1 hidden exists already
				this.genStructure.splice(this.genStructure.length-2, 1);
			}
		}
	}
	getHiddenLayerCount() {	// Returns hidden layer count for in current NN structure
		if (this.currentNetwork == "Discriminator") {
			return this.disStructure.length - 2;
		} else {
			return this.genStructure.length - 2;
		}
	}

	setLearningRate(newValue) {
		// New value between 0 and 5 which sets learning rate between 1 and 0.00001
		if (this.currentNetwork == "Discriminator") {
			this.disLearningRate = 10**(-newValue);
			this.disLearningRate = this.disLearningRate.toFixed(Math.ceil(this.getLearningRate()));
			this.disLearningRate = parseFloat(this.disLearningRate);
		} else {
			this.genLearningRate = 10**(-newValue);
			this.genLearningRate = this.genLearningRate.toFixed(Math.ceil(this.getLearningRate()));
			this.genLearningRate = parseFloat(this.genLearningRate);
		}
	}
	getLearningRate() {
		// Inverse of setLearningRate (take negative log base 10)
		if (this.currentNetwork == "Discriminator") {
			return -Math.log10(this.disLearningRate);
		} else {
			return -Math.log10(this.genLearningRate);
		}
	}

	setHiddenNeuronCount(newValue, index) {
		if (this.currentNetwork == "Discriminator") {
			this.disStructure[index+1] = newValue;
		} else {
			this.genStructure[index+1] = newValue;
		}
	}
	getHiddenNeuronCount(index) {
		if (this.currentNetwork == "Discriminator") {
			return this.disStructure[index+1];
		} else {
			return this.genStructure[index+1];
		}
	}

	setGenInputSize(newValue) {
		this.genStructure[0] = newValue;
	}
	getGenInputSize() {
		return this.genStructure[0];
	}

	createGAN() {	// Creates GAN with the parameters set
		main.disNN = new NN(shallowCopy(this.disStructure), this.disLearningRate);
		main.genNN = new NN(shallowCopy(this.genStructure), this.genLearningRate);

		main.mode = main.modeList[0];

		main.initNewGAN();
	}
}
