import { Viewer } from "../../index.ts";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";
import { setWalls } from "../../Utils";

export type Wall = Mesh<PlaneGeometry, MeshStandardMaterial>;

export type Walls = [Wall, Wall, Wall, Wall];

export class Gallery {
  viewer = new Viewer();

  body = new Group();

  floor = new Mesh(
    new PlaneGeometry(4, 4),
    new MeshStandardMaterial({
      side: DoubleSide,
      roughness: 0.05,
      metalness: 0.25,
    }),
  );

  walls: Walls;

  constructor() {
    this.floor.rotation.x = -Math.PI / 2;

    const w = new Mesh(
      new PlaneGeometry(4, 1),
      new MeshStandardMaterial({
        side: DoubleSide,
      }),
    );

    this.walls = [w.clone(), w.clone(), w.clone(), w.clone()];

    setWalls(this.walls);

    this.body.add(this.floor, ...this.walls);
    this.viewer.scene.add(this.body);
  }
}
