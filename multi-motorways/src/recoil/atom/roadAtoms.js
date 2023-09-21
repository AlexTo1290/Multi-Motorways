import { atom, atomFamily } from "recoil";

export const roadTiles = atom({
    key: "road-Tiles",
    default: [],
    dangerouslyAllowMutability: true
  });

export const roadTilesJunctions = atom({
  key: "road-Tiles-junctions",
  default: [],
  dangerouslyAllowMutability: true
});

export const roadTilesJunctionsFamily = atomFamily({
  key: "road-Tiles-junctions-family",
  default: "",
  dangerouslyAllowMutability: true
});