import { useGameObject } from "../components/useGameObject";

function BasicCarSprite() {
    const state = useGameObject();

    const position = state?.position;
    const rotation = state?.rotation;
    
    return (
        <mesh position={state?.position} rotation-z={rotation}>
            <planeGeometry args={[0.2, 0.17]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default BasicCarSprite;