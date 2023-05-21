import "./scss/preloader.scss";
import "./scss/style.scss";
import "./scss/cursor.scss";
import "./scss/scene-switcher.scss";
import "./js/preloader.js";
import "./js/cursor.js";
import "./js/music.js";
import * as THREE from "../node_modules/three/build/three.module.js";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "../node_modules/three/examples/jsm/postprocessing/ShaderPass.js";

let container,
  cameraY,
  scene,
  camera,
  mixer,
  renderer,
  meshTubes,
  meshHuman,
  bloomComposer,
  finalComposer,
  lightTubeOne,
  lightTubeTwo,
  lightTubeThree,
  parameters,
  loader;

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

let audioSceneOne = document.querySelector(".audio1");
let audioSceneTwo = document.querySelector(".audio2");
const materials = [];
let r = 0;
const clock = new THREE.Clock();
const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0.1,
  bloomRadius: 1,
};

const init = () => {
  //CONTAINER
  container = document.createElement("div");
  container.classList.add("canvas-hero");
  container.classList.add("scene1");
  document.body.appendChild(container);
  // SCENE
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 1, 5000);
  // CAMERA
  camera = new THREE.PerspectiveCamera(50, aspect, 1, 2000);
  camera.rotation.y = Math.PI;
  scene.add(camera);
  // RENDERER
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  // LIGHT
  const light = new THREE.AmbientLight(0xffffff, 1);
  light.layers.enable(0);
  light.layers.enable(1);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffca00, 3);
  dirLight.position.set(0, 3, 0);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  dirLight.layers.enable(0);
  dirLight.layers.enable(1);
  scene.add(dirLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
  hemiLight.position.set(100, 200, 100);
  hemiLight.layers.enable(0);
  hemiLight.layers.enable(1);
  scene.add(hemiLight);

  //PARTICLES

  function particles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const textureLoader = new THREE.TextureLoader();
    const sprite1 = textureLoader.load("/src/img/circle.png");
    const sprite2 = textureLoader.load("./src/img/spark.png");
    const sprite3 = textureLoader.load("./src/img/circle.png");
    const sprite4 = textureLoader.load("./src/img/spark.png");
    const sprite5 = textureLoader.load("./src/img/circle.png");

    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 2000 - 500;
      const y = Math.random() * 2000 - 500;
      const z = Math.random() * 1000 - 500;

      vertices.push(x, y, z);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    parameters = [
      [[0, 0.3, 0.5], sprite2, 1],
      [[0, 0.3, 0.1], sprite3, 5],
      [[0, 0.3, 0.1], sprite1, 4],
      [[0, 0.3, 0.1], sprite5, 6],
      [[0, 0.3, 0.1], sprite4, 6],
    ];

    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      materials[i].color.setHSL(0xffca00);

      const particles = new THREE.Points(geometry, materials[i]);
      particles.layers.set(1);
      scene.add(particles);
    }
  }
  particles();

  window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
};

