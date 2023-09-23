import HouseSprite from "../sprites/HouseSprite";
import GameObject from "../components/GameObject";
import Collider from "../components/Collider";
import HouseScript from "../scripts/HouseScript";


// ================= HOUSE-CAR COLLISION PLAN =================
// Kevin Li 14/09/2023
// - subscribe house to collision registry
// - detect car-house collision using collider
// - remove car visually
// - remove car from registry (waiting for removal function) 
// - add indicator e.g. score or sound or something (optional)

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
                {/* <Collider types={["car"]} /> */}
                {/* <Interactable /> */}
                <HouseScript position={position} />
            </GameObject>
    );
}