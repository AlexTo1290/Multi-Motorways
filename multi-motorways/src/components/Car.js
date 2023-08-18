import GameObject from "./GameObject"
import { carAtoms } from "../recoil/atom/carAtoms";
import { junctionAtoms } from "../recoil/atom/junctionAtoms";
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useFrame } from '@react-three/fiber'

function Car({name, position, children}) {

    // adding new car to carAtoms on first render
    useEffect(() => {
        setCarAtoms(cars.push({name: {name}, position: {position}, rotation: 0}))
    }, []);

    return (<GameObject name={name} position={position} type="car" isVisible={true}>
        { children }
    </GameObject>);
}

export default Car;