const initComposer = () => {
  bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;

  const renderScene = new RenderPass(scene, camera);
  // 光晕
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  finalComposer = new EffectComposer(renderer);
  const finalShader = new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
    fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
                gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
            }
        `,
    defines: {},
  });
  const finalPass = new ShaderPass(finalShader, "baseTexture");
  finalPass.needsSwap = true;
  finalComposer.addPass(renderScene);
  finalComposer.addPass(finalPass);
};

const main = () => {
  const geometry = new THREE.BoxGeometry(20, 20, 10);
  // 正常方块
  // const normalMtl = new THREE.MeshLambertMaterial({ color: 0x00ffff });
  // const normalBox = new THREE.Mesh(geometry, normalMtl);
  // normalBox.position.z = -5;
  // normalBox.layers.set(0);
  // scene.add(normalBox);

  meshTubes = new THREE.Mesh(
    new THREE.CircleGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({ color: 0x000000, depthWrite: false })
  );
  meshTubes.receiveShadow = true;
  meshTubes.position.z = -300;
  meshTubes.layers.set(1);
  camera.add(meshTubes);
  scene.add(meshTubes);

  meshHuman = new THREE.Mesh(
    new THREE.CircleGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({ color: 0x000000, depthWrite: false })
  );
  meshHuman.layers.set(0);
  meshHuman.receiveShadow = true;
  meshHuman.position.z = -300;
  camera.add(meshHuman);
  scene.add(meshHuman);

  // // ground
  // const meshGround = new THREE.Mesh(
  //   new THREE.BoxGeometry(10000, 10000),
  //   new THREE.MeshPhongMaterial({ color: 0x000000, depthWrite: false })
  // );
  // meshGround.rotation.x = -Math.PI / 2;
  // meshGround.receiveShadow = true;
  // meshHuman.add(meshGround);
  // meshTubes.add(meshGround);

  // const reflectorGeometry = new THREE.PlaneGeometry(2000, 2000);
  // const reflector = new Reflector(reflectorGeometry, {
  //   textureWidth: 1024 * window.devicePixelRatio,
  //   textureHeight: 1024 * window.devicePixelRatio,
  //   color: 0x889999,
  // });

  const reflectorGeometryHuman = new THREE.CircleGeometry(1000, 1000);
  const reflectorHuman = new Reflector(reflectorGeometryHuman, {
    clipBias: 1,
    textureWidth: 1024 * window.devicePixelRatio,
    textureHeight: 1024 * window.devicePixelRatio,
    color: 0x889999,
  });

  // reflector.rotation.x = Math.PI * -0.5;
  // reflector.position.y = 0.15;

  reflectorHuman.rotation.x = Math.PI * -0.5;
  reflectorHuman.position.y = 0.17;

  // meshTubes.add(reflector);
  meshHuman.add(reflectorHuman);

  tubes();
  function tubes() {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }

      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const tx = t * 10 - 1.5;
        const ty = t * 10 - 1.5;
        const tz = 0;

        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(6);
    const geometryTube = new THREE.TubeGeometry(path, 1, 3, 8, false);

    const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const material3 = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    lightTubeOne = new THREE.Mesh(geometryTube, material);
    lightTubeOne.position.x = 150;
    lightTubeOne.position.y = 200;
    lightTubeOne.position.z = -50;

    lightTubeOne.rotation.x = 30;
    lightTubeOne.rotation.y = 40;
    lightTubeOne.rotation.z = 50;
    lightTubeOne.layers.set(1);
    meshTubes.add(lightTubeOne);

    lightTubeTwo = new THREE.Mesh(geometryTube, material2);
    lightTubeTwo.position.x = -150;
    lightTubeTwo.position.y = 200;
    lightTubeTwo.position.z = -180;

    lightTubeTwo.rotation.x = 30;
    lightTubeTwo.rotation.y = 40;
    lightTubeTwo.rotation.z = 30;
    lightTubeTwo.layers.set(1);
    meshTubes.add(lightTubeTwo);

    lightTubeThree = new THREE.Mesh(geometryTube, material3);
    lightTubeThree.position.x = -150;
    lightTubeThree.position.y = 180;
    lightTubeThree.position.z = 100;

    lightTubeThree.rotation.x = 30;
    lightTubeThree.rotation.y = 40;
    lightTubeThree.rotation.z = 50;
    lightTubeThree.layers.set(1);
    meshTubes.add(lightTubeThree);
  }
};

const render = () => {
  const time = Date.now() * 0.0000007;

  meshTubes.position.x = 700 * Math.cos(r);
  meshTubes.position.z = 700 * Math.sin(r);
  meshTubes.position.y = 0;

  meshHuman.position.x = 700 * Math.cos(r);
  meshHuman.position.z = 700 * Math.sin(r);
  meshHuman.position.y = 0;

  if (meshHuman.children[0]) {
    meshHuman.children[0].position.x = 10 * Math.cos(2 * r);
    meshHuman.children[0].position.z = 20 * Math.sin(r);
  }

  // camera.fov = 25 + 30 * Math.sin(0.1 * r);
  camera.fov = 2.5 + 40 * Math.sin(0.1 * r);
  camera.updateProjectionMatrix();
  camera.lookAt(meshTubes.position.x, cameraY, meshHuman.position.z);
  const delta = clock.getDelta();

  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i];

    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 1 ? i + 25 : -(i + 25));
    }
  }

  for (let i = 0; i < materials.length; i++) {
    materials[i].color.setHex(0x685300);
  }
  if (mixer) mixer.update(delta);
  renderer.autoClear = false;
  renderer.clear();

  camera.layers.set(1);
  bloomComposer.render();

  renderer.clearDepth();

  camera.layers.set(0);
  finalComposer.render(scene, camera);

  requestAnimationFrame(render);
};
init();
initComposer();
main();

cameraY = 160;
camera.position.y = 180;
camera.position.x = 50;
camera.position.z = 50;

window.addEventListener("wheel", (event) => {
  r = clamp((r += event.deltaY * 0.001), 0, 11);
  camera.position.y = clamp(
    (camera.position.y += event.deltaY * 0.007),
    180,
    255
  );
  console.log("camera.position.y", camera.position.y);
  camera.position.x = clamp(
    (camera.position.x += event.deltaY * 0.09),
    50,
    255
  );
  console.log("camera.position.x", camera.position.x);
  camera.position.z = clamp(
    (camera.position.z += event.deltaY * 0.09),
    50,
    255
  );
  console.log("camera.position.z", camera.position.z);
  cameraY = clamp((cameraY -= event.deltaY * 0.015), 0, 165);
  console.log("cameraY", cameraY);

  if (r < 11 && r > 0.1) {
    lightTubeOne.rotation.x += r * 0.004;
    lightTubeOne.rotation.z += r * 0.004;

    lightTubeTwo.rotation.x += r * 0.004;
    lightTubeTwo.rotation.z += r * 0.004;

    lightTubeThree.rotation.x += r * 0.004;
    lightTubeThree.rotation.z += r * 0.004;
  }
  return r, camera.position.z, camera.position.x, camera.position.y, cameraY;
});

// model
loader = new FBXLoader();

loader.load("model/strut-walking-slow.fbx", function (object) {
  mixer = new THREE.AnimationMixer(object);

  const action = mixer.clipAction(object.animations[0]);
  action.play();

  object.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  object.aspect = 0.3;

  meshHuman.add(object);
});

document.getElementById("scene2").addEventListener("click", function (object) {
  meshHuman.clear(object);

  const loaderG = new FBXLoader();

  loaderG.load("model/gangnam-style-grandmom.fbx", function (objectG) {
    mixer = new THREE.AnimationMixer(objectG);

    const action = mixer.clipAction(objectG.animations[0]);
    action.play();

    objectG.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    objectG.aspect = 0.3;
    meshHuman.add(objectG);
    
  });
  container.classList.remove("scene1");
  container.classList.add("scene2");
  audioSceneOne.pause();
  audioSceneOne.currentTime = 0;
  render();
});

document.getElementById("scene1").addEventListener("click", function (object) {
  meshHuman.clear(object);

  const loaderG = new FBXLoader();

  loaderG.load("model/strut-walking-slow.fbx", function (objectG) {
    mixer = new THREE.AnimationMixer(objectG);

    const action = mixer.clipAction(objectG.animations[0]);
    action.play();

    objectG.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    objectG.aspect = 0.3;
    meshHuman.add(objectG);
  });
  container.classList.remove("scene2");
    container.classList.add("scene1");
    audioSceneTwo.pause();
    audioSceneTwo.currentTime = 0;
  render();
});

render();

//START AUDIO
document.querySelector("canvas").addEventListener("click", () => {
  if(container.classList.contains("scene1")) {
    audioSceneOne.volume = 0.1;
    audioSceneOne.play();
    document.getElementById("cursor__info").classList.add("playing");
  }
  if(container.classList.contains("scene2")) {
    audioSceneTwo.volume = 0.1;
    audioSceneTwo.play();
    document.getElementById("cursor__info").classList.add("playing");
  }
});

//MINMAX
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
