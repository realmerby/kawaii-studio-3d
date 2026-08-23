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

  const mainColor = itemColor || colors.hairColor || '#FF80AB';
  const highlightColor = colors.hairHighlightColor || '#FFFFFF';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (leftTwintailRef.current && rightTwintailRef.current) {
      leftTwintailRef.current.rotation.z = 0.2 + Math.sin(t * 2.2) * 0.06;
      rightTwintailRef.current.rotation.z = -0.2 - Math.sin(t * 2.2) * 0.06;
    }
    if (ahogeRef.current) {
      ahogeRef.current.rotation.z = Math.sin(t * 3) * 0.12;
    }
  });

  if (!hairId) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. TOP & BACK HAIR CAP (DOES NOT COVER FRONT FACE)           */}
      {/* ============================================================ */}
      {/* Back Hair Dome - Shifted backwards so face stays completely clear */}
      <mesh position={[0, 0.06, -0.12]} scale={[1.04, 1.05, 0.95]}>
        <sphereGeometry args={[0.39, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
        <meshStandardMaterial color={mainColor} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Top Crown Volume */}
      <mesh position={[0, 0.24, -0.04]}>
        <sphereGeometry args={[0.34, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={mainColor} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Hair Shine Highlight Band on Crown */}
      <mesh position={[0, 0.28, 0.12]} rotation={[-0.45, 0, 0]}>
        <torusGeometry args={[0.3, 0.018, 8, 24, Math.PI * 0.8]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.6} />
      </mesh>

      {/* Cute Ahoge (Springy hair strand on crown) */}
      <group ref={ahogeRef} position={[0, 0.42, 0]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.06, 0.04]} rotation={[0.5, 0, 0.2]}>
          <coneGeometry args={[0.02, 0.14, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. CUTE FRONT BANGS (Positioned high above eyes)             */}
      {/* ============================================================ */}
      <group position={[0, 0.25, 0.3]}>
        {/* Center Bang */}
        <mesh position={[0, -0.02, 0.04]} rotation={[0.35, 0, 0]}>
          <coneGeometry args={[0.065, 0.14, 10]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Left Bang */}
        <mesh position={[-0.08, -0.01, 0.03]} rotation={[0.3, 0, 0.2]}>
          <coneGeometry args={[0.06, 0.13, 10]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Right Bang */}
        <mesh position={[0.08, -0.01, 0.03]} rotation={[0.3, 0, -0.2]}>
          <coneGeometry args={[0.06, 0.13, 10]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Far Left Side Framing Lock */}
        <mesh position={[-0.24, -0.16, 0]} rotation={[0.2, 0.1, 0.15]}>
          <coneGeometry args={[0.06, 0.32, 10]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Far Right Side Framing Lock */}
        <mesh position={[0.24, -0.16, 0]} rotation={[0.2, -0.1, -0.15]}>
          <coneGeometry args={[0.06, 0.32, 10]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. HAIRSTYLE VARIANTS                                        */}
      {/* ============================================================ */}

      {/* TWINTAILS */}
      {hairId === 'hair-twintails' && (
        <group>
          {/* Left Pigtail */}
          <group ref={leftTwintailRef} position={[-0.35, 0.2, -0.08]}>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.045, 0.016, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.06, -0.2, 0]} rotation={[0.1, 0, 0.3]}>
              <coneGeometry args={[0.08, 0.42, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[-0.1, -0.46, 0.02]} rotation={[0.1, 0, 0.15]}>
              <coneGeometry args={[0.06, 0.32, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Pigtail */}
          <group ref={rightTwintailRef} position={[0.35, 0.2, -0.08]}>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.045, 0.016, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0.06, -0.2, 0]} rotation={[0.1, 0, -0.3]}>
              <coneGeometry args={[0.08, 0.42, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.1, -0.46, 0.02]} rotation={[0.1, 0, -0.15]}>
              <coneGeometry args={[0.06, 0.32, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* GYARU WAVES */}
      {hairId === 'hair-gyaruwaves' && (
        <group>
          {/* Fluffy Back Waves */}
          <group position={[0, -0.14, -0.2]}>
            <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
              <cylinderGeometry args={[0.28, 0.36, 0.46, 18]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[-0.14, -0.28, 0.04]} rotation={[0.2, 0, 0.25]}>
              <coneGeometry args={[0.08, 0.34, 10]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.14, -0.28, 0.04]} rotation={[0.2, 0, -0.25]}>
              <coneGeometry args={[0.08, 0.34, 10]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
          {/* Shoulder Tufts */}
          <mesh position={[-0.3, -0.18, 0.02]} rotation={[0.2, 0.1, 0.3]}>
            <coneGeometry args={[0.08, 0.38, 10]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.3, -0.18, 0.02]} rotation={[0.2, -0.1, -0.3]}>
            <coneGeometry args={[0.08, 0.38, 10]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* BOBCUT */}
      {hairId === 'hair-bobcut' && (
        <group position={[0, -0.06, -0.1]}>
          <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.38, 0.34, 20]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[-0.22, -0.18, 0.1]} rotation={[0, 0, 0.3]}>
            <sphereGeometry args={[0.1, 14, 14]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.22, -0.18, 0.1]} rotation={[0, 0, -0.3]}>
            <sphereGeometry args={[0.1, 14, 14]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* HIMECUT */}
      {hairId === 'hair-himecut' && (
        <group>
          <mesh position={[0, -0.24, -0.2]}>
            <boxGeometry args={[0.54, 0.75, 0.12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[-0.24, -0.12, 0.12]}>
            <boxGeometry args={[0.06, 0.3, 0.06]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.24, -0.12, 0.12]}>
            <boxGeometry args={[0.06, 0.3, 0.06]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
}
