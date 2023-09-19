import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { Html } from "@react-three/drei";
import "../styles/styles.css"



function HouseSprite() {
    const state = useGameObject();
    const mesh = useRef(null);
    useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    return (<>
        <mesh position={state?.position} ref={mesh} > 
            <boxGeometry args={[1, 1, 0.5]}/>
            <meshStandardMaterial color="blue" />
            <Html>
                <div className="label">House</div>
            </Html>
        </mesh>

        </>

    )
}

export default HouseSprite;