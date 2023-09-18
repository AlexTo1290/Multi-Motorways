import { nextUniqueId } from "../recoil/atom/idValues"
import { gameObjectCollisionRegistry, gameObjectRegistry, gameObjectRegistryByType } from "../recoil/atom/gameObjectRegistry";
import { useRecoilCallback } from "recoil";
import { useEffect, createContext, useState, useRef } from "react";


export const GameObjectContext = createContext({});

/**
 * Creates an object in the game. Such include cars, junctions, houses, etc.
 * @param name the name of the object
 * @param position the position of the object on the canvas, in the array [x, y]
 * @children holds the child components
 * @isVisible holds a boolean to whether the object is visible on the canvas
 * @type holds a string stating whether the object is an "Road, Junction, etc"
 */
function GameObject({ name, position, rotation=0, children, isVisible=true, type, hitbox=[0, 0, 0] }) {
    const [context, setContext] = useState({});
    const mounted = useRef(false);
    const [id, setId] = useState(null);

    // FUNCTIONS FOR REGISTERING AN UNREGISTERING GAME OBJECTS

    // Function - returns a unique id
    const getUniqueId = useRecoilCallback(({set, snapshot}) => () => {
        // getting unique id
        const id = snapshot.getLoadable(nextUniqueId).contents;

        // updating the atom to point to the next unique id
        set(nextUniqueId, id + 1);
        
        return id;
    }, []);

    // Function - registers a game object to the game object registries
    const registerGameObject = useRecoilCallback(({set, snapshot}) => () => {   
        // getting a unique id for the game object
        const id = getUniqueId();

        // creating new game object in registries
        const newGameObject = { id: id, type: type, name: name, position: position, rotation: rotation, isVisible: isVisible, hitbox: hitbox };
        
        // registering the new game object into the game object registries
        set(gameObjectRegistry(id), newGameObject);     // registering to gameObjectsRegistry

        let newGameObjects = [... snapshot.getLoadable(gameObjectRegistryByType(type)).contents];    // registering to gameObjetRegistryByType
        console.log(newGameObject);
        newGameObjects.push(id);

        set(gameObjectRegistryByType(type), newGameObjects);
        
        return id;  // returning the id the game object has been registered as
    }, []);
    
    // removing game object from game registries upon unmount
    const unmount = useRecoilCallback(({reset, snapshot, set}) => () => {
        reset(gameObjectRegistry(id));
        
        let gameObjects = [... snapshot.getLoadable(gameObjectRegistryByType(type)).getValue()]

        gameObjects.splice(gameObjects.indexOf(id), 1);
        set(gameObjectRegistryByType(type), gameObjects);
    })

    
    // Registering the game object to the game objects registry (on the first render)
    useEffect(() => {
        let newContext = { ...context };
        let id = registerGameObject();
        newContext["id"] = id;
        setContext(newContext);

        mounted.current = true;
        setId(id);

        return unmount;  // cleaning up resources
    }, [])
    
    

    if (isVisible) {
        return (<GameObjectContext.Provider value={context}>{children}</GameObjectContext.Provider>);
    }
}

export default GameObject;