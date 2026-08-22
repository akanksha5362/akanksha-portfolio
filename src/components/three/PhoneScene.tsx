"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

function Phone() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.3) * 0.35 + 0.2;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group}>
        {/* Phone body */}
        <RoundedBox args={[1.6, 3.2, 0.16]} radius={0.16} smoothness={6}>
          <meshStandardMaterial
            color="#0D1310"
            metalness={0.6}
            roughness={0.25}
          />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[1.4, 3.0]} />
          <meshStandardMaterial
            color="#0A0F0D"
            emissive="#10B981"
            emissiveIntensity={0.25}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        {/* Screen accent bars, styled like a widget list */}
        {[0.9, 0.55, 0.2, -0.15, -0.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0.1]}>
            <planeGeometry args={[1.05, 0.16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#10B981" : "#22D3EE"}
              emissive={i % 2 === 0 ? "#10B981" : "#22D3EE"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.55}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function PhoneScene() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 4]} intensity={40} color="#10B981" />
          <pointLight position={[-3, -2, 3]} intensity={25} color="#22D3EE" />
          <Phone />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
