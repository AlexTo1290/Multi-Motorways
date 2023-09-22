import { useCallback, useEffect, useRef, useState } from "react";
import GameObject from "../components/GameObject";
import StraightLaneSprite from "../sprites/StraightLaneSprite";
import StraightRoadSprite from "../sprites/StraightRoadSprite";
import Collider from "../components/Collider";
import TJunctionControllerLaneScript from "../scripts/TJunctionControllerLaneScript";
import { TJunctionControllerAtom } from "../recoil/atom/junctionControllerAtoms";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { nextUniqueId } from "../recoil/atom/idValues";
import { useFrame } from "@react-three/fiber";
import CornerJunctionSprite from "../sprites/CornerJunctionSprite";
import TJunctionSprite from "../sprites/TJunctionSprite";


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
                <StraightRoadSprite position={position} rotation={Math.PI / 2} />
        
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
                <StraightRoadSprite position={position} />
                
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
                <CornerJunctionSprite position={position} rotation={rotation} />

                <GameObject name={"right"} position={rightTurn} type="roadTurn" hitbox={[0.03, 0.25, 0.1]} props={{directionAfterTurn: finalDirectionOutside}}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>
                
                <GameObject name={"left"} position={leftTurn} rotation={Math.PI / 2} type="roadTurn" hitbox={[0.03, 0.25, 0.1]} props={{directionAfterTurn: finalDirectionInside}}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05}/>
                </GameObject>
 

                <GameObject name={finalDirectionOutside} rotation={Math.PI / 2} position={finalDirectionOutsidePosition} type="stopTurn">
                    <StraightLaneSprite colour={"lightblue"} length={0.05}/>
                </GameObject>

                <GameObject name={finalDirectionInside} position={finalDirectionInsidePosition} type="stopTurn">
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
    let majorInnerLeftTurn = [0.12, -0.07, 0.02];    

    // Variables to stop the turning of the game object
    // minor road
    let finalMinorLeftTurnPosition = [-0.25, -0.05, 0.02];
    let finalMinorRightTurnPosition = [0.12, 0.07, 0.02];

    let finalMinorLeftTurnDirection = rotateDirection("left", rotation);
    let finalMinorRightTurnDirection = rotateDirection("right", rotation);
    
    // major inner road
    let finalMajorLeftTurnPosition = [0.07, -0.25, 0.02];

    let finalMajorLeftTurnDirection = rotateDirection("down", rotation);

    // major outer road
    let finalMajorRightTurnPosition = [0.07, -0.13, 0.02];

    let finalMajorRightTurnDirection = rotateDirection("down", rotation);
    

    // Creating mesh group
    
    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("roadGroup")?.children;

            if (meshes) {
                while(meshes.length > 1) {
                    meshes[0].add(meshes[1]);
                }
            }
        }
    }, []);


    return(
        <group name="roadGroup" ref={updateGroup} >
            <GameObject name="TJunction" position={position} rotation={rotation} type="road">
                {/* Road Sprite */}
                <TJunctionSprite position={position} rotation={rotation} />

                {/* Car turners */}
                <GameObject name={"left"} position={minorLeftTurn} type="roadTurn" props={{directionAfterTurn: finalMinorLeftTurnDirection}}>
                    <StraightLaneSprite colour={"lime"} length={0.05} />
                </GameObject>

                <GameObject name={"right"} position={minorRightTurn} type="roadTurn" props={{directionAfterTurn: finalMinorRightTurnDirection}}>
                    <StraightLaneSprite colour={"lightblue"} length={0.05} />
                </GameObject>

                <GameObject name={"right"} position={majorOuterRightTurn} rotation={Math.PI / 2} type="roadTurn" props={{directionAfterTurn: finalMajorRightTurnDirection, turnNumber: 1}}>
                    <StraightLaneSprite colour={"violet"} length={0.05} />
                </GameObject>
                
                <GameObject name={"left"} position={majorInnerLeftTurn} rotation={Math.PI / 2} type="roadTurn" props={{directionAfterTurn: finalMajorLeftTurnDirection, turnNumber: 2}}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05} />
                </GameObject>


                {/* Turn stoppers */}
                <GameObject name={finalMinorLeftTurnDirection} rotation={Math.PI / 2} position={finalMinorLeftTurnPosition} type="stopTurn">
                    <StraightLaneSprite colour={"green"} length={0.05} />
                </GameObject>

                <GameObject name={finalMinorRightTurnDirection} rotation={Math.PI / 2} position={finalMinorRightTurnPosition} type="stopTurn">
                    <StraightLaneSprite colour={"blue"} length={0.05} />
                </GameObject>

                <GameObject name={finalMajorRightTurnDirection} position={finalMajorRightTurnPosition} type="stopTurn" props={{turnNumber: 1}}>
                    <StraightLaneSprite colour={"purple"} length={0.05} />
                </GameObject>

                <GameObject name={finalMajorLeftTurnDirection} position={finalMajorLeftTurnPosition} type="stopTurn" props={{turnNumber: 2}}>
                    <StraightLaneSprite colour={"red"} length={0.05} />
                </GameObject>

                {/* Junction controller */}
                <TJunctionController position={position} rotation={rotation} />

            </GameObject>
        </group>
    );
}

