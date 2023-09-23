import { useEffect, useState } from "react";
import { House } from "../entities/HouseEntities";


function HousePlacement() {
    const [houses, setHouses] = useState();

    useEffect(() => {
        let housePositions = [[-1, 1, 0], [1, 1, 0], [3, 1, 0]];
        let houseObjects = [];
        let key = 0;

        for (let i = 0; i < housePositions.length; i++) {
            houseObjects.push(<House key={key} position={housePositions[i]} />);
            key++;
        }
        
        setHouses(houseObjects);
    }, [])
    
    return houses;
}

export default HousePlacement;