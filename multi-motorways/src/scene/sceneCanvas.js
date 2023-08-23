import RoadTile from "./roadTiles";
import GroundMesh from './groundMesh';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useFrame } from "@react-three/fiber";

const SceneCanvas = () => {
    const [cameraPosX,setCameraPosX] = useState(0);
    const [cameraPosY,setCameraPosY] = useState(0);

    useEffect(() => {

        const onDocumentKeyDown=(event)=> {
            console.log(event.which);
            var keyCode = event.which;
            if (keyCode === 87) {
                setCameraPosY(cameraPosY + 10);
            } else if (keyCode === 83) {
                setCameraPosY(cameraPosY - 10);
            } else if (keyCode === 65) {
                setCameraPosX(cameraPosX - 10);
            } else if (keyCode === 68) {
                setCameraPosX(cameraPosX + 10);
            } else if (keyCode === 32) {
                
            }
        };
        
        window.addEventListener("keydown", onDocumentKeyDown, false);

        }, [cameraPosX,cameraPosY]);



    return (
        <Canvas>
            <ambientLight intensity={1} camera={{ position: [cameraPosX,cameraPosY,10], fov: 20 }}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            
            <GroundMesh />
            <RoadTile c1={[-50, -50]} c2={[50, 50]}></RoadTile>
        </Canvas>
    );
}

export default SceneCanvas;