
/*

Current Evolutionary System:
	- Start with a single parent
	- Create child of parent
	- Compare fitness of child to parent
	- If fitness is better, replace parent with child
	- REPEAT




Other Genetic Algorithms:

	Microbial GA
		- Pick 2 agents at random
		- Compare fitness' to find winner/loser
		- Crossover mutation only from winner to the loser (winner stays in the population)
		- Loser is mutated
		- REPEAT


Selection Methods:
	
	Roulette
		- Basically pick parents based on fitness value
		- Agent with 6 fitness will be 3x more likely to be selected than agent with 2 fitness
		- Problem: Agents with huge fitness almost completely remove all other agents with low fitness

	Rank Selection
		- Agents are all ranked based on fitness
		- Agents fitness is set to the inverse of their rank (e.g. 1st becomes 1, 5th becomes 1/5th)
		- Roulette selection is applied
		- Problem: Agents with huge fitness are only slightly better than those ranked closely below




*/

function randInt(a,b=undefined) {	// Returns random integer between "a" and "b" inclusive, if "b" is not defined random number is between "0" and "a" inclusive
	if (b == undefined) {
		return Math.floor(Math.random()*(a+1))
	} else {
		return a + Math.floor(Math.random()*(b-a+1))
	}
}

function mutateInt(n, min, max, rate, mutateChance) {	// Returns the value of an integer when mutated based on a set of parameters
	// Randomly changes the value of an integer
	// Integer has a minimum and maximum value it can change to
	// The max an integer can change by at once is rate*max
	if (Math.random() < mutateChance) {
		var intChange = Math.round(2*(Math.random()-0.5) * rate * max);
		var newInt = n + intChange;
		newInt = capNum(newInt, min, max);
		return newInt
	} else return n
}

function capNum(n, min, max) {
	if (n < min) return min;
	else if (n > max) return max;
	else return n;
}

function randomPoint() {
	return [randInt(800), randInt(450)];
}

function randomShape() {
	var points = [randomPoint()];
	for (var i=0; i<2; i++) {
		var newPoint = [points[0][0], points[0][1]];
		newPoint[0] += Math.round((Math.random()-0.5)*50);
		newPoint[1] += Math.round((Math.random()-0.5)*50);
		newPoint[0] = capNum(newPoint[0], 0, 800);
		newPoint[1] = capNum(newPoint[1], 0, 450);
		points.push(newPoint);
	}

	var colour = [127, 127, 127];
	return [points, colour];
}


class EvolvingImage {
	constructor(shapes=undefined) {
		// Each shapes consists of 3 [x,y] points and colour [R,G,B]
		// x: 0 to 800  --  y: 0 to 450 --  red, green, blue: 0 to 255  --   opacity: 0% to 100%

		if (shapes == undefined) {		// Create a new random Evolving Image
			this.shapes = []
			for (var i=0; i<curShapes; i++) {
				this.shapes.push(randomShape());
			}
		} else {	// Create an evolving image using shapes given
			this.shapes = shapes
		}

		this.fitness = undefined;

	}
	render(context) {	// Renders image on a particular context
		context.fillStyle = "black";
		context.fillRect(0, 0, 800, 450);
		for (var i in this.shapes) {
			context.fillStyle = "rgba(" + this.shapes[i][1][0] + "," + this.shapes[i][1][1] + "," + this.shapes[i][1][2] + ", 0.75)"; 
			context.beginPath();
			context.moveTo(this.shapes[i][0][0][0], this.shapes[i][0][0][1]);
			for (var j=1; j<this.shapes[i][0].length; j++) {
				context.lineTo(this.shapes[i][0][j][0], this.shapes[i][0][j][1]);
			}
			context.closePath();
			context.fill();
		}
	}
	getFitness(targetImageData) {	// Returns the fitness when compated to a target image
		this.render(ctxTest);
		var currentImageData = ctxTest.getImageData(0, 0, 800, 450);

		// For every pixel, find 3D distance from target image value and add to fitness
		this.fitness = 0;
		for (var i=0; i<currentImageData.data.length; i+=4) {
			var rDist = currentImageData.data[i] - targetImageData.data[i];
			var gDist = currentImageData.data[i+1] - targetImageData.data[i+1];
			var bDist = currentImageData.data[i+2] - targetImageData.data[i+2];
			//this.fitness += Math.sqrt(rDist*rDist + gDist*gDist + bDist*bDist);
			this.fitness += rDist*rDist + gDist*gDist + bDist*bDist;
			//this.fitness += Math.abs(rDist) + Math.abs(gDist) + Math.abs(bDist);
		}
		return this.fitness
	}
	mutate() {
		// Delete shapes

		// Mutate current shapes
		var mutateChance = 1/this.shapes.length;
		for (var i in this.shapes) {	// For every shape in the current image class object
			
			for (var j in this.shapes[i][0]) {		// For each point in this shape
				this.shapes[i][0][j][0] = mutateInt(this.shapes[i][0][j][0], 0, 800, 0.05, mutateChance);
				this.shapes[i][0][j][1] = mutateInt(this.shapes[i][0][j][1], 0, 450, 0.05, mutateChance);
			}

			this.shapes[i][1][0] = mutateInt(this.shapes[i][1][0], 0, 255, 0.05, mutateChance);
			this.shapes[i][1][1] = mutateInt(this.shapes[i][1][1], 0, 255, 0.05, mutateChance);
			this.shapes[i][1][2] = mutateInt(this.shapes[i][1][2], 0, 255, 0.05, mutateChance);

		}

		// Add new shapes
		if (Math.random() < 0.5 && this.shapes.length < curShapes) {		// If image can add more shapes, add one more
			this.shapes.push(randomShape());
		}

		return this.shapes
	}
}


