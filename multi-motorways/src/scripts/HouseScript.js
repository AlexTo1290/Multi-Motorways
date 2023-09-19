import { useGameObject } from "../components/useGameObject";
import { useCallback, useState, useEffect } from "react";
import { BasicCar } from "../entities/CarEntities";

function HouseScript({position}) {
    const state = useGameObject();  // getting subscribed-to game object state
    const [cars, setCars] = useState([]);
    const addCar = useCallback(() => {
        let newCars = [...cars];
        newCars.push(<BasicCar position={position} />)
        setCars(newCars)
        console.log(position)
    })
    
    useEffect(() => {
        let timer = setTimeout(() => {
        addCar()
      }, 1000);
    
      return () => clearTimeout(timer)
      });

    return (
        cars
    )
}

export default HouseScript;