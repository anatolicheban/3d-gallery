import { Viewer } from "./index.ts";
import { Raycaster, Vector3, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { checkCollisions } from "./Utils";

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
      const origin = this.viewer.camera.instance.position;
      const dir = new Vector3();

      this.viewer.camera.instance.getWorldDirection(dir);
      dir.y = 0;
      dir.normalize();

      //Forward check
      const canForward = !checkCollisions(this.raycaster, origin, dir, walls);

      //Backward check
      const backDir = new Vector3(-dir.x, 0, -dir.z);
      const canBackward = !checkCollisions(
        this.raycaster,
        origin,
        backDir,
        walls,
      );

      //Left check
      const leftDir = new Vector3(dir.z, 0, -dir.x);
      const canLeft = !checkCollisions(this.raycaster, origin, leftDir, walls);

      //Right check
      const rightDir = new Vector3(-dir.z, 0, dir.x);
      const canRight = !checkCollisions(
        this.raycaster,
        origin,
        rightDir,
        walls,
      );

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
