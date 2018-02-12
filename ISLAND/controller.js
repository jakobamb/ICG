/**
 * Handle Key and Mouse Events here
 */

const speed = 0.03;
const sensitivity = 0.015;

function initController() {
    document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	document.addEventListener("mousemove", changeView);

	canvas.onmousedown = function() {
        canvas.requestPointerLock();
	}
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
	vec3.rotateY(target, target, eye, -e.movementX * sensitivity);
	mat4.lookAt(viewMatrix, eye, target, up);
}