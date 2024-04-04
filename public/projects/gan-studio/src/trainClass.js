
/*
	A mode for training the network


*/

class TrainClass {
	constructor() {

		this.name = "Training";

		this.buttons = [
		/*	new Button({
				text: "Train Dis",
				rect: {x:70, y:200, h:35, w:190},
				action: function() {
					main.mode.trainDis();
				}
			}),
			new Button({
				text: "Train Gen",
				rect: {x:70, y:250, h:35, w:190},
				action: function() {
					main.mode.trainGen();
				}
			}),*/
			new Button({
				text: "AutoTrain: Off",
				rect: {x:50, y:400, h:35, w:190},
				action: function() {
					main.mode.toggleAutoTrain();
				}
			}),

			new Button({
				text: ">",
				rect: {x:723, y:580, h:30, w:30},
				action: function() {
					let graphKeys = Object.keys(main.mode.graphList);
					let newIndex = graphKeys.indexOf(main.mode.graph.name);
					newIndex = (newIndex + 1) % graphKeys.length;
					main.mode.graph = main.mode.graphList[graphKeys[newIndex]];
				}
			}),
			new Button({
				text: "<",
				rect: {x:687, y:580, h:30, w:30},
				action: function() {
					let graphKeys = Object.keys(main.mode.graphList);
					let newIndex = graphKeys.indexOf(main.mode.graph.name);
					newIndex = (newIndex - 1 + graphKeys.length) % graphKeys.length;
					main.mode.graph = main.mode.graphList[graphKeys[newIndex]];
				}
			})
		];

		this.sliders = [
			new Slider({
				rect: {x:50, y:340, w:215, h:10},
				radius: 10,
				bounds: {min:0, max:1},
				value: function() {
					return main.mode.trainRatio;
				},
				setValue: function(newValue) {
					main.mode.trainRatio = newValue;
				}
			})
		];

		this.autoTrain = {
			state: false,		// State of autoTrain (ON or OFF)
			lastCheck: Math.floor(new Date().getTime()/1000),	// Floored second of last check date
			lastSpeed: 0,		// Speed found in last check
			lastCount: 0		// trainCount when last check was made
		}
		this.trainTime = 0;		// Number of seconds autoTraining


		this.trainCount = 0;	// Overall times trained either network 

		this.trainLoop = 50;	// Times trained for full discriminator-generator
		this.trainRatio = 0.5;	// Ratio for training discriminator to generator

		this.trainDisSwitch = 0;	// Used for switching between Gen Real and Gen Fake
		this.trainSwitch = 0;	// Used for switching between Gen and Dis


		this.sampleNum = 0;		// One example at a time

		// Graphing
		this.graphRect = {x:370, y:100, h:470, w:700};
		this.graphList = {
			//"Blank": new Graph("Blank", this.graphRect),
			"disNN Error Loss": new Graph("disNN Error Loss", this.graphRect),
			"genNN Error Loss": new Graph("genNN Error Loss", this.graphRect)
		};
		this.graph = this.graphList[Object.keys(this.graphList)[0]];

		
		this.batchSize = 1;

		this.trainLoop = 50;


	}
	render() {

		//drawText(this.trainCount, 100, 400, 24, "black", "left");
		
		// Title
		drawText("Training", 50, 120, 50, "black", "left");

		drawText("Train your GAN to", 50, 190, 24, "black", "left"); 
		drawText("generate images.", 50, 220, 24, "black", "left");
		
		// Train ratio text
		drawText("Training Ratio (disNN:genNN)", 50, 325, 20, "black", "left");

		// AutoTrain speed
		drawText("Training at " + this.autoTrain.lastSpeed + "/sec", 50, 480, 20, "black", "left");

		// Training Time
		drawText("Trained for " + this.trainTime + " seconds", 50, 510, 20, "black", "left");

		// Render mode specific buttons
		for (let i in this.buttons) {	
			this.buttons[i].render();
		}

		// Render sliders
		for (let i in this.sliders) {
			this.sliders[i].render();
		}

		// Render graph
		this.graph.render();

	}
	update() {

		// Disable autoTrain if no GAN or training data
		if (this.autoTrain.state) {
			if (main.disNN == undefined || main.trainingData.length==0) this.toggleAutoTrain();
		}

		if (this.autoTrain.state) {

			// Alternating session between discriminator and generator
			for (let i=0; i<50; i++) {

				if (this.trainSwitch < Math.round(this.trainRatio*this.trainLoop)) {
					this.trainDis();
				} else {
					this.trainGen();
				}

				this.trainSwitch = (this.trainSwitch + 1) % this.trainLoop;

				this.trainCount ++;	// Total number of train times
			}
		}

		let newDate = Math.floor(new Date().getTime()/1000);	// Current floored time in seconds
		if (newDate > this.autoTrain.lastCheck) {	// If one second has passed since the last check
			this.autoTrain.lastCheck = newDate;		// Set new last time for check
			this.autoTrain.lastSpeed = this.trainCount - this.autoTrain.lastCount;	// Set number of trains since last sec
			this.autoTrain.lastCount = this.trainCount;		// Store current trains to calculate speed for next second

			if (this.autoTrain.state) this.trainTime++;
		}

		// Update sliders
		for (var i in this.sliders) {
			this.sliders[i].update();
		}

	}
	testButtons() {		// Tests for click in any buttons throughout mode

		// Tests for clicks in buttons
		for (let i in this.buttons) {
			// If button clicked, stop checking for button presses
			if (this.buttons[i].testForClick()) break;
		}
		
		// mouseUp means sliders are unselected
		for (var i in this.sliders) {
			this.sliders[i].testForLift();
		}

		// Test button clicks in graph
		this.graph.testButtons();

	}
	testMouseDown() {
		// Test for holding of sliders
		for (var i in this.sliders) {
			if (this.sliders[i].testForHold()) break;
		}
	}

