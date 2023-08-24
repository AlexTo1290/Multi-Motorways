import Car from "../../components/Car"
import BasicCarSprite from "../../sprites/BasicCarSprite";

function BasicCar({position}) {
    /* 
    <Sprite />
    <Collider />
    <Interactable />
    <Script />
    */

    return (
        <Car name="basic-car" position={position}>
            <BasicCarSprite s/>
        </Car>
    );
}

export default BasicCar;