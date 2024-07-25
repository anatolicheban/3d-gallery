import { Camera } from "./Camera.ts";
import { Renderer } from "./Renderer.ts";
import { World } from "./World";
import { Scene, TextureLoader } from "three";
import { Sizes } from "./Utils/Sizes.ts";
import { Time } from "./Utils/Time.ts";
import { DebugUI } from "./Utils/DebugUI.ts";
import { Loader } from "./Utils/Loader.ts";

let _viewer: Viewer;
//undefined
//Viewer

export class Viewer {
  canvas?: HTMLCanvasElement;
  wrapper?: HTMLElement;

  camera: Camera;
  renderer: Renderer;
  world: World;
  scene: Scene;

  //Utils
  sizes: Sizes;
  time: Time;
  loader: Loader;

  debugUI: DebugUI;

  constructor(element?: HTMLCanvasElement, wrapper?: HTMLElement) {
    if (_viewer) return _viewer;
    if (element) this.canvas = element;
    if (wrapper) this.wrapper = wrapper;
    if (!this.canvas) {
      console.error("Missing canvas");
      return;
    }
    _viewer = this;

    //Utils
    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.loader = new Loader();

    this.world = new World();

    this.setListeners();

    this.debugUI = new DebugUI();
  }

  setListeners() {
    this.sizes.resize.on(() => {
      this.resize();
    });
    this.time.timeTick.on(() => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
