import { atom } from "recoil";

export const junctionAtoms = atom({
    key: "junction-atoms",
    default: [],    // stores the state of junction in form [{position, name}, {position, name}, ...]
  });
