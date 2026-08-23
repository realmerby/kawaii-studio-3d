'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/store';
import { VRMCharacter } from './VRMCharacter';

export function CharacterModel() {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotate = useGameStore((state) => state.autoRotate);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Authentic VRoid / CustomCast 3D Anime Character */}
      <VRMCharacter />

      {/* Cute Kawaii Pedestal / Soft Stage Floor */}
      <group position={[0, -0.85, 0]}>
        {/* Soft Stage Cylinder */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.0, 1.1, 0.08, 32]} />
          <meshStandardMaterial color="#FFF0F5" roughness={0.6} />
        </mesh>
        {/* Pastel Ring Outline */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.92, 0.98, 32]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.4} />
        </mesh>
        {/* Soft Ground Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.65, 32]} />
          <meshBasicMaterial color="#4A0E4E" transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}
