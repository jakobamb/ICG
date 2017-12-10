let addvec1 = vec3.fromValues(-5/9,0.0,-1.0);
let addvec2 = vec3.fromValues(5/9,0.0,1.0);
let addvec3 = vec3.fromValues(-1.0,0.0,5/9);
let addvec4 = vec3.fromValues(1.0,0.0,-5/9);

function initController() {
    //keyboard events
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case 'w':
                mat4.lookAt(viewMatrix, vec3.add(eye, eye, addvec1), vec3.add(target, target, addvec1), up);
                console.log("forward");
                break;
            case 's':
                mat4.lookAt(viewMatrix, vec3.add(eye, eye, addvec2), vec3.add(target, target, addvec2), up);
                console.log("backward");
                break;
            case 'a':
                mat4.lookAt(viewMatrix, vec3.add(eye, eye, addvec3), vec3.add(target, target, addvec3), up);
                console.log("left");
                break;
            case 'd':
                mat4.lookAt(viewMatrix, vec3.add(eye, eye, addvec4), vec3.add(target, target, addvec4), up);
                console.log("right");
                break;
        }
        gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
    });
    
}
