import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

import "./App.css";

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1 }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="#fd5760" />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function Torus(props) {
  const mesh = useRef();
  const [state, setState] = useState({ isHovered: false, isActive: false });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.y =
      mesh.current.position.y + Math.sin(time * 1) / 100;
    mesh.current.rotation.y = mesh.current.rotation.x += 0.101;
  });

  return (
    <mesh
      position={[2, 4, 0]}
      {...props}
      ref={mesh}
      scale={state.isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setState({ ...state, isActive: !state.isActive })}
      onPointerOver={(e) => setState({ ...state, isHovered: true })}
      onPointerOver={(e) => setState({ ...state, isHovered: false })}
    >
      <torusBufferGeometry args={[3, 2, 66, 133]} />
      <meshStandardMaterial
        roughness={0}
        color={state.isActive ? "#fd5760" : "#c0d736"}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      {/* need <Physics> to make cannonjs work */}
      <Physics>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />;
        <Torus />
      </Physics>
    </Canvas>
  );
}

// const [state, setState] = useState({ isHovered: false, isActive: false})
//   const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xff6347,
//     wireframe: true,
//     const torus = new THREE.Mesh(geometry, material);
