import { Texture, TextureLoader } from "three";
//@ts-ignore
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TypedEvent } from "./Event.ts";

export const PATH = location.hostname.includes("localhost")
  ? ""
  : "/portfolio/3d-gallery";

type ItemToLoad<T> = {
  name: T;
  path: string;
};

type LoadedItems<T extends string, K> = {
  [key in T]: K;
};

export type TextureNames =
  | "monaLisa"
  | "vanGogh"
  | "munch"
  | "leo"
  | "wave"
  | "rembrandt"
  | "monet"
  | "liberty"
  | "irises"
  | "lastSupper"
  | "ceil"
  | "floor";

type FontNames = "gentilis";

type TextureToLoad = ItemToLoad<TextureNames>;
type FontToLoad = ItemToLoad<FontNames>;

type LoadedTextures = LoadedItems<TextureNames, Texture>;
type LoadedFonts = LoadedItems<FontNames, Font>;

const texturesToLoad: TextureToLoad[] = [
  {
    name: "monaLisa",
    path: `${PATH}/mona-lisa.jpg`,
  },
  {
    name: "vanGogh",
    path: `${PATH}/van-gogh.jpg`,
  },
  {
    name: "munch",
    path: `${PATH}/munch.jpg`,
  },
  {
    name: "leo",
    path: `${PATH}/leo.jpg`,
  },
  {
    name: "wave",
    path: `${PATH}/wave.jpg`,
  },
  {
    name: "rembrandt",
    path: `${PATH}/rembrandt.jpg`,
  },
  {
    name: "monet",
    path: `${PATH}/monet.jpg`,
  },
  {
    name: "liberty",
    path: `${PATH}/liberty.webp`,
  },
  {
    name: "irises",
    path: `${PATH}/irises.jpg`,
  },
  {
    name: "lastSupper",
    path: `${PATH}/last-supper.jpg`,
  },
  {
    name: "ceil",
    path: `${PATH}/ceil.jpg`,
  },
  {
    name: "floor",
    path: `${PATH}/floor.jpg`,
  },
];

const fontsToLoad: FontToLoad[] = [
  {
    name: "gentilis",
    path: `${PATH}/gentilis.json`,
  },
];

export class Loader {
  texture = new TextureLoader();
  font = new FontLoader();

  progress = 0;

  progressEvent = new TypedEvent<number>();

  loadedTextures: Partial<LoadedTextures> = {};
  loadedFonts: Partial<LoadedFonts> = {};

  itemsLoaded = new TypedEvent<{
    textures: LoadedTextures;
    fonts: LoadedFonts;
  }>();

  constructor() {
    this.itemsLoaded.on((d) => console.log(d));
    Promise.all([this.loadTextures(), this.loadFonts()]).then(() => {
      this.itemsLoaded.emit({
        textures: this.loadedTextures as LoadedTextures,
        fonts: this.loadedFonts as LoadedFonts,
      });
    });
  }

  async loadTextures() {
    try {
      for (const item of texturesToLoad) {
        this.loadedTextures[item.name] = await this.texture.loadAsync(
          item.path,
        );
        this.setProgress();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async loadFonts() {
    try {
      for (const item of fontsToLoad) {
        this.loadedFonts[item.name] = await this.font.loadAsync(item.path);
      }
      this.setProgress();
    } catch (e) {
      console.error(e);
    }
  }

  setProgress() {
    const all =
      Object.keys(texturesToLoad).length + Object.keys(fontsToLoad).length;
    const loaded =
      Object.keys(this.loadedTextures).length +
      Object.keys(this.loadedFonts).length;
    this.progress = (loaded / all) * 100;

    this.progressEvent.emit(this.progress);
  }
}
