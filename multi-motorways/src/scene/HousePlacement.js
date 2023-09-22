import { useRef } from "react";


function HousePlacement() {
    const houses = useRef();

    return houses.current;
}

return HousePlacement;