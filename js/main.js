var app = app || {};
THREE.ImageUtils.crossOrigin = '';
var horizontalAngle = 0;
var clock = new THREE.Clock();
var doublePi = Math.PI * 2
var frameTime = 0
var verticalAngle = 0

app.init = function() {
  console.log("App Initialized.");


  app.width = window.innerWidth;
  app.height = window.innerHeight;
  app.clock = new THREE.Clock();
  // app.frameTime = 0;
  // app.horizontalAngle = 0;
  // app.verticalAngle = 0;
  // app.doublePi = Math.PI * 2;

  app.camera = new THREE.PerspectiveCamera(45, app.width / app.height, 1, 2000 );
  // THREE.PerspectiveCamera(FIELD OF VIEW, RATIO, NEAR, FAR)
  // Near and Far specify the range which things get rendered. (in 'units')

  app.camera.position.z = 200;
  // app.camera.position.set( 0, 150, 750 );

  app.scene = new THREE.Scene();
  app.scene.add(app.camera);

  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize(app.width, app.height);
  app.renderer.setClearColor(0xFFFFFF, 1);

  app.group = new THREE.Group();
  app.group.position.y = 30;
  app.scene.add( app.group );
  // app.group = new THREE.Group();
  // app.group.position.y = 50;
  // app.scene.add( app.group );

  app.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.9 );
  //  THREE.HemisphereLight(SKY COLOR, GROUND COLOR, INTENSITY)
  app.scene.add(app.hemiLight)

  // app.light = new THREE.DirectionalLight( 0xFFFFFF);
  // app.light.position.set( 0, 1, 0 ).normalize();
  // app.scene.add(app.light);


  //disabled orbit control
  // app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

  document.body.appendChild(app.renderer.domElement);
  // Throw what the renderer is looking at on the page

  app.box('add', 'Bread');
  // app.addSphere();
  // app.addTriangle();
  // app.addCylinder();
  // app.addBread();
  // app.addBacon();
  // app.addTorus();
  app.text();
  // app.addOlive();
  app.animate();
  app.renderer.render(app.scene, app.camera)
}



app.box = function(status, ingredient) {

  switch (ingredient) {
  case 'Bread':
    if (status === 'add') {
      var shape = new THREE.BoxGeometry(50, 40, 7)

      var material1 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/crusttexture.jpg')
      });

      var material2 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/crusttexture.jpg')
      });

      var material3 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/crusttexture.jpg')
      });

      var material4 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/crusttexture.jpg')
      });

      var material5 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
      });

      var material6 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
      });

      var materials = [material1, material2, material3, material4, material5, material6]
      var meshFaceMaterial = new THREE.MeshFaceMaterial( materials );

      app.bread = new THREE.Mesh(shape, meshFaceMaterial);
      app.bread2 = new THREE.Mesh(shape, meshFaceMaterial);

      app.scene.add(app.bread);
      app.scene.add(app.bread2);

    } else {
      app.scene.remove(app.bread);
    }
    break;
  case 'Butter':
    if (status === 'add') {
      var shape = new THREE.BoxGeometry(10, 10, 40)
      // THREE.BoxGeometry(WIDTH, HEIGHT, BREADTH)
      var material = new THREE.MeshPhongMaterial({
        // color: 0x1A237E,
        map: THREE.ImageUtils.loadTexture('images/buttertexture.jpg')
      });

      app.butter = new THREE.Mesh(shape, material);
      app.butter.position.z = 30;

      app.scene.add(app.butter);

    } else {
      app.scene.remove(app.butter);
    }
    break;
  case 'Cheese':
    if (status === 'add') {
      var shape = new THREE.BoxGeometry(35, 35, 1)

      var material = new THREE.MeshPhongMaterial({
        // color: 0x1A237E,
        map: THREE.ImageUtils.loadTexture('images/cheesetexture.jpg')
      });

      app.cheese = new THREE.Mesh(shape, material);

      app.scene.add(app.cheese);
    } else {
      app.scene.remove(app.cheese);
    }
  }
}

app.sphere = function(status) {
  if (status === 'add') {
    var shape = new THREE.SphereGeometry(6, 40, 16);
    // THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS)

    var material = new THREE.MeshPhongMaterial({
      // color: 0xEC407A,
      wireframe: true,
      wireframeLinewidth: 4,
      map: THREE.ImageUtils.loadTexture('images/meatballtexture.jpg')
    });

    app.ball = new THREE.Mesh(shape, material);

    app.scene.add(app.ball);
  } else {
    app.scene.remove(app.ball);
  }
}



