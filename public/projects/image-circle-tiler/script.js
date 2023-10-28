/*

		context.fillStyle = "#999999";
		context.fillRect(x, y, w, h);
		context.fillText("Text", x, y);
		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI, false);
		context.fill();
		context.textAlign = "left";
		context.font = "10px Courier New";

*/


var baseCanvas = document.getElementById('baseCanvas');
var baseContext = baseCanvas.getContext('2d');
var drawCanvas = document.getElementById('drawCanvas');
var drawContext = drawCanvas.getContext('2d');

var imageData;
var finishedSort;
var switchesPerFrame = 50000;
var imageSize = {x:500, y:500};
var startTime;

baseCanvas.width = imageSize.x;
baseCanvas.height = imageSize.y;
drawCanvas.width = imageSize.x;
drawCanvas.height = imageSize.y;


function useCatSource() {
	console.log("Using Cat Image")
	startProgram("cat.jpg");
}

function useFileSource() {
	console.log("Getting IMG Source from file");
	
	if (document.getElementById("file-input").files.length > 0) { // File input
		var file = document.getElementById("file-input").files[0]
		var reader = new FileReader();	// Create file reader
		reader.onloadend = function() {		// Runs when image file has been read
			console.log("Source gathered successfully from file")
			startProgram(reader.result)
		}
		reader.readAsDataURL(file);		// Start reading file

	} else {
		console.log("No File Selected")
		document.getElementById("timer").innerHTML = "<div style='color:red'>Enter an image with the File Selector</div>";
	}
}

function startProgram(src) {
	console.log("Image Selected");
	//console.log(src)

	var image = new Image();
	image.onload = function () {
		baseContext.drawImage(image, 0, 0, imageSize.x, imageSize.y);
		imageData = baseContext.getImageData(0, 0, imageSize.x, imageSize.y);
		console.log(imageData.data)

		//startTime = new Date();
		//finishedSort = false;

		var blockSize = {w:10, h:10};

		// Find the average pixel brightness in each blockSize'd area
		var blockBrightness = [];	// Multidimentional array of brightnesses in each block
		for (var y=0; y<imageSize.y/blockSize.h; y++) {
			var row = [];
			for (var x=0; x<imageSize.x/blockSize.w; x++) {
				var blockSum = {r:0, g:0, b:0};	// Sum of RGB's in each block

				for (var j=0; j<blockSize.h; j++) {		// For the number of pixels wide each block is
					for (var i=0; i<blockSize.w; i++) {		// For the number of pixels high each block is

						var index = 4*(y*blockSize.h*imageSize.x + j*imageSize.x + i + x*blockSize.w);

						blockSum.r += imageData.data[index];
						blockSum.g += imageData.data[index+1];
						blockSum.b += imageData.data[index+2];
						//console.log("(" + i + "," + j + ") - " + index);

					}
				}

				blockSum.r = (blockSum.r / (blockSize.w*blockSize.h*255))
				blockSum.g = (blockSum.g / (blockSize.w*blockSize.h*255))
				blockSum.b = (blockSum.b / (blockSize.w*blockSize.h*255))
				row.push(blockSum);
			}
			blockBrightness.push(row);
		}

		//console.log(blockBrightness)

		drawContext.fillStyle = "black";
		drawContext.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

		// Render circles
		for (var y=0; y<blockBrightness.length; y++) {
			for (var x=0; x<blockBrightness[0].length; x++) {

				var brightness = (blockBrightness[y][x].r + blockBrightness[y][x].g + blockBrightness[y][x].b)/3;

				// Sqrt radius because circle area is square of radius
				// Modified 2023-10-28
				brightness = Math.sqrt(brightness);

				var avgR = Math.floor(blockBrightness[y][x].r*255);
				var avgG = Math.floor(blockBrightness[y][x].g*255);
				var avgB = Math.floor(blockBrightness[y][x].b*255);

				drawContext.fillStyle = "rgb(" + avgR + "," + avgG + "," + avgB + ")";
				drawContext.beginPath();
				drawContext.arc((x+0.5)*blockSize.w, (y+0.5)*blockSize.h, brightness*blockSize.w/2, 0, 2 * Math.PI, false);
				drawContext.fill();

				//drawContext.fillStyle = "black";
				//drawContext.textAlign = "center";
				//drawContext.font = "10px Courier New";
				//drawContext.fillText(blockBrightness[y][x], (x+0.5)*blockSize.w, (y+0.5)*blockSize.h);
			}
		}


	}
	image.src = src;

}

/*
function finishImage() {
	console.log("Finished Calculating");
	console.log(imageData);

	var timeTaken = ((new Date()) - startTime)/1000;
	document.getElementById("timer").innerHTML = "Finished in " + timeTaken + " seconds";

	drawContext.putImageData(imageData, 0, 0);
}
*/



drawCanvas.addEventListener("click", function(evt) {
	var rect = drawCanvas.getBoundingClientRect();
    mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
    console.log("Clicked at (" + mousePos.x + ", " + mousePos.y + ")")
} );














