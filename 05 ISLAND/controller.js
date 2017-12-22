const speed = 0.03;

let keyPressed = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false
};


function initController() {

    document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	document.addEventListener("mousemove", changeView);
	canvas.onmousedown = function() {
    
    canvas.requestPointerLock();
}
}

function update()
{
	let look = [(target[0] - eye[0]) * speed,
				(target[1] - eye[1]) * speed,
				(target[2] - eye[2]) * speed];
	
	/* 
	 *	Using gl-matrix:
		let look = vec3.create();
		vec3.sub(look, target, eye);
		vec3.scale(look, look, speed);
	*/

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
}

function keydown(e) 
{
	keyPressed[e.code] = true;
}

function keyup(e) 
{
	keyPressed[e.code] = false;
}

function changeView(e)
{
	vec3.rotateY(target, target, eye, -e.movementX * speed);
	mat4.lookAt(viewMatrix, eye, target, up);
}