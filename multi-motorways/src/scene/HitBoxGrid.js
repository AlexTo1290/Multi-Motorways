import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { roadTiles, roadTilesJunctions } from "../recoil/atom/roadAtoms";
import { graphRoads } from "../recoil/atom/graphAtom";


const HitBoxGrid = () => {
    const translateGridX = -24.5
    const translateGridY = -24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const GRID_WIDTH = 50
    const GRID_HEIGHT = 50

    const [roadTilesArr, setRoadTilesArr] = useRecoilState(roadTiles)
    const [roadTilesJunctionsArr, setRoadTilesJunctionsArr] = useRecoilState(roadTilesJunctions);
    const [graphRoadsArr, setGraphRoadsArr] = useRecoilState(graphRoads)


    const [cellsPositions, setCellPositions] = useState([])

    function registerBuildClick(x, y) {
        var index = roadTilesArr.findIndex((item) => item[0] === x && item[1] === y);

        if (index !== -1) {
            const newList = [...roadTilesArr.slice(0, index), ...roadTilesArr.slice(index + 1)];
            setRoadTilesArr(newList);
        }
        else {
            setRoadTilesArr([...roadTilesArr, [x, y, 0]])
        }
    }

    useEffect(() => {
        let copy = []

        for (let i = 0; i < roadTilesArr.length; i++) {
            let road = roadTilesArr[i]
            const x = road[0]
            const y = road[1]
            let junctionCode = ""
            const index = roadTilesArr.findIndex((item) => item[0] === x && item[1] === y);

            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x - 1 && item[1] === y) === -1) ? "0" : "1" // left
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x - 1 && item[1] === y + 1) === -1) ? "0" : "1" // upleft
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x && item[1] === y + 1) === -1) ? "0" : "1" // up
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x + 1 && item[1] === y + 1) === -1) ? "0" : "1" // upright
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x + 1 && item[1] === y) === -1) ? "0" : "1" // right
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x + 1 && item[1] === y - 1) === -1) ? "0" : "1" // downright
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x && item[1] === y - 1) === -1) ? "0" : "1" // down
            junctionCode += (roadTilesArr.findIndex((item) => item[0] === x - 1 && item[1] === y - 1) === -1) ? "0" : "1" // downleft

            copy.push([x, y, junctionCode]);
        };

        setRoadTilesJunctionsArr(copy);


        let nodeEdgeGenerator = [[], []]
        let nodeEdgeGeneratorBasic = []

        // make nodes
        for (let i = 0; i < copy.length; i++) {
            let junctionCode = copy[i][2]

            let straightRoads = "";
            for (let i = 0; i < junctionCode.length; i += 2) {
                straightRoads += junctionCode.charAt(i);
            }


            switch (straightRoads) {
                //streight roads
                case "1010": // hoz
                case "0101": // ver
                    continue;

                // junctions
                default:
                    {
                        nodeEdgeGenerator[0].push(copy[i]);
                        nodeEdgeGeneratorBasic.push({ x: copy[i][0], y: copy[i][1] });
                    }
            }
        }

        console.log("Graph Nodes:")
        console.log(nodeEdgeGenerator[0])


        // make edges
        for (let i = 0; i < nodeEdgeGenerator[0].length; i++) {

            let junctionCode = nodeEdgeGenerator[0][i][2]
            //console.log(junctionCode)

            let item = nodeEdgeGenerator[0][i]

            // find connection to left
            if (junctionCode[0] === "1") {
                let lookX = -1
                let lookY = 0
                let loop = true
                while (loop) {
                    if (nodeEdgeGeneratorBasic.findIndex(junc => junc.x === item[0] + lookX && junc.y === item[1] + lookY) !== -1) {
                        loop = false
                    }
                    else {
                        lookX = lookX - 1
                    }
                }
                if (nodeEdgeGenerator[1].findIndex(junc => junc[0][0] === item[0] + lookX && junc[0][1] === item[1] + lookY && junc[1][0] === item[0] && junc[1][1] === item[1]) === -1)
                    nodeEdgeGenerator[1].push([[item[0], item[1]], [item[0] + lookX, item[1] + lookY], Math.abs(lookX)])
            }


            // find connection to right
            if (junctionCode[4] === "1") {
                let lookX = 1
                let lookY = 0
                let loop = true

                while (loop) {
                    if (nodeEdgeGeneratorBasic.findIndex(junc => junc.x === item[0] + lookX && junc.y === item[1] + lookY) !== -1) {
                        loop = false
                    }
                    else {
                        lookX = lookX + 1
                    }
                }

                if (nodeEdgeGenerator[1].findIndex(junc => junc[0][0] === item[0] + lookX && junc[0][1] === item[1] + lookY && junc[1][0] === item[0] && junc[1][1] === item[1]) === -1)
                    nodeEdgeGenerator[1].push([[item[0], item[1]], [item[0] + lookX, item[1] + lookY], Math.abs(lookX)])
            }

            // find connection to up
            if (junctionCode[2] === "1") {
                let lookX = 0
                let lookY = 1
                let loop = true
                while (loop) {
                    if (nodeEdgeGeneratorBasic.findIndex(junc => junc.x === item[0] + lookX && junc.y === item[1] + lookY) !== -1) {
                        loop = false
                    }
                    else {
                        lookY = lookY + 1
                    }
                }
                if (nodeEdgeGenerator[1].findIndex(junc => junc[0][0] === item[0] + lookX && junc[0][1] === item[1] + lookY && junc[1][0] === item[0] && junc[1][1] === item[1]) === -1)
                    nodeEdgeGenerator[1].push([[item[0], item[1]], [item[0] + lookX, item[1] + lookY], Math.abs(lookY)])
            }

            // find connection to down
            if (junctionCode[6] === "1") {
                let lookX = 0
                let lookY = -1
                let loop = true
                while (loop) {
                    if (nodeEdgeGeneratorBasic.findIndex(junc => junc.x === item[0] + lookX && junc.y === item[1] + lookY) !== -1) {
                        loop = false
                    }
                    else {
                        lookY = lookY - 1
                    }
                }

                if (nodeEdgeGenerator[1].findIndex(junc => junc[0][0] === item[0] + lookX && junc[0][1] === item[1] + lookY && junc[1][0] === item[0] && junc[1][1] === item[1]) === -1)
                    nodeEdgeGenerator[1].push([[item[0], item[1]], [item[0] + lookX, item[1] + lookY], Math.abs(lookY)])
            }
        }
        console.log("Graph Edges:")
        console.log(nodeEdgeGenerator[1])
        setGraphRoadsArr(nodeEdgeGenerator)

    }, [roadTilesArr]);

    useEffect(() => {
        var currentBoxX = 0
        var currentBoxY = 0

        var generatePosArr = []

        // generate mesh cells in a grid pattern
        while ((currentBoxY * CELL_HEIGHT) < GRID_HEIGHT) {
            while ((currentBoxX * CELL_WIDTH) < GRID_WIDTH) {
                generatePosArr.push([translateGridX + (currentBoxX * CELL_WIDTH), translateGridY + currentBoxY * CELL_HEIGHT, 1])
                currentBoxX += 1;
            }
            currentBoxY += 1;
            currentBoxX = 0;
        }

        setCellPositions(generatePosArr)
    }, [roadTilesJunctionsArr])

    return (
        cellsPositions.map((i_pos) => {
            return <mesh position={i_pos} scale={0.9} onPointerDown={(e) => registerBuildClick((i_pos[0] - translateGridX) / CELL_WIDTH, (i_pos[1] - translateGridY) / CELL_HEIGHT)} >
                <planeGeometry />
                <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
            </mesh>
        }
        )
    )
}

export default HitBoxGrid;