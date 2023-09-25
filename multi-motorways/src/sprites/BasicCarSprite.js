import { useEffect, useRef, useState } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { useFrame } from "@react-three/fiber";
import { useRecoilCallback } from "recoil";
import { Box3 } from "three";
import { gameObjectBoundingBoxes } from "../recoil/atom/gameObjectRegistry";
import UpdateBoundingBox from "./UpdateBoundingBox";

function BasicCarSprite({position}) {
    const state = useGameObject();

    const [meshState, setMeshState] = useState(null);
    const mesh = useRef(null);
    const currentRotation = useRef(0);
    const speed = useRef(0);
    

    useUpdateBoundingBox({ id: state?.id, mesh: meshState });


    useEffect(() => {
        const interval = setInterval(() => {
            setMeshState(null);
            setMeshState(mesh.current)
        }, 1);
        return () => clearInterval(interval);
      }, []);

    // useFrame(() => {
    //     setMeshState(null);
    //     setMeshState(mesh.current)
    // })
    

    useFrame(() => {
        if (state?.props?.movement) {
            // updating rotation by rotation per frame
            if (state.props.movement.acceleration > 0) {
                let rotationDiff = (speed.current / state.props.movementSettings.maxSpeed) * state.props.movement.rotationPerFrame;
                // mesh.current.rotateZ(rotationDiff);
                currentRotation.current += rotationDiff;
                mesh.current.rotation.z = currentRotation.current;
            }

            // setting rotation to set value
            if (state.props.movement.rotationPerFrame === 0) {
                // mesh.current.rotateZ(state.props.movement.rotation - currentRotation.current);
                mesh.current.rotation.z = state.rotation
                currentRotation.current = state.rotation;
            }

            // increasing speed of car by the acceleration value
            if (speed.current < state.props.movementSettings.maxSpeed || (state.props.movement.acceleration < 0 && speed.current > 0)) {
                speed.current += state.props.movement.acceleration;
                
                if (speed.current < 0) {
                    speed.current = 0;
                }
            }

            // updating mesh position
            let [newX, newY] = calculateNextPosition(mesh.current.position.x, mesh.current.position.y, currentRotation.current, speed.current);
            // console.log(state.props.rotationPerFrame)
            mesh.current.position.x = newX;
            mesh.current.position.y = newY;
        }
    })
    
    return (<>
        <mesh position={position} ref={mesh} scale={4}> 
            <boxGeometry args={[0.1, 0.07, 0.06]}/>
            <meshStandardMaterial color="pink" />
        </mesh>
        </>
    )
}

/**
 * Calculates the new position after moving some distance at some rotational value
 * @param {*} x x-coordinate of start pos
 * @param {*} y y -coodinate of start pos
 * @param {*} rotation rotation of travel in radians
 * @param {*} distance distance to be traveled in Three.js units
 * @return the new position
 */
function calculateNextPosition(x, y, rotation, distance) {
    let newX = x + Math.cos(rotation) * distance;
    let newY = y + Math.sin(rotation) * distance;

    return [newX, newY];
}

export default BasicCarSprite;