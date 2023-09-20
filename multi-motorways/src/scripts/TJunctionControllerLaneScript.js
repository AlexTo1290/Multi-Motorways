import { useRecoilCallback } from "recoil";
import { useGameObject } from "../components/useGameObject";
import { gameObjectCollisionRegistry } from "../recoil/atom/gameObjectRegistry";
import { useFrame } from '@react-three/fiber'
import { TJunctionControllerAtom } from "../recoil/atom/junctionControllerAtoms";


function TJunctionControllerLaneScript({ controllerObjectId, lane }) {
    const state = useGameObject();  // getting subscribed-to game object state

    // callback function that updates atom family if the object is colliding with any cars
    const checkCollision = useRecoilCallback(({snapshot, set}) => () => {
        let collisions = snapshot.getLoadable(gameObjectCollisionRegistry(state.id)).getValue();

        let tJunctionController = {... snapshot.getLoadable(TJunctionControllerAtom(controllerObjectId)).getValue()};

        tJunctionController[lane] = (collisions.length > 0);   // storing any collisions

        set(TJunctionControllerAtom(controllerObjectId), tJunctionController);
    });

    useFrame(() => {
        if (state) {
            checkCollision()
        };
    })
}

export default TJunctionControllerLaneScript;