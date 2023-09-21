import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";

function StraightRoadSprite({position}) {
    const state = useGameObject();

    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });
    
    return (
        <mesh position={(state?.position) ? state.position : position} rotation-z={state?.rotation} ref={mesh} name={state?.name} scale={4}>
            <boxGeometry args={[0.25, 0.25, 0.05]}/>
            <meshStandardMaterial color="light-grey" />
        </mesh>
    )
}

export default StraightRoadSprite;