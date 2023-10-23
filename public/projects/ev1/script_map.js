/*
	This script sets up the canvas
	
	The canvas is a 2000 x 2000 area
	half negative half positive
	
*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cs = canvas.width;								//Canvas size
var cm = 2000/cs; 									//Canvas multiplier


function conX(x) {
	x /= cm;
	x += cs/2;
	return x;
}

function conY(y) {
	y *= -1;
	y /= cm;
	y += cs/2;
	return y;
}

function conR(r) {
	r /= cm;
	return r;
}

function cross() {
	ctx.fillStyle = "#666666";
	ctx.fillRect((cs/2)-1, 0, 2, cs);
	ctx.fillRect(0, (cs/2)-1, cs, 2);
}



