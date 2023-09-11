import { useGameObject } from "../components/useGameObject";
import * as Three from 'three';


function StraightLaneSprite({ colour }) {
    const state = useGameObject();
    
    return (
        <mesh position={state?.position} rotation-z={state?.rotation} >
            <boxGeometry args={[0.25, 0.05, 0.05]} />
            <meshStandardMaterial color={colour} />
        </mesh>
    )
}

export default StraightLaneSprite;