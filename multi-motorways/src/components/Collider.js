import { gameObjectRegistry } from "../recoil/atom/gameObjectRegistry";
import { useRecoilState, useRecoilValue } from "recoil"
import { useContext } from "react";
import { GameObjectContext } from "./GameObject";

function Collider({ types=["all"] }) {
    // Getting game object's context
    const id = useContext(GameObjectContext).id;
    const context = useRecoilValue(gameObjectRegistry(id))
    const position = context.position;

    // Checking for collisions


    // doing nothing if "types" is empty
    if (types.length == 0) {
        return;
    }

    // detecting collisions with particular types of game objects if specified
    if (types[0] != "all") {
        let colliderByTypes = [];
        let nextKey = 0;

        for (let i = 0; i < types.length; i++) {
            colliderByTypes.push(<colliderByTypes key={nextKey} type={types[i]} />)
        }

        return <> { colliderByTypes } </>
    }

    // detectig colisions with all game objects
    return 


}

export default Collider;