class Palm extends Polygon {


	constructor() {
		super();
		this.makePalm();
		this.initBuffer();
	}

	makePalm () {
		this.mesh = [
			// Front
			this.from.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.to.z,
			this.from.x, this.to.y, this.to.z,

			this.to.x +0.5, this.to.y, this.to.z,
			this.from.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.to.z,

			// Right
			this.to.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			this.to.x+0.5, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			// Back
			this.from.x, this.from.y, this.from.z,
			this.to.x +0.5, this.from.y, this.from.z,
			this.from.x, this.to.y, this.from.z,

			this.to.x+0.5, this.to.y, this.from.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.from.y, this.from.z,

			// Left
			this.from.x, this.to.y, this.to.z +0.5,
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			this.from.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.to.z +0.5,
			this.from.x, this.from.y, this.from.z,

			// Bottom
			this.from.x +0.5, this.from.y , this.to.z +0.5,
			this.from.x +0.5, this.from.y, this.from.z +0.5,
			this.to.x +0.5, this.from.y, this.to.z +0.5,

			this.to.x +0.5, this.from.y, this.from.z +0.5,
			this.from.x +0.5, this.from.y , this.from.z +0.5,
			this.to.x +0.5, this.from.y, this.to.z +0.5,

			// Top
			this.from.x +0.5, this.to.y, this.to.z +0.5,
			this.from.x +0.5, this.to.y, this.from.z +0.5,
			this.to.x +0.5, this.to.y, this.to.z +0.5,

			this.to.x +0.5, this.to.y, this.from.z +0.5,
			this.from.x +0.5, this.to.y, this.from.z +0.5,
			this.to.x +0.5, this.to.y, this.to.z +0.5
		]

		for (let i = 0; Math.floor(i/6) < 6; i++) {
			this.colors = this.colors.concat(Object.values(this.sideColors)[Math.floor(i/6)]);
		}
	}
}

class Leaf extends Polygon {

    constructor() {
		super();
		this.makePalm();
		this.initBuffer();
	}

	makeLeaf () {
		this.mesh = [
			// Front
			this.from.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.to.z,
			this.from.x, this.to.y, this.to.z,

			this.to.x, this.to.y, this.to.z,
			this.from.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.to.z,

			// Right
			this.to.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			this.to.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			// Back
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.from.z,
			this.from.x, this.to.y, this.from.z,

			this.to.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.from.y, this.from.z,

			// Left
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			this.from.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			// Bottom
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.to.z,

			this.to.x, this.from.y, this.from.z,
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.to.z,

			// Top
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z,

			this.to.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z
		]

		for (let i = 0; Math.floor(i/6) < 6; i++) {
			this.colors = this.colors.concat(Object.values(this.sideColors)[Math.floor(i/6)]);
		}
	}
}