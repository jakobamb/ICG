class Palm extends Polygon {


    constructor(fx,fy,fz,tx,ty,tz
                ,scfront, scright, scback, scleft, scbottom, sctop) {

        super(fx,fy,fz,tx,ty,tz
            ,scfront, scright, scback, scleft, scbottom, sctop);
		this.makePalm(0.4);
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

    constructor (fx,fy,fz,tx,ty,tz
    ,scfront, scright, scback, scleft, scbottom, sctop) {
		super(fx,fy,fz,tx,ty,tz
            ,scfront, scright, scback, scleft, scbottom, sctop);
		this.makeLeaf();
		this.initBuffer();
	}

	makeLeaf () {
		this.mesh = [
			// Front
			this.from.x + 2 , this.from.y, this.to.z,
			this.to.x + 2.5 + 2, this.from.y -0.4, this.to.z, //um 2.5 nach außen& 0.4 nach unten
			this.from.x + 2, this.to.y-0.6, this.to.z, // Höhe 0.6

			this.to.x, this.to.y, this.to.z,
			this.from.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.to.z,

			// Right
			this.to.x - 2, this.to.y, this.to.z,
			this.to.x - 2, this.from.y, this.to.z,
			this.to.x , this.from.y, this.from.z,

			this.to.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z,
			this.to.x, this.from.y, this.from.z,

			// Back
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.from.z,
			this.from.x, this.to.y, this.from.z,

			this.to.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.from.y, this.from.z,

			// Left
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			this.from.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.from.y, this.from.z,

			// Bottom
			this.from.x, this.from.y, this.to.z,
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.to.z,

			this.to.x, this.from.y, this.from.z,
			this.from.x, this.from.y, this.from.z,
			this.to.x, this.from.y, this.to.z,

			// Top
			this.from.x, this.to.y, this.to.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z,

			this.to.x, this.to.y, this.from.z,
			this.from.x, this.to.y, this.from.z,
			this.to.x, this.to.y, this.to.z
		]

		for (let i = 0; Math.floor(i/6) < 6; i++) {
			this.colors = this.colors.concat(Object.values(this.sideColors)[Math.floor(i/6)]);
		}
	}
}