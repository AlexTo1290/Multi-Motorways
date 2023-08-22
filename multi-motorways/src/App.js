import { Canvas } from "@react-three/fiber";
import RoadTile from "./scene/roadTiles.js";
import GroundMesh from './scene/groundMesh.js';

import "./styles/styles.css";

function App() {
  return (
    <div className="Fill">
      <Canvas>
        <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <GroundMesh />
          <RoadTile c1={[-50,-50]} c2={[50,50]}></RoadTile>
      </Canvas>
    </div>
  );
}

export default App;
