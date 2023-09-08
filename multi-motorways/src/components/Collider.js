import { useGameObject } from "./useGameObject";
import { getCollisions } from "../recoil/selector/getCollisions";
import { useRecoilValue } from "recoil";

function Collider({ types=["all"] }) {
    // Getting game object's state
    const state = useGameObject();

    // Checking for collisions with any of the chosen types
    const collisions = useRecoilValue(getCollisions({position: state?.position, types}));

}

/**
 * Finds whether two game objects are colliding by comparing their states
 * @param {*} state1 the state of the first game object
 * @param {*} state2 the state of the second game object
 */
function checkForCollision(state1, state2) {
    // Getting the positions of the game objects
    let pos1 = state1.position;
    let pos2 = state2.position;

    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) return true;
    else return false;
}

export default Collider;