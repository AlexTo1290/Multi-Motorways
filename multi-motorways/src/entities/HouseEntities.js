import HouseSprite from "../sprites/HouseSprite";
import GameObject from "../components/GameObject";
import Collider from "../components/Collider";
import HouseScript from "../scripts/HouseScript";


// Plan to make a house componenet that indicates when a sick person needs to be saved.
// Will generalise to a Building componenet that can hold different types of buildings e.g. hospital. 
export function House({ position }) {

    // const updateGroup = useCallback((values) => { 
    //     if (values) {
    //         group.current = values;
    //         let meshes = group.current?.getObjectByName("roadGroup")?.children;
    //         meshes[0]?.add(meshes[1]);
    //         meshes[0]?.add(meshes[1]);
    //     }
    // }, []);

    return(
            <GameObject name="house" position={position} >
                <HouseSprite />
                <Collider types={["car"]} />
                {/* <Interactable /> */}
                <HouseScript />
            </GameObject>
    );
}