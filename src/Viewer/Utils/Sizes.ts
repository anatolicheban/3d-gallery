import { Viewer } from "../index.ts";
import { TypedEvent } from "./Event.ts";

export class Sizes {
  viewer = new Viewer();

  width = 0;
  height = 0;
  pixelRatio = 2;

  resize = new TypedEvent<number>();

  constructor() {
    this.setSizes();
    window.addEventListener("resize", () => {
      this.setSizes();
    });
  }

  setSizes() {
    this.width = this.viewer.wrapper
      ? this.viewer.wrapper.clientWidth
      : window.innerWidth;
    this.height = this.viewer.wrapper
      ? this.viewer.wrapper.clientHeight
      : window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.resize.emit(10);
  }
}
