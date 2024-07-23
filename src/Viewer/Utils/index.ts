import { Walls } from "../World/Gallery";
import { Object3D, Raycaster, Vector3 } from "three";

export const setWalls = (walls: Walls) => {
  walls[0].position.set(-3, 0.5, 0);
  walls[0].rotation.y = Math.PI / 2;

  walls[1].position.set(0, 0.5, -3);

  walls[2].position.set(3, 0.5, 0);
  walls[2].rotation.y = -Math.PI / 2;

  walls[3].position.set(0, 0.5, 3);
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

export const setFrames = () => {};
