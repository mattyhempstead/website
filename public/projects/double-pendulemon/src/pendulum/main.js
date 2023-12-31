/*
	The main class for the program
	 - Contains the update and render loop
	 - Handles all the modes
*/
class Main {
	constructor() {
        this.clickPos = {x:0, y:0}
        this.mousePos = {x:0, y:0}
        
		this.buttons = [];

		/// FPS variables
		// The FPS calculated is purely the rate at which the program is rendering, 
		// 60 is therefore ideal when using requestAnimationFrame
		this.fps = 0;	// Stores the last fps calculation
		this.fpsStartTime = 0;	// Start time in milliseconds since frames were counted
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
            this.onMouseDown()	
            evt.preventDefault()
        });

        // Detects when mouse button is released
        window.addEventListener("mouseup", (evt)=>{
            var canvasRect = canvas.getBoundingClientRect();
            this.clickPos = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.height)
            };
            this.onClick()	
        });

        // Detects when mouse button is released
        canvas.addEventListener("mousemove", (evt)=>{
            var canvasRect = canvas.getBoundingClientRect();
            this.mousePos = {
                x: (evt.clientX - canvasRect.left) * (pixelRatio*100/canvas.width),
                y: (evt.clientY - canvasRect.top) * (pixelRatio*100/canvas.height)
            };
        });

        this.sim = new PendulumSim()
	}
	update(timestamp) {

		// Waits until 1 second has passed, then calculates fps in that time and resets for next second
		this.fpsCounter++;
		if (timestamp - this.fpsStartTime >= 1000) {
			this.fps = 1000 * this.fpsCounter / (timestamp - this.fpsStartTime);
			this.fpsCounter = 0;
			this.fpsStartTime = timestamp;
        }
        
        this.sim.update()
        


	}
	render() {
		fillCanvas("#eee")

        this.sim.render()

		// Render buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].render()
		}

		// Render FPS in top right
		drawText(this.fps.toFixed(2), {x:99,y:1}, 2, "#aaa", "right")

	}
	onClick() {
        // console.log(this.clickPos)

		// Test for clicks in buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].onClick()
        }
        
        this.sim.onClick()
	}
	onMouseDown() {
		this.sim.onMouseDown()
	}
}


let main = new Main();
main.init();

function mainLoop(timestamp) {	// Updates program once per frame	
	main.update(timestamp);
	main.render();
	window.requestAnimationFrame(mainLoop);
}
mainLoop(0);
