import RoadTile from "./roadTiles";
import GroundMesh from './groundMesh';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import HitBoxGrid from "./HitBoxGrid";

import { useRecoilValue } from "recoil";
import { cameraPosition } from "../recoil/atom/cameraAtoms";
import { BasicCar } from "../entities/CarEntities";
import { OrbitControls } from '@react-three/drei'
import { CornerJunction, HorizontalRoad, VerticalRoad } from "../entities/JunctionEntities";
import { House } from "../entities/HouseEntities";

// import { useFrame } from "@react-three/fiber";
import { MOUSE, AxesHelper, Vector3 } from 'three'
import TexturePreloader from "./TexturePreloader";
const SceneCanvas = () => {

    const cameraPos = useRecoilValue(cameraPosition);

    const [shiftPressed, setShiftPressed] = useState(false);

    window.addEventListener("keyup", (e) => {
        if (e.key === "Shift") {
            setShiftPressed(!shiftPressed);
        }
    })

    const car = useRef(<BasicCar position={[-1.75, 1.75, 0.3]} />)


    return (
        <Canvas className="mainCanvas" camera={{ position: cameraPos, fov: 20, up: new Vector3(0,0,1)}}>
            {/* Preloading textures */}
            <Suspense fallback={null}>
                <TexturePreloader />
            </Suspense>
            
            {/* Adding lighting */}
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            {/* Adding ground and road placment */}
            <GroundMesh />
            <HitBoxGrid showHitbox={shiftPressed}/>

            {/* Creating camera controls */}
            <OrbitControls mouseButtons={{ LEFT: MOUSE.PAN, RIGHT: MOUSE.ROTATE }} enablePan={!shiftPressed} enableRotate={!shiftPressed} zoomSpeed={4} maxPolarAngle={4*Math.PI/9} maxDistance={50} minDistance={10}/>

            {car.current}

            <primitive object={new AxesHelper(10)} />

            <House position={[1.5, 1.5, 0]} />
        </Canvas>
    );
}

export default SceneCanvas;