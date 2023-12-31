/*
	Contains code for the navBar class
	 - handles navigation between modes

*/
class NavBar {
	constructor() {
		this.buttonWidth = 20;
		this.buttonHeight = 10;

		this.buttons = [];

		for (let i in main.modeList) {
			this.buttons.push(new Button({
				text: main.modeList[i].name,
				rect: {x:this.buttons.length*this.buttonWidth, y:0, w:this.buttonWidth, h:this.buttonHeight},
				action: (button)=>{
					this.selectButton(button)
					main.mode = main.modeList[i]
				},
			}))
		}

		this.selectButton(this.buttons[0])

	}
	render() {
		// // Render mode specific buttons
		for (let i in this.buttons) {	
			this.buttons[i].render();
		}
		
		// Mode name in top right
		//drawText(main.mode.name, {x:0, y:15}, 20);
	}
	onClick() {
		for (let i in this.buttons) {
			// If button clicked, stop checking for button presses
			if (this.buttons[i].onClick()) break;
        }
	}
	selectButton(button) {	// "Selects" button by changing its colour and removing colour from all other buttons
		for (let i in this.buttons) {
			this.buttons[i].colourBackground = "#999"
		}
		button.colourBackground = "#888"
	}
}