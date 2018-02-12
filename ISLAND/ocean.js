class Ocean {
    constructor(from = {x: -5, y: -0.8, z: -5}, to = {x: 5, z:5}, tesselationFac = 15) {
        //array that holds all the plane objects that build the ocean surface
        this.objArray = [];

        //calculate the size of each plane
        let xStep = Math.abs(to.x - from.x) / tesselationFac;
        let zStep = Math.abs(to.z - from.z) / tesselationFac;

        //build the planes and push them into the objArray
        for (let x = from.x; x < to.x; x += xStep) {
            for (let z = from.z; z < to.z; z += zStep) {
                let plane = new Plane({x: x, y: from.y, z: z}, {x: x+xStep, z: z+zStep}, {r: 0.3, g: 0.5, b: 0.9, a: 1.0}, {r: 0.45, g: 0.5, b: 1.0, a: 1.0}, {r: 0.9, g: 0.67, b: 0.2, a: 1.0});
                plane.isWater = true;
                this.objArray.push(plane);
            }
        }
    }
}