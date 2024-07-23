import {
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

export const PIC_SIZE = 0.25;

const loader = new TextureLoader();

export class Picture extends Group {
  painting?: Mesh<PlaneGeometry, MeshStandardMaterial>;

  sizes = {
    w: PIC_SIZE,
    h: PIC_SIZE,
  };
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
      this.painting.position.set(0, 0.5, -1);

      this.add(this.painting);
    });
  }
}
