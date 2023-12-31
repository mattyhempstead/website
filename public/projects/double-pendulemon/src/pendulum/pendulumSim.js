/*
	The main class for the program
	 - Contains the update and render loop
	 - Handles all the modes
*/
class PendulumSim {
	constructor() {
		
		this.paused = true
		this.double = true

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
                text: (this.double) ? "Single" : "Double", 
                rect:{x:80,y:20,w:15,h:7}, 
                action:(button)=>{
					this.double = !this.double
					button.text = (this.double) ? "Single" : "Double"
					this.resetPendulum()
				}
			}),
		];

		this.STARTING_ANGLE_1 = 1
		this.STARTING_VEL_1 = 0
		this.STARTING_ANGLE_2 = 1
		this.STARTING_VEL_2 = 0


		this.GRAVITY = 250		// The gravitational acceleration applied to each particle

		this.pivot = {x:50,y:25}

		this.MASS_1 = 1
		this.LENGTH_1 = 10
		this.MASS_2 = 1
		this.LENGTH_2 = 10

		this.angle_1 = this.STARTING_ANGLE_1
		this.vel_1 = this.STARTING_VEL_1
		this.angle_2 = this.STARTING_ANGLE_2
		this.vel_2 = this.STARTING_VEL_2


		// Rendering radius 
		this.rad_pivot = 0.5
		this.rad_1 = 1.5
		this.rad_2 = 1.5


	}
	update(dt=1/60) {
		if (this.paused) return

		if (this.double) this.updateDouble(dt)
		else this.updateSingle(dt)

	}
	updateSingle(dt) {
		let accel_1 = -1 * this.GRAVITY * Math.sin(this.angle_1) / this.LENGTH_1

		this.vel_1 += dt * accel_1
		this.angle_1 += dt * this.vel_1
	}
	updateDouble(dt) {

		// let accel_1 = -1 * this.GRAVITY * Math.sin(this.angle_1) / this.LENGTH_1
		// this.vel_1 += dt * accel_1
		// this.angle_1 += dt * this.vel_1

		let T1 = (this.MASS_1 + this.MASS_2) * this.MASS_1 * this.GRAVITY * Math.cos(this.angle_1)
		T1 /= (this.MASS_1 + this.MASS_2 - this.MASS_2*(Math.cos(this.angle_2 - this.angle_1)**2))

		let T2 = this.MASS_1 * this.MASS_2 * this.GRAVITY * Math.cos(this.angle_1) * Math.cos(this.angle_2 - this.angle_1)
		T2 /= (this.MASS_1 + this.MASS_2 - this.MASS_2*(Math.cos(this.angle_2 - this.angle_1)**2))


		let F_1 = T2 * Math.sin(this.angle_2 - this.angle_1) - this.MASS_1 * this.GRAVITY * Math.sin(this.angle_1)
		let accel_1 = F_1 / (this.MASS_1 * this.LENGTH_1)

		let accel_2 = -1 * T1 * Math.sin(this.angle_2 - this.angle_1) / (this.MASS_1 * this.LENGTH_2)


		this.vel_1 += dt * accel_1
		this.angle_1 += dt * this.vel_1
		if (this.angle_1 > Math.PI) this.angle_1 = this.angle_1 - 2*Math.PI
		else if (this.angle_1 < -Math.PI) this.angle_1 = this.angle_1 + 2*Math.PI

		this.vel_2 += dt * accel_2
		this.angle_2 += dt * this.vel_2
		this.angle_2 = this.angle_2 % (2*Math.PI)
		if (this.angle_2 > Math.PI) this.angle_2 = this.angle_2 - 2*Math.PI
		else if (this.angle_2 < -Math.PI) this.angle_2 = this.angle_2 + 2*Math.PI

	}
	render() {
		fillCanvas("#eee")

		// Render buttons
		for (let i in this.buttons) {	// Global buttons
			this.buttons[i].render()
		}

		if (this.double) this.renderDouble()
		else this.renderSingle()

	}
	renderSingle() {
		setScaleEqual()

		let pos_1 = {
			x: this.pivot.x + this.LENGTH_1 * Math.sin(this.angle_1),
			y: this.pivot.y + this.LENGTH_1 * Math.cos(this.angle_1)
		}

		// Line connecting pivot to 1
		drawLine(this.pivot, pos_1, "#aaa", 0.5)

		// Circle for pivot
		drawCircle(this.pivot, this.rad_pivot, "black", false)

		// Circle for mass 1
		drawCircle(pos_1, this.rad_1, "darkred", false)

		setScaleRatio()

		drawText("Gravity = " + this.GRAVITY, {x:1,y:2})
		drawText("θ₁ = " + this.angle_1.toFixed(2), {x:1,y:7})
		drawText("ω₁ = " + this.vel_1.toFixed(2), {x:1,y:12})

		let KE = 0.5 * this.MASS_1 * (this.vel_1 * this.LENGTH_1)**2
		let GPE = this.MASS_1 * this.GRAVITY * this.LENGTH_1*(1-Math.cos(this.angle_1))
		drawText("KE = " + KE.toFixed(2), {x:1,y:22})
		drawText("GPE = " + GPE.toFixed(2), {x:1,y:27})
		drawText("Energy = " + (KE+GPE).toFixed(2), {x:1,y:32})


	}
	renderDouble() {
		setScaleEqual()

		let pos_1 = {
			x: this.pivot.x + this.LENGTH_1 * Math.sin(this.angle_1),
			y: this.pivot.y + this.LENGTH_1 * Math.cos(this.angle_1)
		}

		let pos_2 = {
			x: pos_1.x + this.LENGTH_2 * Math.sin(this.angle_2),
			y: pos_1.y + this.LENGTH_2 * Math.cos(this.angle_2)
		}

		// Lines connecting pivot to 1 and 1 to 2
		drawLine(this.pivot, pos_1, "#aaa", 0.5)
		drawLine(pos_1, pos_2, "#aaa", 0.5)

		// Circle for pivot
		drawCircle(this.pivot, this.rad_pivot, "black", false)

		// Circle for mass 1
		drawCircle(pos_1, this.rad_1, "darkred", false)

		// Circle for mass 2
		drawCircle(pos_2, this.rad_2, "darkgreen", false)

		setScaleRatio()

		drawText("Gravity = " + this.GRAVITY, {x:1,y:2})
		drawText("θ₁ = " + this.angle_1.toFixed(2), {x:1,y:7})
		drawText("ω₁ = " + this.vel_1.toFixed(2), {x:1,y:12})
		drawText("θ₂ = " + this.angle_2.toFixed(2), {x:1,y:17})
		drawText("ω₂ = " + this.vel_2.toFixed(2), {x:1,y:22})

		let energy = 0
		energy += 0.5 * this.MASS_1 * (this.vel_1 * this.LENGTH_1)**2
		energy += this.MASS_1 * this.GRAVITY * -Math.cos(this.angle_1)

	}
	resetPendulum() {
		this.angle_1 = this.STARTING_ANGLE_1
		this.vel_1 = this.STARTING_VEL_1
		this.angle_2 = this.STARTING_ANGLE_2
		this.vel_2 = this.STARTING_VEL_2
		
		this.paused = true
		this.buttons[0].text = "Play"
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

