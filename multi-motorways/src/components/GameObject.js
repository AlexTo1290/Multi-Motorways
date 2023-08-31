import { nextUniqueId } from "../recoil/atom/idValues"
import { gameObjectRegistry, gameObjectRegistryByType } from "../recoil/atom/gameObjectRegistry";
import { useRecoilCallback } from "recoil";
import { useEffect, createContext, useState } from "react";


export const GameObjectContext = createContext({});

/**
 * Creates an object in the game. Such include cars, junctions, houses, etc.
 * @param name the name of the object
 * @param position the position of the object on the canvas, in the array [x, y]
 * @children holds the child components
 * @isVisible holds a boolean to whether the object is visible on the canvas
 * @type holds a string stating whether the object is an "Road, Junction, etc"
 */
function GameObject({ name, position, direction, children, isVisible, type, collisions }) {
    const [context, setContext] = useState({});

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
        const newGameObject = { id: id, type: type, name: name, position: position, direction: direction, isVisible: isVisible, collisions: collisions };
        
        // registering the new game object into the game object registries
        set(gameObjectRegistry(id), newGameObject);

        let newGameObjects = snapshot.getLoadable(gameObjectRegistryByType(type)).contents;
        console.log(newGameObjects);

        // checking if current dict for type is empty
        if (Object.keys(newGameObjects).length === 0) {
            set(gameObjectRegistryByType(type), {id: newGameObject});
            console.log("Game object added to registry")
        } else {
            newGameObjects[id] = newGameObject;
            set(gameObjectRegistryByType(type), newGameObjects);
            console.log("Game object added to registry")
        }

        
        return id;  // returning the id the game object has been registered as
    }, []);
    
    // ================= TO BE CREATED =================
    // const unregisterGameObject = useRecoilCallback(({ type, id, }) => {
    //     const setGameObjects = useSetRecoilState(gameObjectRegistry(id));
    //     const [gameObjectsByType, setGameObjectsByType] = useRecoilState(gameObjectRegistryByType(type));
        
    //     // removing the game object from the game object registries
    //     setGameObjects(null)
        
    //     let newGameObjects = { ...gameObjectsByType };
    //     newGameObjects[id] = undefined;
    //     setGameObjects(newGameObjects);
        
    //     return true;
    // }, []);

    
    // Registering the game object to the game objects registry (on the first render)
    useEffect(() => {
        let newContext = { ...context };
        newContext["id"] = registerGameObject();
        setContext(newContext);
    }, [])
    

    if (isVisible) {
        return (<GameObjectContext.Provider value={context}> {children} </GameObjectContext.Provider>);
    }
}

export default GameObject;