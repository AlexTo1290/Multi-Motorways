import { atom } from "recoil";

export const nextUniqueId = atom({
    key: "car-atoms",
    default: 0,    // stores the state of cars in form [{name, position, rotation}, {name, position, }, ...]
  });