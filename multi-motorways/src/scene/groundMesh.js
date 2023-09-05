const GroundMesh = () => {
    return <mesh position={[0, 0, -0.5]} scale={100}>
      <planeGeometry />
      <meshToonMaterial color="lightgreen" />
    </mesh>
  }

export default GroundMesh;