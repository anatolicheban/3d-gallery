import { Viewer } from "../index.ts";
import { Lights } from "./Lights.ts";
import { AxesHelper } from "three";

export class World {
  viewer = new Viewer();
  lights = new Lights();
  axesHelper = new AxesHelper(5);

  constructor() {
    this.axesHelper.visible = false;
    this.viewer.scene.add(this.axesHelper);
  }
}
