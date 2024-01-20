
class Spring {
    constructor({ node1, node2, length, strength = 1, colour = "black", width = 1 }) {
        this.node1 = node1
        this.node2 = node2
        this.length = length
        this.strength = strength

        this.colour = colour
        this.width = width

        
        /** Remembers the distance nodes were apart last update. */
        this.lastDistance = this.length

        /** The damping force (restoring force multiplier). */
        this.damping = 0.9

    }
    update(dt) {

        let distance = Math.hypot(this.node1.pos.x - this.node2.pos.x, this.node1.pos.y - this.node2.pos.y)
        let offset = this.length - distance
        

        let forceX = this.strength * offset * (this.node1.pos.x - this.node2.pos.x) / distance
        let forceY = this.strength * offset * (this.node1.pos.y - this.node2.pos.y) / distance

        /// Add a damping force to the spring
        // If spring is pushing apart and nodes are travelling away from each other, weaken spring
        if (offset > 0 && distance > this.lastDistance) {   
            forceX *= this.damping
            forceY *= this.damping
        } 
        // If spring is pulling together and nodes are travelling towards each other, weaken spring
        else if (offset < 0 && distance < this.lastDistance) {
            forceX *= this.damping
            forceY *= this.damping
        }

        if (this.node1.type == "particle") {
            this.node1.force.x += forceX
            this.node1.force.y += forceY
        }
        if (this.node2.type == "particle") {
            this.node2.force.x -= forceX
            this.node2.force.y -= forceY
        }

        // Tracks distance apart
        this.lastDistance = distance

    }
    render() {
        drawLine(this.node1.pos, this.node2.pos, this.colour, this.width)
    }
}