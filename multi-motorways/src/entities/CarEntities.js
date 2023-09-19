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
        <GameObject name={"basic-car"} rotation={Math.PI / 4} position={position} type="car" isVisible={true} hitbox={[0.2, 0.17, 2]}>
            <BasicCarSprite />
            <Collider types={["car"]} />
            {/* <Interactable /> */}
            <CirclingCarScript />
        </GameObject>
    );
}

export function BasicCar({position}) {
    /* 
    <Sprite />
    <Collider />
    <Interactable />
    <Script />
    */

    return (
        <GameObject name={"basic-car"} rotation={0} position={position} type="car" isVisible={true} hitbox={[0.2, 0.2, 2]} props={{rotationPerFrame: 0}}>
            <BasicCarSprite />
            <Collider types={["roadTurn", "stopTurn"]} centre />
            {/* <Interactable /> */}
            <BasicCarScript />
        </GameObject>
    );
}
