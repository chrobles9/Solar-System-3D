import "/style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshStandardMaterial } from "three";

// Global canvas variables
let scene, camera, renderer;
// let controls;
// Planets
let sceneObjects = [];

const normalMap = new THREE.TextureLoader().load(
  "/textures/normalMap.png"
);

// Initiate Scene
function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Frustum Range
    1000
  );

  // create Renderer and matches rendered with canvas
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background"),
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  createSun();
  terrestrialPlanets();
  gasGiantPlanets();
  document.body.onscroll = moveCamera;
  Array(500).fill().forEach(createStar);
  moveCamera();
  animate();
  addLighting();
  sceneBackground();
  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);
}

function createSun() {
  const sunTexture = new THREE.TextureLoader().load(
    "/textures/sunTexture.jpg"
  );
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 32),
    new THREE.MeshStandardMaterial({
      map: sunTexture,
      normalMap: normalMap,
    })
  );
  sun.position.z = 200;
  scene.add(sun);
  sceneObjects.push(sun);
}

function terrestrialPlanets() {
  // Mercury
  function mercury() {
    const mercuryTexture = new THREE.TextureLoader().load(
      "/textures/mercuryTexture.jpg"
    );
    const mercury = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshStandardMaterial({
        map: mercuryTexture,
        normalMap: normalMap,
      })
    );
    mercury.position.z = 195;
    mercury.position.x = 2;
    scene.add(mercury);
    sceneObjects.push(mercury);
  }
  function venus() {
    const venusTexture = new THREE.TextureLoader().load(
      "/textures/venusTexture.jpg"
    );
    const venus = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 32, 32),
      new THREE.MeshStandardMaterial({
        map: venusTexture,
        normalMap: normalMap,
      })
    );
    venus.position.z = 185;
    venus.position.x = -7;

    scene.add(venus);
    sceneObjects.push(venus);
  }
  function earth() {
    const earthTexture = new THREE.TextureLoader().load(
      "/textures/earthTexture.jpg"
    );
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalMap,
      })
    );
    earth.position.z = 170;
    earth.position.x = 3;
    scene.add(earth);
    sceneObjects.push(earth);
  }
  // Mars
  function mars() {
    const marsTexture = new THREE.TextureLoader().load(
      "/textures/marsTexture.jpg"
    );
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new MeshStandardMaterial({
        map: marsTexture,
        normalMap: normalMap,
      })
    );
    mars.position.z = 160;
    mars.position.x = -2;
    scene.add(mars);
    sceneObjects.push(mars);
  }
  mercury();
  venus();
  earth();
  mars();
}
function gasGiantPlanets() {
  function jupiter() {
    const jupiterTextue = new THREE.TextureLoader().load(
      "/textures/jupiterTexture.jpg"
    );
    const jupiter = new THREE.Mesh(
      new THREE.SphereGeometry(13, 32, 32),
      new THREE.MeshStandardMaterial({
        map: jupiterTextue,
        normalMap: normalMap,
      })
    );
    jupiter.position.z = 100;
    jupiter.position.x = 20;
    scene.add(jupiter);
    sceneObjects.push(jupiter);
  }
  function createSaturn() {
    const saturnTexture = new THREE.TextureLoader().load(
      "/textures/saturnTexture.jpg"
    );
    const saturn = new THREE.Mesh(
      new THREE.SphereGeometry(9, 32, 32),
      new THREE.MeshStandardMaterial({
        map: saturnTexture,
        normalMap: normalMap,
      })
    );
    saturn.position.z = 55;
    saturn.position.x = -20;
    function saturnRing() {
      const saturnRingTexture = new THREE.TextureLoader().load(
        "/textures/saturnRing.jpg"
      );
      const geometry = new THREE.RingGeometry(3, 16, 82);
      let pos = geometry.attributes.position;
      let v3 = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
      }

      const material = new THREE.MeshStandardMaterial({
        map: saturnRingTexture,
        color: 0xfffff0,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const saturnRing = new THREE.Mesh(geometry, material);

      saturnRing.position.z = 55;
      saturnRing.position.x = -20;
      saturnRing.rotateX(1.8);
      scene.add(saturn, saturnRing);
      sceneObjects.push(saturn, saturnRing);
    }
    saturnRing();
  }
  function uranus() {
    const uranusTexture = new THREE.TextureLoader().load(
      "/textures/uranusTexture.jpg"
    );
    const uranus = new THREE.Mesh(
      new THREE.SphereGeometry(6, 32, 32),
      new MeshStandardMaterial({
        map: uranusTexture,
        normalMap: normalMap,
      })
    );
    scene.add(uranus);
    uranus.position.z = 20;
    uranus.position.x = 10;
    sceneObjects.push(uranus);
  }
  function neptune() {
    const neptuneTexture = new THREE.TextureLoader().load(
      "/textures/neptuneTexture.jpg"
    );
    const neptune = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.MeshStandardMaterial({
        normalMap: neptuneTexture,
        map: normalMap,
      })
    );
    scene.add(neptune);
    sceneObjects.push(neptune);
  }
  jupiter();
  createSaturn();
  uranus();
  neptune();
}

function addLighting() {
  const pointLight = new THREE.PointLight(0xffffff, 0.9, 0, 2);
  pointLight.position.set(0, 0, 265);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(pointLight, ambientLight);

  // Visual Light assistance tool
  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // const gridHelper = new THREE.GridHelper(350, 25);
  // scene.add(lightHelper);

  // controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  const [y] = Array(1)
    .fill()
    .map(() => THREE.MathUtils.randFloat(0.001, 0.01));

  function randomRotate(item, index, arr) {
    item.rotation.y += y;
    arr[index] = item;
  }
  sceneObjects.forEach(randomRotate);
  // Rotations for Saturn's ring
  sceneObjects[7].rotation.y = 0;
  sceneObjects[7].rotation.z -= 0.009;
  renderer.render(scene, camera);
  // controls.update();
}

function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // Creates random spread of stars
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(600));

  star.position.set(x, y, z);
  scene.add(star);
}

function sceneBackground() {
  const backgroundTexture = new THREE.TextureLoader().load(
    "/textures/backgroundTexture.jpg"
  );
  scene.background = backgroundTexture;
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.04;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

initScene();
