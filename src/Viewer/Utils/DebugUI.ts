import GUI from "lil-gui";
import { Viewer } from "../index.ts";
import { Color } from "three";

type Params = {
  axesVisible: boolean;
  rendererColor: string;
};

export class DebugUI extends GUI {
  viewer = new Viewer();
  params: Params;
  constructor() {
    super();

    const col = new Color();

    this.viewer.renderer.instance.getClearColor(col);

    this.params = {
      axesVisible: this.viewer.world.axesHelper.visible,
      rendererColor: col.getHexString(),
    };

    this.add(this.params, "axesVisible")
      .name("Axes Visibility")
      .onChange(() => {
        this.viewer.world.axesHelper.visible = this.params.axesVisible;
      });

    this.addColor(this.params, "rendererColor")
      .name("Renderer Color")
      .onChange(() => {
        this.viewer.renderer.instance.setClearColor(this.params.rendererColor);
      });

    this.close();
  }
}
