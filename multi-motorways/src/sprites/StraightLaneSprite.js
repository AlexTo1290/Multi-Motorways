import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";


function StraightLaneSprite({ colour }) {
    const state = useGameObject();
    
    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    return (
        <mesh position={state?.position} rotation-z={state?.rotation} ref={mesh}>
            <boxGeometry args={[0.25, 0.03, 0.05]} />
            <meshStandardMaterial color={colour} />
        </mesh>
    )
}

export default StraightLaneSprite;