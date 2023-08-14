import { atom } from "recoil";

export const carAtoms = atom({
    key: "car-atoms",
    default: [],    // stores the state of cars in form [{name, position, rotation}, {name, position, }, ...]
  });