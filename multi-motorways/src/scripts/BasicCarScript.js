import { useRecoilCallback } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectCollisionRegistry, gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import calculateNextPosition from "../components/utils/calculateNextPosition";
import { useRef, useState } from "react";


function BasicCarScript() {
    const state = useGameObject();  // getting subscribed-to game object state
    
    // Storing moving settings for the car
    const movementSettings = useRef({
        maxSpeed: 0.015,
        acceleration: 0.0001,
        deceleration: -0.000175
    })

    // Storing current unique car properties (speed and acceleration)
    const movementRef = useRef({
        speed: 0,
        acceleration: 0.0001,
        isTurning: false,
    })

    const turnQueue = useRef(["left", "left", "right", "left", "left", "right", "left", "left", "right"])

    // callback function that updates the position of the game object
    const updatePosition = useRecoilCallback(({snapshot, set}) => () => {
        // console.log(state)
        let newState = structuredClone(state)  // gets a copy of the game state

        // Checking for collisions
        let collisions = snapshot.getLoadable(gameObjectCollisionRegistry(state.id)).getValue();
        // console.log(collisions)
        
        // console.log(turnQueue)

        for (let i = 0; i < collisions.length; i++) {
            // checking if coliding with car-turner object
            if (collisions[i].type === "roadTurn" && !movementRef.current.isTurning) {
                switch(collisions[i].name) {
                    case "right":
                        // Checking if the next queued turn is "right"
                        if (turnQueue.current[0] === "right") {
                            newState.props.rotationPerFrame = -0.03;
                            movementRef.current.directionAfterTurn = collisions[i].props.directionAfterTurn;
                            movementRef.current.isTurning = true;

                            // dequeuing turn from turnQueue
                            turnQueue.current.shift();
                        }
                        break;

                    case "left":
                        // Checking if the next queued turn is "left"
                        if (turnQueue.current[0] === "left") {
                            newState.props.rotationPerFrame = 0.03;
                            movementRef.current.directionAfterTurn = collisions[i].props.directionAfterTurn;
                            movementRef.current.isTurning = true;

                            // dequeuing turn from turnQueue
                            turnQueue.current.shift();

                        }
                }
            }

            // checking if colliding with stop-turning object
            else if (collisions[i].type === "stopTurn") {
                if (collisions[i].name !== movementRef.current.directionAfterTurn) {
                    continue;
                }

                // stopping the turn
                newState.props.rotationPerFrame = 0;
                
                switch(collisions[i].name) {
                    case "right":
                        newState.rotation = 0;
                        movementRef.current.isTurning = false;
                        break;
                    case "up":
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

            // checking if colliding with decelerator
            else if (collisions[i].type === "decelerate") {
                if (collisions[i].name === turnQueue[0]) {
                    movementRef.current.acceleration = movementSettings.current.deceleration;
                }
            }

            // checking if colliding with accelerator
            else if (collisions[i].type === "accelerate") {
                if (collisions[i].name === turnQueue[0]) {
                    movementRef.current.acceleration = movementSettings.current.acceleration;
                }
            }
        }
        
        // updating rotation by rotation per frame
        newState.rotation += newState.props.rotationPerFrame;

        // updating car position
        let newPosition = [...calculateNextPosition(newState.position[0], newState.position[1], newState.rotation, movementRef.current.speed), newState.position[2]]
        newState.position = newPosition;

        set(gameObjectRegistry(state.id), newState)  // setting the new game state in the game object directory

        // increasing speed of car by the acceleration value
        if (movementRef.current.speed < movementSettings.current.maxSpeed || (movementRef.current.acceleration < 0 && movementRef.speed)) {
            movementRef.current.speed += movementRef.current.acceleration;

            if (movementRef.current.speed < 0) {
                movementRef.current.speed = 0;
            }
        }
    });

    useFrame(() => {
        if (state) {
            updatePosition()
        };
    })
}

export default BasicCarScript;