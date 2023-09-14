import { useRecoilState } from "recoil";
import { roadTiles, roadTilesJunctions } from "../recoil/atom/roadAtoms";
import { useCallback } from "react";
import { CornerJunction, HorizontalRoad, VerticalRoad } from "../entities/JunctionEntities";

const RoadPlacement= () => {

    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const [roadTilesJunctionsArr, setRoadTilesJunctionsArr] = useRecoilState(roadTilesJunctions)

    const calculateRoadPiece = useCallback((road) => {
        let straightRoads = "";
        let diagonalRoads = "";

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
                return <HorizontalRoad position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

            // Vertical road piece
            case "0100":
            case "0001":
            case "0101":
                return <VerticalRoad position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
            
            // Corner road piece
            case "1100":
                return <CornerJunction position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

            case "0110":
                return <CornerJunction rotation={(Math.PI * 3) / 2} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

            case "0011":
                return <CornerJunction rotation={Math.PI} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

            case "1001":
                return <CornerJunction rotation={Math.PI / 2} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
                
        }

        // switch (road[2]) {
        //     // Horizontal road piece
        //     case "10000000":
        //     case "00001000":
        //     case "10001000":
        //     case "00000000":
        //         return <HorizontalRoad position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
            
        //     // Vertical road piece
        //     case "00100000":
        //     case "00000010":
        //     case "00100010":

        //     case "01110000":
        //     case "01100000":
        //     case "00110000":

        //     case "00000011":
        //     case "00000111":
        //     case "00000010":

        //     case "01100010":
        //     case "00110010":
        //     case "01110010":
        //     case "00100011":
        //     case "00100110":
        //     case "00100111":
        //     case "01100110":
        //     case "01100011":
        //     case "01100111":
        //     case "11000110":
        //     case "11000011":
        //     case "11000111":
        //     case "11100110":
        //     case "11100011":
        //     case "11100111":
        //         return <VerticalRoad position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
            
        //     // Corner road piece
        //     // bottom right
        //     case ("10100000"):
        //         return <CornerJunction position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
            
        //     // top right
        //     case ("10000010"):
        //         return <CornerJunction rotation={Math.PI / 2} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
            
        //     // top left
        //     case ("00001010"):
        //         return <CornerJunction rotation={Math.PI} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

        //     // bottom left
        //     case ("00101000"):
        //         return <CornerJunction rotation={(Math.PI * 3) / 2} position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />

        //     default:
        //         return <HorizontalRoad position={[translateGridX+(road[0]*CELL_WIDTH), translateGridY+(road[1]*CELL_HEIGHT), 1]} />
        // }
    });

    return(
        roadTilesJunctionsArr.map((i_pos) => {return calculateRoadPiece(i_pos)})
            // <mesh position={[translateGridX+(i_pos[0]*CELL_WIDTH), translateGridY+(i_pos[1]*CELL_HEIGHT), 1]} scale={0.9}>
            //     <planeGeometry />
            //     <meshPhongMaterial color="red" />
            // </mesh>)
    )
}

export default RoadPlacement;