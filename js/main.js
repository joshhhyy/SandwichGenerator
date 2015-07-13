var app = app || {};

THREE.ImageUtils.crossOrigin = '';

app.init = function() {
  console.log("App Initialized.")

  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera = new THREE.PerspectiveCamera(45, app.width / app.height, 1, 1000 );
  // THREE.PerspectiveCamera(FIELD OF VIEW, RATIO, NEAR, FAR)
  // Near and Far specify the range which things get rendered. (in 'units')

  app.camera.position.z = 200;

  app.scene = new THREE.Scene();
  app.scene.add(app.camera);

  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize(app.width, app.height);
  app.renderer.setClearColor(0xE3F2FD, 1);

  app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

  document.body.appendChild(app.renderer.domElement); // Throw what the renderer is looking at on the page
  app.addBox();
  // app.addSphere();
  app.addTriangle();
  app.addCylinder();
  app.animate();
  // app.renderer.render(SCENE, CAMERA)
  console.log(app.renderer)

}

app.addBox = function() {
  var shape = new THREE.BoxGeometry(50, 50, 2)
  // THREE.BoxGeometry(WIDTH, HEIGHT, BREADTH)

  var material = new THREE.MeshBasicMaterial({
    // color: 0x1A237E,
    map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
  });

  app.cube = new THREE.Mesh(shape, material)

  app.scene.add(app.cube);
}

app.addSphere = function() {
  var shape = new THREE.SphereGeometry(50, 16, 16);
  // THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS)

  var material = new THREE.MeshBasicMaterial({
    color: 0xEC407A,
    wireframe: true,
    wireframeLinewidth: 4,
    map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
  });

  app.sphere = new THREE.Mesh(shape, material)

  app.scene.add(app.sphere)
}



app.addTriangle = function() {
  PrismGeometry = function ( vertices, height ) {

    var Shape = new THREE.Shape();

    ( function f( ctx ) {

        ctx.moveTo( vertices[0].x, vertices[0].y );
        for (var i=1; i < vertices.length; i++) {
            ctx.lineTo( vertices[i].x, vertices[i].y );
        }
        ctx.lineTo( vertices[0].x, vertices[0].y );

    } )( Shape );

    var settings = { };
    settings.amount = height;
    settings.bevelEnabled = false;
    THREE.ExtrudeGeometry.call( this, Shape, settings );

  };

  PrismGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );

  var A = new THREE.Vector2( 0, 0 );
  var B = new THREE.Vector2( 30, 10 );
  var C = new THREE.Vector2( 20, 50 );

  var height = 12;
  var geometry = new PrismGeometry( [ A, B, C ], height );

  var material = new THREE.MeshBasicMaterial({
    wireframe: true,
    map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg'),
  });

  var prism1 = new THREE.Mesh( geometry, material );
  prism1.rotation.x = -Math.PI  /  2;

  app.scene.add( prism1 );
}




app.addCylinder = function () {
  var cylinderShape = new THREE.CylinderGeometry( 5, 5, 0.2, 32);

  var cylinderMaterial = new THREE.MeshBasicMaterial( {
    // wireframe: true,
    map: THREE.ImageUtils.loadTexture('images/onion.jpg'),
  });

app.cylinder = new THREE.Mesh (cylinderShape, cylinderMaterial );
app.scene.add( app.cylinder );
}


app.animate = function() {
  requestAnimationFrame(app.animate);

  app.cube.rotation.x += 0.01;
  app.cube.rotation.y += 0.01;
  app.cube.rotation.z += 0.01;

  // app.sphere.rotation.x += 0.01;
  // app.sphere.rotation.y += 0.05;
  // app.sphere.rotation.z += 0.05;

  app.renderer.render(app.scene, app.camera);
}


window.onload = app.init;

window.addEventListener('mousemove', function(event) {
  // console.log(event);
  app.cube.position.x = event.clientX - (app.width / 2);
  app.cube.position.y = ( event.clientY - (app.height / 2) ) * -1;

});

window.addEventListener('resize', function() {
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);
})











/* NOTES

app.init needs:
  - A scene
  - A camera
  - A renderer which combines the previous two together.
  - domElement contains everything

app.addBox needs:
  - Shape
  - Material
  - Mesh

MISC:

requestionAnimationFrame:
  - reduced redraws
  - Active only. Only makes animations when tab or window is focused on.
  - Checks max fps and uses that

*/




