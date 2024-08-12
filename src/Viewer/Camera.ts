import { PerspectiveCamera, Raycaster, Vector3 } from "three";
import { Viewer } from "./index.ts";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { checkCollisions } from "./Utils";

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
  raycaster = new Raycaster();

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
    // this.controls.enableDamping = true;
    // this.controls.minDistance = 0.5;
    // this.controls.maxDistance = 100;

    this.viewer.loader.itemsLoaded.on(() => {
      this.setListeners();
    });
  }

  resize() {
    this.instance.aspect = this.viewer.sizes.width / this.viewer.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
    // this.controls.moveForward(0.01);

    const { controls, moving } = this.viewer.camera;
    const walls = this.viewer.world.gallery.walls;

    if (controls.isLocked) {
      const origin = this.viewer.camera.instance.position;

      const vel = 0.02;
      moving.forward && controls.moveForward(vel);
      moving.backward && controls.moveForward(-vel);
      moving.left && controls.moveRight(-vel);
      moving.right && controls.moveRight(vel);

      const forwardDir = new Vector3(0, 0, -1);
      const backwardFir = new Vector3(0, 0, 1);
      const leftDir = new Vector3(-1, 0, 0);
      const rightDir = new Vector3(1, 0, 0);

      //fwd
      this.raycaster.set(origin, forwardDir);
      const fwdPoint = this.raycaster.intersectObjects(walls)[0]?.point;
      if (fwdPoint && origin.distanceTo(fwdPoint) < 0.2)
        this.instance.position.z = fwdPoint.z + 0.2;

      //bwd
      this.raycaster.set(origin, backwardFir);
      const bwdPoint = this.raycaster.intersectObjects(walls)[0]?.point;
      if (bwdPoint && origin.distanceTo(bwdPoint) < 0.2)
        this.instance.position.z = bwdPoint.z - 0.2;

      //left
      this.raycaster.set(origin, leftDir);
      const leftPoint = this.raycaster.intersectObjects(walls)[0]?.point;
      if (leftPoint && origin.distanceTo(leftPoint) < 0.2)
        this.instance.position.x = leftPoint.x + 0.2;

      //right
      this.raycaster.set(origin, rightDir);
      const rightPoint = this.raycaster.intersectObjects(walls)[0]?.point;
      if (rightPoint && origin.distanceTo(rightPoint) < 0.2)
        this.instance.position.x = rightPoint.x - 0.2;
    }
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
