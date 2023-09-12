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

// Holds the collisions of game objects
export const gameObjectCollisionRegistry = atomFamily({
  key: "gameObjectCollisionRegistry",
  default: [],
  dangerouslyAllowMutability: true  
})

// Holds the hitboxes (bounding boxes) of game objects (which is a Three.Box3 type)
export const gameObjectBoundingBoxes = atomFamily({
  key: "gameObjectBoundingBoxes#",
  default: null,
  dangerouslyAllowMutability: true
})