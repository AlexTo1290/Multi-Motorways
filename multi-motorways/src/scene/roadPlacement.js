import { useRecoilState } from "recoil";
import { roadTiles, roadTilesJunctions } from "../recoil/atom/roadAtoms";
import { useCallback } from "react";
import { CornerJunction, HorizontalRoad, TJunction, VerticalRoad } from "../entities/JunctionEntities";

const RoadPlacement= () => {

    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const [roadTilesJunctionsArr, setRoadTilesJunctionsArr] = useRecoilState(roadTilesJunctions)

    const calculateRoadPiece = useCallback((road, key) => {
        let straightRoads = "";
        let diagonalRoads = "";
        let position = [translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]

        for (let i = 0; i < road[2].length; i+=2) {
            straightRoads += road[2].charAt(i);
        }

        for (let i = 1; i < road[2].length; i+=2) {
            diagonalRoads += road[2].charAt(i);
        }

        switch(straightRoads) {
            // Horizontal road piece
            case "1000":
            case "0010":
            case "1010":
            case "0000":
                return <HorizontalRoad position={position} key={key} />

            // Vertical road piece
            case "0100":
            case "0001":
            case "0101":
                return <VerticalRoad position={position} key={key} />
            
            // Corner road piece
            case "1100":
                return <CornerJunction position={position} key={key} />

            case "0110":
                return <CornerJunction rotation={(Math.PI * 3) / 2} position={position} key={key} />

            case "0011":
                return <CornerJunction rotation={Math.PI} position={position} key={key} />

            case "1001":
                return <CornerJunction rotation={Math.PI / 2} position={position} key={key} />
            
            // T-Junctions
            case "1011":
                return <TJunction position={position} key={key} />
            
            case "0111":
                return <TJunction rotation={Math.PI / 2} position={position} key={key} />

            case "1110":
                return <TJunction rotation={Math.PI} position={position} key={key} />
            
            case "1101":
                return <TJunction rotation={(3 * Math.PI) / 2} position={position} key={key} />
        }
    });

    return(
        roadTilesJunctionsArr.map((i_pos, idx) => { return (
                calculateRoadPiece(i_pos, idx)
            )}
        )
            // <mesh position={[translateGridX+(i_pos[0]*CELL_WIDTH), translateGridY+(i_pos[1]*CELL_HEIGHT), 1]} scale={0.9}>
            //     <planeGeometry />
            //     <meshPhongMaterial color="red" />
            // </mesh>)
    )
}

export default RoadPlacement;