app.cylinder = function (status, ingredient) {
  switch (ingredient) {
  case 'Tomato':
    if (status === 'add') {
      var cylinderShape = new THREE.CylinderGeometry(20, 20, 2, 800);
      var cylinderMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/tomatotexture.jpg'),
      });
      app.tomato = new THREE.Mesh( cylinderShape, cylinderMaterial );
      app.scene.add(app.tomato);
    } else {
      app.scene.remove(app.tomato);
    }
    break;
  case 'Ham':
    if (status === 'add') {
      var cylinderShape = new THREE.CylinderGeometry(20, 20, 1, 800);
      var cylinderMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/hamtexture.png'),
      });
      app.ham = new THREE.Mesh( cylinderShape, cylinderMaterial );
      app.ham.position.z = -30;
      app.scene.add(app.ham);
    } else {
      app.scene.remove(app.ham);
    }
    break;
  }

}


app.torus = function(status) {
  if (status === 'add') {
    var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    var material = new THREE.MeshPhongMaterial({
      color: 0xEB9532,
      map: THREE.ImageUtils.loadTexture('images/onion.jpg'),
    });
    app.onion = new THREE.Mesh( geometry, material );
    app.onion.position.z = 50;
    app.scene.add(app.onion);
  } else {
    app.scene.remove(app.onion);
  }
}

app.bacon = function(status) {
    if (status === 'add') {
      var nsControlPoints = [
        [
          new THREE.Vector4(-200, -200, 100, 1),
          new THREE.Vector4(-200, -100, -200, 1),
          new THREE.Vector4(-200, 500, 250, 1),
          new THREE.Vector4(-200, 200, -100, 1)
        ],
        [
          new THREE.Vector4(0, -200, 0, 1),
          new THREE.Vector4(0, -100, -100, 5),
          new THREE.Vector4(0, 100, 150, 5),
          new THREE.Vector4(0, 200, 0, 1)
        ],
        [
          new THREE.Vector4(200, -200, -100, 1),
          new THREE.Vector4(200, -100, 200, 1),
          new THREE.Vector4(200, 100, -250, 1),
          new THREE.Vector4(200, 200, 100, 1)
        ]
      ];
      var degree1 = 2;
      var degree2 = 3;
      var knots1 = [0, 0, 0, 1, 1, 1];
      var knots2 = [0, 0, 0, 0, 1, 1, 1, 1];
      var nurbsSurface = new THREE.BaconSurface(degree1, degree2, knots1, knots2, nsControlPoints);

      var map = THREE.ImageUtils.loadTexture('images/bacon.jpg');
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 16;

      getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
      };

      var geometry = new THREE.ParametricGeometry(getSurfacePoint, 20, 20);
      var material = new THREE.MeshLambertMaterial({
        map: map,
        side: THREE.DoubleSide
      });
      app.baconStrip = new THREE.Mesh(geometry, material);
      app.baconStrip.position.set(-200, 100, 0);
      app.baconStrip.position.z = -100;
      app.baconStrip.scale.multiplyScalar(1);
      app.group.add(app.baconStrip);
    } else {
      app.group.remove(app.baconStrip);
    }
}

app.text = function() {
  var geometry = new THREE.TextGeometry( "WHICH 'WICH?", ({
    size: 20,
    height: 4,
    // curveSegments: 3,
    font: 'arvo',
    // weight: 'bold',
    weight: 'normal'

  }));

  var material = new THREE.MeshPhongMaterial({
    bevelEnabled: true,
    color: 0xF4B350
  });

  app.heading = new THREE.Mesh (geometry, material);
  app.heading.position.x = -100;
  app.heading.position.z = -60;

  app.scene.add(app.heading);
}



app.float = function(ingredient) {

  switch (ingredient) {
    case app.bread:
      app.bread.position.x = 120
      app.bread.position.y = Math.sin( verticalAngle ) * -60;
      app.bread.rotation.x += 1.0 * frameTime;
      app.bread.rotation.y += 1.0 * frameTime;
    case app.bread2:
      app.bread2.position.x = -120
      app.bread2.position.y = Math.sin( verticalAngle ) * 60;
      app.bread2.rotation.x += 1.1 * frameTime;
      app.bread2.rotation.y += 1.0 * frameTime;
      break;
    case app.tomato:
      app.tomato.position.x = Math.sin( horizontalAngle ) * -79;
      app.tomato.position.y = Math.sin( verticalAngle ) * 40;
      app.tomato.rotation.x += 1.7 * frameTime;
      app.tomato.rotation.y += 1.0 * frameTime;
      break;
    case app.butter:
      app.butter.position.x = Math.sin( horizontalAngle ) * 20
      app.butter.position.y = Math.sin( verticalAngle ) * 40
      app.butter.rotation.x += 3.0 * frameTime;
      app.butter.rotation.y += 1.0 * frameTime;
      break;
    case app.cheese:
      app.cheese.position.x = Math.sin( horizontalAngle ) * 90
      app.cheese.position.y = Math.sin( verticalAngle ) * 80
      app.cheese.rotation.x += 3.0 * frameTime;
      app.cheese.rotation.y += 1.0 * frameTime;
      break;
    case app.ham:
      app.ham.position.x = Math.sin( horizontalAngle ) * 1
      app.ham.position.y = Math.sin( verticalAngle ) * 12
      app.ham.rotation.x = Math.sin( horizontalAngle ) * 12
      app.ham.rotation.y = Math.sin( horizontalAngle ) * 12
      break;
    case app.onion:
      app.onion.position.x = Math.sin( horizontalAngle ) * 30
      app.onion.position.y = Math.sin( verticalAngle ) * 30
      app.onion.rotation.x = 2.7 * frameTime
      app.onion.rotation.y = Math.sin( horizontalAngle ) * 12
      break;
    case app.olivesGroup:
      app.olivesGroup.position.x = Math.sin( verticalAngle ) * 30
      // app.olivesGroup.position.y = Math.sin( verticalAngle ) * 60
      app.olivesGroup.rotation.x = Math.sin( horizontalAngle ) * 12
      app.olivesGroup.rotation.y = 1.5 * 12
      break;
    case app.ball:
      // app.olivesGroup.position.x = Math.sin( verticalAngle ) * 30
      app.ball.position.y = Math.sin( verticalAngle ) * 60
      app.ball.rotation.x = Math.sin( horizontalAngle ) * 12
      app.ball.rotation.y = 1.5 * 12
      break;

  }
}


