'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterColors } from '@/types/character';
import { getItemById } from '@/data/clothing';

interface HairRendererProps {
  hairId?: string | null;
  colors: CharacterColors;
  itemColor?: string;
}

export function HairRenderer({ hairId, colors, itemColor }: HairRendererProps) {
  const item = getItemById(hairId);
  const effectiveColor = itemColor || colors.hairColor || '#FFA8CA';
  const highlightColor = colors.hairHighlightColor || '#FFFFFF';

  const leftPonytailRef = useRef<THREE.Group>(null);
  const rightPonytailRef = useRef<THREE.Group>(null);
  const frontHairRef = useRef<THREE.Group>(null);
  const backHairRef = useRef<THREE.Group>(null);

  const meshType = item?.meshType || 'twintails';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sway = Math.sin(t * 2) * 0.04;
    const breatheSway = Math.cos(t * 2.5) * 0.03;

    if (leftPonytailRef.current && rightPonytailRef.current) {
      leftPonytailRef.current.rotation.z = Math.PI / 4 + sway;
      leftPonytailRef.current.rotation.x = -0.1 + breatheSway;

      rightPonytailRef.current.rotation.z = -Math.PI / 4 - sway;
      rightPonytailRef.current.rotation.x = -0.1 + breatheSway;
    }

    if (frontHairRef.current) {
      frontHairRef.current.rotation.z = sway * 0.4;
    }

    if (backHairRef.current) {
      backHairRef.current.rotation.x = 0.08 + breatheSway * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Base Skull Hair Cap */}
      <mesh position={[0, 0.06, -0.02]}>
        <sphereGeometry args={[0.395, 32, 24]} />
        <meshStandardMaterial color={effectiveColor} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Hair Gloss Highlight Ring / Rim Halo */}
      <mesh position={[0, 0.15, 0.02]} rotation={[-0.2, 0, 0]}>
        <torusGeometry args={[0.39, 0.018, 12, 32, Math.PI * 0.9]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.65} />
      </mesh>

      {/* ============================================================ */}
      {/* MODEL A: KAWAII TWIN TAILS                                    */}
      {/* ============================================================ */}
      {meshType === 'twintails' && (
        <group>
          {/* Front Bangs */}
          <group ref={frontHairRef} position={[0, 0.18, 0.32]}>
            {/* Center Bang */}
            <mesh position={[0, -0.04, 0.04]} rotation={[0.2, 0, 0]}>
              <coneGeometry args={[0.07, 0.16, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            {/* Left Bang */}
            <mesh position={[-0.08, -0.03, 0.03]} rotation={[0.25, 0.15, -0.15]}>
              <coneGeometry args={[0.065, 0.15, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            {/* Right Bang */}
            <mesh position={[0.08, -0.03, 0.03]} rotation={[0.25, -0.15, 0.15]}>
              <coneGeometry args={[0.065, 0.15, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>

            {/* Side Bang Strands framing cheeks */}
            <mesh position={[-0.26, -0.22, 0.01]} rotation={[-0.1, 0, -0.1]}>
              <coneGeometry args={[0.045, 0.45, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.26, -0.22, 0.01]} rotation={[-0.1, 0, 0.1]}>
              <coneGeometry args={[0.045, 0.45, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Left Ponytail Bunch */}
          <group ref={leftPonytailRef} position={[-0.32, 0.22, -0.1]}>
            {/* Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.05, 0.02, 12, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Ribbon Bow Knot */}
            <mesh position={[0, 0.04, 0.03]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.04, 0.03]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>

            {/* Ponytail Clump 1 (Main Upper) */}
            <mesh position={[-0.12, -0.28, 0]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.085, 0.55, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            {/* Ponytail Clump 2 (Lower Flowing Tip) */}
            <mesh position={[-0.18, -0.65, 0.05]} rotation={[-0.15, 0, 0.1]}>
              <coneGeometry args={[0.065, 0.45, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Ponytail Bunch */}
          <group ref={rightPonytailRef} position={[0.32, 0.22, -0.1]}>
            {/* Ribbon Tie */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.05, 0.02, 12, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Ribbon Bow Knot */}
            <mesh position={[0, 0.04, 0.03]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.04, 0.03]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>

            {/* Ponytail Clump 1 */}
            <mesh position={[0.12, -0.28, 0]} rotation={[0, 0, -0.2]}>
              <coneGeometry args={[0.085, 0.55, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            {/* Ponytail Clump 2 */}
            <mesh position={[0.18, -0.65, 0.05]} rotation={[-0.15, 0, -0.1]}>
              <coneGeometry args={[0.065, 0.45, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* ============================================================ */}
      {/* MODEL B: GYARU LONG WAVES                                     */}
      {/* ============================================================ */}
      {meshType === 'gyaruwaves' && (
        <group>
          {/* Side-swept Glam Bangs */}
          <group position={[0.05, 0.16, 0.32]}>
            <mesh position={[-0.12, -0.06, 0.04]} rotation={[0.3, 0.3, -0.3]}>
              <coneGeometry args={[0.09, 0.22, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.08, -0.04, 0.03]} rotation={[0.2, -0.2, 0.2]}>
              <coneGeometry args={[0.08, 0.18, 12]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Voluminous Long Wavy Locks (Left Side) */}
          <group position={[-0.26, -0.1, 0.05]} rotation={[0.1, 0.1, -0.15]}>
            <mesh position={[0, -0.2, 0]}>
              <coneGeometry args={[0.09, 0.48, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            <mesh position={[-0.04, -0.5, 0.06]} rotation={[0.2, 0, -0.1]}>
              <coneGeometry args={[0.075, 0.45, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Voluminous Long Wavy Locks (Right Side) */}
          <group position={[0.26, -0.1, 0.05]} rotation={[0.1, -0.1, 0.15]}>
            <mesh position={[0, -0.2, 0]}>
              <coneGeometry args={[0.09, 0.48, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
            <mesh position={[0.04, -0.5, 0.06]} rotation={[0.2, 0, 0.1]}>
              <coneGeometry args={[0.075, 0.45, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Back Full Length Curtain */}
          <group ref={backHairRef} position={[0, -0.15, -0.24]}>
            <mesh position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.3, 0.38, 0.75, 16]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* ============================================================ */}
      {/* MODEL C: PASTEL BOB CUT                                       */}
      {/* ============================================================ */}
      {meshType === 'bobcut' && (
        <group>
          {/* Straight Clean Bangs */}
          <group position={[0, 0.17, 0.33]}>
            <mesh position={[0, -0.03, 0.02]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.32, 0.12, 0.04]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Curved Bob Sides */}
          <mesh position={[-0.27, -0.12, 0.06]} rotation={[0.1, 0.2, -0.2]}>
            <coneGeometry args={[0.12, 0.4, 16]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.27, -0.12, 0.06]} rotation={[0.1, -0.2, 0.2]}>
            <coneGeometry args={[0.12, 0.4, 16]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>

          {/* Back Bob Volume */}
          <mesh position={[0, -0.06, -0.16]} rotation={[-0.2, 0, 0]}>
            <sphereGeometry args={[0.37, 24, 16]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* ============================================================ */}
      {/* MODEL D: PRINCESS HIME CUT                                    */}
      {/* ============================================================ */}
      {meshType === 'himecut' && (
        <group>
          {/* Straight Sharp Bangs */}
          <mesh position={[0, 0.15, 0.34]} rotation={[0.15, 0, 0]}>
            <boxGeometry args={[0.3, 0.11, 0.03]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>

          {/* Sharp Cheek-length Hime Side Locks */}
          <mesh position={[-0.25, -0.12, 0.18]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.07, 0.38, 0.03]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>
          <mesh position={[0.25, -0.12, 0.18]} rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.07, 0.38, 0.03]} />
            <meshStandardMaterial color={effectiveColor} roughness={0.35} />
          </mesh>

          {/* Long Straight Back Sheet */}
          <group ref={backHairRef} position={[0, -0.28, -0.25]}>
            <mesh position={[0, -0.22, 0]}>
              <boxGeometry args={[0.55, 0.9, 0.06]} />
              <meshStandardMaterial color={effectiveColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}
