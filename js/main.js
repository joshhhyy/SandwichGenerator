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

  app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

  document.body.appendChild(app.renderer.domElement);
  // Throw what the renderer is looking at on the page

  // app.box('add', 'Bread');
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
      console.log('yo this bread is made')
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

      app.scene.add(app.butter);

    } else {
      app.scene.remove(app.butter);
    }
    break;
  case 'Cheese':
    if (status === 'add') {
      var shape = new THREE.BoxGeometry(35, 35, 5)

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

  // app.PrismGeometry = new THREE.Mesh(shape, texture);
  app.scene.add( app.prism1 );
}



app.cylinder = function (status, ingredient) {
  switch (ingredient) {
  case 'Tomato':
    if (status === 'add') {
      var cylinderShape = new THREE.CylinderGeometry(20, 20, 0.5, 800);
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
      var cylinderShape = new THREE.CylinderGeometry(20, 20, 0.5, 800);
      var cylinderMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/hamtexture.png'),
      });
      app.ham = new THREE.Mesh( cylinderShape, cylinderMaterial );
      app.scene.add(app.ham);
    } else {
      app.scene.remove(app.ham);
    }
    break;
  }

}

app.addBread = function () {

  var addShape = function(color, x, y, z, rx, ry, rz, s) {
    var breadpts = [];
    breadpts.push(new THREE.Vector2(70, 20));
    breadpts.push(new THREE.Vector2(80, 90));
    breadpts.push(new THREE.Vector2(-30, 80));
    breadpts.push(new THREE.Vector2(-20, -2));
    // breadpts.push(new THREE.Vector2(10, 0));

    var breadShape = new THREE.Shape();
    breadShape.moveTo(0, 0);
    breadShape.splineThru(breadpts);

    var breadExtrude = {
      amount: 2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1
    };

    var breadGeometry = new THREE.ExtrudeGeometry(breadShape, breadExtrude);
    console.log('you got bread');
    app.bread = new THREE.Mesh(breadGeometry, new THREE.MeshPhongMaterial({
      color: color,
      map: THREE.ImageUtils.loadTexture('images/breadtexture.jpg')
    }));

    app.bread.position.y = -100
    app.group.add(app.bread);
    // app.scene.add( mesh );

  };
  addShape(0x808080, -50, -100, 0, 0, 0, 0, 1);
  // addShape(0x808080, -70, -10, 0, 0, 0, 0, 1);
};


app.torus = function(status) {
  if (status === 'add') {
    var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    var material = new THREE.MeshBasicMaterial({
      color: 0xafafaf,
      map: THREE.ImageUtils.loadTexture('images/onion.jpg'),
    });
    app.onion = new THREE.Mesh( geometry, material );
    // app.onion.position.y = 300;
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
    height: 2,
    // curveSegments: 3,
    font: 'arvo',
    // weight: 'bold',
    weight: 'normal'

  }));

  var material = new THREE.MeshPhongMaterial({
    bevelEnabled: true,
    // bevelThickness: 3,
    // bevelSize: 8,
    color: 0x007B49
  });

  app.heading = new THREE.Mesh (geometry, material);
  app.heading.position.x = -90;
  app.heading.position.z = -30;

  app.scene.add(app.heading);
}

app.float = function(ingredient) {
  frameTime = clock.getDelta();
  horizontalAngle += 0.5 * frameTime;

  verticalAngle += 1.5 * frameTime;

  // if ( horizontalAngle > doublePi ) {
  //   horizontalAngle -= doublePi;
  // } else if ( verticalAngle > doublePi ) {
  //   verticalAngle -= doublePi;
  // }
  // console.log(ingredient)
  switch (ingredient) {
    case app.bread:
      app.bread.position.x = Math.sin( horizontalAngle ) * 110;
      app.bread.position.y = Math.sin( verticalAngle ) * 60;
      app.bread.rotation.x += 3.7 * frameTime;
      app.bread.rotation.y += 3.0 * frameTime;
      break;
    case app.bread2:
      app.bread2.position.x = Math.sin( horizontalAngle ) * 49;
      app.bread2.position.y = Math.sin( verticalAngle ) * 20;
      app.bread2.rotation.x += 2.5 * frameTime;
      app.bread2.rotation.y += 3.0 * frameTime;
      break;
    case app.tomato:
      app.tomato.position.x = Math.sin( horizontalAngle ) * 130;
      app.tomato.position.y = Math.sin( verticalAngle ) * 60;
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
    default:
      console.log(ingredient)
  }
}


app.olive = function(status) {
  if (status === 'add') {
    var materialNormal = new THREE.MeshNormalMaterial();
    var bigOliveGeom = new THREE.SphereGeometry(15, 10, 15);
    var firstMaterial = new THREE.MeshPhongMaterial({
      color: 0x1E824C,
    })
    app.bigOliveMesh = new THREE.Mesh(bigOliveGeom, firstMaterial);
    app.bigOliveMesh.scale.set(1, 0.8, 0.8);

    var smallOliveGeom = new THREE.SphereGeometry(5, 15, 15);
    var material = new THREE.MeshPhongMaterial({
      color: 0xD91E18,
    });
    app.smallOliveMesh = new THREE.Mesh(smallOliveGeom, material);
    // app.smallOliveMesh.wireframe = true;
    app.smallOliveMesh.position.x = 11;
    app.smallOliveMesh.position.y = 5;
    app.smallOliveMesh.scale.set(0.7, 0.8, 0.6);

    app.olivesGroup = app.group.add(app.smallOliveMesh,
      app.bigOliveMesh);
    app.scene.add(app.olivesGroup);
  } else {
    app.scene.remove(app.olivesGroup);
    // app.scene.remove(app.bigOliveMesh);
  }
}






app.animate = function() {
  requestAnimationFrame(app.animate);

  if (app.tomato) {
    app.float(app.tomato)

  } else if (app.cheese) {
    app.float(app.cheese)

  } else if (app.ham) {
    app.float(app.ham)

  } else if (app.onion) {
    app.float(app.onion)

  } else if (app.meatball) {
    app.float(app.meatball)

  } else if (app.butter) {
    app.float(app.butter)

  } else if (app.baconStrip) {
    app.float(app.baconStrip)

  } else if (app.olivesGroup) {
    app.float(app.olivesGroup)

  } else if (app.bread && app.bread2) {
    app.float(app.bread)
    app.float(app.bread2)
  }



  app.renderer.render(app.scene, app.camera);
}



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
    $.each(objsToRemove, function( i, object ) {
          app.scene.remove(object);
    });
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

    addShape(ingredient);*/




