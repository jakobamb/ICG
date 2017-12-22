class Polygon {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5},
		 sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1]
			, left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]},) {
		this.from = from;
		this.to = to;
		this.sideColors = sideColors;
		this.mesh = [];
		this.colors = [];
		this.orientation = {x: 0, y: 0, z: 0};
		this.position = {x: 0, y: 0, z: 0};
		this.verticesVBO = gl.createBuffer();
		this.setModelMatrix(this.position, this.orientation);


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
	this.modelMatrix = mat4.create();
	mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, position.z]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.x, [1, 0, 0]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.y, [0, 1, 0]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.z, [0, 0, 1]);
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
		gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);	
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