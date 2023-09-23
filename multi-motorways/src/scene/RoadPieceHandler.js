import { useRecoilValue } from "recoil";
import { roadTilesJunctionsFamily } from "../recoil/atom/roadAtoms";
import { CornerJunction, HorizontalRoad, TJunction, VerticalRoad } from "../entities/JunctionEntities";
import { useCallback } from "react";


export default function RoadPieceHandler({ position }) {
    const roadJunction = useRecoilValue(roadTilesJunctionsFamily(position[0].toString() + "," + position[1].toString()))
    const translateGridX=-24.5
    const translateGridY=-24.5
    const CELL_HEIGHT = 1
    const CELL_WIDTH = 1

    const calculateRoadPiece = useCallback((road) => {
        if (roadJunction === "") {
            return;
        }

        let straightRoads = "";
        let diagonalRoads = "";

        for (let i = 0; i < road.length; i+=2) {
            straightRoads += road.charAt(i);
        }

        for (let i = 1; i < road.length; i+=2) {
            diagonalRoads += road.charAt(i);
        }
        
        switch(straightRoads) {
            // Straight road piece
            case "1000":
            case "0010":
            case "1010":
            case "0000":
                return <VerticalRoad position={position} />
        
            case "0100":
            case "0001":
            case "0101":
                return <HorizontalRoad position={position} />
            
            // Corner road piece
            case "1100":
                return <CornerJunction position={position} />

            case "0110":
                return <CornerJunction rotation={(Math.PI * 3) / 2} position={position} />

            case "0011":
                return <CornerJunction rotation={Math.PI} position={position} />

            case "1001":
                return <CornerJunction rotation={Math.PI / 2} position={position} />
            
            // T-Junctions
            case "1011":
                return <TJunction position={position} />
            
            case "0111":
                return <TJunction rotation={Math.PI / 2} position={position}  />

            case "1110":
                return <TJunction rotation={Math.PI} position={position} />
            
            case "1101":
                return <TJunction rotation={(3 * Math.PI) / 2} position={position} />
        }

        return;
    });

    return calculateRoadPiece(roadJunction)
}