import GameObject from "../components/GameObject";
import StraightLaneSprite from "../sprites/StraightLaneSprite";
import StraightRoadSprite from "../sprites/StraightRoadSprite";



function Lane({ name, position, rotation, colour, hitbox }) {
    return(
        <GameObject name={name} position={position} rotation={rotation} type="lane" hitbox={hitbox} >
            <StraightLaneSprite colour={colour}/>
        </GameObject>
    );
}


// EXPORTS
export function VerticalRoad({ position }) {
    let firstLane = [...position];
    firstLane[0] -= 0.03;
    firstLane[2] += 0.02;

    let secondLane = [...position];
    secondLane[0] += 0.03;
    secondLane[2] += 0.02;

    return(
        <GameObject name="verticalRoad" position={position} rotation={Math.PI / 2} type="road" >
            <StraightRoadSprite />
            <Lane name="verticalLaneDown" position={secondLane} rotation={Math.PI / 2} colour="lightpink" hitbox={[0.03, 0.25, 0.1]} />

            <Lane name="verticalLaneUp" position={firstLane} rotation={Math.PI / 2} colour="lightblue" hitbox={[0.03, 0.25, 0.1]} />
            {/* <Lane name="verticalLaneDown" position={secondLane} rotation={Math.PI / 2} colour="lightpink" hitbox={[0.3, 0.25, 0.1]} /> */}
        </GameObject>
    );
}

export function HorizontalRoad({ position }) {
    let firstLane = [...position];
    firstLane[1] -= 0.03;
    firstLane[2] += 0.02;

    let secondLane = [...position];
    secondLane[1] += 0.03;
    secondLane[2] += 0.02;

    return(
        <GameObject name="horizontalRoad" position={position} type="road" >
            <StraightRoadSprite />
            <Lane name="horizontalLaneLeft" position={firstLane} colour="lightpink" hitbox={[0.25, 0.05, 0.2]} />
            <Lane name="horizontalLaneRight" position={secondLane} colour="lightblue" hitbox={[0.25, 0.05, 0.1]} />
        </GameObject>
    );
}

export function CornerJunction({ position }) {
    let outsideLaneOne = [...position];
    outsideLaneOne[0] -= 0.025;
    outsideLaneOne[1] -= 0.03;
    outsideLaneOne[2] += 0.02;

    let outsideLaneTwo = [...position];
    outsideLaneTwo[0] += 0.03;
    outsideLaneTwo[2] += 0.02;
    
    let insideLane = [...position];
    insideLane[0] -= 0.03;
    insideLane[1] += 0.03;

    return(
        <GameObject name="cornerJunction" position={position} type="road" >
            <StraightRoadSprite />
            <Lane name="horizontalLaneLeft" position={insideLane} colour="lightpink" hitbox={[0.05, 0.05, 0.2]} />

            <Lane name="horizontalLaneRight" position={outsideLaneOne} colour="lightblue" hitbox={[0.2, 0.05, 0.1]} />
            <Lane name="verticalLaneUp" position={outsideLaneTwo} rotation={Math.PI / 2} colour="lightblue" hitbox={[0.05, 0.25, 0.1]} />
        </GameObject>
    );
}

