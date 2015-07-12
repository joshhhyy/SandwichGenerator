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
  var triangleGeometry = new THREE.Geometry(); 
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0,  1.5, 0.95));  
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.5, 0.95)); 
  triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.5, 0.95));
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0,  1.5, 1.2));  
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.5, 10)); 
  triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.5, 1.2));

  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
  triangleGeometry.faces.push(new THREE.Face3(3, 4, 5));
  // Points 1,4,3 and 6 form a rectangle which I'm trying to construct using triangles 0,2,5 and 0,3,5
  triangleGeometry.faces.push(new THREE.Face3(0, 2, 5));
  triangleGeometry.faces.push(new THREE.Face3(0, 3, 5));

  var triangleMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xEC407A, 
  wireframe: true,
  side:THREE.DoubleSide 
  });

  var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 
  triangleMesh.position.set(1, 0.0, 0.0); 

  app.scene.add(triangleMesh); 
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










var verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

var indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

var geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );







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




