import { gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useRecoilState, useRecoilValue } from "recoil"
import { useContext } from "react";
import { GameObjectContext } from "./GameObject";

/**
 * Returns the current state of a game object
 * @returns the game objects state
 */
export function useGameObject() {
    const id = useContext(GameObjectContext).id;
    const context = useRecoilValue(gameObjectRegistry(id));

    return context;
}

