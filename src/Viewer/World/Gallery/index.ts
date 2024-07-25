import { Viewer } from "../../index.ts";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
} from "three";
import { setWalls } from "../../Utils";
import { Picture } from "./Picture.ts";
import { PATH } from "../../../main.ts";

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

  ceil = new Mesh(
    new PlaneGeometry(6, 6),
    new MeshStandardMaterial({
      side: DoubleSide,
      roughness: 0.25,
    }),
  );

  walls: Walls;

  pictures = {
    monaLisa: new Picture(
      `${PATH}/mona-lisa.jpg`,
      'Leonardo da Vinci "Mona Lisa, La Gioconda"',
    ),
    vanGogh: new Picture(
      `${PATH}/van-gogh.jpg`,
      'Van Gogh "De sterrennacht", 1889',
    ),
    vanGogh2: new Picture(
      `${PATH}/van-gogh-2.jpg`,
      'Edvard Munch "The Scream", 1893',
    ),
    leo: new Picture(
      `${PATH}/leo.jpg`,
      'Leonardo da Vinci "Dama con l\'ermellino", 1490',
    ),
    wave: new Picture(
      `${PATH}/wave.jpg`,
      'Hokusai "The Great Wave off Kanagawa", 1831',
    ),
    rembrandt: new Picture(
      `${PATH}/rembrandt.jpg`,
      'Rembrandt "The Return Of The Prodigal Son", 1669',
    ),
    monet: new Picture(
      `${PATH}/monet.jpg`,
      'Oscar-Claude Monet "Impression, soleil levant", 1872',
    ),
    liberty: new Picture(
      `${PATH}/liberty.webp`,
      'Eugène Delacroix "La Liberté guidant le peuple", 1830',
    ),

    irises: new Picture(`${PATH}/irises.jpg`, 'Van Gogh "Irises", 1889'),

    lastSupper: new Picture(
      `${PATH}/last-supper.jpg`,
      'Leonardo da Vinci "The Last Supper"',
      1.75,
    ),
  };
  constructor() {
    this.viewer.loader.texture.load(`${PATH}/floor-2.jpg`, (t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(10, 10);
      t.needsUpdate = true;
      this.floor.material.map = t;
      this.floor.material.needsUpdate = true;
    });

    this.viewer.loader.texture.load(`${PATH}/ceil3.jpg`, (t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(10, 10);
      t.needsUpdate = true;
      this.ceil.material.map = t;
      this.ceil.material.needsUpdate = true;
    });

    this.floor.rotation.x = -Math.PI / 2;

    this.ceil.rotation.x = Math.PI / 2;
    this.ceil.position.y = 2;

    const w = new Mesh(
      new PlaneGeometry(6, 2),
      new MeshStandardMaterial({
        side: DoubleSide,
        color: "#fff",
        // roughness: 0,
        // metalness: 0.5,
      }),
    );

    this.walls = [w.clone(), w.clone(), w.clone(), w.clone()];

    setWalls(this.walls);

    this.setPictures();

    this.body.add(this.floor, ...this.walls, this.ceil);
    this.viewer.scene.add(this.body);
  }

  setPictures() {
    const {
      monaLisa,
      vanGogh,
      vanGogh2,
      leo,
      wave,
      rembrandt,
      monet,
      liberty,
      irises,
      lastSupper,
    } = this.pictures;

    monaLisa.position.set(0, 1, -3);

    vanGogh.position.set(-1.5, 1, -3);

    vanGogh2.position.set(1.5, 1, -3);

    leo.position.set(-3, 1, 1.5);
    leo.rotation.y = Math.PI / 2;

    wave.position.set(-3, 1, 0);
    wave.rotation.y = Math.PI / 2;

    rembrandt.position.set(-3, 1, -1.5);
    rembrandt.rotation.y = Math.PI / 2;

    monet.position.set(3, 1, -1.5);
    monet.rotation.y = -Math.PI / 2;

    liberty.position.set(3, 1, 0);
    liberty.rotation.y = -Math.PI / 2;

    irises.position.set(3, 1, 1.5);
    irises.rotation.y = -Math.PI / 2;

    lastSupper.position.set(0, 1, 3);
    lastSupper.rotation.y = Math.PI;

    this.body.add(
      monaLisa,
      vanGogh,
      vanGogh2,
      leo,
      wave,
      rembrandt,
      monet,
      liberty,
      irises,
      lastSupper,
    );
  }
}
