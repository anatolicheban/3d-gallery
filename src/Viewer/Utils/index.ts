import { Walls } from "../World/Gallery";

export const setWalls = (walls: Walls) => {
  walls[0].position.set(-4, 0.5, 0);
  walls[0].rotation.y = Math.PI / 2;

  walls[1].position.set(0, 0.5, -2);

  walls[2].position.set(4, 0.5, 0);
  walls[2].rotation.y = -Math.PI / 2;

  walls[3].position.set(0, 0.5, 2);
};
