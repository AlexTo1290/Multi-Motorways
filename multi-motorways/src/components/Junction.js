import GameObject from "./GameObject"
import { useEffect } from "react"
import { junctionAtoms } from "../recoil/atom/junctionAtoms"
import { useRecoilState } from "recoil"

function Junction({name, position, children}) {
    const [junctions, setJunctionAtoms] = useRecoilState(junctionAtoms);

    // adding new junction to junctionAtoms on first render
    useEffect(() => {
        setJunctionAtoms(junctions.push({position: {position}, name: {name}}))
    }, []);

    return (<GameObject name={name} position={position} type="junction" isVisible={true}>
        { children }
    </GameObject>);
}

export default Junction;