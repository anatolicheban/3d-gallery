import { AmbientLight, PointLight } from "three";
import { Viewer } from "../index.ts";

export class Lights {
  viewer = new Viewer();
  ambient = new AmbientLight("#fff", 1);
  point = new PointLight("#fff", 20);

  constructor() {
    this.point.position.set(0, 1.99, 0);
    this.viewer.scene.add(this.ambient, this.point);
  }
}
