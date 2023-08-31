import { useGameObject } from "../components/useGameObject";

function BasicCarSprite() {
    const state = useGameObject();

    const position = state?.position;
    console.log("sprite: " + position);
    
    return (
        <mesh position={state?.position}>
            <planeGeometry args={[1, 1]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default BasicCarSprite;