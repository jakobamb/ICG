class Cube {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5}, ka = {r: 0.3, g: 0.3, b: 0.3, a: 1.0}, kd = {r: 0.45, g: 0.23, b: 0.8, a: 1.0}, ks = {r: 0.9, g: 0.67, b: 0.2, a: 1.0}) {
		this.from = from;
		this.to = to;
		this.mesh;
		this.normals;
		this.textureCoordinates;
		this.ka = ka;
		this.kd = kd;
		this.ks = ks;
		this.specularExponent = 20.0;
		this.orientation = {x: 0, y: 0, z: 0};
		this.position = {x: 0, y: 0, z: 0};
		this.verticesVBO = gl.createBuffer();
		this.modelMatrix;
		this.normalMatrix;


		this.SetTransform(this.position, this.orientation);
		this.MakeModel();
		this.InitBuffer();
	}

	/**
	 * Makes the model, namely the mesh and the colors arrays
	 */
	MakeModel () {
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

		this.normals = [
			// Front
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			// Right
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,

			// Back
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,

			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,

			// Left
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,

			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,

			// Bottom
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,

			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,

			// Top
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,

			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0
		];

		this.textureCoordinates = [
			// Front
			1.0, 0.0,
			0.0, 0.0,
			1.0, 1.0,

			0.0, 1.0,
			1.0, 1.0,
			0.0, 0.0,

			// Right
			1.0, 1.0,
			1.0, 0.0,
			0.0, 0.0,

			0.0, 1.0,
			1.0, 1.0,
			0.0, 0.0,

			// Back
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,

			1.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,

			// Left
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,

			1.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,

			// Bottom
			0.0, 1.0,
			0.0, 0.0,
			1.0, 1.0,

			1.0, 0.0,
			0.0, 0.0,
			1.0, 1.0,

			// Top
			0.0, 1.0,
			0.0, 0.0,
			1.0, 1.0,

			1.0, 0.0,
			0.0, 0.0,
			1.0, 1.0
		];
	}

	/**
	 * Sets the model matrix
	 * @param {Object} position x,y,z
	 * @param {Object} orientation x,y,z - angles in degree
	 */
	SetTransform (position = this.position, orientation = this.orientation) {
		
		this.position = position;
		this.orientation = orientation;
		
		// Convert the orientation to RAD
		orientation = {x: degToRad(orientation.x), y: degToRad(orientation.y), z: degToRad(orientation.z)};
	
		// Set the transformation matrix
		this.modelMatrix = mat4.create();
		mat4.translate(this.modelMatrix, this.modelMatrix, [position.x, position.y, position.z]);
		mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.x, [1, 0, 0]);
		mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.y, [0, 1, 0]);
		mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.z, [0, 0, 1]);

		// Set the normal transformation matrix
		let modelViewMatrix = mat4.create();
		mat4.multiply(modelViewMatrix, viewMatrix, this.modelMatrix);
		this.normalMatrix = mat4.create();
		mat4.transpose(this.normalMatrix, modelViewMatrix);
		mat4.invert(this.normalMatrix, this.normalMatrix);

	}

	/**
	 * Sets the buffer data
	 */
	InitBuffer () {
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.concat(this.normals.concat(this.textureCoordinates))), gl.STATIC_DRAW);
	}

	/**
	 * Updates the model matrix to the buffer
	 */
	UpdateBuffer () {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);

		this.SetTransform();

		// Push the matrix to the buffer
		gl.uniformMatrix4fv(modelMatrixLoc, false, new Float32Array(this.modelMatrix));		
		gl.uniformMatrix4fv(normalMatrixLoc, false, new Float32Array(this.normalMatrix));

		gl.uniform4fv(kaLoc, Object.values(this.ka));
		gl.uniform4fv(kdLoc, Object.values(this.kd));
		gl.uniform4fv(ksLoc, Object.values(this.ks));
		gl.uniform1f(specularExponentLoc, this.specularExponent);
	}

	Render () {
		
		// Bind the program and the vertex buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);

		// Set attribute pointers and enable them
		gl.vertexAttribPointer(pointLoc, 3, gl.FLOAT, false, 0, 0);
		gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, this.mesh.length*4);
		gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, (this.mesh.length + this.normals.length)*4);
		gl.enableVertexAttribArray(pointLoc);
		gl.enableVertexAttribArray(normalLoc);
		gl.enableVertexAttribArray(texCoordLoc);

		// Set uniforms
		this.UpdateBuffer();

		// Draw the object
		gl.drawArrays(gl.TRIANGLES, 0, this.mesh.length/3);
	}
}