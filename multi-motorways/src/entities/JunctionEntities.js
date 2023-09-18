import { useCallback, useEffect, useRef, useState } from "react";
import GameObject from "../components/GameObject";
import StraightLaneSprite from "../sprites/StraightLaneSprite";
import StraightRoadSprite from "../sprites/StraightRoadSprite";


// EXPORTS
export function VerticalRoad({ position }) {
    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
        }
    });

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="verticalRoad" position={position} rotation={Math.PI / 2} type="road" >
                <StraightRoadSprite />
        
                {/* <GameObject name="verticalLaneUp" position={[0, 0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} />
                </GameObject>

                <GameObject name="verticalLaneDown" position={[0, -0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject> */}
            </GameObject>
        </group>
    );
}

export function HorizontalRoad({ position }) {
    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
        }
    }, []);

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="horizontalRoad" position={position} type="road" >
                <StraightRoadSprite />
                
                {/* <GameObject name="horizontalLaneRight" position={[0, 0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} />
                </GameObject>

                <GameObject name="horizontalLaneLeft" position={[0, -0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject> */}
            </GameObject>
        </group>
    );
}

export function CornerJunction({ position, rotation = 0 }) {
    let outsideLane = [0, -0.13, 0.02];     // the horizontal lane
    let insideLane = [0, 0.08, 0.02];   

    let outsideLaneDirection = rotateDirection("left", rotation);
    let insideLaneDirection = rotateDirection("up", rotation);

    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
        }
    }, []);

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="cornerJunction" position={position} rotation={rotation} type="road" >
                <StraightRoadSprite />

                <GameObject name={outsideLaneDirection} position={outsideLane} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>
                
                <GameObject name={insideLaneDirection} position={insideLane} rotation={Math.PI / 2} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05}/>
                </GameObject>

            </GameObject>
        </group>
    );
}


export function TJunction({ position, rotation = 0 }) {
    let minorLeftTurn = [-0.07, 0, 0.02];
    let minorRightTurn = [-0.07, 0.125, 0.02];

    let majorOuterRightTurn = [0.12, 0.07, 0.02];
    let majorInnerLeftTurn = [0.01, -0.07, 0.02];

    let minorLeftTurnDirection = rotateDirection("left", rotation);
    let minorRightTurnDirection = rotateDirection("right", rotation);
    let majorExitDirection = rotateDirection("down", rotation);
    

    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
        }
    }, []);

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="TJunction" position={position} rotation={rotation} type="road" >
                <StraightRoadSprite />

                <GameObject name={minorLeftTurnDirection} position={minorLeftTurn} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>

                <GameObject name={minorRightTurnDirection} position={minorRightTurn} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>

                <GameObject name={majorExitDirection} position={majorOuterRightTurn} rotation={Math.PI / 2} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05} />
                </GameObject>
                
                <GameObject name={majorExitDirection} position={majorInnerLeftTurn} rotation={Math.PI / 2} type="roadBoundary" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05} />
                </GameObject>

            </GameObject>
        </group>
    );
}

// UTIL FUNCTIONS
function rotateDirection(originalDirection, rotation) {
    // converting originalDirection string into radians
    let rotationRad = 0;
    switch (originalDirection){
        case "up":
            rotationRad = Math.PI / 2;
            break;
        case "left":
            rotationRad = Math.PI;
            break;
        case "down":
            rotationRad = (3 * Math.PI) / 2;
    }

    // Making direction change
    rotationRad += rotation;

    rotationRad = rotationRad % (2 * Math.PI);

    // Converting rotationRad to rotation string (e.g. "left", ...)
    let newDirection = "right";

    switch (rotationRad) {
        case (Math.PI / 2):
            newDirection = "up";
            break;
        case (Math.PI):
            newDirection = "left";
            break;
        case ((3 * Math.PI) / 2):
            newDirection = "down";
    }
    
    return newDirection;
}
