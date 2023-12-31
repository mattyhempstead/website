

// Returns if point is within a rectangle (inclusive)
function pointInRect(point, rect) {
	if (rect.x <= point.x && point.x <= rect.x + rect.w) {		// Tests if within x boundaries
		if (rect.y <= point.y && point.y <= rect.y + rect.h) {		// Tests if within y boundaries
			return true;
		}
	}
	return false;
}


function collisionBetweenLineSegments(A1, A2, B1, B2) {		// Returns the collision point between two line segments, otherwise returns false

	/// First check if bounding boxes collide

	// Check lines are within x boundary
	if (Math.min(A1.x, A2.x) > Math.max(B1.x, B2.x)) return false;
	if (Math.min(B1.x, B2.x) > Math.max(A1.x, A2.x)) return false;

	// Check lines are within y boundary
	if (Math.min(A1.y, A2.y) > Math.max(B1.y, B2.y)) return false;
	if (Math.min(B1.y, B2.y) > Math.max(A1.y, A2.y)) return false;

	// Find gradients of both lines
	let Am = (A2.y - A1.y) / (A2.x - A1.x);
	let Bm = (B2.y - B1.y) / (B2.x - B1.x);

	// If Am == Bm, lines are parallel and can only be colliding if a point from one line lies on the other
	// This can be tested by subbing a point into y-y1=m(x-x1)
	// Current simulation does not need to take this case into account and can just return false for now
	if (Am == Bm) return false;

	// Calculate x value of collision
	let Cx = (Am*A1.x - Bm*B1.x + B1.y - A1.y) / (Am - Bm);

	// If Cx == NaN, atleast one of the line segments are vertical (have (+/-) Infinity gradient)
	// If this is true, a seperate calculation can be performed to determine collision point
	if (isNaN(Cx)) {
		if (!isFinite(Am)) {	// If A is vertical
			if (!isFinite(Bm)) return false;	// If B is also vertical, lines are parallel and are NOT colliding

			// Since A is vertical, sub A.x into B and check y coord lies on A
			// x bounds don't need to be checked for A.x since it passed the boundary box test
			let Cy = Bm*(A1.x - B1.x) + B1.y;
			if (Math.min(A1.y, A2.y) <= Cy && Cy <= Math.max(A1.y, A2.y)) {		// Check y coord lies on A
				return {x:A1.x, y:Cy}
			} else {	// If y coord does not lie on A, segments are NOT colliding
				return false;
			}

		} else {	// If A is not vertical, B must be vertical
		
			// Since B is vertical, sub B.x into A and check y coord lies on A
			// x bounds don't need to be checked for B.x since it passed the boundary box test
			let Cy = Am*(B1.x - A1.x) + A1.y;
			if (Math.min(B1.y, B2.y) <= Cy && Cy <= Math.max(B1.y, B2.y)) {		// Check y coord lies on B
				return {x:B1.x, y:Cy}
			} else {	// If y coord does not lie on B, segments are NOT colliding
				return false;
			}

		}
	}

	// Check this x value lies within bounds of both segments
	if (Cx < Math.min(A1.x, A2.x) || Cx > Math.max(A1.x, A2.x)) return false;	// Line segment A
	if (Cx < Math.min(B1.x, B2.x) || Cx > Math.max(B1.x, B2.x)) return false;	// Line segment B

	// As collision point x value is within x boundaries of both non-vertical line segments, they must be colliding and can return y value
	let Cy = Am*(Cx - A1.x) + A1.y;

	return {x:Cx, y:Cy}
}