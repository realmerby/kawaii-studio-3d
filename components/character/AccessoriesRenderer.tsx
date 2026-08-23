'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ClothingCategory, EarringStyle } from '@/types/character';
import { getItemById } from '@/data/clothing';

interface AccessoriesRendererProps {
  category?: ClothingCategory;
  itemId?: string | null;
  earringStyle?: EarringStyle;
  itemColors?: Record<string, string>;
}

export function AccessoriesRenderer({
  category,
  itemId,
  earringStyle,
  itemColors = {},
}: AccessoriesRendererProps) {
  const haloRef = useRef<THREE.Group>(null);
  const leftEarringRef = useRef<THREE.Group>(null);
  const rightEarringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (haloRef.current) {
      haloRef.current.position.y = 0.22 + Math.sin(t * 3) * 0.012;
      haloRef.current.rotation.y = t * 0.6;
    }
    if (leftEarringRef.current && rightEarringRef.current) {
      const swing = Math.sin(t * 2.5) * 0.06;
      leftEarringRef.current.rotation.z = swing;
      rightEarringRef.current.rotation.z = -swing;
    }
  });

  const item = itemId ? getItemById(itemId) : undefined;
  const color = (itemId && itemColors[itemId]) || item?.defaultColor || '#FFFFFF';
  const meshType = item?.meshType;

  return (
    <group scale={[0.52, 0.52, 0.52]}>
      {/* ============================================================ */}
      {/* 1. HEAD ACCESSORIES (Anchor: Head Bone)                      */}
      {/* ============================================================ */}
      {category === 'headAccessory' && (
        <group position={[0, 0.12, 0]}>
          {/* Neko Kitty Ears with Golden Bells */}
          {meshType === 'kitty_ears' && (
            <group position={[0, 0.04, 0]}>
              {/* Left Ear */}
              <group position={[-0.12, 0, 0]} rotation={[0.08, 0, -0.28]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.05, 0.11, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.01, 0.012]}>
                  <coneGeometry args={[0.035, 0.08, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                <mesh position={[0.012, -0.035, 0.035]}>
                  <sphereGeometry args={[0.013, 10, 10]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.15} />
                </mesh>
              </group>

              {/* Right Ear */}
              <group position={[0.12, 0, 0]} rotation={[0.08, 0, 0.28]}>
                <mesh position={[0, 0, 0]}>
                  <coneGeometry args={[0.05, 0.11, 4]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.01, 0.012]}>
                  <coneGeometry args={[0.035, 0.08, 4]} />
                  <meshStandardMaterial color="#FF69B4" roughness={0.3} />
                </mesh>
                <mesh position={[-0.012, -0.035, 0.035]}>
                  <sphereGeometry args={[0.013, 10, 10]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.15} />
                </mesh>
              </group>
            </group>
          )}

          {/* Big Satin Silk Bow on Crown */}
          {meshType === 'big_bow' && (
            <group position={[0, 0.06, -0.03]} rotation={[-0.15, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.03, 12, 12]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Left Wing */}
              <mesh position={[-0.08, 0.025, 0]} rotation={[0, 0, 0.35]}>
                <boxGeometry args={[0.12, 0.07, 0.025]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Right Wing */}
              <mesh position={[0.08, 0.025, 0]} rotation={[0, 0, -0.35]}>
                <boxGeometry args={[0.12, 0.07, 0.025]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              {/* Tails */}
              <mesh position={[-0.04, -0.07, 0.01]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.035, 0.1, 0.012]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0.04, -0.07, 0.01]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.035, 0.1, 0.012]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Luminous Angel Halo */}
          {meshType === 'angel_halo' && (
            <group ref={haloRef} position={[0, 0.22, 0]} rotation={[0.15, 0, 0]}>
              <mesh>
                <torusGeometry args={[0.15, 0.015, 16, 32]} />
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
            <group position={[0.03, 0.05, 0]} rotation={[-0.15, 0.08, -0.25]}>
              <mesh>
                <cylinderGeometry args={[0.18, 0.15, 0.07, 20]} />
                <meshStandardMaterial color={color} roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.045, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 0.03, 6]} />
                <meshStandardMaterial color="#18181B" />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 2. ACCESSORIES (Glasses / Choker / Warmers)                  */}
      {/* ============================================================ */}
      {category === 'accessory' && (
        <group>
          {/* Heart Bell Ribbon Choker on Neck */}
          {meshType === 'ribbon_choker' && (
            <group position={[0, 0.02, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.08, 0.01, 8, 20]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
              <mesh position={[0, -0.025, 0.08]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.02, 0.02, 0.012]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}

          {/* Kawaii Tinted Heart Glasses on Face */}
          {meshType === 'heart_glasses' && (
            <group position={[0, 0.02, 0.12]} rotation={[-0.04, 0, 0]}>
              {/* Left Lens Frame */}
              <mesh position={[-0.06, 0, 0]}>
                <torusGeometry args={[0.038, 0.006, 8, 16]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
              <mesh position={[-0.06, 0, 0]}>
                <circleGeometry args={[0.035, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.45} />
              </mesh>

              {/* Right Lens Frame */}
              <mesh position={[0.06, 0, 0]}>
                <torusGeometry args={[0.038, 0.006, 8, 16]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
              <mesh position={[0.06, 0, 0]}>
                <circleGeometry args={[0.035, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.45} />
              </mesh>

              {/* Bridge */}
              <mesh position={[0, 0.004, 0]}>
                <boxGeometry args={[0.04, 0.006, 0.006]} />
                <meshStandardMaterial color="#FF1493" metalness={0.4} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 3. EARRINGS (Anchor: Ear Left & Ear Right)                   */}
      {/* ============================================================ */}
      {earringStyle && earringStyle !== 'none' && (
        <group position={[0, 0, 0]}>
          {/* Heart Studs */}
          {earringStyle === 'heart_studs' && (
            <>
              <mesh position={[-0.14, 0, 0.02]}>
                <sphereGeometry args={[0.016, 10, 10]} />
                <meshStandardMaterial color="#FB7185" roughness={0.3} />
              </mesh>
              <mesh position={[0.14, 0, 0.02]}>
                <sphereGeometry args={[0.016, 10, 10]} />
                <meshStandardMaterial color="#FB7185" roughness={0.3} />
              </mesh>
            </>
          )}

          {/* Pearl Drops */}
          {earringStyle === 'pearl_drops' && (
            <>
              <group ref={leftEarringRef} position={[-0.14, -0.01, 0.02]}>
                <mesh position={[0, -0.02, 0]}>
                  <sphereGeometry args={[0.014, 12, 12]} />
                  <meshStandardMaterial color="#FFFBEB" roughness={0.2} metalness={0.4} />
                </mesh>
              </group>
              <group ref={rightEarringRef} position={[0.14, -0.01, 0.02]}>
                <mesh position={[0, -0.02, 0]}>
                  <sphereGeometry args={[0.014, 12, 12]} />
                  <meshStandardMaterial color="#FFFBEB" roughness={0.2} metalness={0.4} />
                </mesh>
              </group>
            </>
          )}

          {/* Gold Hoops */}
          {earringStyle === 'gold_hoops' && (
            <>
              <mesh position={[-0.14, -0.015, 0.02]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.02, 0.004, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh position={[0.14, -0.015, 0.02]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.02, 0.004, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.15} />
              </mesh>
            </>
          )}

          {/* Star Dangles */}
          {earringStyle === 'star_dangles' && (
            <>
              <group ref={leftEarringRef} position={[-0.14, -0.02, 0.02]}>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.018, 0.018, 0.005]} />
                  <meshStandardMaterial color="#FDE047" metalness={0.8} />
                </mesh>
              </group>
              <group ref={rightEarringRef} position={[0.14, -0.02, 0.02]}>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.018, 0.018, 0.005]} />
                  <meshStandardMaterial color="#FDE047" metalness={0.8} />
                </mesh>
              </group>
            </>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 4. BAGS (Anchor: Hips / Back)                                */}
      {/* ============================================================ */}
      {category === 'bag' && (
        <group>
          {/* Quilted Crossbody Heart Bag */}
          {meshType === 'heart_crossbody' && (
            <group position={[-0.14, -0.04, 0.06]} rotation={[0, 0.25, 0]}>
              <mesh>
                <boxGeometry args={[0.11, 0.11, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
              </mesh>
              <mesh position={[0, 0.025, 0.03]}>
                <sphereGeometry args={[0.012, 10, 10]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} />
              </mesh>
            </group>
          )}

          {/* Teddy Backpack on Back */}
          {meshType === 'teddy_backpack' && (
            <group position={[0, 0.04, -0.14]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.1, 0.02]}>
                <sphereGeometry args={[0.075, 14, 14]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[-0.06, 0.15, 0.02]}>
                <sphereGeometry args={[0.03, 10, 10]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
              <mesh position={[0.06, 0.15, 0.02]}>
                <sphereGeometry args={[0.03, 10, 10]} />
                <meshStandardMaterial color={color} roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* Pastel Star Tote Bag */}
          {meshType === 'pastel_tote' && (
            <group position={[0.18, -0.18, 0.05]}>
              <mesh>
                <boxGeometry args={[0.1, 0.14, 0.04]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              <mesh position={[0, 0, 0.025]}>
                <boxGeometry args={[0.035, 0.035, 0.008]} />
                <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={0.4} />
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
}
