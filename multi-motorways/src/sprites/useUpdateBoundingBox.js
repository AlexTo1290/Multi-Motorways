import { useState } from "react";
import { useGameObject } from "../components/useGameObject";
import { useFrame } from '@react-three/fiber'
import { gameObjectBoundingBoxes } from "../recoil/atom/gameObjectRegistry";
import { Box3 } from "three";
import { useRecoilCallback } from "recoil";

function useUpdateBoundingBox({ id, mesh }) {
    const [boundingBoxCalculated, setBoundingBoxCalculated] = useState(false);

    if (!boundingBoxCalculated && mesh!==null) {
        mesh.geometry.computeBoundingBox();
        setBoundingBoxCalculated(true);
    }

    const updateBoundingBoxAtom = useRecoilCallback(({set, snapshot}) => () => {
        const box = new Box3();
        box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
        set(gameObjectBoundingBoxes(id), box);
    })

    // Storing the bounding box in the atom family 
    useFrame(() => {
        if (boundingBoxCalculated) updateBoundingBoxAtom();
    })
    
    
}

export default useUpdateBoundingBox;