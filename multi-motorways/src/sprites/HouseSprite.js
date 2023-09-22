import { useRef } from "react";
import { useGameObject } from "../components/useGameObject";
import useUpdateBoundingBox from "./useUpdateBoundingBox";
import { Html, useAnimations, useGLTF } from "@react-three/drei";
import "../styles/styles.css"



function HouseSprite() {
    const state = useGameObject();
    const mesh = useRef(null);
    // useUpdateBoundingBox({ id: state?.id, mesh: mesh.current });

    // Getting the model
    const { nodes, materials } = useGLTF("models/house.gltf");

    return (<group position={(state?.position) ? state.position : [0, 0, -100]} ref={mesh} dispose={null} >
            
            <group position={[0, 0, 0.1]} rotation-x={Math.PI/2} scale={0.5}>
                <mesh geometry={nodes.Mesh_house_type03.geometry} material={materials['border.003']} />
                <mesh geometry={nodes.Mesh_house_type03_1.geometry} material={materials['window.003']} />
                <mesh geometry={nodes.Mesh_house_type03_2.geometry} material={materials['door.003']} />
                <mesh geometry={nodes.Mesh_house_type03_3.geometry} material={materials['_defaultMat.003']} />
                <mesh geometry={nodes.Mesh_house_type03_4.geometry} material={materials['roof.005']} />
            </group>

            <mesh scale={3.75}>
                <boxGeometry args={[0.25, 0.25, 0.05]} />
                <meshStandardMaterial color="silver" />
            </mesh>
        </group>
      )

    // return(<skinnedMesh 
    //     geometry={nodes.Mesh_house_type03.geometry}
    //     material={nodes.Mesh_house_type03.material}
    
    // />)

    // return(
    //     <primitive object={nodes.root} />
    //     <skinnedMesh
    //         geometry={nodes.Jeune.geometry}
    //         material={materials}
    // )

    // return (<>
    //     <mesh position={state?.position} ref={mesh} > 
    //         <boxGeometry args={[0.7, 0.7, 0.5]}/>
    //         <meshStandardMaterial color="salmon" />
    //         <Html>
    //             <div className="label">House</div>
    //         </Html>
    //     </mesh>

    //     </>

    // )
}

export default HouseSprite;



