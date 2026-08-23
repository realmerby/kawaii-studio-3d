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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (haloRef.current) {
      haloRef.current.position.y = 0.28 + Math.sin(t * 3) * 0.015;
      haloRef.current.rotation.y = t * 0.6;
    }
  });

  if (!item) return null;

  const color = (itemId && itemColors[itemId]) || item.defaultColor;
  const meshType = item.meshType;

  return (
    <group scale={[0.55, 0.55, 0.55]}>
      {/* ============================================================ */}
      {/* 1. HEAD ACCESSORIES (Positioned for VRoid Head Bone)         */}
      {/* ============================================================ */}
      {category === 'headAccessory' && (
        <group position={[0, 0.16, 0]}>
          {/* Neko Kitty Ears */}
          {meshType === 'kitty_ears' && (
            <group position={[0, 0.05, 0]}>
              {/* Left Ear */}
              <group position={[-0.14, 0, 0]} rotation={[0.1, 0, -0.3]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.06, 0.12, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.01, 0.015]}>
                  <coneGeometry args={[0.04, 0.09, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                <mesh position={[0.015, -0.04, 0.04]}>
                  <sphereGeometry args={[0.015, 10, 10]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>

              {/* Right Ear */}
              <group position={[0.14, 0, 0]} rotation={[0.1, 0, 0.3]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.06, 0.12, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.01, 0.015]}>
                  <coneGeometry args={[0.04, 0.09, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                <mesh position={[-0.015, -0.04, 0.04]}>
                  <sphereGeometry args={[0.015, 10, 10]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>
            </group>
          )}

          {/* Big Satin Silk Bow on Crown */}
          {meshType === 'big_bow' && (
            <group position={[0, 0.08, -0.04]} rotation={[-0.2, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[-0.09, 0.03, 0]} rotation={[0, 0, 0.35]}>
                <boxGeometry args={[0.14, 0.09, 0.03]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0.09, 0.03, 0]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[0.14, 0.09, 0.03]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[-0.05, -0.08, 0.01]} rotation={[0, 0, 0.25]}>
                <boxGeometry args={[0.04, 0.12, 0.015]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0.05, -0.08, 0.01]} rotation={[0, 0, -0.25]}>
                <boxGeometry args={[0.04, 0.12, 0.015]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Glowing Angel Halo */}
          {meshType === 'angel_halo' && (
            <group ref={haloRef} position={[0, 0.28, 0]} rotation={[0.2, 0, 0]}>
              <mesh>
                <torusGeometry args={[0.18, 0.018, 16, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.8}
                  metalness={0.7}
                  roughness={0.1}
                />
              </mesh>
            </group>
          )}

          {/* Sweet Wool Beret */}
          {meshType === 'sweet_beret' && (
            <group position={[0.04, 0.06, 0]} rotation={[-0.2, 0.1, -0.3]}>
              <mesh>
                <cylinderGeometry args={[0.22, 0.18, 0.09, 20]} />
                <meshStandardMaterial color={color} roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.04, 6]} />
                <meshStandardMaterial color="#18181B" />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 2. ACCESSORIES (Glasses / Choker)                            */}
      {/* ============================================================ */}
      {category === 'accessory' && (
        <group>
          {/* Heart Bell Ribbon Choker on Neck */}
          {meshType === 'ribbon_choker' && (
            <group position={[0, 0, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.09, 0.012, 8, 20]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0, -0.03, 0.09]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.025, 0.025, 0.015]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}

          {/* Heart Tinted Glasses on Face */}
          {meshType === 'heart_glasses' && (
            <group position={[0, 0.02, 0.14]} rotation={[-0.04, 0, 0]}>
              <mesh position={[-0.07, 0, 0]}>
                <torusGeometry args={[0.045, 0.007, 8, 16]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
              <mesh position={[-0.07, 0, 0]}>
                <circleGeometry args={[0.04, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.4} />
              </mesh>

              <mesh position={[0.07, 0, 0]}>
                <torusGeometry args={[0.045, 0.007, 8, 16]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
              <mesh position={[0.07, 0, 0]}>
                <circleGeometry args={[0.04, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.4} />
              </mesh>

              <mesh position={[0, 0.005, 0]}>
                <boxGeometry args={[0.05, 0.008, 0.008]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 3. BAGS                                                      */}
      {/* ============================================================ */}
      {category === 'bag' && (
        <group>
          {/* Quilted Crossbody Heart Bag */}
          {meshType === 'heart_crossbody' && (
            <group position={[-0.18, -0.05, 0.08]} rotation={[0, 0.3, 0]}>
              <mesh>
                <boxGeometry args={[0.13, 0.13, 0.06]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
              </mesh>
              <mesh position={[0, 0.03, 0.035]}>
                <sphereGeometry args={[0.015, 10, 10]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} />
              </mesh>
            </group>
          )}

          {/* Teddy Backpack on Back */}
          {meshType === 'teddy_backpack' && (
            <group position={[0, 0.05, -0.16]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.12, 0.03]}>
                <sphereGeometry args={[0.09, 14, 14]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[-0.07, 0.18, 0.03]}>
                <sphereGeometry args={[0.035, 10, 10]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[0.07, 0.18, 0.03]}>
                <sphereGeometry args={[0.035, 10, 10]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* Pastel Star Tote Bag */}
          {meshType === 'pastel_tote' && (
            <group position={[0.22, -0.22, 0.06]}>
              <mesh>
                <boxGeometry args={[0.12, 0.16, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              <mesh position={[0, 0, 0.03]}>
                <boxGeometry args={[0.045, 0.045, 0.01]} />
                <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={0.4} />
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
}
