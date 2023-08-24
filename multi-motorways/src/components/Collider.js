import { gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useRecoilState, useRecoilValue } from "recoil"
import { useContext } from "react";
import { useGameObject } from "./useGameObject";

function Collider({ types=["all"] }) {
    // Getting game object's state
    const state = useGameObject();

    // Checking for collisions with any of the chosen types
    

    // doing nothing if "types" is empty
    if (types.length == 0) {
        return;
    }

    // detecting collisions with particular types of game objects if specified
    if (types[0] != "all") {
        let colliderByTypes = [];
        let nextKey = 0;

        for (let i = 0; i < types.length; i++) {
            colliderByTypes.push(<colliderByTypes key={nextKey} type={types[i]} />)
        }

        return <> { colliderByTypes } </>
    }

    // detectig colisions with all game objects
    return 

}

/**
 * Finds whether two game objects are colliding by comparing their states
 * @param {*} state1 the state of the first game object
 * @param {*} state2 the state of the second game object
 */
function checkForCollistion(state1, state2) {
    // Getting the positions of the game objects
    let pos1 = state1.position;
    let pos2 = state2.position;

    if (pos1[0] == pos2[0] && pos1[1] == pos2[1]) return true;
    else return false;
}

export default Collider;