import { atom } from "recoil";
import { useRecoilState } from "recoil";

export const nextUniqueId = atom({
    key: "car-atoms",
    default: 0,    // stores the state of cars in form [{name, position, rotation}, {name, position, }, ...]
  });

export function getUniqueId() {
    const [id, setId] = useRecoilState(nextUniqueId);
    
    uniqueId = id;
    setId(id++);
    return uniqueId;
}