

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
const material1 = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry1, material1);

torus.position.set(20, 10, -20);

const geometry2 = new THREE.CapsuleGeometry(1, 1, 4, 8);
const material2 = new THREE.MeshBasicMaterial({ color: 0x13945a });
const capsule = new THREE.Mesh(geometry2, material2);

capsule.position.set(-10, 20, -20);

scene.add(torus, capsule)

const pointlight = new THREE.PointLight(0xffffff, 5)
pointlight.position.set(20, 10, -20)

const ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointlight, ambientlight)



const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./space.jpeg', () => {
  console.log('Space texture loaded successfully');
});
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.z = 20;
moon.position.setX(-10);


const earthTexture = new THREE.TextureLoader().load('./earth.webp');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

earth.position.z = 0;
earth.position.setX(-10);

scene.add(moon, earth)



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  // earth.rotation.z += 0.05;

  // jefferson.rotation.y += 0.01;
  // jefferson.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  capsule.rotation.x += 0.005;
  capsule.rotation.y += 0.005;
  capsule.rotation.z += 0.02;

  controls.update();
  renderer.render(scene, camera);
}
animate()