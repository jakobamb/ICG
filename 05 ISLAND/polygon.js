class Polygon {
	constructor (from = {x: -0.5, y: -0.5, z: -0.5}, to = {x: 0.5, y: 0.5, z: 0.5},
		 sideColors = {front: [0, 0, 1, 1], right: [0, 1, 0, 1], back: [1, 0, 0, 1]
			, left: [1, 1, 0, 1], bottom: [1, 0, 1, 1], top: [0, 1, 1, 1]},) {
		this.from = from;
		this.to = to;
		this.sideColors = sideColors;
		this.mesh = [];
		this.colors = [];
		this.normals = [];
		this.orientation = {x: 0, y: 0, z: 0};
		this.position = {x: 0, y: 0, z: 0};
		this.verticesVBO = gl.createBuffer();
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

setModelMatrixLeaf (position, orientation) {
	// Convert the orientation to RAD
	orientation = {x: degToRad(orientation.x), y: degToRad(orientation.y), z: degToRad(orientation.z)};

	// Set the transformation matrix
	this.modelMatrix = mat4.create();
	mat4.translate(this.modelMatrix, this.modelMatrix, [position.y, position.x, position.z]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.x, [0, 0, 1]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.y, [0, 1, 0]);
	mat4.rotate(this.modelMatrix, this.modelMatrix, orientation.z, [1, 0, 0]);
}


	/**
	 * Sets the buffer data
	 */
	initBuffer () {
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(
			this.mesh.concat(this.colors.concat(this.normals))), gl.STATIC_DRAW);
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
		gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0
			, (this.mesh.length*4 + this.colors.length)); //?
		gl.enableVertexAttribArray(pointLoc);
		gl.enableVertexAttribArray(colorLoc);
		gl.enableVertexAttribArray(normalLoc);

		// Set uniforms
		this.updateBuffer();

		// Draw the object
		gl.drawArrays(gl.TRIANGLES, 0, this.mesh.length/3);
	}


	//nimmt Mesh als input und gibt für jeden der Polygone die einzelenen normalen für alle 3 Koordianten in nem Array zurück
	getNormals (meshArray) {

		var vertexVectors =[];
		var normalVectors = [];
		var normalsArray = [];

		// erstellt Vektor für je 3 Meshkordinaten
		for (let i = 0; i < meshArray.length; i += 3) {
			var vector = vec3.fromValues(meshArray[i],meshArray[i+1], meshArray[i+2]);
			vertexVectors.push(vector);
						
		}


		//findet NormalenVektor für die Vektoren jedes einzelnen Vertecies
	 for (let j = 0; j < vertexVectors.length; j+= 3) {

		 let vector1 = vec3.create();
		 vec3.subtract(vector1, vertexVectors[j], vertexVectors[j+1]);

		 let vector2 = vec3.create();
		 vec3.subtract(vector2, vertexVectors[j], vertexVectors[j+2]);
		 
		 let normal = vec3.create();
		 vec3.cross(normal ,vector1, vector2);

		 normalVectors.push(normal);
	 }


	 // gibt einzelne x y z Vektoren nomralisiert im normalsArray zurück
	 for (let j = 0; j < normalVectors.length; j++) {

		vec3.normalize(normalVectors[j], normalVectors[j]);

		normalsArray.push(normalVectors[j][0]);

		normalsArray.push(normalVectors[j][1]);

		normalsArray.push(normalVectors[j][2]);


	 }

	 this.normals = normalsArray;
	 }

	}

	/*

 vec3.add(normalVectors[indices[j]], normalVectors[indices[j]],normal);
		 vec3.add(normalVectors[indices[j+1]], normalVectors[indices[j+1]],normal);
		 vec3.add(normalVectors[indices[j+2]], normalVectors[indices[j+1]],normal);
	*/