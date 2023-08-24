import { getUniqueId } from "../recoil/atom/idValues";
import { gameObjectRegistry, useRegisterGameObject } from "../recoil/atom/gameObjectRegistry";
import { useRecoilState } from "recoil";
import { useEffect, createContext, useRef } from "react";


export const GameObjectContext = createContext({});

/**
 * Creates an object in the game. Examples would be towers, background tiles, enemies, etc.
 * @param name the name of the object
 * @param position the position of the object on the canvas, in the array [x, y]
 * @children holds the child components
 * @isVisible holds a boolean to whether the object is visible on the canvas
 * @type holds a string stating whether the object is an "Road, Junction, etc"
 */
function GameObject({name, position, direction, children, isVisible, type, ...props}) {
    const context = useRef({});

    // Registering the game object to the game objects registry (on the first render)
    useEffect(() => {
        context.current[id] = useRegisterGameObject({ name: name, type: type, position: position, isVisible: isVisible, collisions: [] })
    }, [])
    

    if (isVisible) {
        return (<GameObjectContext.Provider value={context.current}> {children} </GameObjectContext.Provider>);
    }
}

export default GameObject;