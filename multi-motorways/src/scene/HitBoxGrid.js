import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { roadTiles } from "../recoil/atom/roadAtoms";

const HitBoxGrid = () => {
    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const GRID_WIDTH = 50
    const GRID_HEIGHT = 50

    const [roadTilesArr, setRoadTilesArr] = useRecoilState(roadTiles)
    const [cellsPositions, setCellPositions] = useState([])

    function registerBuildClick(x,y){
        setRoadTilesArr([...roadTilesArr, [x,y]])
    }

    useEffect(()=>{
        var currentBoxX = 0
        var currentBoxY = 0

        var generatePosArr = []

        // generate mesh cells in a grid pattern
        while((currentBoxY*CELL_HEIGHT)<GRID_HEIGHT){
            while((currentBoxX*CELL_WIDTH)<GRID_WIDTH){
                generatePosArr.push([translateGridX+(currentBoxX*CELL_WIDTH), translateGridY+currentBoxY*CELL_HEIGHT, 1])
                currentBoxX+=1;
            }
            currentBoxY +=1;
            currentBoxX =0;
        }

        setCellPositions(generatePosArr)
    },[])

    return(
        cellsPositions.map((i_pos) =>
            <mesh position={i_pos} scale={0.9} onClick={(e)=>registerBuildClick((i_pos[0]-translateGridX)/CELL_WIDTH, (i_pos[1]-translateGridY)/CELL_HEIGHT)}>
                <planeGeometry />
                <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
            </mesh>
        )
    )
  }

export default HitBoxGrid;