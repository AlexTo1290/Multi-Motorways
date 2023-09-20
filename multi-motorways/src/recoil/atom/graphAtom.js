import { atom } from "recoil";

export const graphRoads = atom({
    key: "graph-Roads",
    default: [[],[]], // [[Nodes],[Edges]]
  });