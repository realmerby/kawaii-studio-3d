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
  const hairGroupRef = useRef<THREE.Group>(null);
  const leftTwintailRef = useRef<THREE.Group>(null);
  const rightTwintailRef = useRef<THREE.Group>(null);
  const ahogeRef = useRef<THREE.Group>(null);

  const mainColor = itemColor || colors.hairColor || '#FFA8CA';
  const highlightColor = colors.hairHighlightColor || '#FFFFFF';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Delicate hair sway physics
    if (leftTwintailRef.current && rightTwintailRef.current) {
      leftTwintailRef.current.rotation.z = 0.15 + Math.sin(t * 2.2) * 0.06;
      leftTwintailRef.current.rotation.x = Math.cos(t * 1.8) * 0.04;

      rightTwintailRef.current.rotation.z = -0.15 - Math.sin(t * 2.2) * 0.06;
      rightTwintailRef.current.rotation.x = Math.cos(t * 1.8) * 0.04;
    }

    if (ahogeRef.current) {
      ahogeRef.current.rotation.z = Math.sin(t * 3) * 0.12;
      ahogeRef.current.rotation.y = Math.cos(t * 2) * 0.08;
    }
  });

  if (!hairId) return null;

  return (
    <group ref={hairGroupRef} position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. BASE HAIR SCALP DOME (Full Coverage)                      */}
      {/* ============================================================ */}
      <mesh position={[0, 0.03, -0.04]} scale={[1.08, 1.06, 1.1]}>
        <sphereGeometry args={[0.39, 32, 28]} />
        <meshStandardMaterial color={mainColor} roughness={0.35} />
      </mesh>

      {/* Hair Shine Ring / Halo Band */}
      <mesh position={[0, 0.12, 0.32]} rotation={[-0.15, 0, 0]}>
        <torusGeometry args={[0.39, 0.018, 8, 32, Math.PI * 0.7]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.65} />
      </mesh>

      {/* Ahoge (Cute stray bouncy hair lock on crown) */}
      <group ref={ahogeRef} position={[0, 0.44, 0.05]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.06, 0.02]} rotation={[0.4, 0, 0.2]}>
          <coneGeometry args={[0.022, 0.14, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        <mesh position={[0.02, 0.13, 0.05]} rotation={[0.7, 0, 0.5]}>
          <coneGeometry args={[0.015, 0.1, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. LAYERED FRONT ANIME BANGS (Universal Face Framing)        */}
      {/* ============================================================ */}
      <group position={[0, 0.16, 0.33]}>
        {/* Center Bangs Cluster */}
        <mesh position={[0, -0.04, 0.05]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.075, 0.18, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Left Bang Tuft */}
        <mesh position={[-0.08, -0.03, 0.04]} rotation={[0.25, 0, 0.18]}>
          <coneGeometry args={[0.07, 0.17, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Right Bang Tuft */}
        <mesh position={[0.08, -0.03, 0.04]} rotation={[0.25, 0, -0.18]}>
          <coneGeometry args={[0.07, 0.17, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Far Left Bang Tip */}
        <mesh position={[-0.17, -0.05, 0.02]} rotation={[0.2, 0, 0.35]}>
          <coneGeometry args={[0.065, 0.19, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        {/* Far Right Bang Tip */}
        <mesh position={[0.17, -0.05, 0.02]} rotation={[0.2, 0, -0.35]}>
          <coneGeometry args={[0.065, 0.19, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>

        {/* Side Cheeks Face-Framing Locks */}
        <mesh position={[-0.27, -0.22, -0.02]} rotation={[0.15, 0.1, 0.12]}>
          <coneGeometry args={[0.065, 0.38, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
        <mesh position={[0.27, -0.22, -0.02]} rotation={[0.15, -0.1, -0.12]}>
          <coneGeometry args={[0.065, 0.38, 12]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. HAIRSTYLE SPECIFIC GEOMETRY                               */}
      {/* ============================================================ */}

      {/* HAIRSTYLE A: TWINTAILS (Cute Anime Pigtails with Ribbons) */}
      {hairId === 'hair-twintails' && (
        <group>
          {/* Left Twintail */}
          <group ref={leftTwintailRef} position={[-0.34, 0.22, -0.06]}>
            {/* Pink Ribbon Scrunchie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.045, 0.016, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.02, -0.04, 0.02]} rotation={[0, 0, 0.5]}>
              <coneGeometry args={[0.03, 0.08, 8]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Pigtail Upper Tier */}
            <mesh position={[-0.06, -0.18, 0]} rotation={[0.1, 0, 0.35]}>
              <coneGeometry args={[0.09, 0.36, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Pigtail Mid Tier */}
            <mesh position={[-0.1, -0.42, 0.02]} rotation={[0.15, 0, 0.25]}>
              <coneGeometry args={[0.08, 0.34, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Pigtail Lower Tapered Tip */}
            <mesh position={[-0.12, -0.64, 0.04]} rotation={[0.1, 0, 0.15]}>
              <coneGeometry args={[0.065, 0.32, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Twintail */}
          <group ref={rightTwintailRef} position={[0.34, 0.22, -0.06]}>
            {/* Ribbon Scrunchie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.045, 0.016, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0.02, -0.04, 0.02]} rotation={[0, 0, -0.5]}>
              <coneGeometry args={[0.03, 0.08, 8]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Pigtail Upper Tier */}
            <mesh position={[0.06, -0.18, 0]} rotation={[0.1, 0, -0.35]}>
              <coneGeometry args={[0.09, 0.36, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Pigtail Mid Tier */}
            <mesh position={[0.1, -0.42, 0.02]} rotation={[0.15, 0, -0.25]}>
              <coneGeometry args={[0.08, 0.34, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Pigtail Lower Tip */}
            <mesh position={[0.12, -0.64, 0.04]} rotation={[0.1, 0, -0.15]}>
              <coneGeometry args={[0.065, 0.32, 14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Back Hair Cap */}
          <mesh position={[0, -0.14, -0.24]} rotation={[-0.2, 0, 0]}>
            <sphereGeometry args={[0.26, 20, 20]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* HAIRSTYLE B: GYARU WAVES / FLUFFY LAYERS (Like the reference image!) */}
      {hairId === 'hair-gyaruwaves' && (
        <group>
          {/* Voluminous Back Waves */}
          <group position={[0, -0.1, -0.22]}>
            <mesh position={[0, -0.12, 0]} rotation={[-0.1, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.36, 0.44, 20]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            {/* Wavy Strands Lower Tier */}
            <mesh position={[-0.15, -0.36, 0.04]} rotation={[0.2, 0.1, 0.2]}>
              <coneGeometry args={[0.09, 0.36, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.15, -0.36, 0.04]} rotation={[0.2, -0.1, -0.2]}>
              <coneGeometry args={[0.09, 0.36, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0, -0.38, -0.02]} rotation={[0.15, 0, 0]}>
              <coneGeometry args={[0.11, 0.38, 12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Fluffy Shoulder Locks */}
          <mesh position={[-0.32, -0.18, 0.02]} rotation={[0.2, 0.2, 0.25]}>
            <coneGeometry args={[0.09, 0.42, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.32, -0.18, 0.02]} rotation={[0.2, -0.2, -0.25]}>
            <coneGeometry args={[0.09, 0.42, 12]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* HAIRSTYLE C: BOBCUT (Rounded Cute Anime Bob) */}
      {hairId === 'hair-bobcut' && (
        <group>
          {/* Rounded Bob Hair Dome */}
          <mesh position={[0, -0.08, -0.14]} rotation={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.4, 0.36, 24]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Inward Curled Ends */}
          <mesh position={[-0.24, -0.24, 0.02]} rotation={[0.1, 0, 0.4]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.24, -0.24, 0.02]} rotation={[0.1, 0, -0.4]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* HAIRSTYLE D: HIMECUT (Straight Elegant Hime with Long Strands) */}
      {hairId === 'hair-himecut' && (
        <group>
          {/* Straight Long Back Curtain */}
          <group position={[0, -0.24, -0.2]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.56, 0.72, 0.14]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh position={[0, -0.42, 0]}>
              <boxGeometry args={[0.52, 0.28, 0.12]} />
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Stepped Hime Side Bangs (Sidelocks) */}
          <mesh position={[-0.26, -0.14, 0.12]}>
            <boxGeometry args={[0.07, 0.32, 0.08]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.26, -0.14, 0.12]}>
            <boxGeometry args={[0.07, 0.32, 0.08]} />
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
}
