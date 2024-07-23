import {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";
import { setFrames } from "../../Utils";

export const PIC_SIZE = 0.25;
export const FRAME_WIDTH = 0.01;

const loader = new TextureLoader();
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
  painting?: Mesh<PlaneGeometry, MeshStandardMaterial>;

  sizes: PictureSizes = {
    w: PIC_SIZE,
    h: PIC_SIZE,
  };

  frames?: Frames;
  constructor(image: string) {
    super();

    loader.load(image, (texture) => {
      const aspect = texture.image.width / texture.image.height;

      this.sizes = {
        w: aspect >= 1 ? PIC_SIZE : PIC_SIZE * aspect,
        h: aspect <= 1 ? PIC_SIZE : PIC_SIZE * aspect,
      };

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
      this.position.set(0, 0.5, -1);
      this.add(this.painting, ...this.frames);
    });
  }
}