// JUNCTION CONTROLLER COMPONENTS
function TJunctionController({position, rotation}) {
    // Creating two sensors: 1. lays on the major road outer lane, 2. lays on the major road inner lane
    let outerLaneSensorPosition = [0, 0.0625, 0.02];    // outer lane
    let innerLaneSensorPosition = [0, -0.1, 0.02];    // inner lane

    // Creating id for the top-level game object (containing the lane game objects)

    // Function - returns a unique id
    const getUniqueId = useRecoilCallback(({set, snapshot}) => () => {
        // getting unique id
        const id = snapshot.getLoadable(nextUniqueId).contents;

        // updating the atom to point to the next unique id
        set(nextUniqueId, id + 1);
        
        return id;
    }, []);

    const id = useRef(-1);

    // creating variables to store turns that are available
    const [minorCanTurnLeft, setMinorCanTurnLeft] = useState(true);
    const [minorCanTurnRight, setMinorCanTurnRight] = useState(true);
    const [majorCanTurnRight, setMajorCanTurnRight] = useState(true);
 
    const tJunctionController = useRecoilValue(TJunctionControllerAtom(id.current))

    // callback function that updates the above variables
    const updateController = useRecoilCallback(() => (tJunctionController) => {
        if (tJunctionController?.inner === undefined && tJunctionController?.outer === undefined) {
            return;
        }
        
        // Checking if major inner lane is free
        if (!tJunctionController.inner) {
            setMinorCanTurnLeft(true);
            setMajorCanTurnRight(true);
        } else {
            setMinorCanTurnLeft(false);
            setMajorCanTurnRight(false);
        }


        // Checking if other major inner lane and major outer lane are free
        if (!tJunctionController.inner && !tJunctionController.outer) {
            setMinorCanTurnRight(true);
        } else {
            setMinorCanTurnRight(false);
        }
    });

    // Updating controller when tJunctionCollisions changes
    useEffect(() => {
        updateController(tJunctionController);
    }, [tJunctionController])
    
    // Creating the top-layer game object id
    useEffect(() => {
        id.current = getUniqueId();
    }, []);

    // Creating mesh group
    const group = useRef(null);

    const updateGroup = useCallback((values) => { 
        group.parent = null
        console.log("uppy")
        if (values) {
            group.current = values;
            let meshes = group.current?.getObjectByName("junctionController")?.children;

            if (meshes) {
                while(meshes.length > 1) {
                    meshes[0].add(meshes[1]);
                }
            }
        }
    }, []);

    
    return(<group parent={null} name="junctionController" ref={updateGroup}>
        {/* Creating traffic sensor objects */}
        <GameObject id={id.current} position={position} rotation={rotation} type="junctionController">
            <GameObject position={outerLaneSensorPosition} type="laneSensor">
                <Collider types={["car"]} />
                <StraightLaneSprite colour={"grey"} length={0.4} />
                <TJunctionControllerLaneScript controllerObjectId={id.current} lane="outer" />
            </GameObject>

            <GameObject position={innerLaneSensorPosition} type="laneSensor">
                <Collider types={["car"]} />
                <StraightLaneSprite colour={"grey"} length={0.4} />
                <TJunctionControllerLaneScript controllerObjectId={id.current} lane="inner" />
            </GameObject>

            {/* Creating traffic-control objects */}
            <group>

            {minorCanTurnLeft ? ( 
                <>
                    {/* Creating acceleration line */}
                    <GameObject name="left" rotation={Math.PI / 2} position={[-0.07, -0.35, 0.02]} type="accelerate">
                        <StraightLaneSprite colour={"brown"} length={0.15} />
                    </GameObject>
                </>

            ) : (<></>)}
            </group>


            <group>

            {!minorCanTurnLeft ? (<>
                    {/* Creating deceleration line */}
                    <GameObject name="left" rotation={Math.PI / 2} position={[-0.07, -0.35, 0.02]} type="decelerate">
                        <StraightLaneSprite colour={"yellow"} length={0.15} />
                    </GameObject>
            </>) : <></>}
            </group>

            <group>

            {minorCanTurnRight ? (
                <>
                    {/* Creating acceleration line */}
                    <GameObject name="right" rotation={Math.PI / 2} position={[-0.07, -0.35, 0.02]} type="accelerate">
                        <StraightLaneSprite colour={"brown"} length={0.15} />
                    </GameObject>
                </>
            ) : (
                <></>
            )}
            </group>


            <group>

            {!minorCanTurnRight ? (
                <>
                    {/* Creating deceleration line */}
                    <GameObject name="right" rotation={Math.PI / 2} position={[-0.07, -0.35, 0.02]} type="decelerate">
                        <StraightLaneSprite colour={"yellow"} length={0.15} />
                    </GameObject>
                </>
            ) : <></>}
            </group>


            <group>

            {majorCanTurnRight ? (
                <>
                    {/* Creating acceleration line */}
                    <GameObject name="right" position={[-0.125, 0, 0.02]} type="accelerate">
                        <StraightLaneSprite colour={"brown"} length={0.15} />
                    </GameObject>
                </>
            ) : <></>}
            </group>

            <group>
            {!majorCanTurnRight ? (
                <>
                    {/* Creating deceleration line */}
                    <GameObject name="right" position={[-0.125, 0, 0.02]} type="decelerate">
                        <StraightLaneSprite colour={"yellow"} length={0.15} />
                    </GameObject>
                </>
            ) : <></>}
            </group>

        </GameObject>
    </group>)
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