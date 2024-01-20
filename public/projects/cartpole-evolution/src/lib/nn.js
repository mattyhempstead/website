
/*

	The neural network class
	Training process has been created modularly and split into multiple function

	Should probably scale dEdW based on number of weights feeding into individual neurons

*/

class NN {
	constructor({ network, structure, NEURON_NOISE = 0 }) {

		/** SD of new weights when network is generated from scratch. */
		this.STARTING_WEIGHT = 0.5

		/** The amplitude of the gaussian noise applied to each neuron weighted sum while output is calculated. */
		this.NEURON_NOISE = NEURON_NOISE

		/** Array that represents number of neurons in each layer */
		this.structure = structure;		

		/** Multidimentional array contain weights/biases of network */
		this.network = network;
		if (this.network == undefined) {	// If not using an already made network

			// Generates actual network 3D array
			this.network = [];	// Contains a list of layers
			for (let layerNum=0; layerNum<this.structure.length; layerNum++) {
				let finalLayer = (layerNum==this.structure.length-1);	// If creating final layer (output layer)
				let layer = [];		// Layers hold a list of neurons

				// Non-output layers have one more neuron due to bias
				let neuronCount = this.structure[layerNum] + !finalLayer;

				// 0 weights if final layer, otherwise have as many weights as there are neurons in the next layer
				let connectionCount = finalLayer ? 0 : this.structure[layerNum+1];

				for (let neuronNum=0; neuronNum<neuronCount; neuronNum++) {	
					let neuron = [];	// Neuron holds a list of weights for connections to next layer
					for (let weightNum=0; weightNum<connectionCount; weightNum++) {
						// Weight strength is a random value between the min and max starting weights
                        let weight = this.getStartingWeight(this.structure[layerNum])
						neuron.push(weight);
					}
					layer.push(neuron);
				}
				this.network.push(layer);
			}
		}


		// Create the variable used to store netOutput
		// Initalising this variable beforehand makes calculating it
		this.netOutput = new Array(this.structure.length);
		for (let i=0; i<this.structure.length; i++) {
			this.netOutput[i] = [new Array(this.structure[i]), new Array(this.structure[i])];
			this.netOutput[i][0].fill(0);
			this.netOutput[i][1].fill(0);
		}



	}
	getStartingWeight(inputNeuronCount) {
		// return (Math.random()*2-1) * this.STARTING_WEIGHT

		// When plotting a histogram of samples from f(x)=log(1/x - 1), we get an appoximate normal curve
		// Divide by 1.81 to get sd of 1 as it is approximately sd of f(x), this makes f(x) ~ N(0,1)
		// Then divide by sqrt(n) to account for number of input neurons (i.e. sample size from the approximate N(0,1))
		// This will ensure the sum of all input weights feeding into every neuron is approximately a sample from N(0,1)
		return Math.log(1/Math.random() - 1) / 1.81 / Math.sqrt(inputNeuronCount) * this.STARTING_WEIGHT
	}
	getOutput({ input, finalOutput = true, neuronNoise = this.NEURON_NOISE }) {	// Returns output of network for a particular input
		/*
			finalOutput==true returns simply the output of the network
			finalOutput==false returns all neuron input/outputs pairs for training from all layers

			Passing in neuronNoise causes network to overwrite default neuronNoise specified during construction.
		*/

		if (input.length != this.structure[0]) {
			console.log("Invalid Input length", "Expecting " + this.structure[0] + " but recieved " + input.length);
			return;
		}


		this.netOutput[0][1] = input;

		// For each layer (not first because already have input)
		for (let l=1; l<this.structure.length; l++) {
			// For some reason, defining all these variables before using them makes it like 3x faster
			let prevLayerOutput = this.netOutput[l-1][1];	// Output of neurons in previous later
			let prevLayerNeurons = this.network[l-1];		// Neurons of previous layer
			let currLaterInput = this.netOutput[l][0];		// Neuron input of current layer
			let currLaterOutput = this.netOutput[l][1];		// Neuron output of current layer

			// For each neuron in current layer (excluding bias)
			for (let n=0; n<this.structure[l]; n++) {
				// Reset sum from previous feedforward
				let sum = 0;

				// For each neuron in previous layer (excluding bias)
				for (let w=0; w<this.structure[l-1]; w++) {
					// Add weighted sum
					sum += prevLayerOutput[w] * prevLayerNeurons[w][n];
				}

				// Add bias to input sum
				sum += prevLayerNeurons[this.structure[l-1]][n];

				// Add random noise to input sum
				if (neuronNoise) {
					sum += Math.log(1/Math.random() - 1) * neuronNoise;
				}

				// Store sum
				currLaterInput[n] = sum;	

				// Apply activation function
				currLaterOutput[n] = Math.tanh(sum);
			}
		}

		if (finalOutput) {
			return this.netOutput[this.structure.length-1][1];
		} else {
			return this.netOutput;
		}


	}
	getChild({ mutateRate = 0, mutateChance = 1 }) {		// Returns a mutated child network

		// Creates a slightly different child bot
		let childNetwork = [];
		for (let layerNum=0; layerNum<this.network.length; layerNum++) {
			let parentLayer = this.network[layerNum]
			let layer = [];
			for (let neuronNum=0; neuronNum<parentLayer.length; neuronNum++) {

				let neuron = parentLayer[neuronNum].slice(0);

				for (let weightNum=0; weightNum<neuron.length; weightNum++) {
					if (mutateRate > 0 && Math.random() <= mutateChance) {
						//weight += (2*Math.random() - 1) * mutateRate;

						// Gets mutations from an almost normal distribution
						neuron[weightNum] += Math.log(1/Math.random() - 1) * mutateRate;	
					}
				}

				// It is slightly quicker to use the following only if the mutateChance is close to 1
				// neuron.map(weight => {
				// 	if (mutateRate > 0 && Math.random() <= mutateChance) {
				// 		//weight += (2*Math.random() - 1) * mutateRate;

				// 		// Gets mutations from an almost normal distribution
				// 		return weight + Math.log(1/Math.random() - 1) * mutateRate;	
				// 	}
				// 	return weight
				// })


				layer.push(neuron);

			}
			childNetwork.push(layer);
		}

		let newNN = new NN({
			structure: this.structure, 
			network: childNetwork,
			NEURON_NOISE: this.NEURON_NOISE,
		});

		return newNN;
	}
	getSquaredError(output, desired) {
		let error = 0;
		for (let i=0; i<output.length; i++) {
			error += (output[i] - desired[i])**2;	// Squaring makes it positive and is good for gradient function
		}
		return error;
	}

}
