import { gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useRecoilValue } from "recoil"
import { useContext } from "react";
import { GameObjectContext } from "./GameObject";

/**
 * Returns the current state of the subscribed-to game object
 * @returns the game object's state
 */
export function useGameObject() {
    const id = useContext(GameObjectContext).id;    // getting the id of the subscribed-to game object
    const context = useRecoilValue(gameObjectRegistry(id));  // getting game object state
    
    return context;
}