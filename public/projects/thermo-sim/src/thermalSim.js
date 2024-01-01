/*
	The main class for the program
	 - Contains the update and render loop
	 - Handles all the modes
*/
class ThermalSim {
	constructor() {
		
		this.paused = true

		this.buttons = [
            new Button({
                text: (this.paused) ? "Play" : "Pause", 
                rect:{x:80,y:10,w:15,h:7}, 
                action:(button)=>{
					this.paused = !this.paused
					button.text = (this.paused) ? "Play" : "Pause"
				}
			}),
			new Button({
                text:"Cool", 
                rect:{x:80,y:20,w:15,h:7}, 
                action:()=>{
					for (let i in this.particles) {
						this.particles[i].vel.x *= 0.5
						this.particles[i].vel.y *= 0.5
					}
				}
			}),
			new Button({
                text:"Heat", 
                rect:{x:80,y:30,w:15,h:7}, 
                action:()=>{
					for (let i in this.particles) {
						this.particles[i].vel.x *= 1.5
						this.particles[i].vel.y *= 1.5
					}
				}
            })
		];

		/*
			Since all the particles are essentially in a vacuum (no pressure is being applied) they find
			it very hard to exist in the liquid phase. 

			To apply pressure to the particles I could add a second type of particle which has no attraction
			forces with the other particles (only repulsion to keep them apart). 
			By tweaking the variables of the other particles I could put them in a start such that they exist
			as a gas while the other exists as a solid/liquid (kind of like air with water).
			If this 'air' existed as a gas and the other particles exists as a solid/liquid they would clump together
			and hopefully be bombarded by the gas molecules around them. This would apply a pressure which would allow the
			matter to exist as a solid, or hopefuly a liquid in which the molecules are moving fast enough to overcome 
			lattice, but not fast enough to leave the bombarded clump).

			Increasing gravity seems to create a version of this effect as it both makes solids harder to form but also 
			seems to help liquids form.
			I think what is happening is that the atoms near the bottom of the matter clump experience a pressure
			from the atoms above them being forced downwards on top of them due to gravity. 
			This essentially creates the pressure/temperature point which allows for the liquid phase to exist.
			Increasing gravity however also makes solids harder to exist at higher temperatures since gravity
			is applying a force which rips aparts the lattice structure.

		*/
		

		this.STARTING_PARTICLE_COUNT = 64	// Number of particles to start simulation with :O

		this.GRAVITY = 0.02		// The gravitational acceleration applied to each particle
		this.REPULSION_STRENGTH = 3	// The strongest strength of repulsion at distance = zero
		this.EQUILIBRIUM_DISTANCE = 2	// Distance at which net force between particles is zero
		this.ATTRACTION_POINT_CLOSE = {x:2.2, y:1}	// Increasing attraction up to this distance
		this.ATTRACTION_POINT_FAR = {x:2.3, y:0.05}		// Quickly decreasing attraction up to this distance
		this.ATTRACTION_MAX = 5		// Slowly decreasing attraction to zero up to this distance 


		this.avgSpeed = 0		// Average speed of all particles
		this.temperature = 0		// A number that is proportional to temperature (also proportioal to average KE of all particles)

		this.box = {x:2, y:2, w:70, h:50}	// The boundary box of the whole simulation

		this.particles = [];

		// Add a bunch of particles already in a hexagonal lattice so they start out as solid
		for (let i=0; i<this.STARTING_PARTICLE_COUNT; i++) {

			let dist = 1.75
			let x = (i%8)*dist
			let y = Math.floor(i/8)*dist + (i%2)*dist/2

			this.particles.push(
				new Particle({
					x: this.box.x + this.box.w*0.4 + x,
					y: this.box.y + this.box.h/1.005 - y
				})
			)
		}
		
		/*
			this.STARTING_PARTICLE_COUNT = 64	// Number of particles to start simulation with :O
			
			this.GRAVITY = 0.02		// Increasing this makes solids harder to form but also helps liquids form :/
			this.REPULSION_STRENGTH = 3	// The strongest strength of repulsion at distance = zero
			this.EQUILIBRIUM_DISTANCE = 2	// Distance at which net force between particles is zero
			this.ATTRACTION_POINT_CLOSE = {x:2.2, y:1}	// Increasing attraction up to this distance
			this.ATTRACTION_POINT_FAR = {x:2.3, y:0.05}		// Quickly decreasing attraction up to this distance
			this.ATTRACTION_MAX = 5		// Slowly decreasing attraction to zero up to this distance 
		*/

				
		this.sliders = [
			new Slider({
				rect:{x:80,y:60,w:15,h:3},
				radius:0.6,
				bounds:{min:0,max:0.1},
				value:()=>{return this.GRAVITY},
				setValue:(val)=>{this.GRAVITY=val}
			})
		]

	}
	update(dt=1/60) {
		for (let i in this.sliders) {	// Global buttons
			this.sliders[i].update()
		}

		if (this.paused) return

		for (let i in this.particles) {
			let particle = this.particles[i]

			// Reset forces
			particle.force.x = 0
			particle.force.y = 0

			// Apply gravity
			particle.force.y += this.GRAVITY

			// Apply force between atoms
			for (let j in this.particles) {
				if (i==j) continue;		// Skip force between self

				let other = this.particles[j]

				// Distance between particles
				let distance = Math.hypot(other.pos.x - particle.pos.x, other.pos.y - particle.pos.y)	

				// Calculate sign and strength of force between them
				//let forceStrength = (1/distance) - (10/(distance*distance))
				//let forceStrength = Math.exp(this.EQUILIBRIUM_DISTANCE - distance) - Math.exp(this.FORCE_SMOOTHNESS*(this.EQUILIBRIUM_DISTANCE - distance))
				let forceStrength = 0
				if (distance <= this.EQUILIBRIUM_DISTANCE) {
					forceStrength = (this.REPULSION_STRENGTH/this.EQUILIBRIUM_DISTANCE)*distance - this.REPULSION_STRENGTH
				} else if (distance <= this.ATTRACTION_POINT_CLOSE.x) {
					forceStrength = (distance - this.EQUILIBRIUM_DISTANCE)
						* ((this.ATTRACTION_POINT_CLOSE.y)/(this.ATTRACTION_POINT_CLOSE.x - this.EQUILIBRIUM_DISTANCE))
				} else if (distance <= this.ATTRACTION_POINT_FAR.x) {
					forceStrength = (distance - this.ATTRACTION_POINT_CLOSE.x)
						* ((this.ATTRACTION_POINT_FAR.y - this.ATTRACTION_POINT_CLOSE.y)/(this.ATTRACTION_POINT_FAR.x - this.ATTRACTION_POINT_CLOSE.x))
						+ this.ATTRACTION_POINT_CLOSE.y
				} else if (distance <= this.ATTRACTION_MAX) {
					forceStrength = (distance - this.ATTRACTION_POINT_FAR.x)
					* ((-this.ATTRACTION_POINT_FAR.y)/(this.ATTRACTION_MAX - this.ATTRACTION_POINT_FAR.x))
					+ this.ATTRACTION_POINT_FAR.y
				}

				// Apply force in both x and y directions
				particle.force.x += forceStrength * (other.pos.x - particle.pos.x) / distance
				particle.force.y += forceStrength * (other.pos.y - particle.pos.y) / distance


				//particle.colour = (forceStrength >= 0) ? "blue" : "red"
			}


			
			if (particle.pos.x <= this.box.x) {
				particle.vel.x *= -1
				particle.pos.x = 2*this.box.x - particle.pos.x
			} else if (particle.pos.x >= this.box.x + this.box.w) {
				particle.vel.x *= -1
				particle.pos.x = 2*(this.box.x + this.box.w) - particle.pos.x
			}
	
			if (particle.pos.y <= this.box.y) {
				particle.vel.y *= -1
				particle.pos.y = 2*this.box.y - particle.pos.y
			} else if (particle.pos.y >= this.box.y + this.box.h) {
				particle.vel.y *= -1
				particle.pos.y = 2*(this.box.y + this.box.h) - particle.pos.y
				// particle.force.y += 10*((this.box.y + this.box.h) - particle.pos.y)
			}

		}
		
		this.avgSpeed = 0
		this.temperature = 0
		for (let i in this.particles) {		
			this.particles[i].update(dt)

			this.avgSpeed += Math.hypot(this.particles[i].vel.x, this.particles[i].vel.y)
			this.temperature += Math.hypot(this.particles[i].vel.x, this.particles[i].vel.y)**2
		}
		this.avgSpeed /= this.particles.length
		this.temperature *= 100 / this.particles.length

	}
	render() {
		fillCanvas("#eee")

		// Render buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].render()
		}

