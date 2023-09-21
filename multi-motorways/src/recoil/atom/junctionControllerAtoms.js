import { atomFamily } from "recoil";

export const TJunctionControllerAtom = atomFamily({
    key: "TJunctionControllerAtoms",
    default: {"inner": false, "outer": false},
    dangerouslyAllowMutability: true  
  })