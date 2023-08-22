// RoadTile
// Creates a mesh for a road tile between two points
// Params
// c1: [x,y] coordinates of first point
// c2: [x,y] coordinates of second point
// Returns
// A mesh for a road tile between the two points
const RoadTile = (props) => {
  	let c1 = props.c1;
  	let c2 = props.c2;

  	// console.log(c1,c2);

  	let startX = c1[0];
	let startY = c1[1];
    let endX = c2[0];
    let endY = c2[1];

    let length = Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2));
	let midpoint = [(startX+endX)/2,(startY+endY)/2,1];
	let angle = Math.atan((endY-startY)/(endX-startX));

    //console.log(length,midpoint,angle);

    const road = <mesh  position={midpoint} scale={0.2} rotation-z={angle}> 
                  <planeGeometry args={[length,1.2,1]}/>
                  <meshToonMaterial color="darkgray" />
                  <mesh> 
                    <planeGeometry args={[length,0.15,1]}/>
                    <meshToonMaterial color="white" />
                  </mesh>
                </mesh>

    return road;
}

export default RoadTile;