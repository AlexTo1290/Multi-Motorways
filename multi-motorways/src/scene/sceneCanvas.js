import RoadTile from "./roadTiles";
import GroundMesh from './groundMesh';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import CameraController from "./CameraController";
import HitBoxGrid from "./HitBoxGrid";

import { useRecoilValue } from "recoil";
import { cameraPosition } from "../recoil/atom/cameraAtoms";
import BasicCar from "../entities/Cars/BasicCar";
// import { useFrame } from "@react-three/fiber";

const SceneCanvas = () => {
    const cameraPos = useRecoilValue(cameraPosition);

    return (
        <Canvas camera={{ position: cameraPos, fov: 100 }}>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <CameraController />
            <GroundMesh />
            <RoadTile c1={[-50, -50]} c2={[50, 50]}></RoadTile>
            <HitBoxGrid></HitBoxGrid>

            <BasicCar position={[2, 1, 2]} />

        </Canvas>
    );
}

export default SceneCanvas;