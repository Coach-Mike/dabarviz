"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useState } from "react";

function GlobeMesh({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Sphere
      args={[1.4, 64, 64]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? "#60a5fa" : "#1e3a5f"}
        attach="material"
        distort={0.15}
        speed={1.5}
        roughness={0.4}
        metalness={0.1}
      />
    </Sphere>
  );
}

export default function BiblicalGlobe({ onSelect }: { onSelect: (place: string) => void }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#a78bfa" />
        <GlobeMesh onClick={() => onSelect("Jerusalem")} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minDistance={2.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}
