import { PerspectiveCamera } from "three";
import { Viewer } from "./index.ts";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera {
  viewer = new Viewer();
  instance = new PerspectiveCamera(
    35,
    this.viewer.sizes.width / this.viewer.sizes.height,
    0.1,
    100,
  );
  // controls = new OrbitControls(this.instance, this.viewer.canvas);
  controls = new PointerLockControls(this.instance, this.viewer.canvas);

  moving = {
    forward: false,
    backward: false,
    right: false,
    left: false,
  };

  constructor() {
    //Instance
    // this.instance.position.set(-1, 1, 5);
    this.instance.position.set(0, 0.5, 0);
    this.viewer.scene.add(this.instance);
    // this.controls.connect();
    //Controls
    this.controls.enableDamping = true;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 100;

    this.setListeners();
  }

  resize() {
    this.instance.aspect = this.viewer.sizes.width / this.viewer.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
    // this.controls.moveForward(0.01);
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter")
        this.controls.isLocked ? this.controls.unlock() : this.controls.lock();
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyW") {
        this.moving.forward = true;
      }

      if (e.code === "KeyS") {
        this.moving.backward = true;
      }

      if (e.code === "KeyD") {
        this.moving.right = true;
      }

      if (e.code === "KeyA") {
        this.moving.left = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") {
        this.moving.forward = false;
      }

      if (e.code === "KeyS") {
        this.moving.backward = false;
      }

      if (e.code === "KeyD") {
        this.moving.right = false;
      }

      if (e.code === "KeyA") {
        this.moving.left = false;
      }
    });
  }
}
