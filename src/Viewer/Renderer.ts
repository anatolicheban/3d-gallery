import { Viewer } from "./index.ts";
import { Raycaster, Vector3, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class Renderer {
  viewer = new Viewer();
  instance = new WebGLRenderer({
    canvas: this.viewer.canvas,
    antialias: true,
  });

  raycaster = new Raycaster();

  stats = new Stats();

  constructor() {
    document.body.appendChild(this.stats.dom);

    this.instance.setClearColor("#932b2b");
    this.instance.setSize(this.viewer.sizes.width, this.viewer.sizes.height);
    this.instance.setPixelRatio(this.viewer.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.viewer.sizes.width, this.viewer.sizes.height);
  }

  update() {
    const { controls, moving } = this.viewer.camera;
    const walls = this.viewer.world.gallery.walls;

    if (controls.isLocked) {
      let canForward = true;
      let canBackward = true;
      let canLeft = true;
      let canRight = true;

      const origin = this.viewer.camera.instance.position;
      const dir = new Vector3();

      this.viewer.camera.instance.getWorldDirection(dir);
      dir.y = 0;
      dir.normalize();

      //Forward check
      this.raycaster.set(origin, dir);
      const forwardObj = this.raycaster.intersectObjects(walls)[0];
      if (forwardObj && forwardObj.distance < 0.3) canForward = false;

      //Backward check
      const backDir = new Vector3(-dir.x, 0, -dir.z);
      this.raycaster.set(origin, backDir);
      const backwardObj = this.raycaster.intersectObjects(walls)[0];
      if (backwardObj && backwardObj.distance < 0.3) canBackward = false;

      //Left check
      const leftDir = new Vector3(dir.z, 0, -dir.x);
      this.raycaster.set(origin, leftDir);
      const leftObj = this.raycaster.intersectObjects(walls)[0];
      if (leftObj && leftObj.distance < 0.3) canLeft = false;

      //Right check
      const rightDir = new Vector3(-dir.z, 0, dir.x);
      this.raycaster.set(origin, rightDir);
      const rightObj = this.raycaster.intersectObjects(walls)[0];
      if (rightObj && rightObj.distance < 0.3) canRight = false;

      const vel = 0.04;
      canForward && moving.forward && controls.moveForward(vel);
      canBackward && moving.backward && controls.moveForward(-vel);
      canLeft && moving.left && controls.moveRight(-vel);
      canRight && moving.right && controls.moveRight(vel);
    }

    this.instance.render(this.viewer.scene, this.viewer.camera.instance);
    this.stats.update();
  }
}
