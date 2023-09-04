import { atomFamily } from "recoil";

// ============= ATOM FAMILIES =============
// Holds the states of the game objects in the game sorted by ID
export const gameObjectRegistry = atomFamily({
    key: "gameObjectRegistry",
    default: null,
    dangerouslyAllowMutability: true
})

// Takes a game object type as the key and returns all game object id's of that type
export const gameObjectRegistryByType = atomFamily({
  key: "gameObjectRegistryByType",
  default: [],
  dangerouslyAllowMutability: true
})