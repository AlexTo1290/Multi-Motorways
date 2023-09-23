import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useTexture } from "@react-three/drei";


function CornerJunctionSprite({position, rotation}) {
    const state = useGameObject();

    const texture = useTexture("textures/cornerJunction2.jpg");

    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });
    
    return (
        <mesh position={(state?.position) ? state.position : position} rotation-z={rotation} ref={mesh} name={state?.name} scale={4}>
            <boxGeometry args={[0.25, 0.25, 0.04]} />
            <meshBasicMaterial attach="material-0" color="#353535" />
            <meshBasicMaterial attach="material-1" color="#353535" />
            <meshBasicMaterial attach="material-2" color="#353535" />
            <meshBasicMaterial attach="material-3" color="#353535" />
            <meshBasicMaterial attach="material-4" map={texture} />
            <meshBasicMaterial attach="material-5" color="#353535" />
        </mesh>
    )
}

export default CornerJunctionSprite;