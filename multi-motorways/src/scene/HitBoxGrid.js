import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { roadTiles, roadTilesJunctions } from "../recoil/atom/roadAtoms";

const HitBoxGrid = () => {
    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const GRID_WIDTH = 50
    const GRID_HEIGHT = 50

    const [roadTilesArr, setRoadTilesArr] = useRecoilState(roadTiles)
    const [roadTilesJunctionsArr, setRoadTilesJunctionsArr] = useRecoilState(roadTilesJunctions);

    const [cellsPositions, setCellPositions] = useState([])

    function registerBuildClick(x,y) {
        var index = roadTilesArr.findIndex((item) => item[0] === x && item[1] === y);

        if (index !== -1) {
            const newList = [...roadTilesArr.slice(0, index), ...roadTilesArr.slice(index + 1)];
            setRoadTilesArr(newList);
        }
        else
        {
            setRoadTilesArr([...roadTilesArr, [x,y,0]])
            console.log(roadTilesArr)
        }
    }

    useEffect(() => {
        let copy = []

        for (let i = 0; i < roadTilesArr.length; i++) {
            let road = roadTilesArr[i] 
            const x = road[0]
            const y = road[1]
            var junctionCode = ""
            const index = roadTilesArr.findIndex((item) => item[0] === x && item[1] === y);

            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y) === -1) ?"1" : "0" // left
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y+1) === -1) ?"1" : "0" // upleft
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x && item[1] === y+1) === -1) ?"1" : "0" // up
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y+1) === -1) ?"1" : "0" // upright
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y) === -1) ?"1" : "0" // right
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y-1) === -1) ?"1" : "0" // downright
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x && item[1] === y-1) === -1) ?"1" : "0" // down
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y-1) === -1) ?"1" : "0" // downleft
            
            copy.push([x,y, junctionCode]);
        };

        setRoadTilesJunctionsArr(copy);
        console.log(roadTilesJunctionsArr)
    }, [roadTilesArr]);

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