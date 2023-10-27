



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.onmousedown = function(){ return false; };	// Stops text from being highlighted when clicking on canvas

var startPoint = {x:360, y:580};
var branchAngle = Math.PI/3;
var branchLength = 100;
var branchNum = 12;

class Branch {
	constructor(parentEnd, parentAngle, gen) {
		//console.log("Branch Generation: " + gen);
		this.gen = gen;
		this.relativeAngle = parentAngle + (Math.random()-0.5)*branchAngle;
		
		this.branchLength = branchLength * Math.random() * (4/(this.gen+3));
		this.startPos = {x:parentEnd.x, y:parentEnd.y};
		this.endPos = {x:parentEnd.x + this.branchLength * Math.cos(this.relativeAngle), y:parentEnd.y + this.branchLength * Math.sin(this.relativeAngle)};
		
		this.children = [];
		var childrenCount = Math.floor(Math.random() * 5);

		// Minimum of 1 branch for few gens
		// Added in 2023
		if (gen <= 2) {
			childrenCount = Math.max(childrenCount, 1);
		}


		if (this.gen == branchNum) childrenCount = 0;
		for (var i=0; i<childrenCount; i++) {
			this.children.push(new Branch(this.endPos, this.relativeAngle, this.gen+1));
		}
	}
	render() {
		ctx.strokeStyle = "rgb(" + Math.floor(80*20/(this.gen+20)) + ", " + Math.floor(40+200-(200*20)/(this.gen+20)) + ", 0)";
		ctx.lineWidth = 20 / (this.gen+2);
		
		ctx.beginPath();
		ctx.moveTo(this.startPos.x, this.startPos.y);
		ctx.lineTo(this.endPos.x, this.endPos.y);
		ctx.stroke();
		
		for (var i in this.children) {
			this.children[i].render();
		}
	}
}

function newTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	tree = new Branch(startPoint, -Math.PI/2, 0);
	tree.render();
	console.log(tree);
}

newTree();

canvas.addEventListener("click", function(){
	newTree();
});



