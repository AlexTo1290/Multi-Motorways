import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";


function StraightLaneSprite({ colour, length=0.25 }) {
    const state = useGameObject();
    
    const mesh = useRef(null);
    
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    return (
        <mesh position={(state?.position) ? state.position : [0, 0, -100]} rotation-z={state?.rotation} ref={mesh} name={state?.name}>
            <boxGeometry args={[length, 0.01, 0.05]} />
            <meshStandardMaterial color={colour} />
        </mesh>
    )
};

export default StraightLaneSprite;