import { useRecoilCallback } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import calculateNextPosition from "../components/utils/calculateNextPosition";


function CirclingCarScript() {
    const state = useGameObject();  // getting subscribed-to game object state

    // callback function that updates the position of the game object
    const updatePosition = useRecoilCallback(({set}) => () => {
        let newState = {...state };  // gets a copy of the game state

        let newPosition = [...calculateNextPosition(newState.position[0], newState.position[1], newState.rotation, 0.01), newState.position[2]]
        newState.position = newPosition;

        newState.rotation = newState.rotation + Math.PI/150

        set(gameObjectRegistry(state.id), newState)  // setting the new game state in the game object directory
    });

    useFrame((game, delta) => {
        if (state) {
            updatePosition()
        };
    })
}

export default CirclingCarScript;