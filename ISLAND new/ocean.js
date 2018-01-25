class Ocean {
    constructor(from = {x: -5, y: -0.8, z: -5}, to = {x: 5, z:5}, tesselationFac = 10) {
        this.planeArray = [];

        let xStep = Math.abs(to.x - from.x) / tesselationFac;
        let zStep = Math.abs(to.z - from.z) / tesselationFac;

        for (let x = from.x; x < to.x; x += xStep) {
            for (let z = from.z; z < to.z; z += zStep) {
                plane = new Plane({x: x, y: from.y, z: z}, {x: x+xStep, z: z+zStep}, {r: 0.3, g: 0.5, b: 0.9, a: 1.0}, {r: 0.45, g: 0.5, b: 1.0, a: 1.0}, {r: 0.9, g: 0.67, b: 0.2, a: 1.0});
                plane.isWater = true;
                this.planeArray.push(plane);
            }
        }
    }
}