import "./overlay.css"
import MiniMap from "./MiniMap"

function Overlay() {
  return(<>
      <div className="menuSideBar">
        <h1>Multi Motorways</h1>
        {/* <button className="">Show Map</button>         in case we want to add toggle buttons*/}
      </div>
      <MiniMap/>
  </>)
}

export default Overlay;