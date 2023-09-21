import { useRecoilCallback, useRecoilValue } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectCollisionRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import { TJunctionControllerAtom } from "../recoil/atom/junctionControllerAtoms";
import { useEffect } from "react";


function TJunctionControllerLaneScript({ controllerObjectId, lane }) {
    const state = useGameObject();  // getting subscribed-to game object state

    const collisions = useRecoilValue(gameObjectCollisionRegistry(state?.id))
    
    useEffect(() => {
        checkCollision(controllerObjectId);
    }, [collisions]);

    // callback function that updates atom family if the object is colliding with any cars
    const checkCollision = useRecoilCallback(({snapshot, set}) => (controllerObjectId) => {
        let tJunctionController = {... snapshot.getLoadable(TJunctionControllerAtom(controllerObjectId)).getValue()};

        tJunctionController[lane] = (collisions.length > 0);   // storing any collisions
        
        set(TJunctionControllerAtom(controllerObjectId), tJunctionController);
    });
}

export default TJunctionControllerLaneScript;