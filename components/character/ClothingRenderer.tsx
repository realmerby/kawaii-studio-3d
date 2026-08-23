'use client';

import React from 'react';
import * as THREE from 'three';
import { ClothingCategory } from '@/types/character';
import { getItemById } from '@/data/clothing';

interface ClothingRendererProps {
  category: ClothingCategory;
  itemId?: string | null;
  itemColors?: Record<string, string>;
  skinTone: string;
}

export function ClothingRenderer({ category, itemId, itemColors = {}, skinTone }: ClothingRendererProps) {
  const item = getItemById(itemId);
  if (!item) return null;

  const color = (itemId && itemColors[itemId]) || item.defaultColor;
  const meshType = item.meshType;

  return (
    <group>
      {/* ============================================================ */}
      {/* TOPS                                                         */}
      {/* ============================================================ */}
      {category === 'top' && (
        <group>
          {/* Top 1: Bunny Ears Crop Hoodie */}
          {meshType === 'bunny_hoodie' && (
            <group position={[0, 0.05, 0]}>
              {/* Main Hoodie Torso */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.27, 0.25, 0.42, 20]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
              {/* Hoodie Front Pocket */}
              <mesh position={[0, -0.06, 0.16]}>
                <boxGeometry args={[0.22, 0.14, 0.06]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
              </mesh>
              {/* Bunny Drawstring Ribbons */}
              <mesh position={[-0.07, 0.08, 0.18]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[0.07, 0.08, 0.18]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Hoodie Collar / Hood Neck Roll */}
              <mesh position={[0, 0.21, -0.05]} rotation={[0.4, 0, 0]}>
                <torusGeometry args={[0.16, 0.06, 12, 20]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
              {/* Bunny Ears Hanging on Hood Back */}
              <group position={[0, 0.18, -0.18]}>
                <mesh position={[-0.08, -0.1, 0]} rotation={[0.2, 0, -0.3]}>
                  <cylinderGeometry args={[0.03, 0.015, 0.22, 8]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                </mesh>
                <mesh position={[0.08, -0.1, 0]} rotation={[0.2, 0, 0.3]}>
                  <cylinderGeometry args={[0.03, 0.015, 0.22, 8]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                </mesh>
              </group>
            </group>
          )}

          {/* Top 2: Sailor School Blouse */}
          {meshType === 'sailor_blouse' && (
            <group position={[0, 0.05, 0]}>
              {/* White Shirt Body */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.26, 0.24, 0.44, 20]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Sailor Collar Back Flap */}
              <mesh position={[0, 0.14, -0.16]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.38, 0.18, 0.03]} />
                <meshStandardMaterial color="#1E3A8A" roughness={0.4} />
              </mesh>
              {/* Sailor Collar Front V-Flaps */}
              <mesh position={[-0.1, 0.12, 0.14]} rotation={[-0.2, 0.2, -0.4]}>
                <boxGeometry args={[0.12, 0.22, 0.02]} />
                <meshStandardMaterial color="#1E3A8A" roughness={0.4} />
              </mesh>
              <mesh position={[0.1, 0.12, 0.14]} rotation={[-0.2, -0.2, 0.4]}>
                <boxGeometry args={[0.12, 0.22, 0.02]} />
                <meshStandardMaterial color="#1E3A8A" roughness={0.4} />
              </mesh>
              {/* Red Sailor Bow Ribbon */}
              <group position={[0, 0.08, 0.17]}>
                <mesh position={[-0.04, 0, 0]} rotation={[0, 0, 0.4]}>
                  <boxGeometry args={[0.07, 0.04, 0.02]} />
                  <meshStandardMaterial color="#DC2626" roughness={0.3} />
                </mesh>
                <mesh position={[0.04, 0, 0]} rotation={[0, 0, -0.4]}>
                  <boxGeometry args={[0.07, 0.04, 0.02]} />
                  <meshStandardMaterial color="#DC2626" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0.01]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial color="#DC2626" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}

          {/* Top 3: Off-Shoulder Gyaru Knit */}
          {meshType === 'gyaru_knit' && (
            <group position={[0, 0.03, 0]}>
              {/* Slouchy Knit Body */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.28, 0.23, 0.4, 20]} />
                <meshStandardMaterial color={color} roughness={0.7} />
              </mesh>
              {/* Folded Off-Shoulder Collar Ring */}
              <mesh position={[0, 0.16, 0]} rotation={[0.1, 0, 0]}>
                <torusGeometry args={[0.26, 0.065, 12, 24]} />
                <meshStandardMaterial color={color} roughness={0.7} />
              </mesh>
            </group>
          )}

          {/* Top 4: Sweet Ruffle Camisole */}
          {meshType === 'ruffle_camisole' && (
            <group position={[0, 0.04, 0]}>
              {/* Sweetheart Top */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.25, 0.22, 0.38, 20]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Top Frill Edge */}
              <mesh position={[0, 0.18, 0]}>
                <torusGeometry args={[0.24, 0.03, 8, 24]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Spaghetti Straps */}
              <mesh position={[-0.14, 0.24, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.14, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[0.14, 0.24, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.14, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* BOTTOMS                                                      */}
      {/* ============================================================ */}
      {category === 'bottom' && (
        <group>
          {/* Bottom 1: Pleated Tennis Skirt */}
          {meshType === 'pleated_skirt' && (
            <group position={[0, -0.22, 0]}>
              {/* Waistband */}
              <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Flared Pleated Skirt Cone */}
              <mesh position={[0, -0.12, 0]}>
                <cylinderGeometry args={[0.25, 0.46, 0.32, 28, 1, true]} />
                <meshStandardMaterial color={color} roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
              {/* White Trim Ribbon at bottom edge */}
              <mesh position={[0, -0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.45, 0.015, 8, 28]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Bottom 2: High-Waist Denim Shorts */}
          {meshType === 'denim_shorts' && (
            <group position={[0, -0.2, 0]}>
              {/* Main Shorts Pelvis */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.25, 0.26, 0.22, 20]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
              {/* Left Leg Cuff */}
              <mesh position={[-0.11, -0.11, 0]}>
                <cylinderGeometry args={[0.13, 0.135, 0.07, 16]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
              {/* Right Leg Cuff */}
              <mesh position={[0.11, -0.11, 0]}>
                <cylinderGeometry args={[0.13, 0.135, 0.07, 16]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
              {/* Belt & Cute Heart Buckle */}
              <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.255, 0.018, 8, 24]} />
                <meshStandardMaterial color="#78350F" roughness={0.4} />
              </mesh>
              <mesh position={[0, 0.08, 0.26]}>
                <boxGeometry args={[0.04, 0.04, 0.02]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          )}

          {/* Bottom 3: Tiered Frilly Rara Skirt */}
          {meshType === 'frilly_rara' && (
            <group position={[0, -0.22, 0]}>
              {/* Tier 1 (Upper Frill) */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.24, 0.42, 0.18, 24, 1, true]} />
                <meshStandardMaterial color={color} roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
              {/* Tier 2 (Lower Puffy Frill) */}
              <mesh position={[0, -0.12, 0]}>
                <cylinderGeometry args={[0.36, 0.5, 0.2, 24, 1, true]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* DRESSES                                                      */}
      {/* ============================================================ */}
      {category === 'dress' && (
        <group position={[0, 0, 0]}>
          {/* Dress 1: Sweet Lolita Princess Dress */}
          {meshType === 'sweet_lolita' && (
            <group>
              {/* Bodice */}
              <mesh position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.26, 0.23, 0.46, 20]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Lace Front Inset */}
              <mesh position={[0, 0.1, 0.15]}>
                <boxGeometry args={[0.14, 0.26, 0.04]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Big Chest Ribbon */}
              <group position={[0, 0.18, 0.18]}>
                <mesh position={[-0.05, 0, 0]} rotation={[0, 0, 0.3]}>
                  <boxGeometry args={[0.09, 0.05, 0.02]} />
                  <meshStandardMaterial color="#FF1493" roughness={0.3} />
                </mesh>
                <mesh position={[0.05, 0, 0]} rotation={[0, 0, -0.3]}>
                  <boxGeometry args={[0.09, 0.05, 0.02]} />
                  <meshStandardMaterial color="#FF1493" roughness={0.3} />
                </mesh>
              </group>
              {/* Grand Puffy Lolita Skirt */}
              <group position={[0, -0.26, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.24, 0.56, 0.44, 28, 1, true]} />
                  <meshStandardMaterial color={color} roughness={0.4} side={THREE.DoubleSide} />
                </mesh>
                {/* White Scalloped Petticoat Layer */}
                <mesh position={[0, -0.16, 0]}>
                  <cylinderGeometry args={[0.48, 0.6, 0.16, 28, 1, true]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} side={THREE.DoubleSide} />
                </mesh>
              </group>
            </group>
          )}

          {/* Dress 2: Y2K Gyaru Cami Slip Dress */}
          {meshType === 'y2k_slip' && (
            <group>
              {/* Sleek Fitted Body */}
              <mesh position={[0, -0.04, 0]}>
                <cylinderGeometry args={[0.25, 0.32, 0.72, 20]} />
                <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
              </mesh>
              {/* Lace Trim at bust */}
              <mesh position={[0, 0.28, 0]}>
                <torusGeometry args={[0.24, 0.02, 8, 24]} />
                <meshStandardMaterial color="#18181B" roughness={0.4} />
              </mesh>
              {/* Lace Hem */}
              <mesh position={[0, -0.39, 0]}>
                <torusGeometry args={[0.325, 0.02, 8, 24]} />
                <meshStandardMaterial color="#18181B" roughness={0.4} />
              </mesh>
            </group>
          )}

          {/* Dress 3: Maid Café Apron Dress */}
          {meshType === 'maid_cafe' && (
            <group>
              {/* Black Base Dress Bodice */}
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.26, 0.24, 0.42, 20]} />
                <meshStandardMaterial color="#18181B" roughness={0.5} />
              </mesh>
              {/* Crisp White Apron Front */}
              <mesh position={[0, 0.04, 0.16]}>
                <boxGeometry args={[0.2, 0.3, 0.03]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* White Frilly Shoulder Straps */}
              <mesh position={[-0.14, 0.18, 0.08]} rotation={[0.4, 0, -0.3]}>
                <boxGeometry args={[0.06, 0.22, 0.03]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[0.14, 0.18, 0.08]} rotation={[0.4, 0, 0.3]}>
                <boxGeometry args={[0.06, 0.22, 0.03]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Flared Black Skirt */}
              <group position={[0, -0.24, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.24, 0.52, 0.4, 24, 1, true]} />
                  <meshStandardMaterial color="#18181B" roughness={0.5} side={THREE.DoubleSide} />
                </mesh>
                {/* White Apron Flap in Front */}
                <mesh position={[0, 0.02, 0.24]} rotation={[0.25, 0, 0]}>
                  <boxGeometry args={[0.3, 0.32, 0.02]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* SOCKS                                                        */}
      {/* ============================================================ */}
      {category === 'socks' && (
        <group>
          {/* Socks 1: Thigh-High Striped Socks */}
          {meshType === 'thigh_high_striped' && (
            <group position={[0, -0.65, 0]}>
              {/* Left Leg Socks */}
              <mesh position={[-0.14, 0, 0]}>
                <cylinderGeometry args={[0.09, 0.075, 0.58, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Left White Stripes */}
              <mesh position={[-0.14, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.092, 0.015, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>
              <mesh position={[-0.14, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.089, 0.015, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>

              {/* Right Leg Socks */}
              <mesh position={[0.14, 0, 0]}>
                <cylinderGeometry args={[0.09, 0.075, 0.58, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Right White Stripes */}
              <mesh position={[0.14, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.092, 0.015, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>
              <mesh position={[0.14, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.089, 0.015, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>
            </group>
          )}

          {/* Socks 2: Frilly Lace Ankle Socks */}
          {meshType === 'frilly_ankle' && (
            <group position={[0, -0.85, 0]}>
              {/* Left Ankle Sock */}
              <mesh position={[-0.14, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.18, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Left Lace Ruffle Collar */}
              <mesh position={[-0.14, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.088, 0.024, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>

              {/* Right Ankle Sock */}
              <mesh position={[0.14, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.18, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
              </mesh>
              {/* Right Lace Ruffle Collar */}
              <mesh position={[0.14, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.088, 0.024, 8, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Socks 3: Gyaru Fishnet Tights */}
          {meshType === 'fishnet_tights' && (
            <group position={[0, -0.55, 0]}>
              {/* Left Leg Tights */}
              <mesh position={[-0.14, 0, 0]}>
                <cylinderGeometry args={[0.11, 0.075, 0.78, 16]} />
                <meshStandardMaterial color={color} roughness={0.8} transparent opacity={0.65} wireframe />
              </mesh>
              {/* Right Leg Tights */}
              <mesh position={[0.14, 0, 0]}>
                <cylinderGeometry args={[0.11, 0.075, 0.78, 16]} />
                <meshStandardMaterial color={color} roughness={0.8} transparent opacity={0.65} wireframe />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* SHOES                                                        */}
      {/* ============================================================ */}
      {category === 'shoes' && (
        <group position={[0, -0.98, 0]}>
          {/* Shoe 1: Platform Mary Janes */}
          {meshType === 'platform_maryjanes' && (
            <group>
              {/* Left Shoe */}
              <group position={[-0.14, 0, 0.04]}>
                {/* Chunky Sole */}
                <mesh position={[0, -0.06, 0]}>
                  <boxGeometry args={[0.14, 0.07, 0.25]} />
                  <meshStandardMaterial color="#18181B" roughness={0.3} />
                </mesh>
                {/* Upper Shoe */}
                <mesh position={[0, 0, 0.02]}>
                  <boxGeometry args={[0.13, 0.07, 0.22]} />
                  <meshStandardMaterial color={color} roughness={0.15} metalness={0.3} />
                </mesh>
                {/* Strap & Buckle */}
                <mesh position={[0, 0.04, -0.02]}>
                  <boxGeometry args={[0.14, 0.02, 0.04]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
                </mesh>
              </group>

              {/* Right Shoe */}
              <group position={[0.14, 0, 0.04]}>
                {/* Chunky Sole */}
                <mesh position={[0, -0.06, 0]}>
                  <boxGeometry args={[0.14, 0.07, 0.25]} />
                  <meshStandardMaterial color="#18181B" roughness={0.3} />
                </mesh>
                {/* Upper Shoe */}
                <mesh position={[0, 0, 0.02]}>
                  <boxGeometry args={[0.13, 0.07, 0.22]} />
                  <meshStandardMaterial color={color} roughness={0.15} metalness={0.3} />
                </mesh>
                {/* Strap & Buckle */}
                <mesh position={[0, 0.04, -0.02]}>
                  <boxGeometry args={[0.14, 0.02, 0.04]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.2} />
                </mesh>
              </group>
            </group>
          )}

          {/* Shoe 2: Chunky Pastel Sneakers */}
          {meshType === 'chunky_sneakers' && (
            <group>
              {/* Left Sneaker */}
              <group position={[-0.14, 0, 0.05]}>
                {/* Chunky Bubble Sole */}
                <mesh position={[0, -0.05, 0]}>
                  <boxGeometry args={[0.16, 0.08, 0.27]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
                </mesh>
                {/* Upper Sneaker */}
                <mesh position={[0, 0.02, 0.01]}>
                  <boxGeometry args={[0.14, 0.08, 0.24]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                {/* Front Toe Cap */}
                <mesh position={[0, -0.01, 0.1]}>
                  <sphereGeometry args={[0.07, 12, 12]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>

              {/* Right Sneaker */}
              <group position={[0.14, 0, 0.05]}>
                {/* Chunky Bubble Sole */}
                <mesh position={[0, -0.05, 0]}>
                  <boxGeometry args={[0.16, 0.08, 0.27]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
                </mesh>
                {/* Upper Sneaker */}
                <mesh position={[0, 0.02, 0.01]}>
                  <boxGeometry args={[0.14, 0.08, 0.24]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                {/* Front Toe Cap */}
                <mesh position={[0, -0.01, 0.1]}>
                  <sphereGeometry args={[0.07, 12, 12]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}

          {/* Shoe 3: Gyaru High Boots */}
          {meshType === 'gyaru_boots' && (
            <group position={[0, 0.2, 0]}>
              {/* Left Boot */}
              <group position={[-0.14, 0, 0.04]}>
                {/* Boot Shaft */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.11, 0.09, 0.46, 16]} />
                  <meshStandardMaterial color={color} roughness={0.35} />
                </mesh>
                {/* Foot & Heel */}
                <mesh position={[0, -0.24, 0.03]}>
                  <boxGeometry args={[0.13, 0.07, 0.24]} />
                  <meshStandardMaterial color={color} roughness={0.35} />
                </mesh>
                {/* Top Folded Cuff */}
                <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.115, 0.025, 8, 16]} />
                  <meshStandardMaterial color="#FDE68A" roughness={0.3} />
                </mesh>
              </group>

              {/* Right Boot */}
              <group position={[0.14, 0, 0.04]}>
                {/* Boot Shaft */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.11, 0.09, 0.46, 16]} />
                  <meshStandardMaterial color={color} roughness={0.35} />
                </mesh>
                {/* Foot & Heel */}
                <mesh position={[0, -0.24, 0.03]}>
                  <boxGeometry args={[0.13, 0.07, 0.24]} />
                  <meshStandardMaterial color={color} roughness={0.35} />
                </mesh>
                {/* Top Folded Cuff */}
                <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.115, 0.025, 8, 16]} />
                  <meshStandardMaterial color="#FDE68A" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}
        </group>
      )}
    </group>
  );
}
