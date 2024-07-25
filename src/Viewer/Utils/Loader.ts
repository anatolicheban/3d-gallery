import { Texture, TextureLoader } from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { PATH } from "../../main.ts";

type ItemToLoad<T> = {
  name: T;
  path: string;
};

type TextureNames = "monaLisa";
type FontName = "gentilis";

type TextureToLoad = ItemToLoad<TextureNames>;
type FontToLoad = ItemToLoad<FontName>;

const texturesToLoad: TextureToLoad[] = [
  {
    name: "monaLisa",
    path: `${PATH}/mona-lisa.jpg`,
  },
];

const fontsToLoad: FontToLoad[] = [
  {
    name: "gentilis",
    path: "/gentilis.json",
  },
];

export class Loader {
  texture = new TextureLoader();
  font = new FontLoader();

  progress = 0;

  loadedTextures: Partial<{ [keyof in TextureNames]: Texture }> = {};
  constructor() {}

  async loadTextures() {
    try {
      for (const item of texturesToLoad) {
        this.loadedTextures[item.name] = await this.texture.loadAsync(
          item.path,
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  async loadFonts() {}

  setProgress(value: number) {
    this.progress = value;
  }
}
