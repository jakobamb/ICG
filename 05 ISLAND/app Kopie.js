/*
Hallo Susanne, sorry für die hässlige Insel, wir hatten diese Woche nicht so viel Zeit.. :(
*/

// Environment variables
let gl,
	canvas;

// Scene variables
let objects = [];

// Shader variables
let program;

let pointLoc,
	colorLoc;

let modelMatrixLoc;

let viewMatrixLoc,
	viewMatrix;

let projectionMatrixLoc,
	projectionMatrix;

let eye;
let target;
let up;

function degToRad (deg) {
	return deg * Math.PI / 180;
}


/**
 * Initializes the program, models and shaders
 */
function init() {

	// 1. Get canvas and setup WebGL context
    canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl');

	// 2. Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(0.95,0.95,0.95,1.0);
	gl.enable(gl.DEPTH_TEST);

	// 3. Specify vertices

		// Wasser aufgespannt auf xz Ebene von -10 bis 10 und 10 tief in y Ebene
		objects.push(new Cube(from = {x: -10.0, y: 0.0, z: -10.0}, to = {x: 10.0, y: -10.0, z: 10.0},
			sideColors = {front: [0, 0, 1, 1], right: [0, 0, 1, 1], back: [0, 0, 1, 1],
			left: [0, 0, 1, 1], bottom: [0, 0, 1, 1], top: [0, 0, 1, 1]}));
	
		// Insel aufgespannt auf xz Ebene von -3 bis 3 und 0.7 tief in y Ebene
		objects.push(new Cube(from = {x: -3.0, y: 0.0, z: -3.0}, to = {x: 3.0, y: 0.7, z: 3.0},
			sideColors = {front: [1, 1, 0, 1], right: [1, 1, 0, 1], back: [1, 1, 0, 1],
			left: [1, 1, 0, 1], bottom: [1, 1, 0, 1], top: [1, 1, 0, 1]}));
	
		// Palmenstamm
		for (i = 0.6; i < 3.1; i += 0.6) {
		objects.push(new Palm(from = {x: -0.2, y: 0.0, z: -0.2}, to = {x: 0.2, y: i, z: 0.2},
			sideColors = {front: [0.5, 0.3, 0, 1], right: [0.5, 0.3, 0, 1], back: [0.5, 0.3, 0, 1],
			left: [0.5, 0.3, 0, 1], bottom: [0.5, 0.3, 0, 1], top: [0.5, 0.3, 0, 1]}));
		}
	
		// PalmenBlätter
		for (i = 0; i < 4; i++) {
			objects.push(new Palm(from = {x: -1 + i, y: 3.0, z: -0.2 + i }, to = {x: 1.0 *+i, y: 3.2, z: 0.2 + i},
				sideColors = {front: [0, 1, 0, 1], right: [0, 1, 0, 1], back: [0, 1, 0, 1]
			, left: [0, 1, 0, 1], bottom: [0, 1, 0, 1], top: [0, 1, 0, 1]},));
		}
	
	// 4. Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// 7 Save attribute location to address them
	pointLoc = gl.getAttribLocation(program, "vPosition");
	colorLoc = gl.getAttribLocation(program, "vColor");
	modelMatrixLoc = gl.getUniformLocation(program, "modelMatrix");

    // Set view matrix
	eye = vec3.fromValues(0, 2, 9.0);
	target = vec3.fromValues(eye[0], eye[1], eye[2] - 1);
	up = vec3.fromValues(0.0, 1.0, 0.0);

	viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix, eye, target, up);

	// 7 Save uniform location and save the view matrix into it
	viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");
	gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);

    // Set projection matrix
	projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix, Math.PI * 0.25, canvas.width / canvas.height, 0.5, 100);

	// 7 Save uniform location and save the projection matrix into it
	projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
	gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

	//initialize controller
	initController();

	// 8. Render
	gameLoop();
};

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call every render function
    objects.forEach(function(obj) {
		obj.render();
	});

	requestAnimationFrame(render);
}

init ();
