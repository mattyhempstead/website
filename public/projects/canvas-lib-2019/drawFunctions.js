// == Custom Canvas Drawing Functions ==

// Create canvas reference
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Number of pixels equal to 1% of canvas
let widthScale = canvas.width/100
let heightScale = canvas.height/100
let screenRatio = widthScale / heightScale
let pixelRatio = 1

// Set some nice defaults
ctx.lineCap = "round"

// Sets the canvas size and adjusts scaling appropriately
function setCanvasSize(width, height) {
    canvas.width = width
    canvas.height = height
    widthScale = canvas.width/100
    heightScale = canvas.height/100
}

// Sets the drawing to render in ratio of width:height
// i.e. x is as % of width, y is as % of height
// e.g. (50,50) is center of canvas
function setScaleRatio() {
    heightScale = canvas.height/100
}

// Sets the drawing to render in equal ratio of 1:1
// i.e. x is as % of width, y is also % of width
// e.g. (50,50) is center of width, and equal distance from top
// This allows objects like squares/triangles to not warp in ratio of screen when drawn
function setScaleEqual() {
    heightScale = canvas.width/100
}

// Fills canvas with a single colour
function fillCanvas(colour="white") {	
	ctx.fillStyle = colour;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Clears canvas by just filling it with white
function clearCanvas() {
    fillCanvas();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws a rectangle with certain attributes
function drawRect(rect, fillColour=false, strokeColour="black", strokeSize=1, center=false) {
	ctx.beginPath();
	if (center) {
        ctx.rect(
            widthScale * (rect.x-rect.w/2), 
            heightScale * (rect.y-rect.h/2), 
            widthScale * rect.w, 
            heightScale * rect.h
        );
    } else {
        ctx.rect(
            widthScale * rect.x, 
            heightScale * rect.y, 
            widthScale * rect.w, 
            heightScale * rect.h
        );
    }

	if (fillColour) {	// Fills rect if fillColour was set
		ctx.fillStyle = fillColour;
		ctx.fill();
	}
	if (strokeColour) {	// Outlines if strokeColour was set
		ctx.lineWidth = strokeSize;
		ctx.strokeStyle = strokeColour;
		ctx.stroke();
	}
}

// Draws a circle with certain attribules
function drawCircle(pos, radius, fillColour=false, strokeColour="black", strokeSize=1, arc=[0,2*Math.PI]) {
	ctx.beginPath();
	ctx.arc(
        widthScale * pos.x, 
        heightScale * pos.y, 
        widthScale * radius, 
    arc[0], arc[1], false); 

	if (strokeColour) {	// Fills if fill type
		ctx.lineWidth = strokeSize;
		ctx.strokeStyle = strokeColour;
		ctx.stroke();
	}
	if (fillColour) {	// Outlines if stroke type
		ctx.fillStyle = fillColour;
		ctx.fill();
	}
}

// Draws a single line connecting 2 points
function drawLine(p1, p2, strokeColour="black", strokeSize=1, offset={x:0,y:0}) {		
	ctx.beginPath();
	ctx.moveTo(widthScale * (p1.x + offset.x), heightScale * (p1.y + offset.y));
	ctx.lineTo(widthScale * (p2.x + offset.x), heightScale * (p2.y + offset.y));
	ctx.lineWidth = strokeSize * widthScale;
    ctx.strokeStyle = strokeColour;
    ctx.lineCap = "round"
	ctx.stroke();
}

// Draws a series of connected lines
function drawLines(pointList, strokeColour="black", strokeSize=1, fillColour=false, offset={x:0,y:0}) {		
    if (!pointList.length) return
	ctx.beginPath();
    ctx.moveTo(widthScale * (pointList[0].x + offset.x), heightScale * (pointList[0].y + offset.y));
    for (let i=1; i<pointList.length; i++) {
        ctx.lineTo(widthScale * (pointList[i].x + offset.x), heightScale * (pointList[i].y + offset.y));
    }

    if (fillColour) {
        ctx.fillStyle = fillColour
        ctx.fill()

        // If filling, make stroke wrap back to start
        ctx.closePath()
    }

    if (strokeColour) {
        ctx.lineWidth = strokeSize * widthScale;
        ctx.strokeStyle = strokeColour;
        ctx.lineCap = "round"
        ctx.stroke();
    }
}


// Draws text with certain attributes
function drawText(text, pos, size=2, colour="black", align="left") {	
    if (align=="center") ctx.textBaseline = "middle";
    else ctx.textBaseline = "top";
    ctx.textAlign = align;	// "left", "center", "right"
    ctx.font = widthScale * size + "px monospace"; // Verdana
	ctx.fillStyle = colour;
	ctx.fillText(text, widthScale*pos.x, heightScale*pos.y);
}


function drawImage(img, rect, angle=0) {
    ctx.translate(rect.x*widthScale, rect.y*heightScale)
    ctx.rotate(angle)
    ctx.drawImage(img, -rect.w/2*widthScale, -rect.h/2*widthScale, rect.w*widthScale, rect.h*heightScale);
    ctx.rotate(-angle)
    ctx.translate(-rect.x*widthScale, -rect.y*heightScale)
}

/*

// Should start using functions which allow for custom parameters to be passed

function foo({a,b=3,c=2}) {
    console.log(a,b,c)
}
foo({a:10,b:2})

*/




function hex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b);
    //return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}