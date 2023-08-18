import { Canvas } from "@react-three/fiber";

import "./styles/styles.css";

function App() {
  return (
    <div className="Fill">
      <Canvas>
        <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
        <mesh> 
          <planeGeometry/>
          <meshToonMaterial color="white" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
