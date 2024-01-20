
class Node {
    constructor({ pos, type = "particle", radius = 1, mass, colour = "black", vel = { x: 0, y: 0 } }) {
        this.pos = pos
        this.type = type
        this.radius = radius
        this.mass = mass
        this.colour = colour

        this.vel = vel
        this.force = { x: 0, y: 0 }

    }
    update(dt) {
        if (this.type == "particle") {

            // Apply force
            this.vel.x += this.force.x / this.mass * dt
            this.vel.y += this.force.y / this.mass * dt

            // Apply damping
            this.vel.x *= 0.999
            this.vel.y *= 0.999

            // Move particle
            this.pos.x += this.vel.x / this.mass * dt
            this.pos.y += this.vel.y / this.mass * dt

            // Reset force for next update
            this.force = { x: 0, y: 0 }
        }
    }
    render() {
        drawCircle(this.pos, this.radius, this.colour, false)
    }
}