function initController() {

    //keyboard events
    let direction;
    document.addEventListener("keydown", (e) => {
        direction = vec3.sub(vec3.create(), target, eye);
        switch(e.key) {
            case 'w':
                console.log("forward");
                mat4.lookAt(viewMatrix,
                    vec3.add(eye, eye , direction),
                    vec3.add(target, target , direction),
                    up);
                break;
            case 's':
                console.log("backward");
                vec3.rotateY(direction, direction, vec3.fromValues(0.0,0.0,0.0),Math.PI);
                mat4.lookAt(viewMatrix,
                    vec3.add(eye, eye , direction),
                    vec3.add(target, target , direction),
                    up);
                break;
            case 'a':
                console.log("left");
                vec3.rotateY(direction, direction, vec3.fromValues(0.0,0.0,0.0),Math.PI * 0.5);
                mat4.lookAt(viewMatrix,
                    vec3.add(eye, eye , direction),
                    vec3.add(target, target , direction),
                    up);                
                break;
            case 'd':
                console.log("right");
                vec3.rotateY(direction, direction, vec3.fromValues(0.0,0.0,0.0),Math.PI * 1.5);
                mat4.lookAt(viewMatrix,
                    vec3.add(eye, eye , direction),
                    vec3.add(target, target , direction),
                    up);
                break;
        }
        gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
    });

    //Mouselook
    let lastMousePos = 0;
    document.addEventListener("mousemove", (e) => {
        if (e.clientX > lastMousePos) {
            mat4.lookAt(viewMatrix, eye, vec3.rotateY(target,target, eye,-0.02),up);
        } else {
           mat4.lookAt(viewMatrix, eye, vec3.rotateY(target,target, eye,0.02),up);
        }
        lastMousePos = e.clientX;
        gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
    });
}
