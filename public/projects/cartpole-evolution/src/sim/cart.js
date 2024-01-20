
class Cart {
    constructor({ pos, bounds, brain, width = 10, height = 5, maxAccel = 100 }) {
        this.pos = pos
        this.width = width
        this.height = height
        this.bounds = bounds

        this.brain = brain
        this.brainInput = new Array(this.brain.structure[0]).fill(0)

        this.maxAccel = maxAccel
        this.vel = 0

        /** Friction applied to cart movement. */
        this.velFriction = 0.99

        /** Set to true if cart is outside bounds specified in parameters */
        this.outsideBounds = false

    }
    /** Update carts physical state according to inputs from user/brain. */
    update(dt) {

        // Allow player control of cart
        if (main.keyDown["KeyA"]) {
            this.vel -= this.maxAccel * dt
        }
        if (main.keyDown["KeyD"]) {
            this.vel += this.maxAccel * dt
        }


        if (this.brain) {
            // console.log("BrainOutput", this.getBrainOutput())
            this.vel += this.getBrainOutput() * this.maxAccel * dt
        }

        // Small chance to apply random force to cart
		// if (Math.random() <= 0.03) {
		// 	this.vel += (2*Math.random()-1) * 10
		// }

        // Apply friction to cart vel
        this.vel *= this.velFriction

        // Limit maximum speed of cart
        // if (Math.abs(this.vel) > this.maxSpeed) {
            // this.vel = this.maxSpeed * Math.sign(this.vel)
        // }

        // Move cart based on its vel
        this.pos.x += this.vel * dt

        // // Keep cart in bounds of sim
        // if (this.pos.x < this.bounds.left) {
        // 	this.pos.x = this.bounds.left
        // 	this.vel = 0
        // } else if (this.pos.x > this.bounds.right) {
        // 	this.pos.x = this.bounds.right
        // 	this.vel = 0
        // }

        // Track if cart leaves bounds
        if (this.pos.x <= this.bounds.left || this.pos.x >= this.bounds.right) {
            this.outsideBounds = true
        }

    }
    render() {

        drawRect({
            x: this.pos.x,
            y: this.pos.y,
            w: this.width,
            h: this.height,
        }, "lightgrey", "grey", 3, true)

    }
    getBrainOutput() {

        // Position and velocity of cart
        this.brainInput[0] = (this.pos.x - this.bounds.left) / (this.bounds.right - this.bounds.left) * 2 - 1
        this.brainInput[1] = this.vel / this.maxAccel

        // this.brainInput._data[2] = main.sim.angle_1
        // this.brainInput._data[3] = main.sim.angle_2

        // x and y pos of mass 1 relative to cart
        this.brainInput[2] = (main.sim.nodes[1].pos.x - this.pos.x) / main.sim.LENGTH_1
        this.brainInput[3] = (this.pos.y - main.sim.nodes[1].pos.y) / main.sim.LENGTH_1

        // angular velocity of mass 1 and 2
        this.brainInput[4] = main.sim.vel_1

        // console.log(this.brainInput[4])

        // console.log("BrainInput", this.brainInput.format())

        // console.log("braininput", this.brainInput)

        return this.brain.getOutput({input: this.brainInput})[0]

    }
}