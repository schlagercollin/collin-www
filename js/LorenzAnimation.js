var scene = new THREE.Scene();

var canvasDiv = document.getElementById("lorenzCanvasDiv");
var canvas = document.getElementById("lorenzCanvas");

canvas.height = 500;
canvas.width = canvasDiv.clientWidth;

var renderer = new THREE.WebGLRenderer({ canvas: canvas });

var camera = new THREE.PerspectiveCamera( 45, canvas.width /
 canvas.height, 0.1, 1000 );

camera.position.set( 0, 0, 100 );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 25 );
controls.maxDistance = 149;
controls.autoRotate = true;
controls.enableKeys = true;

var box_mat = new THREE.MeshBasicMaterial( {color: 0x101010 } );
box_mat.wireframe = true;
var box_geo = new THREE.SphereGeometry(150, 150, 150);
var box = new THREE.Mesh( box_geo, box_mat );

var MAX_POINTS = 10000;

class LorenzAttractor {
    constructor(rho, sigma, beta) {
        this.rho = rho;
        this.sigma = sigma;
        this.beta = beta; 

        this.material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        this.geometry = new THREE.BufferGeometry();
    }

    compile(){
        this.positions = new Float32Array( MAX_POINTS * 3);
        this.geometry.addAttribute( 'position',
            new THREE.BufferAttribute( this.positions, 3 ) );

        this.geometry.setDrawRange( 0, 2);

        this.line = new THREE.Line( this.geometry, this.material );
        
        this.update();
    }

    setStart( x, y, z ) {
        this.init_x = x;
        this.init_y = y;
        this.init_z = z; 
    }

    setColor( color ){
        this.material = new THREE.LineBasicMaterial( { color: color } );
    } 

    update() {
        var positions = this.line.geometry.attributes.position.array;
        var index = 0;                

        var [x, y, z] = [ this.init_x, this.init_y, this.init_z ];
        var [dx, dy, dz] = [ 0, 0, 0 ];
        var dt = 0.01;

        for ( var i = 0, l = MAX_POINTS; i < l; i ++ ){

            positions[ index ++ ] = x;
            positions[ index ++ ] = y;
            positions[ index ++ ] = z;

            x += (this.sigma * (y - x))*dt;
            y += (x * (this.rho - z) - y)*dt;
            z += (x * y - this.beta * z)*dt;
        }
    }
}

var obj_1 = new LorenzAttractor(28, 10, 8/3);
var obj_2 = new LorenzAttractor(28, 10, 8/3);
var obj_3 = new LorenzAttractor(28, 10, 8/3);
var obj_4 = new LorenzAttractor(28, 10, 8/3);

obj_1.setStart( 1, 1, 1);
obj_2.setStart( 10, 20, 30);
obj_3.setStart( 10, 10, 10);
obj_4.setStart( 30, 10, 20);

obj_1.setColor( 0xff0000 );
obj_2.setColor( 0x00ff00 );
obj_3.setColor( 0x0000ff );
obj_4.setColor( 0xffffff );

obj_1.compile();
obj_2.compile();
obj_3.compile();
obj_4.compile();

scene.add( obj_1.line );
scene.add( obj_2.line );
scene.add( obj_3.line );
// scene.add( obj_4.line );
scene.add( box );

var drawCount = 2;
var animate = function() {

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 20 );

    drawCount = ( drawCount + 5 ) % MAX_POINTS;

    obj_1.line.geometry.setDrawRange( 0, drawCount );
    obj_2.line.geometry.setDrawRange( 0, drawCount );
    obj_3.line.geometry.setDrawRange( 0, drawCount );
    obj_4.line.geometry.setDrawRange( 0, drawCount );

    controls.update();
    renderer.render( scene, camera );
}

animate();
