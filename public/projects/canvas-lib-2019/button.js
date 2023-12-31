

class Button {
	constructor(info) {

		this.text = info.text;
		this.rect = info.rect;
		this.action = info.action;

		this.fontSize = Math.round(info.rect.h * 0.25)

		this.colourBackground = info.colourBackground || "#999"	// Default colour
		this.colourBorder = info.colourBorder || "#666"		// Border colour
		this.colourHover = info.colourHover || "#777"	// Hover colour

	}
	render() {	// hoverInteract determines if mouse hovering will change colour

		let colour = (pointInRect(main.mousePos, this.rect)) ? this.colourHover : this.colourBackground
		drawRect(this.rect, colour, this.colourBorder, 2)

		let renderPos = {	// Calculate text rendering position
			x: this.rect.x + this.rect.w*0.5,
			y: this.rect.y + this.rect.h*0.5,
		}

		drawText(this.text, renderPos, this.fontSize, "black", "center")

	}
	onClick() {	// Tests for button press when users clicks, return true if button was pressed
		// Button only pressed iff mouse was pressed inside button, and was lifted inside button
		if (pointInRect(main.clickPos, this.rect)) {
			this.action(this);
			return true;
		}
		return false;
	}
}
