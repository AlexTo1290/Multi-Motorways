import { useGameObject } from "../components/useGameObject";

function BasicCarSprite() {
    const state = useGameObject();
    const position = state.position;
    
    return (
        <mesh position={position}>
            <planeGeometry args={[10, 10]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default BasicCarSprite;