import { Viewer } from "./index.ts";
import { Raycaster, WebGLRenderer } from "three";
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
    const controls = this.viewer.camera.controls;
    const move = this.viewer.camera.moving;

    if (controls.isLocked) {
      const vel = 0.04;
      move.forward && controls.moveForward(vel);
      move.backward && controls.moveForward(-vel);
      move.leftward && controls.moveRight(-vel);
      move.rightward && controls.moveRight(vel);
    }

    this.instance.render(this.viewer.scene, this.viewer.camera.instance);
    this.stats.update();
  }
}
