import { selectorFamily } from "recoil";
import { gameObjectRegistry, gameObjectRegistryByType } from "../atom/gameObjectRegistry";

// ===================================== CODE NOT IN USE =========================================
export const getCollisions = selectorFamily({
    key: "getCollisions",
    get: ({position, types}) => ({get}) => {
        // Getting the game objects of the given types
        let gameObjects = [];
        let gameObjectIds = [];

        // getting the ids of for the given types
        for (let i = 0; i < types.length; i++) {
            // getting objs of the current type from the atom family, converting result to arr, then appending to gameObjects
            let currentGameObjects = get(gameObjectRegistryByType(types[i]));
            gameObjectIds.push(...currentGameObjects);
        }

        // getting the game object corresponding to the ids
        for (let i = 0; i < gameObjectIds.length; i++) {
            gameObjects.push(get(gameObjectRegistry(gameObjectIds[i])));
        }

        
    //     // ========= WORK IN PROGRESS =========
    //     // Looking for collisions with any of these game objects (by exact locations which isn't ideal)
    //     let colliders = [];

    //     for (let i = 0; i < gameObjects.length; i++) {
    //         let posOfObj = gameObjects[i].position;

    //         if (posOfObj[0] == position[0] && posOfObj[1] == position[1]) {
    //             colliders.push(gameObjects[i]);
    //         }
    //     }

    //     return colliders;
    }
})