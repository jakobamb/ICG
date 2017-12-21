class Polygon {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5},
		 sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]},) {
		this.from = from;
		this.to = to;
		this.sideColors = sideColors;
		this.mesh = [];
		this.colors = [];
		this.orientation = {x: 0, y: 0, z: 0};
		this.position = {x: 0, y: 0, z: 0};
		this.verticesVBO = gl.createBuffer();
		this.modelMatrix = this.setModelMatrix(this.position, this.orientation);

		this.initBuffer();
	}

	/**
	 * Sets the model matrix
	 * @param {Object} position x,y,z
	 * @param {Object} orientation x,y,z - angles in degree
	 */
	setModelMatrix (position, orientation) {
		
		// Convert the orientation to RAD
		orientation = {x: degToRad(orientation.x), y: degToRad(orientation.y), z: degToRad(orientation.z)};
	
		// Set the transformation matrix
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			position.x, position.y, position.z, 1
		];
	}

	/**
	 * Sets the buffer data
	 */
	initBuffer () {
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.concat(this.colors)), gl.STATIC_DRAW);
	}

	/**
	 * Updates the model matrix to the buffer
	 */
	updateBuffer () {
		// Push the matrix to the buffer
		gl.uniformMatrix4fv(modelMatrixLoc, false, new Float32Array(this.modelMatrix));		
	}

	render () {
		
		// Bind the program and the vertex buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);

		// Set attribute pointers and enable them
		gl.vertexAttribPointer(pointLoc, 3, gl.FLOAT, false, 0, 0);
		gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, this.mesh.length*4);
		gl.enableVertexAttribArray(pointLoc);
		gl.enableVertexAttribArray(colorLoc);

		// Set uniforms
		this.updateBuffer();

		// Draw the object
		gl.drawArrays(gl.TRIANGLES, 0, this.mesh.length/3);
	}
}

class Cube extends Polygon {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
		sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]}) {
		
		super(from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
			sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]});
		this.makeCube();	
	}

	makeCube () {
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

class Palm extends Polygon {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
		sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]}) {
		
		super(from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
			sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]});
		this.makePalm();	
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
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
		sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]}) {
		
		super(from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, 
			sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1], left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]});
		this.makeLeaf();	
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