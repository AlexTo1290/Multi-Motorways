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
    // Variables for making game object turn left or right
    let rightTurn = [0.08, 0.00, 0.02];     // the horizontal lane
    let leftTurn = [-0.13, 0.08, 0.02];

    // Variables for leaving the junction
    let finalDirectionOutsidePosition = [-0.13, -0.1, 0.02];     // outside lane
    let finalDirectionInsidePosition = [-0.08, 0.25, 0.02];    // inside lane

    let finalDirectionOutside = rotateDirection("left", rotation);     // outside lane
    let finalDirectionInside = rotateDirection("up", rotation);    // inside lane

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
            <GameObject name="cornerJunction" position={position} rotation={rotation} type="road" >
                <StraightRoadSprite />

                <GameObject name={"right"} position={rightTurn} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>
                
                <GameObject name={"left"} position={leftTurn} rotation={Math.PI / 2} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05}/>
                </GameObject>
 

                <GameObject name={finalDirectionOutside} rotation={Math.PI / 2} position={finalDirectionOutsidePosition} type="stopTurn" props={{stopTurn: "right"}} >
                    <StraightLaneSprite colour={"lightblue"} length={0.05}/>
                </GameObject>

                <GameObject name={finalDirectionInside} position={finalDirectionInsidePosition} type="stopTurn" props={{stopTurn: "left"}}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05} />
                </GameObject>

            </GameObject>
        </group>
    );
}


export function TJunction({ position, rotation = 0 }) {
    // Variables for turning the game object
    let minorLeftTurn = [-0.07, -0.13, 0.02];
    let minorRightTurn = [-0.07, 0, 0.02];

    let majorOuterRightTurn = [0, 0.07, 0.02];
    let majorInnerLeftTurn = [0.14, -0.07, 0.02];    

    // Variables to stop the turning of the game object
    // minor road
    let finalMinorLeftTurnPosition = [-0.25, -0.05, 0.02];
    let finalMinorRightTurnPosition = [0.15, 0.07, 0.02];

    let finalMinorLeftTurnDirection = rotateDirection("left", rotation);
    let finalMinorRightTurnDirection = rotateDirection("right", rotation);
    
    // major inner road
    let finalMajorLeftTurnPosition = [0.07, -0.25, 0.02];

    let finalMajorLeftTurnDirection = rotateDirection("down", rotation);

    // major outer road
    let finalMajorRightTurnPosition = [0.07, -0.1, 0.02];

    let finalMajorRightTurnDirection = rotateDirection("down", rotation);
    


    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
            meshes[0]?.add(meshes[1]);
        }
    }, []);

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="TJunction" position={position} rotation={rotation} type="road" >
                {/* Road Sprite */}
                <StraightRoadSprite />

                {/* Car turners */}
                <GameObject name={"left"} position={minorLeftTurn} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lime"} length={0.05} />
                </GameObject>

                <GameObject name={"right"} position={minorRightTurn} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>

                <GameObject name={"right"} position={majorOuterRightTurn} rotation={Math.PI / 2} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"violet"} length={0.05} />
                </GameObject>
                
                <GameObject name={"left"} position={majorInnerLeftTurn} rotation={Math.PI / 2} type="roadTurn" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05} />
                </GameObject>


                {/* Turn stoppers */}
                <GameObject name={finalMinorLeftTurnDirection} rotation={Math.PI / 2} position={finalMinorLeftTurnPosition} type="stopTurn" props={{stopTurn: "left"}}>
                    <StraightLaneSprite colour={"green"} length={0.05} />
                </GameObject>

                <GameObject name={finalMinorRightTurnDirection} rotation={Math.PI / 2} position={finalMinorRightTurnPosition} type="stopTurn" props={{stopTurn: "right"}}>
                    <StraightLaneSprite colour={"blue"} length={0.05} />
                </GameObject>

                <GameObject name={finalMajorRightTurnDirection} position={finalMajorRightTurnPosition} type="stopTurn" props={{stopTurn: "right"}}>
                    <StraightLaneSprite colour={"purple"} length={0.05} />
                </GameObject>

                <GameObject name={finalMajorLeftTurnDirection} position={finalMajorLeftTurnPosition} type="stopTurn" props={{stopTurn: "left"}}>
                    <StraightLaneSprite colour={"red"} length={0.05} />
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
