class ModularDesign {
    constructor(canvas){

        this.canvas = canvas;

        this.initRender();

        this.dotNumber = 200;
        this.radius = 50;

        this.initCirclePoints();

        this.state = 0;
        this.increment = 0.025;

        this.material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    }

    initRender() {
        
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas });
        
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight,
            0.1, 1000);

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set( 0, 0, 0 );

        this.camera.position.set( 0, 0, 150 );

    }
    
    initCirclePoints() {
        this.points = []
        for (var i = 0; i < this.dotNumber; i++) {
            this.points.push([this.radius*( Math.cos(2 *Math.PI*( i / this.dotNumber ) ) ),
                              this.radius*( Math.sin( 2*Math.PI*( i / this.dotNumber ) ) )]); 
        }
    }

    update() {    

        this.scene.remove.apply(this.scene, this.scene.children);
 
        for (var i = 0; i < this.dotNumber; i++) {

            var mod_index = Math.floor( (i * this.state) % this.dotNumber );

            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3(this.points[mod_index][0], this.points[mod_index][1], 0),
                new THREE.Vector3( this.points[i][0], this.points[i][1], 0 ),
            );

            var line = new THREE.Line( geometry, this.material );
            this.scene.add( line );

        }

        this.state = this.state + this.increment;
    }

    animate() {

        setTimeout( function() {
            requestAnimationFrame( design.animate );
        }, 1000 / 20 );

        design.update();
        design.controls.update();
        design.renderer.render( design.scene, design.camera );
    }

}

var design;

$( document ).ready(function() {

    var mod_canvasDiv = document.getElementById("modularCanvasDiv");
    var mod_canvas    = document.getElementById("modularCanvas");

    mod_canvas.height = mod_canvasDiv.clientHeight;
    mod_canvas.width  = mod_canvasDiv.clientWidth;

    design = new ModularDesign(mod_canvas);
    design.animate();

});


