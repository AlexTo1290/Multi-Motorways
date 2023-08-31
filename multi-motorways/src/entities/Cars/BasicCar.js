import BasicCarSprite from "../../sprites/BasicCarSprite";
import GameObject from "../../components/GameObject";
import Collider from "../../components/Collider";
import BasicCarScript from "../../scripts/BasicCarScript";



function BasicCar({position}) {
    /* 
    <Sprite />
    <Collider />
    <Interactable />
    <Script />
    */

    return (
        <GameObject name={"basic-car"} position={position} type="car" isVisible={true}>
            <BasicCarSprite />
            <Collider />
            {/* <Interactable /> */} 
            <BasicCarScript />
        </GameObject>
    );
}

export default BasicCar;