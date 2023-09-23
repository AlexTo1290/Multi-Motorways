import { useGameObject } from "../components/useGameObject";
import { useCallback, useState, useEffect, useRef } from "react";
import { BasicCar } from "../entities/CarEntities";

function HouseScript({position}) {
    const state = useGameObject();  // getting subscribed-to game object state
    
    const [cars, setCars] = useState({});
    const nextKey = useRef(0);


    const addCar = () => {
        let newCars = {... cars}
        newCars[nextKey.current] = <BasicCar key={nextKey.current} listId={nextKey.current} position={[position[0], position[1] - 0.77, 0.3]} directions={["left", "left", "right", "right", "left"]} removeFromCanvasCallback={setCars} />;
        setCars(newCars)
        nextKey.current += 1;
    }
    
    useEffect(() => {
        let timer = setTimeout(() => {
        addCar()
      }, 5000);
    
      return () => clearTimeout(timer)
      });
    //   console.log(cars)
    return (
        Object.values(cars)
    )
}

export default HouseScript;