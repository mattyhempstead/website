
/*
	A "Mode" for creating new GANs

	Accessed thrgouh File -> New GAN



	Opening network creation mode will say 
		"You currently have a GAN already being used"
		"Continuing will "
	User can choose to download current GAN and continue, cancel creation, or overwrite gan

*/

class NetworkCreationClass {
	constructor() {

		this.name = "GAN Creation";

		this.buttons = [
			new Button({
				text: "Test",
				rect: {x:380, y:150, h:35, w:190},
				action: function() {
					
				}
			})
		];

		// User initially asked if sure about creating new network
		// Once agreed, current network is removed until new is created
		this.userPrompt = false;

	}
	render() {

		// Border around generated image
		//drawRect(this.imageRect, "black", 1);

		// Render user prompt



		// Render mode specific buttons
		this.renderButtons();

	}
	update() {

		// Remove user prompt if no network exists
		if (main.disNN == undefined && main.genNN == undefined) {
			this.userPrompt = true;
		} 
		
	}

	renderButtons() {	// Renders buttons
		for (let i in this.buttons) {	
			this.buttons[i].render();
		}
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
