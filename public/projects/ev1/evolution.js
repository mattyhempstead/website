/*
	Evolution
	
	x = x coord
	y = y coord
	r = radius
	
	
	Lots of different organisms
	Short for org
	
	direction is from 0 to 360
	run function moveOrg() that has two variables passed into it
		the organism
		the direction (0-360)
	both x and y direction needs to add to one
	
	RGB

	r = speed
	g = food efficiency
	b = reproduce requirement (50-100)
	
	r + g + b = how fast you chew threw energy
	
*/

var orgR = 25;
var ballR = 15;
var ballMax = 50;		//Maximum of balls at once
var bSpawn = 250;		//Milliseconds between ball spawns
var text = "";
var org = [];
var ball = [];

for (i=0; i<ballMax; i++) ball.push(ran((-1000+ballR),(1000-ballR)));
for (i=0; i<50; i++) org.push({x:ran(-1000,1000),y:ran(-1000,1000),r:ran(0,255),g:ran(0,255),b:ran(0,255),d:ran(0,360),e:50});

function ballSpawn() {
	if (ball.length/2 < ballMax) {
		ball.push(ran((-1000+ballR),(1000-ballR)));
		ball.push(ran((-1000+ballR),(1000-ballR)));
	}
}

function ballDraw() {
	for (i=0; i<(ball.length/2); i++) {
		ctx.beginPath();
		ctx.arc(conX(ball[i*2]), conY(ball[i*2+1]), conR(ballR), 0, 2 * Math.PI, false);
		ctx.fillStyle = "#999999";
		ctx.fill();
	}
}

function orgMove() {
	for (i=0; i<org.length; i++) {
		if (org[i].d > 360) org[i].d -= 360;
		var a = org[i].d;
		var q = 1;
		for (j=2; a>90; j++) {
			a -= 90;
			q = j;
		}
		x = a / 90;
		y = 1 - x;
		if (q == 2) {
			x = 1 - x;
			y = y - 1;
		}
		else if (q == 3) {
			x = -x;
			y = -y;
		}
		else if (q == 4) {
			x = x - 1;
			y = 1 - y;
		}
		org[i].x += x * 10 * org[i].r/255;
		org[i].y += y * 10 * org[i].r/255;
	}
}

function orgWall() {
	for (i=0; i<org.length; i++) {
		if (org[i].x > 1000-orgR) {
			org[i].x = 1000-orgR;
			orgChangeD(i);
		}
		else if (org[i].x < -1000+orgR) {
			org[i].x = -1000+orgR;
			orgChangeD(i);
		}
		else if (org[i].y > 1000-orgR) {
			org[i].y = 1000-orgR;
			orgChangeD(i);
		}
		else if (org[i].y < -1000+orgR) {
			org[i].y = -1000+orgR;
			orgChangeD(i);
		}
	}
}

function orgBall() {
	for (i=0; i<org.length; i++) {
		for (j=0; j<ball.length/2; j++) {
			var xD = org[i].x-ball[j*2];
			var yD = org[i].y-ball[j*2+1];
			if (Math.sqrt( (xD*xD) + (yD*yD) ) < orgR + ballR) {
				org[i].e += 50 * (org[i].g/255);
				if (org[i].e > 100) org[i].e = 100;
				ball.splice(j*2,2);
			}
		}
	}
}

function orgSpawn() {
	for (i=0; i<org.length; i++) {
		var frac = (1-(org[i].b/255));
		if (org[i].e >= 50+(50*frac)) {
			org[i].e -= 25+(50*frac);
			org.push({x:org[i].x,y:org[i].y,r:(org[i].r*ran(0.95,1.05)),g:(org[i].g*ran(0.95,1.05)),b:(org[i].b*ran(0.95,1.05)),d:ran(0,360),e:50});
			if (org[org.length-1].r > 255) org[org.length-1].r = 255;
			if (org[org.length-1].g > 255) org[org.length-1].g = 255;
			if (org[org.length-1].b > 255) org[org.length-1].b = 255;
		}
	}
}

function orgKill() {
	for (i=0; i<org.length; i++) {
		if (org[i].e <= 0) org.splice(i,1);
	}
}

function orgDraw() {
	for (i=0; i<org.length; i++) {
		ctx.beginPath();
		ctx.arc(conX(org[i].x), conY(org[i].y), conR(orgR), 0, 2 * Math.PI, false);
		ctx.fillStyle = "rgb(" + Math.round(org[i].r) + "," + Math.round(org[i].g) + "," + Math.round(org[i].b) + ")";
		ctx.fill();
		
	//	text += "x: " + org[i].x.toFixed(3);
	//	text += " - y: " + org[i].y.toFixed(3);
	//	text += " - e: " + org[i].e.toFixed(3);
	//	text += " - r: " + org[i].r.toFixed(3);
	//	text += " - g: " + org[i].g.toFixed(3);
	//	text += " - b: " + org[i].b.toFixed(3);
	//	text += "<br>";
	}
}

function orgChangeD(n) {org[n].d = Math.random() * 360;}
function ran(n1,n2) {
	return (Math.random() * (n2-n1) + n1);
}



orgDraw();

setInterval(function(){	
	text = "";
	ctx.clearRect(0,0,cs,cs);
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, cs, cs);
	cross();
	ballDraw();
	orgMove();
	orgWall();
	orgBall();
	for (i=0; i<org.length; i++) org[i].e -= (org[i].r + org[i].g + org[i].b)/5000;
	orgSpawn();
	orgKill();
	orgDraw();
	var aR = 0;
	var aG = 0;
	var aB = 0;
	var hR = 0;
	var hG = 0;
	var hB = 0;
	var sR = 255;
	var sG = 255;
	var sB = 255;
	for (i=0; i<org.length; i++) {
		aR += org[i].r;
		aG += org[i].g;
		aB += org[i].b;
		if (org[i].r > hR) hR = org[i].r;
		if (org[i].g > hG) hG = org[i].g;
		if (org[i].b > hB) hB = org[i].b;
		if (org[i].r < sR) sR = org[i].r;
		if (org[i].g < sR) sG = org[i].g;
		if (org[i].b < sR) sB = org[i].b;
	}
	aR /= org.length;
	aG /= org.length;
	aB /= org.length;
	text += "Average Colour: " + aR.toFixed(3) + " - " + aG.toFixed(3) + " - " + aB.toFixed(3);
	text += "<br>Highest Colour: " + hR.toFixed(3) + " - " + hG.toFixed(3) + " - " + hB.toFixed(3);
	text += "<br>Smallest Colour: " + sR.toFixed(3) + " - " + sG.toFixed(3) + " - " + sB.toFixed(3);
	text += "<br>Org Amount: " + org.length;
	text += "<br>Ball Amount: " + ball.length/2;
}, 1000/60);

setInterval(function(){	
	document.getElementById("text").innerHTML = text;
}, 500);

setInterval(function(){	
	ballSpawn();
}, bSpawn);





