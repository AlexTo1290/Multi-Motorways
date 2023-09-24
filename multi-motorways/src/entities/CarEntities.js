import BasicCarSprite from "../sprites/BasicCarSprite";
import GameObject from "../components/GameObject";
import Collider from "../components/Collider";
import CirclingCarScript from "../scripts/CirclingCarScript";
import BasicCarScript from "../scripts/BasicCarScript";



export function CirclingCar({position}) {
    /* 
    <Sprite />
    <Collider />
    <Interactable />
    <Script />
    */

    return (
        <GameObject name={"basic-car"} rotation={Math.PI / 4} position={position} type="car" isVisible={true} >
            <BasicCarSprite />
            <Collider types={["car"]} />
            {/* <Interactable /> */}
            <CirclingCarScript />
        </GameObject>
    );
}

export function BasicCar({position, directions, listId, removeFromCanvasCallback}) {
    /* 
    <Sprite />
    <Collider />
    <Interactable />
    <Script />
    */

    return (
        <GameObject name={"basic-car"} rotation={0} position={position} type="car" isVisible={true} 
            props={{movementSettings: {maxSpeed: 0.015, acceleration: 0.0002, deceleration: -0.0002}, 
                movement: {speed: 0, acceleration: 0.0002, rotationPerFrame: 0}
            }}>


            <BasicCarSprite position={position} />
            <Collider types={["roadTurn", "stopTurn", "decelerate", "accelerate"]} />
            {/* <Interactable /> */}
            <BasicCarScript listId={listId} removeFromCanvasCallback={removeFromCanvasCallback} directions={directions} />
        </GameObject>
    );
}