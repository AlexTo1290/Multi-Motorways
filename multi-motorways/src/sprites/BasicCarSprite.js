import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";

function BasicCarSprite() {
    const state = useGameObject();

    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    return (
        <mesh position={state?.position} rotation-z={state?.rotation} ref={mesh} scale={4}> 
            <boxGeometry args={[0.13, 0.1, 0.1]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default BasicCarSprite;