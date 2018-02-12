// Environment variables
let gl,
	canvas;

// Scene variables
let objects = [];

//time variables
let then = 0;
let deltaTime = 0.016699230100564844;
let animationTime = 0;

// Shader variables
let program;

let pointLoc,
	normalLoc,
	texCoordLoc;

let modelMatrixLoc,
	normalMatrixLoc;

let animationTimeLoc;

let lightPositionLoc,
	IaLoc,
	IdLoc,
	IsLoc,
	kaLoc,
	kdLoc,
	ksLoc,
	specularExponentLoc;

let viewMatrixLoc,
	viewMatrix;

let projectionMatrixLoc,
	projectionMatrix;

let eye,
	target,
	up;

let keyPressed = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false
};

let sandTexture,
	sandNormalTexture;
let diffuseMapLoc,
	normalMapLoc;

function degToRad (deg) {
	return deg * Math.PI / 180;
}

function initTextures() {
    sandTexture = gl.createTexture();
    let sandImage = new Image();
    sandImage.onload = () => handleTextureLoaded(sandImage, sandTexture);
    sandImage.src = "sand_diffuse.jpg";

	// TODO: Erstelle analog zu diffuser Textur eine Normal Map für den Sand.
	sandNormalTexture = gl.createTexture();
	let sandNormalImage = new Image();
	sandNormalImage.onload = () => handleTextureLoaded(sandNormalImage, sandNormalTexture);
	sandNormalImage.src = "sand_normal.jpg"
}

function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
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

	// 4. Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// 7 Save attribute location to address them
	pointLoc = gl.getAttribLocation(program, "vPosition");
	normalLoc = gl.getAttribLocation(program, "vNormal");
	texCoordLoc = gl.getAttribLocation(program, "vTexCoord");
	modelMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
	normalMatrixLoc = gl.getUniformLocation(program, "normalMatrix");

	viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");
	projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

	animationTimeLoc = gl.getUniformLocation(program, "animationTime");

	lightPositionLoc = gl.getUniformLocation(program, "lightPosition");
	IaLoc = gl.getUniformLocation(program, "Ia");
	IdLoc = gl.getUniformLocation(program, "Id");
	IsLoc = gl.getUniformLocation(program, "Is");
	kaLoc = gl.getUniformLocation(program, "ka");
	kdLoc = gl.getUniformLocation(program, "kd");
	ksLoc = gl.getUniformLocation(program, "ks");
	specularExponentLoc = gl.getUniformLocation(program, "specExp");

	isWaterLoc = gl.getUniformLocation(program, "isWater");

	diffuseMapLoc = gl.getUniformLocation(program, "diffuseMap");
	normalMapLoc = gl.getUniformLocation(program, "normalMap");

    // Set view matrix
	eye = vec3.fromValues(0.0, 0.0, 1.0);
	target = vec3.fromValues(0.0, 0.0, 0.0);
	up = vec3.fromValues(0.0, 1.0, 0.0);

	viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix, eye, target, up);

    // Set projection matrix
	projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix, Math.PI * 0.25, canvas.width / canvas.height, 0.5, 100);

	// Initialize textures
	initTextures();	

	// 7 Save uniform location and save the projection matrix into it
	gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

	gl.uniform3fv(lightPositionLoc, [1.0, 1.0, 1.0]);
	gl.uniform4fv(IaLoc, [0.7, 0.7, 0.7, 1.0]);
	gl.uniform4fv(IdLoc, [0.5, 0.5, 0.5, 1.0]);
	gl.uniform4fv(IsLoc, [0.7, 0.7, 0.7, 1.0]);
	
	//initialize Controller Inputs
	initController();

	// 3. Specify vertices
	//island terrain
	let ground = new Cube({x: -2, y: -1, z: -2}, {x: 2, y: -0.5, z: 2}, {r: 0.5, g: 0.4, b: 0.4, a: 1.0}, {r: 0.5, g: 0.0, b: 0.0, a: 1.0}, {r: 1.0, g: 1.0, b: 1.0, a: 1.0});
	objects.push(ground);
	
	//ocean
	let ocean = new Ocean();
	ocean.objArray.forEach((plane) => {
		objects.push(plane);
	});

	//palm
	makePalm(objects);

	// 8. Render
	gameLoop();
};

function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Connect diffuse map to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, sandTexture);
	gl.uniform1i(diffuseMapLoc, 0);

	// Verknüpfe Normal Map analog zu diffuser Map mit Shader.
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, sandNormalTexture);
	gl.uniform1i(normalMapLoc, 1);

	// Call every render function
    objects.forEach(function(object) {
		object.Render();
	});
}

function update()
{
	let look = [(target[0] - eye[0]) * speed,
				(target[1] - eye[1]) * speed,
				(target[2] - eye[2]) * speed];
	
	if(keyPressed.KeyW) {
		eye[0] += look[0];
		eye[2] += look[2];
		target[0] += look[0];
		target[2] += look[2];
	}
	if(keyPressed.KeyS) {
		eye[0] -= look[0];
		eye[2] -= look[2];
		target[0] -= look[0];
		target[2] -= look[2];
	}
	if(keyPressed.KeyA) {
		eye[0] += look[2];
		eye[2] -= look[0];
		target[0] += look[2];
		target[2] -= look[0];
	}
	if(keyPressed.KeyD) {
		eye[0] -= look[2];
		eye[2] += look[0];
		target[0] -= look[2];
		target[2] += look[0];
	}
	mat4.lookAt(viewMatrix, eye, target, up);

	// Set view matrix
	gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);

	//calculate animationTimes
	animationTime += deltaTime * 1.3;
	gl.uniform1f(animationTimeLoc, animationTime);
}

function gameLoop(now) 
{
	//check if now is defined (seems to be only every second frame??)
	if (now) {
		//convert time from milliseconds -> sec
		now *= 0.001;
		deltaTime = now - then;
		//remember time for next frame
		then = now;
	}

	update();
	render();
	requestAnimationFrame(gameLoop);
}

init();