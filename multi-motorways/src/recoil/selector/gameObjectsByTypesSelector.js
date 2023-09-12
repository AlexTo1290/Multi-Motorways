import { selectorFamily } from "recoil";
import { gameObjectRegistry, gameObjectRegistryByType } from "../atom/gameObjectRegistry";

// ===================================== CODE NOT IN USE =========================================
export const gameObjectsByTypesSelector = selectorFamily({
    key: "gameObjectsByTypesSelector",
    get: ({ types, excludes=[], dependencies }) => ({get}) => {
        if ( types === undefined || types === null ) {
            return;
        }

        // Getting the game objects of the given types
        let gameObjects = [];
        let gameObjectIds = [];

        // getting the ids of for the given types
        for (let i = 0; i < types.length; i++) {
            // getting objs of the current type from the atom family, converting result to arr, then appending to gameObjects
            let currentGameObjects = get(gameObjectRegistryByType(types[i]));
            gameObjectIds.push(...currentGameObjects);
        }

        // removing any "exclude" ids
        for (let i = 0; i < excludes.length; i++) {
            gameObjectIds.splice(gameObjectIds.indexOf(excludes[i]), 1);
        }
        
        // getting the game object corresponding to the ids
        for (let i = 0; i < gameObjectIds.length; i++) {
            gameObjects.push(get(gameObjectRegistry(gameObjectIds[i])));
        }

        return gameObjects;
    }
})