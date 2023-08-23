import { atom } from "recoil";

export const cameraPosition = atom({
    key: "camera-position",
    default: [0, 0, 20],
  });