import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const textureImage = require("./textures/cornerJunction2.jpg");

function CornerJunctionSprite({position, rotation}) {
    const state = useGameObject();

    const texture = useLoader(TextureLoader, textureImage);

    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });
    
    return (<>
        <mesh position={(state?.position) ? state.position : position} rotation-z={rotation} ref={mesh} name={state?.name} scale={4}>
            <boxGeometry args={[0.25, 0.25, 0.02]} />
            <meshBasicMaterial attach="material-0" color="#353535" /> {/* px */}
            <meshBasicMaterial attach="material-1" color="#353535" /> {/* nx */}
            <meshBasicMaterial attach="material-2" color="#353535" /> {/* py */}
            <meshBasicMaterial attach="material-3" color="#353535" /> {/* ny */}
            <meshBasicMaterial attach="material-4" map={texture} /> {/* pz */}
            <meshBasicMaterial attach="material-5" color="#353535" /> {/* nz */}
        </mesh>
        </>
    )
}

export default CornerJunctionSprite;