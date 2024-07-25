import "./styles/style.scss";
import { Viewer } from "./Viewer";

export const PATH = location.hostname.includes("localhost")
  ? ""
  : "/portfolio/3d-gallery";

const canvas = document.getElementById("viewer") as HTMLCanvasElement;

new Viewer(canvas);
