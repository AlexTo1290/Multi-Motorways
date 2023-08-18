import { carAtoms } from "../../recoil/atom/carAtoms";
import { junctionAtoms } from "../../recoil/atom/junctionAtoms";
import { useRecoilState, useRecoilValue } from "recoil"
import { useFrame } from '@react-three/fiber'

function Collider() {
    const [cars, setCarAtoms] = useRecoilState(carAtoms);
    const junctions = useRecoilValue(junctionAtoms)

    useFrame((state, delta) => {

    })
}

export default Collider;