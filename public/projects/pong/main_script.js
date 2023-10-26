/*
	Pong
*/


class Main_Class {
	constructor(gameMode) {		
		this.FPS = 60;
		this.deltaTime = 1/this.FPS;
		this.pauseGame = true;
		this.drawScale = canvas.width/160;
		this.keyDown = {};
		
		this.centreLineWidth = canvas.width * 0.01;
		this.scoreFont = "bold " + canvas.width*0.1 + "px Courier New";
		
		this.puck = new Puck();
		
		this.player1 = new Player(false);
		
		if (gameMode == "pvp") this.player2 = new Player(true, false);
		else this.player2 = new Player(true, true);
	}
	render() {
		context.fillStyle = "black";
		context.fillRect(0,0,canvas.width,canvas.height);
			
		context.strokeStyle = "white";
		context.lineWidth = this.centreLineWidth;
		context.setLineDash([this.centreLineWidth*2, this.centreLineWidth*2]);		
		context.beginPath();
		context.moveTo(canvas.width/2, 0);
		context.lineTo(canvas.width/2, canvas.height);
		context.stroke();
			
		//Text on the canvas
		context.fillStyle = "white";
		context.font = this.scoreFont;
		context.textAlign = "right";
		context.fillText(this.player1.score, canvas.width*0.47, canvas.height*0.16);
		context.textAlign = "left";
		context.fillText(this.player2.score, canvas.width*0.53, canvas.height*0.16);
		
		this.player1.render();
		this.player2.render();
		this.puck.render();
	}
	update() {
		this.player1.update();
		this.player2.update();
		this.puck.update();
		
		
	}
	resetBoard() {
		this.puck.resetPos();
	}
}

class Player {
	constructor(p2, bot=false) {
		this.isBot = bot;
		this.score = 0;
		this.speed = 30;
		this.size = 15;
		this.rect = {x:3, y:45-this.size/2, w:4, h:this.size};
		this.p2 = p2;
		if (this.p2) this.rect.x = 160-this.rect.x-this.rect.w;
	}
	render() {
		context.fillStyle = "white";
		context.fillRect(this.rect.x * main.drawScale, this.rect.y * main.drawScale, this.rect.w * main.drawScale, this.rect.h * main.drawScale);
	}
	update() {
		if (this.isBot) this.moveToBall();	// Player is a bot
		else if (!this.p2) {	// Player is player 1
			if (main.keyDown.w) this.rect.y -= this.speed * main.deltaTime;
			if (main.keyDown.s) this.rect.y += this.speed * main.deltaTime;
		}
		else { // Player is player 2
			if (main.keyDown.upArrow) this.rect.y -= this.speed * main.deltaTime;
			if (main.keyDown.downArrow) this.rect.y += this.speed * main.deltaTime;
		}
		
		if (this.rect.y < 0) this.rect.y = 0;
		else if (this.rect.y + this.rect.h > 90) this.rect.y = 90 - this.rect.h;
	}
	moveToBall() {
		var playerY = this.rect.y + this.rect.h/2;
		var puckY = main.puck.rect.y + main.puck.rect.h/2;
		if (Math.abs(playerY - puckY) < this.speed * main.deltaTime) this.rect.y = puckY - this.rect.h/2;
		else if (puckY < playerY) this.rect.y -= this.speed * main.deltaTime;
		else this.rect.y += this.speed * main.deltaTime;
	}
}