		// Render sliders
		for (let i in this.sliders) {	// Global buttons
			this.sliders[i].render()
		}
		drawText("Gravity: " + (100*this.GRAVITY).toFixed(2), {x:80,y:54})


		setScaleEqual()

		drawRect(this.box, "white", "black")

		for (let i in this.particles) {
			this.particles[i].render()
		}

		setScaleRatio()

		//let distance = Math.hypot(this.particles[0].pos.x - this.particles[1].pos.x, this.particles[0].pos.y - this.particles[1].pos.y)
		//let force = Math.hypot(this.particles[0].force.x, this.particles[0].force.y)
		//drawText("Dist: " + distance.toFixed(2), {x:3,y:5})
		//drawText("Force: " + force.toFixed(2), {x:3,y:8})
		
		drawText("Avg Speed: " + this.avgSpeed.toFixed(3), {x:3,y:5})
		drawText("Temperature: " + this.temperature.toFixed(2), {x:3,y:10})

	}
	onClick() {

		// Test for clicks in buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].onClick()
		}

		// Render sliders
		for (let i in this.sliders) {	// Global buttons
			this.sliders[i].onClick()
		}

	}
	onMouseDown() {
		// Render sliders
		for (let i in this.sliders) {	// Global buttons
			this.sliders[i].onMouseDown()
		}
	}
}


class Particle {
	constructor(pos) {
		this.pos = pos
		this.vel = {x:0, y:0}
		// this.vel = {
		// 	x: 10*(Math.random()-0.5), 
		// 	y: 10*(Math.random()-0.5)
		// }
		this.force = {x:0, y:0}

		this.radius = 0.5

		this.colour = "blue"
	}
	update(dt) {

		this.vel.x += this.force.x * dt
		this.vel.y += this.force.y * dt

		this.pos.x += this.vel.x * dt
		this.pos.y += this.vel.y * dt
	}
	render() {

		let temp = 1 - Math.exp(-Math.hypot(this.vel.x, this.vel.y))			// temp = 1 - e^(-speed)
		this.colour = `rgba(${Math.floor(256*temp)}, ${Math.floor(128*(1-temp))}, ${Math.floor(256*(1-temp))}, 0.8)`

		drawCircle(this.pos, this.radius, this.colour)

		// drawLine(this.pos, {
		// 	x: this.pos.x + this.force.x,
		// 	y: this.pos.y + this.force.y
		// }, "green", 0.2)

	}
}