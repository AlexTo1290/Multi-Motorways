import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";

function BasicCarSprite() {
    const state = useGameObject();

    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });
    
    return (
        <mesh position={(state?.position) ? state.position : [0, 0, -100]} rotation-z={state?.rotation} ref={mesh} scale={4}> 
            <boxGeometry args={[0.13, 0.1, 0.06]}/>
            <meshStandardMaterial color="pink" />
        </mesh>
    )
}

export default BasicCarSprite;