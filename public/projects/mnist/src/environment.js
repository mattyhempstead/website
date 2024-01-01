/**
 * A JavaScript environment for creating simulations.
 * 
 * Handles:
 * - FPS
 * - User Input
 * - Update/Render Loops
 * 
 */
class Environment {
	constructor() {
		this.clickPos = {x:0, y:0}
		this.clickPosEqual = {x:0, y:0}		// Mouse position that is not stretched by canvas ratio
		this.mousePos = {x:0, y:0}
		this.mouseDown = false	// Whether or not mouse is currently down
		this.keyDown = {}
		this.keyPressed = {}

		this.buttons = [];

		/// FPS variables
		// The FPS calculated is purely the rate at which the program is rendering in frames per second
		// 60 is therefore generally the max when using requestAnimationFrame
		this.fps = 0;	// Stores the last fps calculation
		this.fpsStartTime = 0;	// Start time in milliseconds since frames were last counted
		this.fpsCounter = 0;	// Counts how many frames have occured in this second

	}
	init() {
        setCanvasSize(960, 540)

        // Detects when mouse button is released
        canvas.addEventListener("mousedown", (evt)=>{
			var canvasRect = canvas.getBoundingClientRect();
            this.clickPos = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.height)
			};
			this.clickPosEqual = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.width)
			};
			this.mouseDown = true
            this.onMouseDownEnvironment()	
            evt.preventDefault()
        });

        // Detects when mouse button is released
        window.addEventListener("mouseup", (evt)=>{
			var canvasRect = canvas.getBoundingClientRect();
            this.clickPos = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.height)
			};
			this.clickPosEqual = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.width)
			};
			this.mouseDown = false
            this.onMouseUpEnvironment()	
        });

        // Detects when mouse button is released
        canvas.addEventListener("mousemove", (evt)=>{
            var canvasRect = canvas.getBoundingClientRect();
            this.mousePos = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.height)
			};
			this.mousePosEqual = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.width)
			};
			this.onMouseMoveEnvironment()
		});
		
		// Detects pressing of individual keys
		window.addEventListener("keydown", (evt)=>{
			this.keyDown[evt.code] = true;
			if (evt.code == "Space") {
				evt.preventDefault();
			}
			this.keyPressed[evt.code] = true;
		});
		window.addEventListener("keyup", (evt)=>{
			this.keyDown[evt.code] = undefined;
		});

		// Create a loop which starts program
		this.mainLoop = (timestamp) => {	// Updates program once per frame	
			this.updateEnvironment(timestamp);
			this.renderEnvironment();
			window.requestAnimationFrame(this.mainLoop);
		}
		this.mainLoop(0);

	}
	updateEnvironment(timestamp) {

		// Waits until 1 second has passed, then calculates fps in that time and resets for next second
		this.fpsCounter++;
		if (timestamp - this.fpsStartTime >= 1000) {
			this.fps = 1000 * this.fpsCounter / (timestamp - this.fpsStartTime);
			this.fpsCounter = 0;
			this.fpsStartTime = timestamp;
        }
		
		// Update custom update function
		if (this.update) this.update(timestamp)
		
		// Reset keys pressed this update 
		this.keyPressed = {}
	}
	renderEnvironment() {
		fillCanvas("#eee")

		// Render custom render function
        if (this.render) this.render()

		// Render buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].render()
		}

		// Render FPS in top right
		drawText(this.fps.toFixed(2), {x:99,y:1}, 2, "#aaa", "right")

	}
	onMouseUpEnvironment() {
        // console.log(this.clickPos)

		// Test for clicks in buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].onClick()
        }
        
        if (this.onMouseUp) this.onMouseUp()
	}
	onMouseDownEnvironment() {
		if (this.onMouseDown) this.onMouseDown()
	}
	onMouseMoveEnvironment() {
		if (this.onMouseMove) this.onMouseMove()
	}
}