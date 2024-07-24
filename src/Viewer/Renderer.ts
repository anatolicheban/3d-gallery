import { Viewer } from "./index.ts";
import { WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class Renderer {
  viewer = new Viewer();
  instance = new WebGLRenderer({
    canvas: this.viewer.canvas,
    antialias: true,
  });

  stats = new Stats();

  constructor() {
    document.body.appendChild(this.stats.dom);

    this.instance.setClearColor("#545454");
    this.instance.setSize(this.viewer.sizes.width, this.viewer.sizes.height);
    this.instance.setPixelRatio(this.viewer.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.viewer.sizes.width, this.viewer.sizes.height);
  }

  update() {
    this.instance.render(this.viewer.scene, this.viewer.camera.instance);
    this.stats.update();
  }
}
