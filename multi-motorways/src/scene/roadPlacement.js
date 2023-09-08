import { useRecoilState } from "recoil";
import { roadTiles } from "../recoil/atom/roadAtoms";

const RoadPlacement= () => {

    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const [roadTilesArr, setRoadTilesArr] = useRecoilState(roadTiles)

    return(
        roadTilesArr.map((i_pos) => 
            <mesh position={[translateGridX+(i_pos[0]*CELL_WIDTH), translateGridY+(i_pos[1]*CELL_HEIGHT), 1]} scale={0.9}>
                <planeGeometry />
                <meshPhongMaterial color="red" />
            </mesh>)
    )
}

export default RoadPlacement;