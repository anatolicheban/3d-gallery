import "./styles/style.scss";
import { Viewer } from "./Viewer";

declare global {
  interface Window {
    v: Viewer;
  }
}

const canvas = document.getElementById("viewer") as HTMLCanvasElement;

const viewer = (window.v = new Viewer(canvas));

const loader = document.getElementById("loader")!;
const progressLine = document.querySelector(
  ".progress-line",
)! as HTMLDivElement;
const progressValue = document.querySelector(".progress-value")!;
const pressEnterText = document.querySelector(".press")!;

// const pauseScreen = document.getElementById("pause")!;

viewer.loader.progressEvent.on((p) => {
  const percent = `${p.toFixed(2)}%`;
  progressLine.style.width = percent;
  progressValue.innerHTML = percent;

  if (p === 100) {
    pressEnterText.classList.add("shown");
    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        loader.classList.add("hidden");
      }
    });
  }
});
