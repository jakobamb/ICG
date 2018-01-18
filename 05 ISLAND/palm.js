class Palm extends Polygon {


    constructor(fx,fy,fz,tx,ty,tz
                ,scfront, scright, scback, scleft, scbottom, sctop) {

        super(fx,fy,fz,tx,ty,tz
			,scfront, scright, scback, scleft, scbottom, sctop);
			this.setModelMatrix(this.position, this.orientation);
		this.makePalm(0.4);
		this.getNormals(this.mesh);
		this.initBuffer();
	}

	makePalm (faktor) {
		this.mesh = [
			// Front
			this.from.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.to.z,
			this.from.x -faktor, this.to.y, this.to.z+ faktor,

			this.to.x +faktor, this.to.y, this.to.z + faktor,
			this.from.x -faktor , this.to.y, this.to.z + faktor,
			this.to.x  , this.from.y, this.to.z,

			// Right
			this.to.x+ faktor, this.to.y, this.to.z +faktor,
			this.to.x, this.from.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			this.to.x +faktor, this.to.y, this.from.z -faktor,
			this.to.x +faktor, this.to.y, this.to.z +faktor,
			this.to.x, this.from.y, this.from.z,

			// Back
			this.from.x , this.from.y, this.from.z,
			this.to.x , this.from.y, this.from.z,
			this.from.x -faktor, this.to.y, this.from.z -faktor,

			this.to.x +faktor, this.to.y, this.from.z -faktor,
			this.from.x -faktor , this.to.y, this.from.z -faktor,
			this.to.x, this.from.y, this.from.z,

			// Left
			this.from.x -faktor, this.to.y, this.to.z +faktor,
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			this.from.x -faktor, this.to.y, this.from.z -faktor,
			this.from.x -faktor, this.to.y, this.to.z +faktor ,
			this.from.x, this.from.y, this.from.z,

			// Bottom
			this.from.x, this.from.y , this.to.z ,
			this.from.x , this.from.y, this.from.z,
			this.to.x , this.from.y, this.to.z,

			this.to.x, this.from.y, this.from.z,
			this.from.x , this.from.y , this.from.z ,
			this.to.x , this.from.y, this.to.z ,

			// Top
			this.from.x -faktor, this.to.y, this.to.z +faktor,
			this.from.x -faktor , this.to.y, this.from.z -faktor,
			this.to.x +faktor, this.to.y, this.to.z + faktor,

			this.to.x +faktor , this.to.y, this.from.z -faktor,
			this.from.x -faktor , this.to.y, this.from.z -faktor,
			this.to.x  +faktor, this.to.y, this.to.z +faktor
		]

		for (let i = 0; Math.floor(i/6) < 6; i++) {
			this.colors = this.colors.concat(Object.values(this.sideColors)[Math.floor(i/6)]);
		}
	}
}

class Leaf extends Polygon {

    constructor (rotation, fx,fy,fz,tx,ty,tz
    ,scfront, scright, scback, scleft, scbottom, sctop) {
		super(fx,fy,fz,tx,ty,tz
			,scfront, scright, scback, scleft, scbottom, sctop);
		this.orientation = {x: 0, y: rotation, z: 0};
		this.setModelMatrixLeaf(this.position, this.orientation);
		this.makeLeaf();
		this.getNormals(this.mesh);
		this.initBuffer();
	}

	makeLeaf () {
		this.mesh = [

			// Front
			this.from.x , this.from.y, this.to.z,
			this.to.x + 2.5, this.from.y -0.4, this.to.z +0.5, //um 2.5 nach außen& 0.4 nach unten& 0.5mitte
			this.from.x, this.to.y-0.6, this.to.z, // Höhe 0.6

			this.to.x*0, this.to.y -2 *0, this.to.z*0,
			this.from.x*0, this.to.y -2 *0, this.to.z*0,
			this.to.x *0, this.from.y -2 *0, this.to.z*0,

			// Right
			this.to.x*0, this.to.y*0, this.to.z*0,
			this.to.x *0, this.from.y*0, this.to.z*0,
			this.to.x *0, this.from.y*0, this.from.z*0,

			this.to.x*0, this.to.y*0, this.from.z*0,
			this.to.x*0, this.to.y*0, this.to.z*0,
			this.to.x*0, this.from.y*0, this.from.z*0,

			// Back
			this.from.x, this.from.y, this.from.z,
			this.to.x +2.5, this.from.y -0.4, this.from.z- 0.5,
			this.from.x, this.to.y -0.6, this.from.z,

			this.to.x*0, this.to.y*0, this.from.z*0 ,
			this.from.x*0, this.to.y*0, this.from.z*0,
			this.to.x*0, this.from.y*0, this.from.z*0,

			// Left
			this.from.x, this.to.y-0.6, this.to.z,
			this.from.x, this.from.y , this.to.z,
			this.from.x, this.from.y, this.from.z,

			this.from.x, this.to.y -0.6, this.from.z,
			this.from.x, this.to.y-0.6 , this.to.z,
			this.from.x, this.from.y, this.from.z,

			// Bottom
			this.from.x, this.from.y , this.to.z,
			this.from.x, this.from.y, this.from.z,
			this.to.x+2.5, this.from.y - 0.4, this.to.z +0.5,

			this.to.x *0, this.from.y*0, this.from.z*0,
			this.from.x*0, this.from.y*0, this.from.z*0,
			this.to.x*0, this.from.y*0, this.to.z*0,

			// Top
			this.from.x, this.to.y-0.6, this.to.z,
			this.from.x, this.to.y -0.6 , this.from.z,
			this.to.x+2.5, this.to.y -1 -0.6 , this.to.z +0.5,

			this.to.x*0, this.to.y*0, this.from.z*0,
			this.from.x*0, this.to.y*0, this.from.z*0,
			this.to.x*0, this.to.y*0, this.to.z*0
		]

		for (let i = 0; Math.floor(i/6) < 6; i++) {
			this.colors = this.colors.concat(Object.values(this.sideColors)[Math.floor(i/6)]);
		}
	}
}