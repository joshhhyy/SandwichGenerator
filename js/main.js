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
  app.renderer.setClearColor(0xFFFFFF, 1);

  app.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  //  THREE.HemisphereLight(SKY COLOR, GROUND COLOR, INTENSITY)
  app.scene.add(app.hemiLight)


  // app.light = new THREE.DirectionalLight( 0xFFFFFF);
  // app.light.position.set( 0, 1, 0 ).normalize();
  // app.scene.add(app.light);

  app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

  document.body.appendChild(app.renderer.domElement); // Throw what the renderer is looking at on the page
  app.addBox();
  app.addSphere();
  app.addTriangle();
  app.addCylinder();
  app.animate();
  app.renderer.render(app.scene, app.camera)
  console.log(app.renderer)

}

app.addBox = function(ingredient) {
  var shape = new THREE.BoxGeometry(50, 50, 5)
  // THREE.BoxGeometry(WIDTH, HEIGHT, BREADTH)

  var material = new THREE.MeshPhongMaterial({
    // color: 0x1A237E,
    map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
  });

  app.cube = new THREE.Mesh(shape, material)

  app.scene.add(app.cube);

  // var modifier = new THREE.SubdivisionModifier( subdiv );
  //modifier.modify( smooth );
}

app.addSphere = function() {
  var shape = new THREE.SphereGeometry(6, 16, 16);
  // THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS)

  var material = new THREE.MeshPhongMaterial({
    // color: 0xEC407A,
    // wireframe: true,
    wireframeLinewidth: 4,
    map: THREE.ImageUtils.loadTexture('images/hamtexture.jpg')
  });

  app.sphere = new THREE.Mesh(shape, material)
  app.sphere.position.y = -209

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
  var C = new THREE.Vector2( 50, 70 );

  var height = 32;
  var geometry = new PrismGeometry( [ A, B, C ], height );
  var texture = THREE.ImageUtils.loadTexture('images/breadtexture.jpg');
  texture.repeat.set( 1, 1 );


  var material = new THREE.MeshBasicMaterial({
    // wireframe: true,
    // wireframeLinewidth: 100,
    map: texture
  });

  app.prism1 = new THREE.Mesh( geometry, material );
  app.prism1.material.map.wrapS = THREE.ClampToEdgeWrapping;
  app.prism1.material.map.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  app.prism1.rotation.x = -Math.PI  /  2;
//
  app.scene.add( app.prism1 );
}




app.addCylinder = function () {
  var cylinderShape = new THREE.CylinderGeometry(20, 20, 0.5, 800);
  var cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFaF,
    map: THREE.ImageUtils.loadTexture('images/hamtexture.jpg'),
    // shading: THREE.SmoothShading
    // wireframe: true,
    // wireframeLinewidth: 5
  });
  // debugger;
  app.cylinder = new THREE.Mesh( cylinderShape, cylinderMaterial );
  app.scene.add( app.cylinder );

}


app.animate = function() {
  requestAnimationFrame(app.animate);

  app.cube.rotation.x += 0.01;
  app.cube.rotation.y += 0.01;
  app.cube.rotation.z += 0.01;

  // app.cylinder.rotation.y += 0.02;

  // app.sphere.rotation.x += 0.01;
  // app.sphere.rotation.y += 0.05;
  // app.sphere.rotation.z += 0.05;

  app.renderer.render(app.scene, app.camera);
}


window.onload = app.init;

// window.addEventListener('mousemove', function(event) {
//   // console.log(event);
//   app.cube.position.x = event.clientX - (app.width / 2);
//   app.cube.position.y = ( event.clientY - (app.height / 2) ) * -1;

//   app.sphere.position.y = ( event.clientY - (app.height / 2) ) * -1

// });

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




