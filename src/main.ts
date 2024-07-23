import "./styles/style.scss";
import { Viewer } from "./Viewer";

const canvas = document.getElementById("viewer") as HTMLCanvasElement;

const viewer = new Viewer(canvas);
