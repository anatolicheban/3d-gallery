import { AmbientLight, PointLight } from "three";
import { Viewer } from "../index.ts";

export class Lights {
  viewer = new Viewer();
  ambient = new AmbientLight("#fff", 1);
  point = new PointLight("#fff", 2);
  constructor() {
    this.point.position.setScalar(1);
    this.viewer.scene.add(this.point, this.ambient);
  }
}
