import { useGameObject } from "../components/useGameObject";

function StraightRoadSprite() {
    const state = useGameObject();

    const position = state?.position;
    const rotation = state?.rotation;
    
    return (
        <mesh position={state?.position} rotation-z={rotation}>
            <boxGeometry args={[0.25, 0.25, 0.05]}/>
            <meshStandardMaterial color="light-grey" />
        </mesh>
    )
}

export default StraightRoadSprite;