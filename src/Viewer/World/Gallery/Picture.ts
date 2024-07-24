import {
  Box3,
  BoxGeometry,
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";
import { setFrames } from "../../Utils";
import { Viewer } from "../../index.ts";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export const PIC_SIZE = 0.7;
export const FRAME_WIDTH = 0.02;

export type Frame = Mesh<BoxGeometry, MeshStandardMaterial>;
export type Frames = [Frame, Frame, Frame, Frame];

export type PictureSizes = {
  w: number;
  h: number;
};

const frameMaterial = new MeshStandardMaterial({
  color: "#461800",
});

export class Picture extends Group {
  viewer = new Viewer();
  painting?: Mesh<PlaneGeometry, MeshStandardMaterial>;

  sizes: PictureSizes = {
    w: PIC_SIZE,
    h: PIC_SIZE,
  };

  desc?: Mesh<TextGeometry, MeshStandardMaterial>;

  frames?: Frames;
  constructor(image: string, text = "Text") {
    super();

    new FontLoader().load("/gentilis.json", (font) => {
      this.desc = new Mesh(
        new TextGeometry(text, {
          font,
          size: 0.04,
          depth: 0.005,
        }),
        new MeshStandardMaterial({
          color: "#000",
        }),
      );
      this.setDescPos();
      this.add(this.desc);
    });

    this.viewer.loader.load(image, (texture) => {
      const aspect = texture.image.width / texture.image.height;

      this.sizes = {
        w: aspect >= 1 ? PIC_SIZE : PIC_SIZE * aspect,
        h: aspect <= 1 ? PIC_SIZE : PIC_SIZE / aspect,
      };

      this.setDescPos();

      this.painting = new Mesh(
        new PlaneGeometry(this.sizes.w, this.sizes.h),
        new MeshStandardMaterial({
          map: texture,
        }),
      );

      this.frames = [
        new Mesh(
          new BoxGeometry(FRAME_WIDTH, this.sizes.h, FRAME_WIDTH),
          frameMaterial,
        ),
        new Mesh(
          new BoxGeometry(this.sizes.w, FRAME_WIDTH, FRAME_WIDTH),
          frameMaterial,
        ),
        new Mesh(
          new BoxGeometry(FRAME_WIDTH, this.sizes.h, FRAME_WIDTH),
          frameMaterial,
        ),
        new Mesh(
          new BoxGeometry(this.sizes.w, FRAME_WIDTH, FRAME_WIDTH),
          frameMaterial,
        ),
      ];

      setFrames(this.frames, this.sizes);

      [...this.frames, this.painting].forEach((el) => {
        el.position.z += FRAME_WIDTH / 2;
      });

      this.add(this.painting, ...this.frames);
    });
  }

  setDescPos() {
    if (!this.desc) return;

    const box = new Box3().setFromObject(this.desc);

    const l = box.max.x - box.min.x;

    this.desc.position.set(-l / 2, -this.sizes.h / 2 - 0.1, 0);
  }
}
