/*
	The main class for the program
	 - Contains the update and render loop
	 - Handles all the modes
*/
class PendulumSim {
	constructor() {
		
		this.paused = true

		this.buttons = [
            new Button({
                text: (this.paused) ? "Play" : "Pause", 
                rect:{x:82,y:8,w:15,h:7}, 
                action:(button)=>{
					this.paused = !this.paused
					button.text = (this.paused) ? "Play" : "Pause"
				}
			}),
			new Button({
                text: "Reset", 
                rect:{x:82,y:18,w:15,h:7}, 
                action:()=>{
					this.reset()
				}
			})
		];

		// Create lemon image
		this.lemon = new Image()
		this.lemon.src = 'lemon.png'

		this.STEPS_PER_UPDATE = 32

		this.STARTING_ANGLE_1 = 2
		this.STARTING_VEL_1 = 0
		this.STARTING_ANGLE_2 = 2
		this.STARTING_VEL_2 = 0


		this.GRAVITY = 16		// The gravitational acceleration applied to each particle

		this.pivot = {x:50,y:20}

		this.MASS_1 = 1
		this.LENGTH_1 = 15
		this.MASS_2 = 1
		this.LENGTH_2 = 15


		// Create node-spring system
		this.nodes = []		// All the nodes
		this.springs = []	// All the springs connecting the nodes

		// Holds all the juiceeee
		this.juice = []

		
		this.reset()


	}
	update(dt=1/600) {
		if (this.paused) return

		for (let i=0; i<this.STEPS_PER_UPDATE; i++) {
			for (let i in this.springs) {
				this.springs[i].update(dt)
			}
	
			for (let i in this.nodes) {
				this.nodes[i].force.y += this.GRAVITY * this.nodes[i].mass
				this.nodes[i].update(dt)
			}

			for (let i=this.juice.length; i--;) {
				this.juice[i].force.y += this.GRAVITY * this.juice[i].mass
				this.juice[i].update(dt)
			}

			this.juice = this.juice.filter(node=>node.pos.y<100)
		}


	}
	render() {
		// fillCanvas("#eee")
		fillCanvas("#444")

		let angle_1 = Math.atan2(this.nodes[1].pos.x-this.nodes[0].pos.x, this.nodes[1].pos.y-this.nodes[0].pos.y)
		let angle_2 = Math.atan2(this.nodes[2].pos.x-this.nodes[1].pos.x, this.nodes[2].pos.y-this.nodes[1].pos.y)

		let vel_1 = this.nodes[1].vel.x / Math.cos(angle_1) / this.LENGTH_1
		let vel_2 = (this.nodes[2].vel.x - this.nodes[1].vel.x) / Math.cos(angle_2) / this.LENGTH_2

		// Update the angle to render each lemon at
		this.nodes[1].angle = -angle_1// + Math.PI/2
		this.nodes[2].angle = -angle_2// + Math.PI/2


		setScaleEqual()

		for (let i in this.springs) {
			this.springs[i].render()
		}

		for (let i in this.juice) {
			this.juice[i].render()
		}

		for (let i in this.nodes) {
			this.nodes[i].render()
		}


		setScaleRatio()


		drawText("Gravity = " + this.GRAVITY, {x:1,y:2})
		drawText("θ₁ = " + angle_1.toFixed(2), {x:1,y:7})
		drawText("θ₂ = " + angle_2.toFixed(2), {x:1,y:12})
		drawText("ω₁ = " + vel_1.toFixed(2), {x:1,y:17})
		drawText("ω₂ = " + vel_2.toFixed(2), {x:1,y:22})

		// let KE = 0.5 * this.MASS_1 * (this.vel_1 * this.LENGTH_1)**2
		// let GPE = this.MASS_1 * this.GRAVITY * this.LENGTH_1*(1-Math.cos(this.angle_1))
		// drawText("KE = " + KE.toFixed(2), {x:1,y:22})
		// drawText("GPE = " + GPE.toFixed(2), {x:1,y:27})
		// drawText("Energy = " + (KE+GPE).toFixed(2), {x:1,y:32})


		// Render buttons
		for (let i in this.buttons) {
			this.buttons[i].render()
		}




	}
	reset() {
		this.paused = true
		this.buttons[0].text = "Play"

		// Reset system
		this.nodes = []
		this.springs = []
		this.juice = []

		// Pivot node
		this.nodes.push(
			new Node({pos:this.pivot, type:"static", radius:1})
		)

		// Mass 1 node
		this.nodes.push(
			new Node({pos:{
				x: this.nodes[0].pos.x + this.LENGTH_1*Math.sin(this.STARTING_ANGLE_1),
				y: this.nodes[0].pos.y + this.LENGTH_1*Math.cos(this.STARTING_ANGLE_1)
			}, radius:4, mass:this.MASS_1, img:this.lemon})
		)

		// Mass 2 node
		this.nodes.push(
			new Node({pos:{
				x: this.nodes[1].pos.x + this.LENGTH_2*Math.sin(this.STARTING_ANGLE_2),
				y: this.nodes[1].pos.y + this.LENGTH_2*Math.cos(this.STARTING_ANGLE_2)
			}, radius:4, mass:this.MASS_2, img:this.lemon})
		)

		// Spring connecting pivot and mass 1
		this.springs.push(
			new Spring({node1:this.nodes[0], node2:this.nodes[1], length:this.LENGTH_1, strength:10000, colour:"#aaa"})
		)

		// Spring connecting mass 1 and mass 2
		this.springs.push(
			new Spring({node1:this.nodes[1], node2:this.nodes[2], length:this.LENGTH_2, strength:10000, colour:"#aaa"})
		)
	}
	onClick() {

		// Test for clicks in buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].onClick()
		}

	}
	onMouseDown() {

	}
}


