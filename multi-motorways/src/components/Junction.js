import GameObject from "./GameObject"


function Junction({name, position, children}) {
    return (<GameObject name={name} position={position} type="junction" isVisible={true}>
        { children }
    </GameObject>);
}

export default Junction;