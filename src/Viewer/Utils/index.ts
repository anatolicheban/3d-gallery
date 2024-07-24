import { Walls } from "../World/Gallery";
import { Object3D, Raycaster, Vector3 } from "three";
import {
  Frame,
  FRAME_WIDTH,
  Frames,
  PictureSizes,
} from "../World/Gallery/Picture.ts";

export const setWalls = (walls: Walls) => {
  walls[0].position.set(-3, 1, 0);
  walls[0].rotation.y = Math.PI / 2;

  walls[1].position.set(0, 1, -3);

  walls[2].position.set(3, 1, 0);
  walls[2].rotation.y = -Math.PI / 2;

  walls[3].position.set(0, 1, 3);
};

export const checkCollisions = (
  raycaster: Raycaster,
  origin: Vector3,
  dir: Vector3,
  objects: Object3D[],
) => {
  raycaster.set(origin, dir);
  const object = raycaster.intersectObjects(objects)[0];
  // if (object && object.distance < 0.3) return true;
  // return false;
  return object && object.distance < 0.5;
};

export const setFrames = (frames: Frames, sizes: PictureSizes) => {
  frames[0].position.set(-sizes.w / 2 + FRAME_WIDTH / 2, 0, 0);

  frames[1].position.set(0, sizes.h / 2 - FRAME_WIDTH / 2, 0);

  frames[2].position.set(sizes.w / 2 - FRAME_WIDTH / 2, 0, 0);

  frames[3].position.set(0, -sizes.h / 2 + FRAME_WIDTH / 2, 0);
};
