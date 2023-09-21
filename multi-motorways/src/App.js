import SceneCanvas from "./scene/sceneCanvas";
import Overlay from "./ui/Overlay"

import "./styles/styles.css";

function App() {
  return (
    <div className="Fill">
      <SceneCanvas/>
      <Overlay/>
    </div>
  );
}

export default App;