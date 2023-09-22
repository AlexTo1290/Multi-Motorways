import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";


function TexturePreloader() {
    // preloading all the textures to be used during runtime

    useEffect(() => {
        useTexture.preload('textures/verticalRoad2.jpg')
        useTexture.preload('textures/cornerJunction2.jpg')
        useTexture.preload('textures/TJunction.jpg')
        useGLTF.preload('models/house.gltf')
    }, []);
}

export default TexturePreloader;