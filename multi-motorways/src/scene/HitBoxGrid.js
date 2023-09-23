import { useCallback, useEffect, useRef, useState } from "react"
import { useRecoilCallback, useRecoilState } from "recoil";
import { roadTiles, roadTilesJunctions, roadTilesJunctionsFamily } from "../recoil/atom/roadAtoms";
import { graphRoads } from "../recoil/atom/graphAtom";
import RoadPieceHandler from "./RoadPieceHandler";
import { useFrame } from "@react-three/fiber";


const HitBoxGrid = ({showHitbox}) => {
    const translateGridX = -24.5
    const translateGridY = -24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const GRID_WIDTH = 50
    const GRID_HEIGHT = 50

    const [roadTilesArr, setRoadTilesArr] = useRecoilState(roadTiles)
    const [roadTilesJunctionsArr, setRoadTilesJunctionsArr] = useRecoilState(roadTilesJunctions);
    const [graphRoadsArr, setGraphRoadsArr] = useRecoilState(graphRoads)

    const [roadEntities, setRoadEntities] = useState([]);
    const nextKey = useRef(0);

    
    // Hitbox toggling by pressing shift
    const hitboxes = useRef();

    function registerBuildClick(x, y) {
        let roadTilesArr = null;

        setRoadTilesArr((state) => {
            roadTilesArr = [... state]
            return roadTilesArr;
        })
        
        let index = roadTilesArr.findIndex((item) => item[0] === x && item[1] === y);

        if (index !== -1) {
            // updating roadJunctionDict
            resetJunctionCodeInDict(roadTilesArr[index][0].toString() + "," + roadTilesArr[index][1].toString());

            setRoadTilesArr((previousState) => {
                return [...previousState.slice(0, index), ...previousState.slice(index + 1)];
            })
        }
        else
        {
            setRoadTilesArr(previousState => {
                return [... previousState, [x,y,0]]
            })
            
            let id = nextKey.current;   // required in setState as setState function is async so would use updated value of nextKey

            setRoadEntities(previousState => {
                return [... previousState, <RoadPieceHandler key={id} position={[x, y, 0]} /> ]
            })

            nextKey.current += 1;
        }
    }

    const updateJunctionCodeInDict = useRecoilCallback(({set}) => (key, code) => {
        set(roadTilesJunctionsFamily(key), code);
    });

    const resetJunctionCodeInDict = useRecoilCallback(({reset}) => (key) => {
        reset(roadTilesJunctionsFamily(key));
    });

    useEffect(() => {
        console.log(roadTilesArr)
        let copy = []
        console.log(roadEntities)
        for (let i = 0; i < roadTilesArr.length; i++) {
            let road = roadTilesArr[i]
            const x = road[0]
            const y = road[1]
            let junctionCode = ""

            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y) === -1) ?"0" : "1" // left
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y+1) === -1) ?"0" : "1" // upleft
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x && item[1] === y+1) === -1) ?"0" : "1" // up
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y+1) === -1) ?"0" : "1" // upright
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y) === -1) ?"0" : "1" // right
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x+1 && item[1] === y-1) === -1) ?"0" : "1" // downright
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x && item[1] === y-1) === -1) ?"0" : "1" // down
            junctionCode+=(roadTilesArr.findIndex((item) => item[0] === x-1 && item[1] === y-1) === -1) ?"0" : "1" // downleft
            
            copy.push([x,y, junctionCode]);


            // updating the code for the junction
            let key = x.toString() + "," + y.toString();
            updateJunctionCodeInDict(key, junctionCode);
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

    // useEffect(() => {
    //     var currentBoxX = 0
    //     var currentBoxY = 0

    //     var generatePosArr = []

    //     // generate mesh cells in a grid pattern
    //     while ((currentBoxY * CELL_HEIGHT) < GRID_HEIGHT) {
    //         while ((currentBoxX * CELL_WIDTH) < GRID_WIDTH) {
    //             generatePosArr.push([translateGridX + (currentBoxX * CELL_WIDTH), translateGridY + currentBoxY * CELL_HEIGHT, 0.1])
    //             currentBoxX += 1;
    //         }
    //         currentBoxY += 1;
    //         currentBoxX = 0;
    //     }

    //     setCellPositions(generatePosArr)
        
    //     // Creating the hitbox objects
    //     hitboxes.current = cellsPositions.map((i_pos, idx) => {
    //         return <mesh key={idx} position={i_pos} scale={0.9} onPointerDown={(e) => registerBuildClick((i_pos[0] - translateGridX) / CELL_WIDTH, (i_pos[1] - translateGridY) / CELL_HEIGHT)}>
    //                 <planeGeometry />
    //                 <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
    //             </mesh>
    //         }
    //     )
    // },[roadTilesJunctionsArr, showHitbox])

    useEffect(() => {
        let hitboxObjects = [];
        let currentId = 0;

        for (let i = -12; i < 12; i++) {
            for (let j = -12; j < 12; j++) {
                hitboxObjects.push(<mesh key={currentId} position={[i, j, 0.05]} scale={0.9} onPointerDown={(e) => registerBuildClick(i, j)}>
                    <planeGeometry />
                    <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
                </mesh>)

                currentId++;
            }
        }

        hitboxes.current = hitboxObjects;
    }, [])


    // // Making road preset
    useEffect(() => {
        const roadPositions = [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],    // inner bottom
            [4, 1], [4, 2],  // inner right
            [-2, 1], [-2, 2],   //inner left
            [-2, 3], [-1, 3], [-0, 3], [1, 3], [2, 3], [3, 3], [4, 3],  // inner top
            [1, 4], [1, 5],   // top passing
            [-3, 1], [-4, 1], [-5, 1],  // left passing
            [5, 1], [6, 1], [7, 1],  // right passing
            [-5, 6], [-4, 6], [-3, 6], [-2, 6], [-1, 6], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],     // top
            [-5, 5], [-5, 4], [-5, 3], [-5, 2],   // top left
            [7, 5], [7, 4], [7, 3], [7, 2],     // top right
            [-6, 1], [-6, 0], [-6, -1], [-6, -2],   // bottom left
            [8, 1], [8, 0], [8, -1], [8, -2],    // bottom right
            [-6, -3], [-5, -3], [-4, -3], [-3, -3], [-2, -3], [-1, -3], [3, -3], [4, -3], [5, -3], [6, -3], [7, -3], [8, -3],   // bottom
            [0, -2], [1, -2], [2, -2],   // bottom central passing
            [-1, -2], [-1, -1], [3, -2], [3, -1]    // bottom vertical passings
            
        ]

        for (let i = 0; i < roadPositions.length; i++) {
            registerBuildClick(roadPositions[i][0], roadPositions[i][1]);
        }
    }, [])  
    

    
    return(<>
        {roadEntities}
        {showHitbox ? hitboxes.current : <></>}
        </>)
}

export default HitBoxGrid;