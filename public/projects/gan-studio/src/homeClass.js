
/*

	The home page for GAN maker program

*/

class HomeClass {
	constructor() {

		this.name = "Home";

		this.buttons = [

		];


	}
	render() {

		drawText("GAN Studio", 100, 130, 50, "black");

		drawLine({x:70, y:170}, {x:1050, y:170}, "#aaaaaa", 3);
		drawLine({x:70, y:360}, {x:1050, y:360}, "#aaaaaa", 3);
		drawLine({x:70, y:550}, {x:1050, y:550}, "#aaaaaa", 3);


		if (main.disNN==undefined) {
			// Display info about creating GANs
			drawText("Create a GAN with (File -> New GAN)", 100, 250, 24, "black");
			drawText("Upload a previously made GAN with (File -> Upload GAN)", 100, 290, 24, "black");
		} else {
			// Display info about current GAN
			drawText("Current GAN:", 100, 220, 28, "black");

			drawText("Discriminator - ", 120, 265, 24, "black");
			drawText("Structure: [" + main.disNN.structure.join(", ") + "]", 140, 300, 20, "#777777");
			drawText("Learning Rate: " + main.disNN.LEARNING_RATE, 140, 330, 20, "#777777");

			drawText("Generator - ", 610, 265, 24, "black");
			drawText("Structure: [" + main.genNN.structure.join(", ") + "]", 630, 300, 20, "#777777");
			drawText("Learning Rate: " + main.genNN.LEARNING_RATE, 630, 330, 20, "#777777");
		}

		if (main.trainingData.length==0) {
			// Display info about creating training data
			drawText("Start drawing training data with (Mode -> Draw)", 100, 445, 24, "black");
			drawText("Upload previously created training data with (File -> Upload Data)", 100, 485, 24, "black");
		} else {
			// Display info about training data
			drawText("Training Data:", 100, 420, 28, "black");
			drawText("No. of Images: " + main.trainingData.length, 140, 455, 20, "#777777");
		}

		// Help message at the bottom of home page
		drawText("For all full guide, visit (Help -> User Manual)", 100, 600, 24, "black");


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
}
