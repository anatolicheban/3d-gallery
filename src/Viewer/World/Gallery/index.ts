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
      `monaLisa`,
      'Leonardo da Vinci "Mona Lisa, La Gioconda"',
    ),
    vanGogh: new Picture(`vanGogh`, 'Van Gogh "De sterrennacht", 1889'),
    munch: new Picture("munch", 'Edvard Munch "The Scream", 1893'),
    leo: new Picture("leo", 'Leonardo da Vinci "Dama con l\'ermellino", 1490'),
    wave: new Picture("wave", 'Hokusai "The Great Wave off Kanagawa", 1831'),
    rembrandt: new Picture(
      `rembrandt`,
      'Rembrandt "The Return Of The Prodigal Son", 1669',
    ),
    monet: new Picture(
      `monet`,
      'Oscar-Claude Monet "Impression, soleil levant", 1872',
    ),
    liberty: new Picture(
      `liberty`,
      'Eugène Delacroix "La Liberté guidant le peuple", 1830',
    ),

    irises: new Picture(`irises`, 'Van Gogh "Irises", 1889'),

    lastSupper: new Picture(
      `lastSupper`,
      'Leonardo da Vinci "The Last Supper"',
      1.75,
    ),
  };
  constructor() {
    this.viewer.loader.itemsLoaded.on(({ textures }) => {
      const { ceil, floor } = textures;

      floor.wrapS = RepeatWrapping;
      floor.wrapT = RepeatWrapping;
      floor.repeat.set(10, 10);
      floor.needsUpdate = true;
      this.floor.material.map = floor;
      this.floor.material.needsUpdate = true;

      ceil.wrapS = RepeatWrapping;
      ceil.wrapT = RepeatWrapping;
      ceil.repeat.set(10, 10);
      ceil.needsUpdate = true;
      this.ceil.material.map = ceil;
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
      munch,
      leo,
      wave,
      rembrandt,
      monet,
      liberty,
      irises,
      lastSupper,
    } = this.pictures;

    monaLisa.position.set(0, 0.8, -3);

    vanGogh.position.set(-1.5, 0.8, -3);

    munch.position.set(1.5, 0.8, -3);

    leo.position.set(-3, 0.8, 1.5);
    leo.rotation.y = Math.PI / 2;

    wave.position.set(-3, 0.8, 0);
    wave.rotation.y = Math.PI / 2;

    rembrandt.position.set(-3, 0.8, -1.5);
    rembrandt.rotation.y = Math.PI / 2;

    monet.position.set(3, 0.8, -1.5);
    monet.rotation.y = -Math.PI / 2;

    liberty.position.set(3, 0.8, 0);
    liberty.rotation.y = -Math.PI / 2;

    irises.position.set(3, 0.8, 1.5);
    irises.rotation.y = -Math.PI / 2;

    lastSupper.position.set(0, 0.8, 3);
    lastSupper.rotation.y = Math.PI;

    this.body.add(
      monaLisa,
      vanGogh,
      munch,
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
