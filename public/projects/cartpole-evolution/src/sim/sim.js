
class Sim {
	constructor() {

		this.paused = true

		this.buttons = [
			new Button({
				text: (this.paused) ? "Play" : "Pause",
				rect: { x: 82, y: 8, w: 15, h: 7 },
				action: (button) => {
					this.paused = !this.paused
					button.text = (this.paused) ? "Play" : "Pause"
				}
			}),
			// new Button({
			// 	text: "Reset",
			// 	rect: { x: 82, y: 18, w: 15, h: 7 },
			// 	action: () => {
			// 		this.reset()
			// 	}
			// }),
			// new Button({
			// 	text: "Best Bot",
			// 	rect: { x: 82, y: 38, w: 15, h: 7 },
			// 	action: () => {
			// 		this.reset()
			// 		this.childBrain = this.bestBrain
			// 		this.cart.brain = this.bestBrain
			// 	}
			// })
		];



		this.STEPS_PER_UPDATE = 1

		this.STARTING_ANGLE_1 = 0
		this.STARTING_VEL_1 = 0


		/** The gravitational acceleration applied to each particle. */
		this.GRAVITY = 100		

		this.STARTING_POINT = {x:50, y:30}

		this.CART_BOUNDS = {left:10, right:90}
		this.CART_MAX_ACCEL = 100

		this.MASS_1 = 1
		this.LENGTH_1 = 15

		this.SPRING_STRENGTH = 10000

		this.MAX_SIM_TIME = 20

	}
	init() {
		
	}
	update(dt=1/60) {
		if (this.paused || this.complete) return


		this.cart.update(dt)

		for (let i in this.springs) {
			this.springs[i].update(dt)
		}

		for (let i in this.nodes) {
			this.nodes[i].force.y += this.GRAVITY * this.nodes[i].mass
			this.nodes[i].update(dt)
		}


		// Calculate angle stuff for the cart
		this.angle_1 = Math.atan2(this.nodes[1].pos.x - this.nodes[0].pos.x, this.nodes[1].pos.y - this.nodes[0].pos.y)

		// Calculate velocity in two different ways using sin and cos to stop high numbers near pi/2
		if (Math.abs(Math.abs(this.angle_1) - Math.PI/2) < Math.PI/4) {
			this.vel_1 = (-this.nodes[1].vel.y) / (Math.sin(this.angle_1) * this.LENGTH_1)
		} else {
			this.vel_1 = (this.nodes[1].vel.x - this.cart.vel) / (Math.cos(this.angle_1) * this.LENGTH_1)
		}
		// this.vel_1 = Math.hypot(this.nodes[1].vel.x - this.cart.vel, this.nodes[1].vel.y) / this.LENGTH_1


		// this.score += Math.abs(this.angle_1) + Math.abs(this.angle_2)

		// Score is simply the height of the second mass (sum of relative heights of each mass)
		this.score += 1 + (this.nodes[0].pos.y - this.nodes[1].pos.y) / (this.LENGTH_1)

		

		this.simTime -= dt
		this.complete = (this.simTime <= 0 || this.cart.outsideBounds)

	}
	render() {
		fillCanvas("#eee")



		setScaleEqual()

		// Render track line
		drawLine(
			{x:this.CART_BOUNDS.left, y:this.STARTING_POINT.y}, 
			{x:this.CART_BOUNDS.right, y:this.STARTING_POINT.y},
		"grey", 0.5)

		this.cart.render()

		for (let i in this.springs) {
			this.springs[i].render()
		}

		for (let i in this.nodes) {
			this.nodes[i].render()
		}

		setScaleRatio()


		// Render buttons
		for (let i in this.buttons) {
			this.buttons[i].render()
		}



		drawText("Gravity = " + this.GRAVITY, {x:1,y:2})
		drawText("θ₁ = " + this.angle_1.toFixed(2).padStart(5), {x:1,y:7})
		drawText("ω₁ = " + this.vel_1.toFixed(2).padStart(5), {x:1,y:12})
		drawText("Time = " + this.simTime.toFixed(2).padStart(5), { x: 1, y: 17 })
		drawText("Score = " + this.score.toFixed(2), { x: 1, y: 22 })

		drawText(this.cart.brainInput.map(x=>x.toFixed(2).padStart(5)).join(","), { x: 1, y: 95 })
		drawText(this.cart.brain.netOutput[this.cart.brain.structure.length-1][1][0].toFixed(2).padStart(5), { x: 1, y: 90 })

	}

	/** 
	 * Resets simulation variables to their defaults.
	 * Must be run once after creation of Sim instance
	 * 
	 */
	reset({ brain, angle = this.STARTING_ANGLE_1, }) {
		// this.paused = true
		// this.buttons[0].text = "Play"

		/** Set to true if cart either leaves boundaries or time runs up */
		this.complete = false

		/** Keeps track of score in current sim lifecycle */
		this.score = 0

		// Reset time for next sim
		this.simTime = this.MAX_SIM_TIME


		// Create node-spring system
		this.nodes = []		// All the nodes
		this.springs = []	// All the springs connecting the nodes


		// Initial angle stuff for the cart
		this.angle_1 = angle
		this.vel_1 = this.STARTING_VEL_1


		// Cart
		this.cart = new Cart({
			pos: {x:this.STARTING_POINT.x, y:this.STARTING_POINT.y},
			bounds: this.CART_BOUNDS,
			brain: brain,
			maxAccel: this.CART_MAX_ACCEL
		})


		// Pivot node
		this.nodes.push(
			new Node({ pos: this.cart.pos, type: "static", radius: 1 })
		)

		// Mass 1 node
		this.nodes.push(
			new Node({
				pos: {
					x: this.nodes[0].pos.x + this.LENGTH_1 * Math.sin(this.angle_1),
					y: this.nodes[0].pos.y + this.LENGTH_1 * Math.cos(this.angle_1)
				}, radius: 1.5, mass: this.MASS_1, colour: "darkred",
			})
		)

		// Spring connecting pivot and mass 1
		this.springs.push(
			new Spring({ 
				node1: this.nodes[0], 
				node2: this.nodes[1], 
				length: this.LENGTH_1, 
				strength: this.SPRING_STRENGTH, 
				colour: "#aaa",
			})
		)

	}
	onMouseUp() {

		// Test for clicks in buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].onClick()
		}

	}
}
