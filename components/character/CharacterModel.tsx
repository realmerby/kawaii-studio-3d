'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/store';
import { CharacterRig } from './CharacterRig';

export function CharacterModel() {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotate = useGameStore((state) => state.autoRotate);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* 3D Character Rig */}
      <CharacterRig />

      {/* Cute Kawaii Pedestal / Soft Stage Floor */}
      <group position={[0, -0.98, 0]}>
        {/* Soft Stage Cylinder */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.1, 1.2, 0.08, 32]} />
          <meshStandardMaterial color="#FFF0F5" roughness={0.6} />
        </mesh>
        {/* Pastel Ring Outline */}
        <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.15, 32]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.4} />
        </mesh>
        {/* Soft Ground Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial color="#4A0E4E" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
}
