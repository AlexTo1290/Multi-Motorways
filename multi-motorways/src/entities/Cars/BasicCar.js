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
        <GameObject name={"basic-car"} rotation={Math.PI / 4} position={position} type="car" isVisible={true}>
            <BasicCarSprite />
            <Collider types={["car"]}/>
            {/* <Interactable /> */} 
            <BasicCarScript />
        </GameObject>
    );
}

export default BasicCar;