	trainDis() {
		/* 
			Run real through disNN, train to learn real directly
				- Outputting 1 means real, 0 is fake
				- learn to output random number between 0.8 and 1 for example
				- this means network occasionally learns opposite but keeps network from having 0 loss

		*/

		let error = 0;		// Accumulated error for a entire mini-batch train

		// Trains real or fake
		if (this.trainDisSwitch < 1) {
			for (var k=0; k<this.batchSize; k++) {
				error += this.trainDisReal(error);
			}
		} else {
			for (var k=0; k<this.batchSize; k++) {
				error += this.trainDisFake(error);
			}
		}

		this.graphList["disNN Error Loss"].addData(error);

		// Apply and reset dEdW changes of entire batch
		main.disNN.applydEdW();
		main.disNN.resetdEdW();

		this.trainDisSwitch = (this.trainDisSwitch + 1) % 2;

	}
	trainDisReal() {
		// First change sample num incase data length has changed
		this.sampleNum = (this.sampleNum + 1) % main.trainingData.length;

		// Training discriminator to recognise real data
		let sample = main.trainingData[this.sampleNum];
		let desired = [1 - Math.random()*0.2];

		let output = main.disNN.getOutput(sample);

		// Trains network to output [0.8 to 1]
		main.disNN.findGradDescent(output, desired);

		// Calculates error of original output and returns
		return main.disNN.getError(output[output.length-1][1], desired);
	}
	trainDisFake(error) {
		// Training discriminator to recognise real data
		let genInputNoise = main.genNoise(main.genNN.structure[0]);
		let sample = main.genNN.getOutput(genInputNoise, true);
		let desired = [-1 + Math.random()*0.2];

		let output = main.disNN.getOutput(sample);

		// Trains network to output [-1 to -0.8]
		main.disNN.findGradDescent(output, desired);

		// Calculates error of original output and returns
		return main.disNN.getError(output[output.length-1][1], desired);
	}

	trainGen() {
		/*
			Trains Generator to produce better images
			(Trains generator to fool discriminator better)

			Generate image
			Feed through discriminator (2nd half of network)
			Using 2nd half to back prop, train first half to make 2nd half output "real"
		*/

		// Generate image
		let genInputNoise = main.genNoise(main.genNN.structure[0]);
		let genOutput = main.genNN.getOutput(genInputNoise);

		// Run image through discriminator
		let disOutput = main.disNN.getOutput(genOutput[genOutput.length-1][1]);

		// Find dEdI of discriminator
		let desired = [1 - Math.random()*0.2];	// Desired is between 0.8 and 1 to stop getting too good
		main.disNN.findOutputdEdI(disOutput, desired);
		main.disNN.finddEdI(disOutput);

		// Find last layer dEdI of genNN by finding first layer dEdI of disNN
		main.disNN.findInputdEdI(disOutput, main.genNN.dEdI[main.genNN.dEdI.length-1]);

		// Using first layer of disNN's dEdI as last layer for genNN's dEdI, find remaining dEdI of generator
		main.genNN.finddEdI(genOutput);

		// Find dEdW of generator for each item
		main.genNN.finddEdW(genOutput);

		// Apply dEdW to generator
		main.genNN.applydEdW();
		main.genNN.resetdEdW();

		//console.log(disOutput[disOutput.length-1][1][0]);

		let errorBefore = main.disNN.getError(disOutput[disOutput.length-1][1], desired);
		this.graphList["genNN Error Loss"].addData(errorBefore);

	}

	resetAll() {	// Resets all variables to defaults
		// Reset training graphs
		for (let i in this.graphList) {
			this.graphList[i].resetData();
		}

		// Reset training sample numbers
		this.trainCount = 0;
		this.trainDisSwitch = 0;
		this.trainSwitch = 0;
		this.sampleNum = 0;
	}

	toggleAutoTrain() {
		this.autoTrain.state = !this.autoTrain.state;
		this.buttons[0].text =  "AutoTrain: " + (this.autoTrain.state ? "On" : "Off");
	}
}