class Node {
	constructor({pos, type="particle", radius=1, mass, colour="black", img, vel={x:0,y:0}}) {
		this.pos = pos
		this.type = type
		this.radius = radius
		this.mass = mass
		this.colour = colour
		this.img = img

		this.vel = vel
		this.force = {x:0,y:0}

		// console.log(this.img)


		
	}
	update(dt) {
		if (this.type == "particle") {
			// Apply force
			this.vel.x += this.force.x / this.mass * dt
			this.vel.y += this.force.y / this.mass * dt

			// Move particle
			this.pos.x += this.vel.x / this.mass * dt
			this.pos.y += this.vel.y / this.mass * dt


			// Spawn nodes based on force
			if (Math.hypot(this.force.x, this.force.y)>20 && Math.random()<0.02) {
				main.sim.juice.push(new Node({
					pos: {x:this.pos.x, y:this.pos.y},
					radius: 0.5,
					mass: 1,
					colour: "rgba(255,255,0,0.5)",
					vel: {x:this.vel.x, y:this.vel.y}
				}))
			}


			// Reset force for next update
			this.force = {x:0,y:0}
		}
	}
	render() {

		if (this.img) {
			drawImage(this.img, {
				x: this.pos.x,
				y: this.pos.y,
				w: this.radius*2,
				h: this.radius*2
			}, this.angle)
		} else {
			drawCircle(this.pos, this.radius, this.colour, false)
		}

	}
}

class Spring {
	constructor({node1, node2, length, strength=1, colour="black", width=1}) {
		this.node1 = node1
		this.node2 = node2
		this.length = length
		this.strength = strength

		this.colour = colour
		this.width = width

	}
	update(dt) {
		let distance = Math.hypot(this.node1.pos.x-this.node2.pos.x, this.node1.pos.y-this.node2.pos.y)
		let offset = this.length - distance

		if (this.node1.type == "particle") {
			this.node1.force.x += this.strength * offset * (this.node1.pos.x-this.node2.pos.x)/distance
			this.node1.force.y += this.strength * offset * (this.node1.pos.y-this.node2.pos.y)/distance
		}
		if (this.node2.type == "particle") {
			this.node2.force.x -= this.strength * offset * (this.node1.pos.x-this.node2.pos.x)/distance
			this.node2.force.y -= this.strength * offset * (this.node1.pos.y-this.node2.pos.y)/distance
		}
	}
	render() {
		drawLine(this.node1.pos, this.node2.pos, this.colour, this.width)
	}
}