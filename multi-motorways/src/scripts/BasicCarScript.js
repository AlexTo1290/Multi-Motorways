import { useRecoilCallback } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectCollisionRegistry, gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import calculateNextPosition from "../components/utils/calculateNextPosition";
import { useRef } from "react";


function BasicCarScript() {
    const state = useGameObject();  // getting subscribed-to game object state
    
    const movementSettings = useRef({
        maxSpeed: 0.015,
        acceleration: 0.0001,
    })
    const movement = useRef({
        speed: 0,
        acceleration: 0.00001,
    })

    const movementRef = useRef({})

    // callback function that updates the position of the game object
    const updatePosition = useRecoilCallback(({snapshot, set}) => () => {
        let newState = {...state };  // gets a copy of the game state

        // Checking for collisions
        let collisions = snapshot.getLoadable(gameObjectCollisionRegistry(state.id)).getValue();
        console.log(collisions)

        for (let i = 0; i < collisions.length; i++) {
            // checking if the colliding object is a junction
            if (collisions[i].type === "roadTurn" && !movementRef.current.isTurning) {
                switch(collisions[i].name) {
                    case "right":
                        newState.props.rotationPerFrame = -0.03;
                        movementRef.current.nextStop = "right";
                        movementRef.current.isTurning = true;
                        break;
                    case "left":
                        newState.props.rotationPerFrame = 0.03;
                        movementRef.current.nextStop = "left";
                        movementRef.current.isTurning = true;
                }
            }

            else if (collisions[i].type === "stopTurn") {
                if (collisions[i].props.stopTurn != movementRef.current.nextStop) {
                    continue;
                }
                newState.props.rotationPerFrame = 0;
                
                switch(collisions[i].name) {
                    case "right":
                        newState.rotation = 0;
                        movementRef.current.isTurning = false;
                        break;
                    case "up":
                        console.log("hi")
                        newState.rotation = Math.PI / 2;
                        movementRef.current.isTurning = false;
                        break;
                    case "left":
                        newState.rotation = Math.PI;
                        movementRef.current.isTurning = false;
                        break;
                    case "down":
                        newState.rotation = (3 * Math.PI) / 2;
                        movementRef.current.isTurning = false;

                }
            }
        }

        // updating rotation by rotation per frame
        newState.rotation += newState.props.rotationPerFrame;

        // updating car position
        let newPosition = [...calculateNextPosition(newState.position[0], newState.position[1], newState.rotation, movement.current.speed), newState.position[2]]
        newState.position = newPosition;

        set(gameObjectRegistry(state.id), newState)  // setting the new game state in the game object directory

        // increasing speed of car by the acceleration value
        if (movement.current.speed < movementSettings.current.maxSpeed) {
            movement.current.speed += movementSettings.current.acceleration;
        }
    });

    useFrame((game, delta) => {
        if (state) {
            updatePosition()
        };
    })
}

export default BasicCarScript;