import { useGameObject } from "../components/useGameObject";
import { useCallback, useState, useEffect, useRef } from "react";
import { BasicCar } from "../entities/CarEntities";

function HouseScript({position}) {
    const state = useGameObject();  // getting subscribed-to game object state
    const [cars, setCars] = useState([]);
    const nextKey = useRef(0);

    const addCar = () => {
        let newCars = [...cars, <BasicCar key={nextKey.current} position={[position[0], position[1] - 0.77, 0.3]} directions={["left", "left", "right", "left", "left", "left"]} />];
        setCars(newCars)
        console.log(position)
        nextKey.current += 1;
    }
    
    useEffect(() => {
        let timer = setTimeout(() => {
        addCar()
      }, 5000);
    
      return () => clearTimeout(timer)
      });

    return (
        cars
    )
}

export default HouseScript;