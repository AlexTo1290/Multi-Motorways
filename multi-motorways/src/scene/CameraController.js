import { useFrame } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import { cameraPosition } from "../recoil/atom/cameraAtoms";

function CameraController() {
    const [cameraPos, setCameraPos] = useRecoilState(cameraPosition)

    useFrame((state, delta) => {
        
    })
}

export default CameraController;