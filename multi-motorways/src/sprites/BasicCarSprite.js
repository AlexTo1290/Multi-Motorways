import { useGameObject } from "../components/useGameObject";

function BasicCarSprite() {
    const state = useGameObject();

    const position = state?.position;
    const rotation = state?.rotation;
    
    return (
        <mesh position={state?.position} rotation-z={rotation} > 
            <boxGeometry args={[0.13, 0.1, 0.1]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default BasicCarSprite;