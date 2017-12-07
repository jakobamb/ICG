function initController() {
    //keyboard events
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case 'w':
                vec3.sub(eye,eye,target);
                mat4.lookAt(viewMatrix, eye, target, up);
                break;
            case 's':
                console.log("backward");
                break;
            case 'a':
                console.log("left");
                break;
            case 'd':
                console.log("right");
                break;
        }
    });
    gl.uniformMatrix4fv(viewMatrixLoc, false, viewMatrix);
}
