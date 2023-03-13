import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Global canvas variables
let scene, camera, renderer, controls;
// Planets
let sceneObjects = [];

// Initiate Scene
function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Frustum Range
    1000
  );
  // create Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.position.z = 200;
  camera.position.x = 200;

  renderer.render(scene, camera);

  // Add renderer to page
  document.body.appendChild(renderer.domElement);
    // sun();
    // terrestrialPlanets();
    gasGiantPlanets();
    addLighting();
    animate();
}

function sun() {
  const geometry = new THREE.SphereGeometry(20, 32, 32);
  const material = new THREE.MeshStandardMaterial( { 
    color: 'red',
  });
  const sun = new THREE.Mesh( geometry, material );
  scene.add( sun );
}

function terrestrialPlanets() {
  // Mercury 
  function mercury() {
    const geometry = new THREE.SphereGeometry( 2.5, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
    const mercury = new THREE.Mesh( geometry, material );
    mercury.position.z = 25;
    scene.add( mercury ); 
  }
  // Venus
  function venus() {
    const geometry = new THREE.SphereGeometry( 2.5, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { 
      color: 'purple',
    } );
    const mercury = new THREE.Mesh( geometry, material );
    mercury.position.z = 33;
    scene.add( mercury );  
  }
  // Earth
  function earth() {
    const geometry = new THREE.SphereGeometry( 2.5, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { 
      color: 'blue',
    } );
    const earth = new THREE.Mesh( geometry, material );
    earth.position.z = 41;
    scene.add( earth );  
  }
  // Mars
  function mars() {
    const geometry = new THREE.SphereGeometry( 2.5, 32, 32);
    const material = new THREE.MeshStandardMaterial( {
      color: 'red',
    });
    const mars = new THREE.Mesh( geometry, material );
    mars.position.z = 49;
    scene.add( mars );
  }
  mercury();
  venus();
  earth();
  mars();
}
function gasGiantPlanets() {
  // Jupiter
  function jupiter() {
    const geometry = new THREE.SphereGeometry( 6, 32, 32 );
    const material = new THREE.MeshStandardMaterial( {
      color: 'purple',
    });
    const jupiter = new THREE.Mesh( geometry, material );
    jupiter.position.z = 70;
    scene.add(jupiter);
    function jupiterRing() {
      const geometry = new THREE.RingGeometry( 9, 7, 32 );
      const material = new THREE.MeshBasicMaterial( {
        color: 0xfff00, side: THREE.DoubleSide
      });
      const jupiterRing = new THREE.Mesh( geometry, material );
      jupiterRing.position.z = 70;
      scene.add(jupiterRing);
    }
    jupiterRing();
  }
  // Saturn
  function createSaturn() {
    const geometry = new THREE.SphereGeometry( 6, 32, 32 );
    const material = new THREE.MeshStandardMaterial( {
      color: 'pink',
    });
    const saturn = new THREE.Mesh( geometry, material );
    saturn.position.z = 85;
    scene.add(saturn);
    function saturnRing() {
      const geometry = new THREE.RingGeometry( 12, 7, 32 );
      const material = new THREE.MeshBasicMaterial( {
        color: 0xfff00, side: THREE.DoubleSide
      });
      const saturnRing = new THREE.Mesh( geometry, material );
      saturnRing.position.z = 85;
      scene.add(saturnRing);

    }
    saturnRing();
  }
  // Uranus
  function uranus() {
    const geometry = new THREE.SphereGeometry( 6, 32, 32 );
    const material = new THREE.MeshStandardMaterial( {
      color: 'green',
    });
    const uranus = new THREE.Mesh( geometry, material );
    uranus.position.z = 100;
    scene.add(uranus);
  }
  // Neptune
  function neptune() {
    const geometry = new THREE.SphereGeometry( 6, 32, 32 );
    const material = new THREE.MeshStandardMaterial( {
      color: 'yellow',
    });
    const neptune = new THREE.Mesh( geometry, material );
    neptune.position.z = 115;
    scene.add(neptune);
  }
  jupiter();
  createSaturn();
  uranus();
  neptune();
}


function addLighting() {
  // Add point light to Torus
  const pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // Visual Light assistance tool
  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper);

  controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  // controls.update();
}



initScene();
