'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterColors } from '@/types/character';

interface HairRendererProps {
  hairId: string | null;
  colors: CharacterColors;
  itemColor?: string;
}

export function HairRenderer({ hairId, colors, itemColor }: HairRendererProps) {
  const leftTwintailRef = useRef<THREE.Group>(null);
  const rightTwintailRef = useRef<THREE.Group>(null);
  const ahogeRef = useRef<THREE.Group>(null);

  const mainColor = itemColor || colors.hairColor || '#FFA8CA';
  const highlightColor = colors.hairHighlightColor || '#FFFFFF';

  // Hair physics / spring motion
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (leftTwintailRef.current && rightTwintailRef.current) {
      leftTwintailRef.current.rotation.z = 0.2 + Math.sin(t * 2.2) * 0.05;
      leftTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.04;
      rightTwintailRef.current.rotation.z = -0.2 - Math.sin(t * 2.2) * 0.05;
      rightTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.04;
    }
    if (ahogeRef.current) {
      ahogeRef.current.rotation.z = Math.sin(t * 3) * 0.1;
      ahogeRef.current.rotation.x = Math.cos(t * 2.5) * 0.08;
    }
  });

  if (!hairId) return null;

  return (
    <group scale={[0.52, 0.52, 0.52]} position={[0, 0.04, -0.02]}>
      {/* ============================================================ */}
      {/* 1. TOP CROWN VOLUME & HIGHLIGHT                              */}
      {/* ============================================================ */}
      {/* Crown volume dome */}
      <mesh position={[0, 0.16, -0.04]}>
        <sphereGeometry args={[0.26, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={mainColor} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Hair Shine Highlight Band */}
      <mesh position={[0, 0.22, 0.1]} rotation={[-0.4, 0, 0]}>
        <torusGeometry args={[0.22, 0.014, 8, 24, Math.PI * 0.75]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.65} />
      </mesh>

      {/* Cute Spring Ahoge on Crown */}
      <group ref={ahogeRef} position={[0, 0.32, 0]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.05, 0.03]} rotation={[0.4, 0, 0.2]}>
          <coneGeometry args={[0.016, 0.12, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. SPECIFIC 3D HAIRSTYLE MESHES                              */}
      {/* ============================================================ */}

      {/* A. KAWAII TWINTAILS */}
      {hairId === 'hair-twintails' && (
        <group>
          {/* Left Ponytail with Ribbon */}
          <group ref={leftTwintailRef} position={[-0.24, 0.16, -0.06]}>
            {/* Satin Pink Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.035, 0.012, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.03, 0.02, 0.01]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.06, 0.03, 0.015]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Main Long Ponytail Strand */}
            <mesh position={[-0.05, -0.18, 0]} rotation={[0.1, 0, 0.25]}>
              <coneGeometry args={[0.065, 0.38, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Tapered Lower Tip */}
            <mesh position={[-0.08, -0.38, 0.02]} rotation={[0.1, 0, 0.12]}>
              <coneGeometry args={[0.045, 0.26, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Ponytail with Ribbon */}
          <group ref={rightTwintailRef} position={[0.24, 0.16, -0.06]}>
            {/* Satin Pink Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.035, 0.012, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0.03, 0.02, 0.01]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.06, 0.03, 0.015]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Main Long Ponytail Strand */}
            <mesh position={[0.05, -0.18, 0]} rotation={[0.1, 0, -0.25]}>
              <coneGeometry args={[0.065, 0.38, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Tapered Lower Tip */}
            <mesh position={[0.08, -0.38, 0.02]} rotation={[0.1, 0, -0.12]}>
              <coneGeometry args={[0.045, 0.26, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* B. GYARU LONG WAVES */}
      {hairId === 'hair-gyaruwaves' && (
        <group>
          {/* Voluminous Back Waves */}
          <group position={[0, -0.08, -0.14]}>
            <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.28, 0.36, 18]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[-0.1, -0.22, 0.03]} rotation={[0.2, 0, 0.2]}>
              <coneGeometry args={[0.06, 0.28, 10]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.1, -0.22, 0.03]} rotation={[0.2, 0, -0.2]}>
              <coneGeometry args={[0.06, 0.28, 10]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
          {/* Flowing Front Locks */}
          <mesh position={[-0.2, -0.12, 0.02]} rotation={[0.15, 0.1, 0.25]}>
            <coneGeometry args={[0.055, 0.32, 10]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.2, -0.12, 0.02]} rotation={[0.15, -0.1, -0.25]}>
            <coneGeometry args={[0.055, 0.32, 10]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* C. PASTEL BOB CUT */}
      {hairId === 'hair-bobcut' && (
        <group position={[0, -0.04, -0.08]}>
          <mesh position={[0, 0, 0]} rotation={[-0.08, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.28, 0.26, 20]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Curved Inward Ends */}
          <mesh position={[-0.16, -0.14, 0.06]} rotation={[0, 0, 0.25]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.16, -0.14, 0.06]} rotation={[0, 0, -0.25]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* D. PRINCESS HIME CUT */}
      {hairId === 'hair-himecut' && (
        <group>
          {/* Straight Flat Back Drape */}
          <mesh position={[0, -0.18, -0.14]}>
            <boxGeometry args={[0.38, 0.55, 0.08]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Characteristic Blunt Hime Sidelocks */}
          <mesh position={[-0.18, -0.08, 0.08]}>
            <boxGeometry args={[0.045, 0.22, 0.04]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.18, -0.08, 0.08]}>
            <boxGeometry args={[0.045, 0.22, 0.04]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
}
