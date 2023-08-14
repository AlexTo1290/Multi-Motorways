import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas orthographic>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      
    </Canvas>
  );
}

export default App;
