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
        
                <GameObject name="verticalLaneUp" position={[0, 0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} />
                </GameObject>

                <GameObject name="verticalLaneDown" position={[0, -0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>
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
                
                <GameObject name="horizontalLaneRight" position={[0, 0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} />
                </GameObject>

                <GameObject name="horizontalLaneLeft" position={[0, -0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>
            </GameObject>
        </group>
    );
}

export function CornerJunction({ position, rotation }) {
    let outsideLane = [0, -0.10, 0.02];     // the horizontal lane
    let insideLane = [-0.03, 0.08, 0.02];   

    let outsideLaneDirection = "horizontalLaneLeft";
    let insideLaneDirection = "verticalLaneUp";
    console.log("rotation: " + rotation)
    switch(rotation) {
        case 0:
            outsideLaneDirection = "horizontalLaneLeft";
            insideLaneDirection = "verticalLaneUp";
        case Math.PI/2:
            outsideLaneDirection = "verticalLaneDown";
            insideLaneDirection = "horizontalLaneLeft";
        case Math.PI:
            outsideLaneDirection = "horizontalLaneRight";
            insideLaneDirection = "verticalLaneDown";
        case ((3*Math.PI) /2 ):
            outsideLaneDirection = "verticalLaneUp";
            insideLaneDirection = "horizontalLaneRight";
    }



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

                <GameObject name={outsideLaneDirection} position={outsideLane} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>
                
                <GameObject name={insideLaneDirection} position={insideLane} rotation={Math.PI / 2} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05}/>
                </GameObject>

            </GameObject>
        </group>
    );
}

