import { Viewer } from "../../index.ts";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
} from "three";
import { setWalls } from "../../Utils";
import { Picture } from "./Picture.ts";
import { texture } from "three/examples/jsm/nodes/accessors/TextureNode";

export type Wall = Mesh<PlaneGeometry, MeshStandardMaterial>;

export type Walls = [Wall, Wall, Wall, Wall];

export class Gallery {
  viewer = new Viewer();

  body = new Group();

  floor = new Mesh(
    new PlaneGeometry(6, 6),
    new MeshStandardMaterial({
      side: DoubleSide,
      roughness: 0.05,
      metalness: 0.25,
    }),
  );

  walls: Walls;

  // picture = new Picture("/public/mona-lisa.jpg");

  pictures = {
    monaLisa: new Picture("/public/mona-lisa.jpg"),
    vanGogh: new Picture("/public/van-gogh.jpg"),
    vanGogh2: new Picture("/public/van-gogh-2.jpg"),
  };

  constructor() {
    new TextureLoader().load("/floor-2.jpg", (t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.needsUpdate = true;
      this.floor.material.map = t;
      this.floor.material.needsUpdate = true;
    });

    this.floor.rotation.x = -Math.PI / 2;

    const w = new Mesh(
      new PlaneGeometry(6, 1),
      new MeshStandardMaterial({
        side: DoubleSide,
      }),
    );

    this.walls = [w.clone(), w.clone(), w.clone(), w.clone()];

    setWalls(this.walls);

    this.setPictures();

    this.body.add(this.floor, ...this.walls);
    this.viewer.scene.add(this.body);
  }

  setPictures() {
    const { monaLisa, vanGogh, vanGogh2 } = this.pictures;

    monaLisa.position.set(0, 0.5, -3);

    vanGogh.position.set(-1.5, 0.5, -3);

    vanGogh2.position.set(1.5, 0.5, -3);

    this.body.add(monaLisa, vanGogh, vanGogh2);
  }
}
