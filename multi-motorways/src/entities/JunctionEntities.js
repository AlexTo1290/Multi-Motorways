import { useCallback, useEffect, useRef, useState } from "react";
import GameObject from "../components/GameObject";
import StraightLaneSprite from "../sprites/StraightLaneSprite";
import StraightRoadSprite from "../sprites/StraightRoadSprite";
import { useFrame } from "@react-three/fiber";
import { useRecoilCallback } from "recoil";
import { gameObjectMeshes } from "../recoil/atom/gameObjectRegistry";
import { Group } from "three";



function Lane({ name, position, rotation, colour, hitbox, parentMesh }) {
    return(
        <GameObject name={name} position={position} rotation={rotation} type="lane" hitbox={hitbox}>
            <StraightLaneSprite colour={colour} parentMesh={parentMesh} />
        </GameObject>
    );
}


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
    }, []);

    return(
        <group name="roadGroup" ref={updateGroup}>
            <GameObject name="verticalRoad" position={position} rotation={Math.PI / 2} type="road" >
                <StraightRoadSprite />
        
                <GameObject name="verticalLaneUp" position={[0, 0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>

                <GameObject name="verticalLaneDown" position={[0, -0.01, 0]} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} />
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

export function CornerJunction({ position }) {
    let outsideLaneOne = [0, -0.10, 0.02];     // the horizonal lane
    let outsideLaneTwo = [0.10, 0, 0.02];   // the vertical lane
    let insideLane = [-0.03, 0.03, 0.02];   

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
            <GameObject name="cornerJunction" position={position} type="road" >
                <StraightRoadSprite />

                <GameObject name="horizontalLaneLeft" position={outsideLaneOne} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>
                
                <GameObject name="horizontalLaneRight" position={insideLane} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightpink"} length={0.05}/>
                </GameObject>

                <GameObject name="verticalLaneDown" position={outsideLaneTwo} rotation={Math.PI/2} type="lane" hitbox={[0.03, 0.25, 0.1]}>
                    <StraightLaneSprite colour={"lightblue"} />
                </GameObject>

            </GameObject>
        </group>
    );
}

