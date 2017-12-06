function initController() {
    //keyboard events
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case 'w':
                console.log("forward");
                viewMatrix = mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(2,0,0));
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
}