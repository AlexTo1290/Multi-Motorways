import { Canvas } from "@react-three/fiber";

import "./styles/styles.css";

const GroundMesh = () => {
  return <mesh position={[0, 0, -0.5]} scale={100}>
    <planeGeometry />
    <meshToonMaterial color="lightgreen" />
  </mesh>
}

const RoadTile = (x,y) => {
  return <mesh scale={0.2} rotation-z={1}> 
      <planeGeometry args={[20,1.2,1]}/>
      <meshToonMaterial color="darkgray" />
      <mesh scale={1}> 
        <planeGeometry args={[20,0.15,1]}/>
        <meshToonMaterial color="white" />
      </mesh>
    </mesh>
}

function App() {
  return (
    <div className="Fill">
      <Canvas>
        <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <GroundMesh />
          <RoadTile x={0} y={0}></RoadTile>
      </Canvas>
    </div>
  );
}

export default App;