function imageChild(parents) {	// Array with both parents inside
	// Start with the 2 parent shapeList arrays
	// Find a random index in the smallest array to perform crossover 
	// Pick a random parent, get every shape from start of the list to the chosen index
	// From the other parent get every shape from the chosen point to the end of the array
	//// This method means if the parent have different sizes, both sizes have an equally likely chance to be passed on.

	var crossoverPoint = randInt(Math.min(parents[0].shapes.length, parents[1].shapes.length)-1);
	var randParent = Math.round(Math.random()); // either 0 or 1 for each parent
	var shapeList = parents[randParent].shapes.slice(0,crossoverPoint);
	shapeList = shapeList.concat(parents[1-randParent].shapes.slice(crossoverPoint));

	var newImage = new EvolvingImage(shapeList);
	newImage.mutate();

	return newImage
}

function mutateImage(shapeList) {

}

// Starting parameters
var genNum = 0;
var popSize = 10;
var maxShapes = 100;
var curShapes = 1;


var bestFitness = Infinity;
var population = [];


var startTime = new Date();

// Canvas used to display best image
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Hidden canvas used for drawing
var canvasTest = document.createElement('canvas');
canvasTest.width = 800;
canvasTest.height = 450;
var ctxTest = canvasTest.getContext("2d");

//document.getElementById("text").appendChild(canvasTest);


// Target Image
var targetImage = new Image(800, 450);
targetImage.src = "catImage.jpg";
var targetImageData = undefined;
targetImage.onload = function(){
	console.log("Image loaded");

	// Get target image data

	ctxTest.drawImage(targetImage, 0, 0, 800, 450);
	/*
	ctxTest.fillStyle = "black";
	ctxTest.fillRect(0, 0, 800, 450);
	ctxTest.fillStyle = "white";
	ctxTest.font = "bold 200px Arial";
	ctxTest.fillText("Send",150,180);
	ctxTest.fillText("Nudes",100,380);
	*/
	targetImageData = ctxTest.getImageData(0, 0, 800, 450);
	console.log(targetImageData);

	document.getElementById("canvas").onclick = function(){startProgram()};

	ctx.font = "bold 100px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Click to start",400,200);
}

function startProgram() {
	document.getElementById("canvas").onclick = null;

	// == Genetic algorithm starts here == \\

	// Add starting population to array
	var bestStartingImage = {"fitness":Infinity};
	for (var i=0; i<popSize; i++) {
		var newImage = new EvolvingImage();
		if (newImage.getFitness(targetImageData) < bestStartingImage.fitness) bestStartingImage = newImage;	// Find fitness and compare to bestStartingImage
		population.push(newImage);
	}
	bestFitness = bestStartingImage.fitness;	// Set bestFitness to the best image in the starting population
	console.log("Starting best fitness is " + bestFitness.toLocaleString());
	bestStartingImage.render(ctx);

	console.log(bestStartingImage)


	window.setInterval(function() {
		if (curShapes<maxShapes && genNum%100==0) {		// Every 100 generations, add a new circle
			curShapes ++;
			console.log("Shape count set to " + curShapes);
		}


		// Select the index of two different parents
		var parentIndex1 = randInt(popSize-1);
		var parentIndex2 = randInt(popSize-2);
		if (parentIndex2 >= parentIndex1) parentIndex2++;

		// Create new single offspring
		var newImage = imageChild([population[parentIndex1], population[parentIndex2]]);
		if (newImage.getFitness(targetImageData) < bestFitness) {	// Image has new highest fitness
			bestFitness = newImage.fitness;
			console.log("Better Fitness in Gen " + genNum + " - " + newImage.fitness.toLocaleString());
			newImage.render(ctx);
		}

		// Put new image into population replacing the parent with the lower fitness
		if (population[parentIndex1].fitness < population[parentIndex2].fitness) {
			population[parentIndex2] = newImage;
		} else {
			population[parentIndex1] = newImage;
		}
		
		genNum++;
	}, 0);

	window.setInterval(function() {
		textString = "";
		textString += "Gen: " + genNum;
		textString += "<br>Time: " + Math.floor((new Date() - startTime)/1000) + " seconds";
		textString += "<br>Best Fitness: " + bestFitness.toLocaleString();

		textString += "<br><br>Gen Size: " + popSize;
		textString += "<br>Shapes: " + curShapes + " / " + maxShapes + " (+1 every 100 gens)";
		textString += "<br><br>Mutation chance for any value is ( 1 / the number of shapes )";
		textString += "<br>This is because with a low number of shapes, the chances of any particular value mutating needs to be high as there are not many values to mutate.";

		document.getElementById("text").innerHTML = textString;

	}, 1000);
}

/*

	Mutation
	Elitism
	

	Crossover
		- A mixture of the circles is used for crossover
		- 



	1. Initialise population:
		1. Create starting population
		2. Find all fitnesses
		3. Set max fitness to bestFitness

	2. Pick 2 completely random individuals
	
	3. Compare fitness (find winner/loser)

	4. Push winners genome into losers genome at about 50% replacement (this % be altered)

	5. Calculate losers fitness, compare and potentially replace bestFitness variable

	6. Put both individuals back into population

	7. Step 2

	This would count as one 'generation'.
	Graph would track:
		- bestFitness throughout each generation
		- average score of each two individuals picked

	Why is this good?
		- Winner goes back into population, automatically some form of 'elitism'
		- Population doesn't all breed/die at once, simular to real life.

	

*/