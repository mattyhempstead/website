/*





		context.fillStyle = "#999999";
		context.fillRect(0, 0, canvas.height, canvas.height);
		context.fillText("Text", x, y);
		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI, false);
		context.fill();
		context.textAlign = "left";
		context.font = "10px Courier New";

*/

var colourSums;
var imageData;
var finishedSort;
var switchesPerFrame = 50000;
var canvasSize = 500;
var imageSize = 100;
var startTime;

var baseCanvas = document.getElementById('baseCanvas');
var baseContext = baseCanvas.getContext('2d');
baseCanvas.width = canvasSize;
baseCanvas.height = canvasSize;

var drawCanvas = document.getElementById('drawCanvas');
var drawContext = drawCanvas.getContext('2d');
drawCanvas.width = canvasSize;
drawCanvas.height = canvasSize;
drawContext.scale(canvasSize/imageSize, canvasSize/imageSize);

// Stop browser canvas smoothing
// Added 2023-10-28
drawContext.webkitImageSmoothingEnabled = false;
drawContext.mozImageSmoothingEnabled = false;
drawContext.imageSmoothingEnabled = false;

// var dataCanvas = $("canvas").attr("width", imageSize).attr("height", imageSize)[0];	// Canvas used for drawing
var dataCanvas = document.createElement('canvas');
var dataContext = dataCanvas.getContext("2d");
dataCanvas.width = imageSize;
dataCanvas.height = imageSize;


var animationFrameRequestID;


function useCatSource() {
	console.log("Using Cat Image")
	startImage("./cat.jpg");
}

function useFileSource() {
	console.log("Getting IMG Source");
	
	if (document.getElementById("file-input").files.length > 0) { // File input
		console.log("Source gathered successfully")
		var file = document.getElementById("file-input").files[0]
		var reader = new FileReader();	// Create file reader
		reader.onloadend = function() {		// Runs when image file has been
			startImage(reader.result)
		}
		reader.readAsDataURL(file);		// Start reading file

	} else {
		console.log("No File Selected")
		document.getElementById("timer").innerHTML = "<div style='color:red'>Enter an image with the File Selector</div>";
	}
}

function startImage(src) {
	console.log("Image Selected");

	var image = new Image();
	image.onload = function () {
		baseContext.drawImage(image, 0, 0, canvasSize, canvasSize);	// Draw visual reference image
		dataContext.drawImage(image, 0, 0, imageSize, imageSize);	// Draw data reference image
		imageData = dataContext.getImageData(0, 0, imageSize, imageSize);	// Get imageData
		console.log(imageData)

		// Draw scaled up version of imageData onto visual reference canvas
		dataContext.putImageData(imageData, 0, 0);
		drawContext.drawImage(dataCanvas, 0, 0);

		colourSums = [];
		for (var i=0; i<imageData.data.length; i+=4) {
			var sum = imageData.data[i] + imageData.data[i+1] + imageData.data[i+2];
			colourSums.push(sum);
		}


		if (animationFrameRequestID != undefined) {
			cancelAnimationFrame(animationFrameRequestID);
		}


		startTime = new Date();
		finishedSort = false;
		switchPixel();

	}
	image.src = src;

}




function switchPixel() {
	for (var n=0; n<switchesPerFrame; n++) {
		for (var p=0; p<colourSums.length-1; p++) {
			if (colourSums[p] < colourSums[p+1]) {

				// Switch coloursums value
				var a = colourSums[p];
				colourSums[p] = colourSums[p+1];
				colourSums[p+1] = a;

				// Switch pixel values
				var pixel = [imageData.data[p*4], imageData.data[p*4 + 1], imageData.data[p*4 + 2]]
				imageData.data[p*4] = imageData.data[(p+1)*4]
				imageData.data[p*4 + 1] = imageData.data[(p+1)*4 + 1]
				imageData.data[p*4 + 2] = imageData.data[(p+1)*4 + 2]
				imageData.data[(p+1)*4] = pixel[0]
				imageData.data[(p+1)*4 + 1] = pixel[1]
				imageData.data[(p+1)*4 + 2] = pixel[2]
				break
			}
			if (p == colourSums.length-2) finishedSort = true;
		}
		if (finishedSort) break;
	}

	if (!finishedSort) {
		// Draws scaled version of imageData onto the visible canvas
		dataContext.putImageData(imageData, 0, 0);
		drawContext.drawImage(dataCanvas, 0, 0);

		var timeTaken = ((new Date()) - startTime)/1000;
		document.getElementById("timer").innerHTML = "Time Taken: " + timeTaken + " seconds";

		animationFrameRequestID = requestAnimationFrame(switchPixel);
	} else {
		finishImage();
	}
}

function finishImage() {
	console.log("Finished Calculating");
	console.log(imageData);

	var timeTaken = ((new Date()) - startTime)/1000;
	document.getElementById("timer").innerHTML = "Finished in " + timeTaken + " seconds";

	// Draws scaled version of imageData onto the visible canvas
	dataContext.putImageData(imageData, 0, 0);
	drawContext.drawImage(dataCanvas, 0, 0);
}




drawCanvas.addEventListener("click", function(evt) {
	var rect = drawCanvas.getBoundingClientRect();
    mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };

    console.log("Clicked at (" + mousePos.x + ", " + mousePos.y + ")")

} );














