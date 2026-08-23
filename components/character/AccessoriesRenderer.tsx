'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ClothingCategory } from '@/types/character';
import { getItemById } from '@/data/clothing';

interface AccessoriesRendererProps {
  category: ClothingCategory;
  itemId?: string | null;
  itemColors?: Record<string, string>;
}

export function AccessoriesRenderer({ category, itemId, itemColors = {} }: AccessoriesRendererProps) {
  const item = getItemById(itemId);
  const haloRef = useRef<THREE.Group>(null);
  const heartBagRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating animation for angel halo
    if (haloRef.current) {
      haloRef.current.position.y = 0.58 + Math.sin(t * 3) * 0.02;
      haloRef.current.rotation.y = t * 0.5;
    }

    // Subtle bag sway
    if (heartBagRef.current) {
      heartBagRef.current.rotation.z = -0.1 + Math.sin(t * 2) * 0.03;
    }
  });

  if (!item) return null;

  const color = (itemId && itemColors[itemId]) || item.defaultColor;
  const meshType = item.meshType;

  return (
    <group>
      {/* ============================================================ */}
      {/* HEAD ACCESSORIES                                             */}
      {/* ============================================================ */}
      {category === 'headAccessory' && (
        <group>
          {/* 1. Ribbon Neko Kitty Ears */}
          {meshType === 'kitty_ears' && (
            <group position={[0, 0.38, 0.05]}>
              {/* Left Ear */}
              <group position={[-0.24, 0, 0]} rotation={[0.1, 0, -0.35]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.08, 0.16, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                {/* Inner Pink Ear */}
                <mesh position={[0, -0.01, 0.02]}>
                  <coneGeometry args={[0.05, 0.11, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                {/* Gold Bell & Bow */}
                <mesh position={[0.02, -0.06, 0.05]}>
                  <sphereGeometry args={[0.02, 12, 12]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
                </mesh>
              </group>

              {/* Right Ear */}
              <group position={[0.24, 0, 0]} rotation={[0.1, 0, 0.35]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.08, 0.16, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                {/* Inner Pink Ear */}
                <mesh position={[0, -0.01, 0.02]}>
                  <coneGeometry args={[0.05, 0.11, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                {/* Gold Bell & Bow */}
                <mesh position={[-0.02, -0.06, 0.05]}>
                  <sphereGeometry args={[0.02, 12, 12]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
                </mesh>
              </group>
            </group>
          )}

          {/* 2. Oversized Silk Hair Bow */}
          {meshType === 'big_bow' && (
            <group position={[0, 0.42, 0.05]} rotation={[-0.2, 0, 0]}>
              {/* Center Knot */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Left Wing */}
              <mesh position={[-0.14, 0.04, 0]} rotation={[0, 0, 0.4]}>
                <boxGeometry args={[0.22, 0.14, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Right Wing */}
              <mesh position={[0.14, 0.04, 0]} rotation={[0, 0, -0.4]}>
                <boxGeometry args={[0.22, 0.14, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Ribbon Tails */}
              <mesh position={[-0.08, -0.12, 0.02]} rotation={[0, 0, 0.3]}>
                <boxGeometry args={[0.06, 0.18, 0.02]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0.08, -0.12, 0.02]} rotation={[0, 0, -0.3]}>
                <boxGeometry args={[0.06, 0.18, 0.02]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* 3. Luminous Angel Halo */}
          {meshType === 'angel_halo' && (
            <group ref={haloRef} position={[0, 0.58, 0]} rotation={[0.2, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <torusGeometry args={[0.25, 0.025, 16, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.6}
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>
            </group>
          )}

          {/* 4. Pastel Heart Wool Beret */}
          {meshType === 'sweet_beret' && (
            <group position={[0.06, 0.38, 0.02]} rotation={[-0.2, 0.15, -0.35]}>
              {/* Beret Body */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.34, 0.28, 0.14, 24]} />
                <meshStandardMaterial color={color} roughness={0.7} />
              </mesh>
              {/* Center Stem */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
                <meshStandardMaterial color="#18181B" roughness={0.5} />
              </mesh>
              {/* Gold Heart Pin on side */}
              <mesh position={[0.22, 0.02, 0.14]} rotation={[0, 0.5, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.02]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* ACCESSORIES (Necklaces, Glasses, Arm Warmers)                */}
      {/* ============================================================ */}
      {category === 'accessory' && (
        <group>
          {/* 1. Heart Bell Ribbon Choker */}
          {meshType === 'ribbon_choker' && (
            <group position={[0, 0.28, 0]}>
              {/* Neck Ribbon */}
              <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.135, 0.018, 8, 20]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Gold Heart Bell Pendant */}
              <mesh position={[0, -0.04, 0.14]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.04, 0.04, 0.02]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}

          {/* 2. Fluffy Gyaru Arm Warmers */}
          {meshType === 'arm_warmers' && (
            <group position={[0, 0, 0]}>
              {/* Left Arm Warmer */}
              <mesh position={[-0.38, -0.15, 0]}>
                <cylinderGeometry args={[0.08, 0.09, 0.24, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              {/* Right Arm Warmer */}
              <mesh position={[0.38, -0.15, 0]}>
                <cylinderGeometry args={[0.08, 0.09, 0.24, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* 3. Kawaii Tinted Heart Glasses */}
          {meshType === 'heart_glasses' && (
            <group position={[0, 0.05, 0.38]} rotation={[-0.05, 0, 0]}>
              {/* Left Heart Frame */}
              <mesh position={[-0.12, 0, 0]}>
                <torusGeometry args={[0.065, 0.009, 8, 16]} />
                <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.3} />
              </mesh>
              {/* Left Translucent Lens */}
              <mesh position={[-0.12, 0, 0]}>
                <circleGeometry args={[0.06, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.5} roughness={0.1} />
              </mesh>

              {/* Right Heart Frame */}
              <mesh position={[0.12, 0, 0]}>
                <torusGeometry args={[0.065, 0.009, 8, 16]} />
                <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.3} />
              </mesh>
              {/* Right Translucent Lens */}
              <mesh position={[0.12, 0, 0]}>
                <circleGeometry args={[0.06, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.5} roughness={0.1} />
              </mesh>

              {/* Center Bridge */}
              <mesh position={[0, 0.01, 0]}>
                <boxGeometry args={[0.08, 0.01, 0.01]} />
                <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.3} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* BAGS                                                         */}
      {/* ============================================================ */}
      {category === 'bag' && (
        <group>
          {/* 1. Quilted Heart Crossbody Bag */}
          {meshType === 'heart_crossbody' && (
            <group ref={heartBagRef} position={[-0.28, -0.15, 0.12]}>
              {/* Heart Bag Body */}
              <mesh position={[0, 0, 0]} rotation={[0, 0.3, 0]}>
                <boxGeometry args={[0.18, 0.18, 0.08]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
              </mesh>
              {/* Gold Clasp */}
              <mesh position={[0, 0.04, 0.05]} rotation={[0, 0.3, 0]}>
                <sphereGeometry args={[0.02, 12, 12]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Gold Chain Strap running over shoulder */}
              <mesh position={[0.12, 0.28, -0.05]} rotation={[0.4, 0.2, 0.7]}>
                <cylinderGeometry args={[0.007, 0.007, 0.65, 8]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          )}

          {/* 2. Kawaii Teddy Bear Backpack */}
          {meshType === 'teddy_backpack' && (
            <group position={[0, 0.05, -0.26]}>
              {/* Teddy Bear Body */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              {/* Teddy Bear Head */}
              <mesh position={[0, 0.16, 0.04]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              {/* Teddy Ears */}
              <mesh position={[-0.09, 0.25, 0.04]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[0.09, 0.25, 0.04]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              {/* Snout & Nose */}
              <mesh position={[0, 0.14, 0.14]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#FEF3C7" roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.16, 0.17]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color="#18181B" />
              </mesh>
            </group>
          )}

          {/* 3. Pastel Star Mini Tote */}
          {meshType === 'pastel_tote' && (
            <group position={[0.34, -0.32, 0.08]}>
              {/* Tote Body */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.16, 0.2, 0.07]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Star Emblem */}
              <mesh position={[0, 0, 0.04]}>
                <boxGeometry args={[0.06, 0.06, 0.01]} />
                <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={0.3} />
              </mesh>
              {/* Handle */}
              <mesh position={[0, 0.14, 0]}>
                <torusGeometry args={[0.06, 0.01, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
}
