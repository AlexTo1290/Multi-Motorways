const GroundMesh = () => {
    return <mesh position={[0, 0, 0]} scale={56}>
      <planeGeometry />
      <meshToonMaterial color="lightgreen" />
    </mesh>
  }

export default GroundMesh;