app.olive = function(status) {
  if (status === 'add') {
    var materialNormal = new THREE.MeshNormalMaterial();
    var bigOliveGeom = new THREE.SphereGeometry(15, 20, 15);
    var firstMaterial = new THREE.MeshPhongMaterial({
      // color: 0x1E824C,
      map: THREE.ImageUtils.loadTexture('images/olivetexture.jpg')
      // wireframe: true
    })
    app.bigOliveMesh = new THREE.Mesh(bigOliveGeom, firstMaterial);
    app.bigOliveMesh.scale.set(1, 0.8, 0.8);


    var smallOliveGeom = new THREE.SphereGeometry(6, 16, 16);
    var material = new THREE.MeshPhongMaterial({
      color: 0xD91E18,
    });
    app.smallOliveMesh = new THREE.Mesh(smallOliveGeom, material);
    // app.smallOliveMesh.wireframe = true;
    app.smallOliveMesh.position.x = 10;
    app.smallOliveMesh.position.y = 5;
    app.smallOliveMesh.scale.set(0.7, 0.8, 0.6);
    app.olivesGroup = app.group.add(app.smallOliveMesh,
      app.bigOliveMesh);
    app.scene.add(app.olivesGroup);
  } else {
    app.scene.remove(app.olivesGroup);
  }
}






app.animate = function() {
  requestAnimationFrame(app.animate);

  frameTime = clock.getDelta();
  horizontalAngle += 0.5 * frameTime;
  verticalAngle += 1.5 * frameTime;


  if (app.tomato) {
    app.float(app.tomato)
  }

  if (app.cheese) {
    app.float(app.cheese);
  }

  if (app.ham) {
    app.float(app.ham)
  }

  if (app.onion) {
    app.float(app.onion)
  }

  if (app.ball) {
    app.float(app.ball)
  }

  if (app.butter) {
    app.float(app.butter)
  }

  if (app.baconStrip) {
    app.float(app.baconStrip)
  }

  if (app.olivesGroup) {
    app.float(app.olivesGroup)
  }

  if (app.bread && app.bread2) {
    app.float(app.bread)
    app.float(app.bread2)
  }



  app.renderer.render(app.scene, app.camera);
}

// app.align = function() {
//   $('.generate').on('click', function() {
//     app.scene.children.position.x = 100;
//     console.log('click');
//   });
// // app.scene.children.position.x = 100;
// };



window.onload = app.init;
// window.addEventListener('mousemove', function(event) {
//   console.log(event.x, event.y);

// });

window.addEventListener('resize', function() {
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);
})



var addShape = function (ingredient) {
  switch (ingredient) {
  case 'Meatball':
    return app.sphere;
  case 'Onion':
    return app.torus;
  case 'Tomato':
    return app.cylinder;
  case 'Cheese':
    return app.box;
  case 'Ham':
    return app.cylinder;
  case 'Chicken':
    // app.addChicken();
    break;
  case 'Butter':
    return app.box;
  case 'Bacon':
    return app.bacon;
  case 'Olive':
    return app.olive;
  }
}



// click to bring ingredients. jQuery
$('.ingredients input:checkbox').on('click', function() {
  var ingredient = $(this).val();
  console.log(ingredient);
  if ($(this).is(':checked')) {
    addShape(ingredient)('add', ingredient);
  } else {
    addShape(ingredient)('remove', ingredient);
  }
});

//reset ingredients from scene
$('.reset').on('click', function() {
    var objsToRemove = app.scene.children.slice(3);
    // var objsToRemove = app.scene.children[3];
    $.each(objsToRemove, function( i, object ) {
          app.scene.remove(object);

    });
    app.text();
    app.box('add', 'Bread');
    // app.animate();
});

// $('.reset').on('click'), function(){
//   location.reload();
// };









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

    addShape(ingredient);*/




