import { useRecoilCallback } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectCollisionRegistry, gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import calculateNextPosition from "../components/utils/calculateNextPosition";


function BasicCarScript() {
    const state = useGameObject();  // getting subscribed-to game object state

    // callback function that updates the position of the game object
    const updatePosition = useRecoilCallback(({snapshot, set}) => () => {
        let newState = {...state };  // gets a copy of the game state

        // Checking for collisions
        let collisions = snapshot.getLoadable(gameObjectCollisionRegistry(state.id)).getValue();
        console.log(collisions)

        for (let i = 0; i < collisions.length; i++) {
            // checking if the colliding object is a junction
            if (collisions[i].type === "lane") {
                // updating the direction of this object to correspond to this junction
                let newRotation = 0;

                switch(collisions[i].name) {
                    case "horizontalLaneRight":
                        newRotation = 0;
                        break;
                    case "horizontalLaneLeft":
                        newRotation = Math.PI;
                        break;
                    case "verticalLaneUp":
                        newRotation = (Math.PI / 2);
                        break;
                    case "verticalLaneDown":
                        newRotation = ((Math.PI * 3) / 2);
                }
                newState.rotation = newRotation;
            }
        }

        let newPosition = [...calculateNextPosition(newState.position[0], newState.position[1], newState.rotation, 0.01), newState.position[2]]
        newState.position = newPosition;

        

        set(gameObjectRegistry(state.id), newState)  // setting the new game state in the game object directory
    });

    useFrame((game, delta) => {
        if (state) {
            updatePosition()
        };
    })
}

export default BasicCarScript;