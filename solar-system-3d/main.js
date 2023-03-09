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
  camera.position.z = 50;

  renderer.render(scene, camera);

  // Add renderer to page
  document.body.appendChild(renderer.domElement);

    terrestrialPlanets();
    // gasGiantPlanets();

    addLighting();
    animate();

}


function terrestrialPlanets() {
  for(let i = 0; i < 6; i++){
   // TODO: create random sphere geometry points for smaller planets 

    const geometry = new THREE.SphereGeometry( 2, 32, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
    const sphere = new THREE.Mesh( geometry, material );

    sphere.position.x = i * (Math.floor(Math.random() * (9 - 0) + 0));

    scene.add( sphere );
  }


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
