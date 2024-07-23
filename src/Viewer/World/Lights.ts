import { AmbientLight, PointLight } from "three";
import { Viewer } from "../index.ts";

export class Lights {
  viewer = new Viewer();
  ambient = new AmbientLight("#fff", 1);
  point = new PointLight("#fff", 10);
  constructor() {
    this.point.position.set(1, 2, 0);
    this.viewer.scene.add(this.point, this.ambient);
  }
}
