import { useEffect, useRef, useState } from "react";
import { useGameObject } from "../components/useGameObject";
import { useFrame } from '@react-three/fiber'
import { gameObjectBoundingBoxes } from "../recoil/atom/gameObjectRegistry";
import { Box3 } from "three";
import { useRecoilCallback } from "recoil";

function useUpdateBoundingBox({ id, mesh }) {
    const [boundingBoxCalculated, setBoundingBoxCalculated] = useState(false);
    const mounted = useRef(false);
    const idRef = useRef(id)

    const updateBoundingBoxAtom = useRecoilCallback(({set, snapshot}) => () => {
        if (!mesh?.geometry?.boundingBox) {
            mesh?.geometry.computeBoundingBox();
            return;
        }

        let box = new Box3();
        box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
        set(gameObjectBoundingBoxes(id), box);
    })




    // Storing the bounding box in the atom family 
    useEffect(() => {
        if (boundingBoxCalculated) updateBoundingBoxAtom();

        else if (!boundingBoxCalculated && mesh!==null) {
            mesh.geometry.computeBoundingBox();
            setBoundingBoxCalculated(true);
            idRef.current = id
            updateBoundingBoxAtom()
        }
    })
    
    const unmount = useRecoilCallback(({set}) => () => {
        set(gameObjectBoundingBoxes(idRef.current), null);
    })

    useEffect(() => {
        mounted.current = true;


        return unmount;
    }, [])
}

export default useUpdateBoundingBox;