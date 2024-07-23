import { Viewer } from "../index.ts";
import { TypedEvent } from "./Event.ts";

export class Time {
  viewer = new Viewer();

  start = Date.now();
  current = this.start;
  elapsed = 0;
  delta = 25;

  timeTick = new TypedEvent<void>();

  constructor() {
    this.tick();
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.timeTick.emit();
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
