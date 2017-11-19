let gl;
// Declare arrays with global scope to make them accessible throughout the entire program

const MOUTH_ANGLE = 45;
const NR_OF_VERTICES = 12;
const RADIUS = 9; 

let positions = [];

function init() {
	//fill arrays with vertex data for pacman
	buildPacman(RADIUS,NR_OF_VERTICES,MOUTH_ANGLE);

	debugger;

	let colors = [];
	for (let i = 0; i < positions.length / 2; i++) {
		colors.push(1,0.9,0,1);
	}

	// 1. Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl');

	// 2. Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	// 4. Init shader program via additional function and bind it
	const program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	
    // 5. Create VBO
	const vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    // 6. Fill VBO with positions and colors
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions.concat(colors)), gl.STATIC_DRAW);

    // 7. Link data in VBO to shader variables
	const vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

	const vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
	// Compute offset of first color in VBO with NumberOfVertexPositions * NumberOfComponentsPerVertexPosition * NumberOfBytesPerComponent
	// = NumberOfVertices * 2 * 4 Bytes = positions.length * 4 Bytes
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, positions.length * 4); 

	// 8. Render
	render();
};

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Compute number of vertices as positions.length / 2 (since array 'positions' contains x and y value for every vertex)
	gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
}

function buildPacman(radius, n, mouthAngle) {
	//radius is r * 10 for more convenient input
	let r = radius / 10;
	//alpha is the angle of the triangles the body of pacman consists of
	let alpha = (360 - mouthAngle) / (n-1);

	//initial point
	positions = positions.concat([0,0,
					  giveXPosition(r,mouthAngle / 2), giveYPosition(r,mouthAngle / 2),
					  giveXPosition(r, alpha + mouthAngle / 2), giveYPosition(r, alpha + mouthAngle / 2)
	]);

	//build triangles
	for (let i = 1; i < n; i++) {
		console.log(i);
		positions = positions.concat([0, 0,
						giveXPosition(r, alpha * (i-1) + mouthAngle / 2),
						giveYPosition(r, alpha * (i-1) + mouthAngle / 2),
						giveXPosition(r, alpha * i + mouthAngle / 2),
						giveYPosition(r, alpha * i + mouthAngle / 2),
		]);
	}
	
	function giveXPosition(radius, angle) {
		return Math.cos(angle * (Math.PI/180)) * radius;
	}
	function giveYPosition(radius, angle) {
		return Math.sin(angle * (Math.PI/180)) * radius;
	}
}

init();
