var app = app || {};
THREE.ImageUtils.crossOrigin = '';

app.init = function() {
  console.log("App Initialized.")
  app.width = window.innerWidth;
  app.height = window.innerHeight;

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

  app.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  //  THREE.HemisphereLight(SKY COLOR, GROUND COLOR, INTENSITY)
  app.scene.add(app.hemiLight)

  // app.light = new THREE.DirectionalLight( 0xFFFFFF);
  // app.light.position.set( 0, 1, 0 ).normalize();
  // app.scene.add(app.light);

  app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement document.body.appendChild(app.renderer.domElement);
  // Throw what the renderer is looking at on the page

  // app.addBox();
  // app.addSphere();
  // app.addTriangle();
  // app.addCylinder();
  // app.addBread();
  // app.addBacon();
  // app.addTorus();
  app.text();
  app.animate();
  // app.renderer.render(app.scene, app.camera)
}



app.box = function(status, ingredient) {

  switch (ingredient) {
  case 'Butter':
    if (status === 'add') {
      var shape = new THREE.BoxGeometry(25, 25, 40)
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
      // wireframe: true,
      wireframeLinewidth: 4,
      map: THREE.ImageUtils.loadTexture('images/hamtexture.jpg')
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
        color: 0xFFFFaF,
        map: THREE.ImageUtils.loadTexture('images/tomatotexture.jpg'),
        // shading: THREE.SmoothShading
        // wireframe: true,
        // wireframeLinewidth: 5
      });
      // debugger;
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
        color: 0xFFFFaF,
        map: THREE.ImageUtils.loadTexture('images/hamtexture.png'),
        // shading: THREE.SmoothShading
        // wireframe: true,
        // wireframeLinewidth: 5
      });
      // debugger;
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
    console.log('hai');
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
    var geometry = new THREE.TorusGeometry( 10, 5, 16, 100 );
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
          new THREE.Vector4(-200, 100, 250, 1),
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
      app.baconStrip.scale.multiplyScalar(1);
      app.group.add(app.baconStrip);
    } else {
      app.group.remove(app.baconStrip);
    }
  }

app.text = function() {
  var geometry = new THREE.TextGeometry( "WHICH 'WICH?", ({
    size: 30,
  }));

  var material = new THREE.MeshPhongMaterial({
    color: 0x1BBC9B,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 2
  });

  app.heading = new THREE.Mesh(geometry, material);

  app.scene.add(app.heading);
}




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
    break;
  case 'Bacon':
    return app.bacon;
  case 'Vegemite':
    // app.addVegemite();
    break;
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




