import { useGameObject } from "./useGameObject";
import { gameObjectsByTypesSelector } from "../recoil/selector/gameObjectsByTypesSelector";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { gameObjectCollisionRegistry, gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";

function Collider({ types=["all"] }) {
    // Getting game object's state
    const state = useGameObject();

    // Checking for collisions with any of the chosen types
    const gameObjects = useRecoilValue(gameObjectsByTypesSelector({ types, excludes: [state?.id], dependencies: state?.position }));
    
    const updateCollisions = useRecoilCallback(({set}) => () => {
        if (state == null) return;

        // checking for collisions with other game objects
        let collisions = [];

        for (let i = 0; i < gameObjects.length; i++) {
            if (checkForCollision(state.position, gameObjects[i].position, state.hitbox, gameObjects[i].hitbox)) {
                collisions.push(gameObjects[i]);
            }
        }

        // updating the game object's collisions in the gameObjectCollisionsRegistry atom family
        set(gameObjectCollisionRegistry(state.id), collisions);

    });

    useEffect(() => {
        updateCollisions();
    }, [gameObjects])

}

/**
 * Finds whether two game objects are colliding by comparing their states
 * @param {*} state1 the state of the first game object
 * @param {*} state2 the state of the second game object
 */
function checkForCollision(firstPosition, secondPosition, firstHitbox, secondHitbox) {
    // Check to see if hitboxes are colliding
    let xDiff = Math.abs(firstPosition[0] - secondPosition[0]);
    let yDiff = Math.abs(firstPosition[1] - secondPosition[1]);
    let zDiff = Math.abs(firstPosition[2] - secondPosition[2]);

    if (xDiff < ( (firstHitbox[0] / 2) + (secondHitbox[0] / 2)) &&
            yDiff < ( (firstHitbox[1] / 2) + (secondHitbox[1] / 2)) &&
            zDiff < ( (firstHitbox[2] / 2) + (secondHitbox[2] / 2)) ) 
            {
                return true
    }
}

export default Collider;