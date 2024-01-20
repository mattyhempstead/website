/*
	Should move the sim stuff related to generations into here
	sim.js should remain as a class specifically for the simulation (game) that the bot participates in
	main.js should be a class which handles creating/selecting new bots based on their performance in sim.js
	sim.js should be global to many different main.js evolution methods
*/
class Main extends Environment {
	constructor() {
		super()

		this.buttons = [
			new Button({
				text: "Speed: 1x",
				rect: { x: 82, y: 18, w: 15, h: 7 },
				action: (button) => {
					if (this.SPEED_MULTIPLIER == 1) {
						button.text = "Speed: MAX",
						this.SPEED_MULTIPLIER = 10000
					} else {
						button.text = "Speed: 1x",
						this.SPEED_MULTIPLIER = 1
					}
				}
			}),
		]


		this.data = [
			{
				name: "Best Score",
				y: [],
				type: 'scatter',
			}, {
				name: "Avg Score",
				y: [],
				type: 'scatter',
			},// {
			// 	name: "Worst Score",
			// 	y: [],
			// 	type: 'scatter',
			// }
		]

		this.layout = {
			title: 'Scores VS Generation',
			xaxis: {
				title: 'Generation',
				rangemode: 'tozero',
				tickformat: ',d',	// Integer scale (dtick:1 does not scale at big numbers)
			},
			yaxis: {
				title: 'Score',
				rangemode: 'tozero',
			},
		}

		Plotly.newPlot('graph', this.data, this.layout)


		/** Time when training was set to fast mode */
		this.startTime = new Date().getTime()
		this.endTime = new Date().getTime()


		this.genNum = 0


		this.childScore = 0

		this.popSize = 32
		this.population = []
		for (let i=0; i<this.popSize; i++) {
			this.population.push({
				brain: new NN({ structure: [5,8,1], NEURON_NOISE: 0.1 }),
				score: 0,
			})
		}

		this.popNum = 0		// The currently tested member of the population

		
		this.SPEED_MULTIPLIER = 1

		this.SIM_COUNT = 1	// Number of sims used to score a single bot
		this.simNum = this.SIM_COUNT


		this.sim = new Sim()
		this.resetSim()

	}
	update() {

		for (let i=0; i<this.SPEED_MULTIPLIER; i++) {
			
			this.sim.update()

			if (this.sim.complete) {
				this.nextSim()
			}	

		}

	}
	render() {

		this.sim.render()

		drawText("SimNum = " + this.simNum, { x: 1, y: 27 })
		drawText("PopNum = " + this.popNum, { x: 1, y: 32 })
		drawText("GenNum = " + this.genNum, { x: 1, y: 37 })

		drawText("SolveTime = " + ((this.endTime - this.startTime)/1000).toFixed(2), { x: 1, y: 42 })
	}

	/** Reset simulation with brain and custom starting angle */
	resetSim() {
		
		this.sim.reset({
			brain: this.population[this.popNum].brain,
			angle: 0,//(this.simNum - 1)/(this.SIM_COUNT - 1),
			// angle: Math.random()-0.5,
		})

	}

	/** Runs the next simulation. */
	nextSim() {

		// console.log("Bot score in sim ", this.simNum, "-", this.childScore)

		this.simNum --
		this.population[this.popNum].score += this.sim.score	// Add score for this simulation run to childScore
		if (this.simNum == 0) {
			this.simNum = this.SIM_COUNT
			this.nextPop()
		}

		this.resetSim()

	}

	/** Starts finding a score for the next agent in the population. */
	nextPop() {
		
		this.popNum ++
		if (this.popNum == this.popSize) {
			this.popNum = 0
			this.nextGen()
		}

	}

	/** Selects the next generation of agents. */
	nextGen() {

		// console.log("Next gen", this.childScore)

		this.genNum ++


		// Sort population by score
		this.population.sort((agent1,agent2) => agent2.score-agent1.score)

		
		// Set end time as if simulation has been completed
		if (this.population[0].score >= 2175 && this.endTime == this.startTime) this.endTime = new Date().getTime()


		// Track best score
		Plotly.extendTraces('graph', {y:[
			[this.population[0].score], 
			[this.population.reduce((x,y)=>({score:x.score+y.score})).score / this.popSize],
			// [this.population[this.popSize-1].score],
		]}, [0,1])

		// console.log(this.population[0].score)
		// console.log(this.population.reduce((x,y)=>x.score+y.score)/this.popSize)


		// Replace worst half of population with children of best half
		for (let i=0; i<this.popSize/2; i++) {
			// Get child of parent
			this.population[i + this.popSize/2].brain = this.population[i].brain.getChild({mutateRate:0.2})
			this.population[i + this.popSize/2].score = 0

			// Reset parent score also
			this.population[i].score = 0	
		}


	}

	onMouseUp() {
		this.sim.onMouseUp()
	}
}

let main = new Main();
main.init();
