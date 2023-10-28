

class Main {
	constructor() {
		this.circleTime = 0;
		this.circleRate = 10;
		this.maxRender = 1000;	// Maximum circles rendered per frame
		this.game = false;
		this.FPS = 100;
		this.deltaTime = 1 / this.FPS;
		
		this.titleFont = canvas.height*0.08 + "px Courier New";
		this.textFont = canvas.height*0.05 + "px Courier New";
		
		this.buttons = [
			{ x:canvas.height*1.05,y:canvas.height*0.6,w:canvas.height*0.06,h:canvas.height*0.06,color:"red",text:"<",onclick:function(){
				main.circleRate/=10;
				if (main.circleRate < 1) main.circleRate = 1;
				console.log("Slower circles: " + main.circleRate);
			}},
			{ x:canvas.height*1.13,y:canvas.height*0.6,w:canvas.height*0.06,h:canvas.height*0.06,color:"red",text:">",onclick:function(){
				main.circleRate*=10;
				if (main.circleRate > 10000000) main.circleRate = 10000000;
				console.log("Faster circles: " + main.circleRate);
			}},
			{ x:canvas.height*1.05,y:canvas.height*0.77,w:canvas.height*0.06,h:canvas.height*0.06,color:"red",text:"<",onclick:function(){
				main.maxRender/=10;
				if (main.maxRender < 1) main.maxRender = 1;
				console.log("Slower rendering: " + main.maxRender);
			}},
			{ x:canvas.height*1.13,y:canvas.height*0.77,w:canvas.height*0.06,h:canvas.height*0.06,color:"red",text:">",onclick:function(){
				main.maxRender*=10;
				if (main.maxRender > 1000) main.maxRender = 1000;
				console.log("Faster rendering: " + main.maxRender);
			}},
			{ x:canvas.height*(22/18),y:canvas.height*0.87,w:canvas.height*(6/18),h:canvas.height*0.08,color:"red",text:"Start",onclick:function(){
				main.game = !main.game;
				if (main.game) this.text = "Stop";
				else this.text = "Start";
				console.log("Game state: " + main.game);
			}}
		];
		
		this.newPoints = [];
		
		this.insideCircle = 0;
		this.outsideCircle = 0;
		this.currentPi = 0;
		
		context.fillStyle = "#999999";
		context.fillRect(0, 0, canvas.height, canvas.height);
	}
	render() {
		// Draw newest point
		for (var i=0; i<this.newPoints.length; i++) {
			var rand = Math.random();
			if (rand<1/3) context.fillStyle = "red";
			else if (rand<2/3) context.fillStyle = "green";
			else context.fillStyle = "blue";
			context.beginPath();
			context.arc(this.newPoints[i][0]*canvas.height, this.newPoints[i][1]*canvas.height, canvas.height*0.005, 0, 2 * Math.PI, false);
			context.fill();
		}
		this.newPoints = [];
		context.beginPath();
		context.arc(0, 0, canvas.height, 0, 2 * Math.PI, false);
		context.stroke();

		// Draw white background for text
		context.fillStyle = "white";
		context.fillRect(canvas.height,0,canvas.width,canvas.height);
		
		// Render text
		context.fillStyle = "black";
		context.textAlign = "center";
		context.font = this.titleFont;
		context.fillText("Pi Estimator",canvas.height*(25/18), canvas.height*0.1);
		
		context.textAlign = "left";
		context.font = this.textFont;
		context.fillText("Points: " + (this.insideCircle+this.outsideCircle), canvas.height*1.04, canvas.height*0.2);
		context.fillText("Inside: " + this.insideCircle, canvas.height*1.04, canvas.height*0.27);
		context.fillText("Outside: " + this.outsideCircle, canvas.height*1.04, canvas.height*0.34);
		
		context.fillText("Pi is approximately...", canvas.height*1.04, canvas.height*0.44);
		this.currentPi = 4 * this.insideCircle / (this.insideCircle+this.outsideCircle);
		context.fillText(this.currentPi, canvas.height*1.04, canvas.height*0.5);
		
		// Draw buttons
		for (var i=0; i<this.buttons.length; i++) {
			context.fillStyle = this.buttons[i].color;
			context.fillRect(this.buttons[i].x,this.buttons[i].y,this.buttons[i].w,this.buttons[i].h);
			context.fillStyle = "white";
			context.textAlign = "center";
			context.font = this.buttons[i].h + "px Courier New";
			context.fillText(this.buttons[i].text,this.buttons[i].x+this.buttons[i].w/2,this.buttons[i].y+this.buttons[i].h/1.3);
		}
		context.fillStyle = "black";
		context.textAlign = "left";
		context.font = this.textFont;
		context.fillText("Points per/ sec", canvas.height*1.04, canvas.height*0.58);
		context.fillText(this.circleRate, canvas.height*1.22, canvas.height*0.644);
		
		context.fillText("Rendered per/ frame", canvas.height*1.04, canvas.height*0.75);
		context.fillText(this.maxRender, canvas.height*1.22, canvas.height*0.814);
	}
	update() {
		if (this.game) {
			this.circleTime += this.deltaTime;
			while (this.circleTime > 1 / this.circleRate) {
				this.circleTime -= 1 / this.circleRate;
				var newPoint = [Math.random(), Math.random()]
				if (this.newPoints.length < this.maxRender) {
					this.newPoints.push(newPoint);
				}
				
				if (Math.hypot(newPoint[0],newPoint[1]) <= 1) {
					this.insideCircle += 1;
				} else {
					this.outsideCircle += 1;
				}
			}
		}
	}
	pressedButton(btn, mousePos) {
		if (mousePos.x >= btn.x && mousePos.x <= btn.x + btn.w) {
			if (mousePos.y >= btn.y && mousePos.y <= btn.y + btn.h) {
				return true;
			}
		}
	}
}

var canvas = document.getElementById('canvas');

var context = canvas.getContext('2d');
var textMain = document.getElementById("text");
var main = new Main();

var mainLoop = window.setInterval(function(){	
	main.update();
	main.render();
}, 1000/main.FPS);

canvas.addEventListener("click", function(evt) {
	var rect = canvas.getBoundingClientRect();
    mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
	for (var i=0; i<main.buttons.length; i++) {
		if (main.pressedButton(main.buttons[i], mousePos)) {
			main.buttons[i].onclick();
		}
	}
} );














