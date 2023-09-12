import { forwardRef, useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { useFrame } from "@react-three/fiber";


function StraightLaneSprite({ colour, length=0.25 }) {
    const state = useGameObject();
    
    const mesh = useRef(null);
    
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    return (
        <mesh position={state?.position} rotation-z={state?.rotation} ref={mesh} name={state?.name}>
            <boxGeometry args={[length, 0.03, 0.05]} />
            <meshStandardMaterial color={colour} />
        </mesh>
    )
};

export default StraightLaneSprite;