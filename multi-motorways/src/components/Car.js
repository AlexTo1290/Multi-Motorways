import GameObject from "../GameObject"


function Car({name, position, children}) {
    
    return (<GameObject name={name} position={position} type="car" isVisible={true}>
        { children }
    </GameObject>);
}

export default Car;