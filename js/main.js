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

<<<<<<< HEAD
  document.body.appendChild(app.renderer.domElement);
  // Throw what the renderer is looking at on the page
  app.addBox();
  app.addSphere();
  app.addTriangle();
  app.addCylinder();
  app.addBread();
=======
  document.body.appendChild(app.renderer.domElement); // Throw what the renderer is looking at on the page
  // app.addBox();
  // app.addSphere();
  app.addRing();
  // app.addTriangle();
  // app.addCylinder();
>>>>>>> e86f1acda7e86eab982b7da86d291a754f0813e2
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

}



app.addSphere = function() {
  var shape = new THREE.SphereGeometry(6, 40, 16);
  // THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS)

  var material = new THREE.MeshPhongMaterial({
    // color: 0xEC407A,
    // wireframe: true,
    wireframeLinewidth: 4,
    map: THREE.ImageUtils.loadTexture('images/hamtexture.jpg')
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

<<<<<<< HEAD
app.addBread = function () {
  app.group = new THREE.Group();
  app.group.position.y = 50;

  app.scene.add( app.group );

  function addShape(color, x, y, z, rx, ry, rz, s) {
    var breadpts = [];
    breadpts.push(new THREE.Vector2(70, 20));
    breadpts.push(new THREE.Vector2(80, 90));
    breadpts.push(new THREE.Vector2(-30, 70));
    breadpts.push(new THREE.Vector2(-10, 10));

    var breadShape = new THREE.Shape();
    breadShape.moveTo(0, 0);
    breadShape.splineThru(breadpts);

    var breadExtrude = {
      amount: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1
    };

    var breadGeometry = new THREE.ExtrudeGeometry(breadShape, breadExtrude);
    console.log('hai');
    var mesh = new THREE.Mesh(breadGeometry, new THREE.MeshPhongMaterial({
      color: color
    }));

    app.group.add(mesh);
    // app.scene.add( mesh );

  };
  addShape(0x808080, -50, -100, 0, 0, 0, 0, 1);
  // addShape(0x808080, -70, -10, 0, 0, 0, 0, 1);
};

=======
app.addRing = function() {
  var geometry = new THREE.TorusGeometry( 10, 5, 16, 100 );
  var material = new THREE.MeshBasicMaterial({ 
    color: 0xafafaf,
    map: THREE.ImageUtils.loadTexture('images/onion.jpg'),
  });
  app.torus = new THREE.Mesh( geometry, material );
  app.scene.add( app.torus );
}
>>>>>>> e86f1acda7e86eab982b7da86d291a754f0813e2


app.animate = function() {
  requestAnimationFrame(app.animate);

  // app.cube.rotation.x += 0.01;
  // app.cube.rotation.y += 0.01;
  // app.cube.rotation.z += 0.01;

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

$('.ingredients input:checkbox').on('click', function() {
  var ingredient = $(this).val();
  console.log(ingredient);
  if ($(this).is(':checked')) {
    app.addSphere();
  }
});










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




