import { atomFamily, useRecoilState, useSetRecoilState } from "recoil";
import { getUniqueId } from "../recoil/atom/idValues";

// ============= ATOM FAMILIES =============
// Holds the states of the game objects in the game sorted by ID
export const gameObjectRegistry = atomFamily({
    key: "gameObjectRegistry",
    default: null
})
2
// Holds the states of the game objects in the game sorted by type (and then id) e.g. {"cars": { id1: props, ... }, ...}
export const gameObjectRegistryByType = atomFamily({
  key: "gameObjectRegistryByType",
  default: {}
})


/**
 * Registers an object to hte game objects registry
 * @param {*} gameObjectProps holds the properties of the game object 
 * @return the id the game object is registered as
 */
export const registerGameObject = ({ name, type, position, direction, isVisible, collisions }) => {   
  // getting a unique id for the game object
  const id = getUniqueId();

  // accessing registries
  const setGameObjects = useSetRecoilState(gameObjectRegistry(id));
  const [gameObjectsByType, setGameObjectsByType] = useRecoilState(gameObjectRegistryByType(type));

  const newGameObject = { id: id, type: type, name: name, position: position, direction: direction, isVisible: isVisible, collisions: collisions };

  // registering the new game object into the game object registries
  setGameObjects(newGameObject);
  
  let newGameObjects = { ...gameObjectsByType };  // copies contents of gameObjectsByType into newGameObjects
  newGameObjects[id] = newGameObject;
  
  setGameObjectsByType(newGameObjects);

  return id;  // returning the id the game object has been registered as
}


/**
 * Unregisters an object from the game object directories
 * @param {*} gameObjectProps the id and type of the game object being unregistered
 * @returns 
 */
export const unregisterGameObject = ({ type, id, }) => {
  const setGameObjects = useSetRecoilState(gameObjectRegistry(id));
  const [gameObjectsByType, setGameObjectsByType] = useRecoilState(gameObjectRegistryByType(type));

  // removing the game object from the game object registries
  setGameObjects(null)

  let newGameObjects = { ...gameObjectsByType };
  newGameObjects[id] = undefined;
  setGameObjects(newGameObjects);

  return true;
}