class Puck {
	constructor() {
		this.maxY = 40;
		this.size = 5;
		this.startingSpeed = 30;
		this.rect = {x:(160-this.size)/2, y:(90-this.size)/2, w:this.size, h:this.size};
		this.vel = {x:this.startingSpeed * (Math.round(Math.random())*2-1), y:(Math.random()-0.5)*this.maxY};
		this.behindPlayer = false;
	}
	render() {
		context.fillStyle = "white";
		context.fillRect(this.rect.x * main.drawScale, this.rect.y * main.drawScale, this.rect.w * main.drawScale, this.rect.h * main.drawScale);
	}
	update() {
		this.rect.x += this.vel.x * main.deltaTime;
		this.rect.y += this.vel.y * main.deltaTime;
		
		// Top / bottom collision
		if (this.rect.y < 0) {
			this.rect.y = 0;
			this.vel.y *= -1;
		}
		else if (this.rect.y + this.rect.h > 90) {
			this.rect.y = 90 - this.rect.h;
			this.vel.y *= -1;
		}
		
		// PLAYER COLLISION
		// Player 1
		if (!this.behindPlayer) {
			if (this.rect.x < 45) {
				var distX = main.player1.rect.x + main.player1.rect.w - this.rect.x;	// Positive if colliding from side
				if (distX >= 0) {
					var distY1 = this.rect.y + this.rect.h - main.player1.rect.y;	// Positive if colliding from above
					if (distY1 >= 0) {
						var distY2 = main.player1.rect.y + main.player1.rect.h - this.rect.y;	// Positive if colliding from below
						if (distY2 >= 0) {
							if (Math.min(distY1, distY2) > distX) {
								this.vel.x *= -1.03;
								
								if (distY1 < distY2) this.vel.y = -1 * (this.maxY-this.rect.h/2) * (1 - ((distY1-this.rect.h/2) / (main.player1.rect.h/2)));
								else this.vel.y = (this.maxY-this.rect.h/2) * (1 - ((distY2-this.rect.h/2) / (main.player1.rect.h/2)));
								
								this.rect.x = main.player1.rect.x + main.player1.rect.w;
								
							}
							else this.behindPlayer = true;
						}
					}
				}
			}
			
			// Player 2
			else {
				var distX = this.rect.x + this.rect.w - main.player2.rect.x;	// Positive if colliding from side
				if (distX >= 0) {
					var distY1 = this.rect.y + this.rect.h - main.player2.rect.y;	// Positive if colliding from above
					if (distY1 >= 0) {
						var distY2 = main.player2.rect.y + main.player2.rect.h - this.rect.y;	// Positive if colliding from below
						if (distY2 >= 0) {
							if (Math.min(distY1, distY2) > distX) {
								this.vel.x *= -1.03;
								
								if (distY1 < distY2) this.vel.y = -1 * (this.maxY-this.rect.h/2) * (1 - ((distY1-this.rect.h/2) / (main.player2.rect.h/2)));
								else this.vel.y = (this.maxY-this.rect.h/2) * (1 - ((distY2-this.rect.h/2) / (main.player2.rect.h/2)));
								
								this.rect.x = main.player2.rect.x - this.rect.w;
							}
							else this.behindPlayer = true;
						}
					}
				}
			}
		}
		
		// End of board collision
		if (this.rect.x < 0) {
			main.player2.score ++;
			main.resetBoard();
		}
		else if (this.rect.x + this.rect.w > 160) {
			main.player1.score ++;
			main.resetBoard();
		}
	}
	resetPos() {
		this.rect = {x:(160-this.size)/2, y:(90-this.size)/2, w:this.size, h:this.size};
		this.vel = {x:this.startingSpeed * (Math.round(Math.random())*2-1), y:(Math.random()-0.5)*this.maxY};
		this.behindPlayer = false;
	}
}

function playerClick(event) {
	var mousePos = {x:event.clientX - canvas.offsetLeft, y:event.clientY - canvas.offsetTop};

	//var testRect = {x:0, y:0, w:0, h:0};
	//if (pointInsideRect(mousePos, testRect)) {
		
	//}
}

function pointInsideRect(point, rect) {
	if (rect.x < point.x && point.x < rect.x + rect.w) {
		if (rect.y < point.y && point.y < rect.y + rect.h) {
			return true;
		}
	}
}

function keyDown(e) {
	if (e.key == "ArrowUp") {
        e.preventDefault();
		main.keyDown.upArrow = true;
    }
	if (e.key == "ArrowDown") {
        e.preventDefault();
		main.keyDown.downArrow = true;
    }
	if (e.key == "w") main.keyDown.w = true;
	if (e.key == "s") main.keyDown.s = true;
}
function keyUp(e) {
	if (e.key == "ArrowUp") main.keyDown.upArrow = false;
	if (e.key == "ArrowDown") main.keyDown.downArrow = false;
	if (e.key == "w") main.keyDown.w = false;
	if (e.key == "s") main.keyDown.s = false;
}

function toggleGame() {
	if (main.pauseGame) {
		main.pauseGame = false;
		document.getElementById("toggleButton").innerHTML = "Pause Game";
	}
	else {
		main.pauseGame = true;
		document.getElementById("toggleButton").innerHTML = "Play Game";
	}
}

function initiate() {
	var canvasSize = document.getElementById("resSelect");
	canvas.width = canvasSize.options[canvasSize.selectedIndex].id;
	canvas.height = canvasSize.options[canvasSize.selectedIndex].value;
	
	var gameMode = document.getElementById("playerSelect");
	gameMode = gameMode.options[gameMode.selectedIndex].value;
	
	document.getElementById("text").innerHTML = '<button id="toggleButton" onclick="toggleGame()">Play Game</button>'
	document.getElementById("text").innerHTML += "<br><br>just pong :)";
	main = new Main_Class(gameMode);
	mainLoop = window.setInterval(function(){	
	if (!main.pauseGame) main.update();
	main.render();
}, 1000/main.FPS);
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var main, mainLoop;

window.addEventListener( "keydown", keyDown, false);
window.addEventListener( "keyup", keyUp, false);








