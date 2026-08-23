'use client';

import React, { useRef } from 'react';
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

  // Dynamic spring physics for twintails & ahoge
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (leftTwintailRef.current && rightTwintailRef.current) {
      leftTwintailRef.current.rotation.z = 0.15 + Math.sin(t * 2.2) * 0.05;
      leftTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.04;
      rightTwintailRef.current.rotation.z = -0.15 - Math.sin(t * 2.2) * 0.05;
      rightTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.04;
    }
    if (ahogeRef.current) {
      ahogeRef.current.rotation.z = Math.sin(t * 3) * 0.08;
      ahogeRef.current.rotation.x = Math.cos(t * 2.5) * 0.06;
    }
  });

  // If no hair or if gyaruwaves (which uses the native VRM hair), render nothing in external hair container
  if (!hairId || hairId === 'hair-gyaruwaves') {
    return null;
  }

  return (
    <group name="ExternalHairActive" position={[0, 0.05, 0]}>
      {/* ============================================================ */}
      {/* 1. SCALP CAP, BANGS & HIGHLIGHT                              */}
      {/* ============================================================ */}
      {/* Scalp Cap Dome */}
      <mesh position={[0, 0.04, -0.01]}>
        <sphereGeometry args={[0.115, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color={mainColor} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Front Anime Bangs Fringe */}
      <group position={[0, 0.05, 0.08]} rotation={[-0.15, 0, 0]}>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.13, 0.05, 0.02]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        <mesh position={[-0.045, -0.04, 0.005]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[0.022, 0.06, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.045, 0.008]}>
          <coneGeometry args={[0.022, 0.06, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        <mesh position={[0.045, -0.04, 0.005]} rotation={[0, 0, -0.15]}>
          <coneGeometry args={[0.022, 0.06, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* Luminous Anime Hair Shine Band */}
      <mesh position={[0, 0.09, 0.06]} rotation={[-0.4, 0, 0]}>
        <torusGeometry args={[0.095, 0.008, 8, 24, Math.PI * 0.75]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.65} />
      </mesh>

      {/* Sweet Animated Ahoge on Crown */}
      <group ref={ahogeRef} position={[0, 0.15, 0.01]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.03, 0.015]} rotation={[0.4, 0, 0.2]}>
          <coneGeometry args={[0.008, 0.07, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. SPECIFIC 3D HAIRSTYLE MESHES                              */}
      {/* ============================================================ */}

      {/* A. KAWAII TWINTAILS */}
      {hairId === 'hair-twintails' && (
        <group name="Hairstyle_Twintails">
          {/* Left Ponytail with Satin Ribbon */}
          <group ref={leftTwintailRef} position={[-0.11, 0.06, -0.03]}>
            {/* Satin Pink Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.018, 0.006, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.015, 0.01, 0.005]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.03, 0.015, 0.008]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Main Long Ponytail Strand */}
            <mesh position={[-0.03, -0.12, 0]} rotation={[0.1, 0, 0.2]}>
              <coneGeometry args={[0.035, 0.24, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Tapered Lower Tip */}
            <mesh position={[-0.05, -0.25, 0.01]} rotation={[0.1, 0, 0.1]}>
              <coneGeometry args={[0.024, 0.16, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Ponytail with Satin Ribbon */}
          <group ref={rightTwintailRef} position={[0.11, 0.06, -0.03]}>
            {/* Satin Pink Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.018, 0.006, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0.015, 0.01, 0.005]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.03, 0.015, 0.008]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Main Long Ponytail Strand */}
            <mesh position={[0.03, -0.12, 0]} rotation={[0.1, 0, -0.2]}>
              <coneGeometry args={[0.035, 0.24, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Tapered Lower Tip */}
            <mesh position={[0.05, -0.25, 0.01]} rotation={[0.1, 0, -0.1]}>
              <coneGeometry args={[0.024, 0.16, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* B. PASTEL BOB CUT */}
      {hairId === 'hair-bobcut' && (
        <group name="Hairstyle_BobCut" position={[0, -0.02, -0.02]}>
          {/* Back Bob Volume */}
          <mesh position={[0, 0.01, -0.03]} rotation={[-0.08, 0, 0]}>
            <cylinderGeometry args={[0.115, 0.135, 0.14, 20]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Curved Inward Side Ends */}
          <mesh position={[-0.09, -0.06, 0.03]} rotation={[0, 0, 0.25]}>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.09, -0.06, 0.03]} rotation={[0, 0, -0.25]}>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* C. PRINCESS HIME CUT */}
      {hairId === 'hair-himecut' && (
        <group name="Hairstyle_HimeCut">
          {/* Straight Flat Back Drape */}
          <mesh position={[0, -0.1, -0.06]}>
            <boxGeometry args={[0.18, 0.32, 0.04]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Characteristic Blunt Hime Sidelocks */}
          <mesh position={[-0.095, -0.04, 0.04]}>
            <boxGeometry args={[0.024, 0.13, 0.02]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.095, -0.04, 0.04]}>
            <boxGeometry args={[0.024, 0.13, 0.02]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
}
