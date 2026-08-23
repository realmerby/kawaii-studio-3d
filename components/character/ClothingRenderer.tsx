'use client';

import React from 'react';
import { ClothingCategory } from '@/types/character';

interface ClothingRendererProps {
  category: ClothingCategory;
  itemId: string | null;
  itemColors: Record<string, string>;
  skinTone: string;
}

export function ClothingRenderer({
  category,
  itemId,
  itemColors,
  skinTone,
}: ClothingRendererProps) {
  if (!itemId) return null;
  const color = itemColors[itemId] || '#FF80AB';

  return (
    <group>
      {/* ============================================================ */}
      {/* 1. TOPS (Anime Sailor, Frilly Ruffles, Off-shoulder Knit)     */}
      {/* ============================================================ */}
      {category === 'top' && (
        <group>
          {/* TOP 1: Sailor Blouse with Navy Collar & Bow */}
          {itemId === 'top-sailor-blouse' && (
            <group position={[0, 0.1, 0]}>
              {/* Main Blouse Body */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.24, 0.22, 0.3, 20]} />
                <meshStandardMaterial color={color || '#FFFFFF'} roughness={0.4} />
              </mesh>
              {/* Sailor Flap Collar on Back & Shoulders */}
              <mesh position={[0, 0.14, -0.06]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[0.42, 0.14, 0.12]} />
                <meshStandardMaterial color="#312E81" roughness={0.3} />
              </mesh>
              {/* White Collar Stripes */}
              <mesh position={[0, 0.15, -0.11]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[0.38, 0.02, 0.02]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Red Sailor Bow Ribbon on Chest */}
              <group position={[0, 0.06, 0.13]}>
                <mesh position={[-0.035, 0, 0]} rotation={[0, 0, 0.4]}>
                  <coneGeometry args={[0.035, 0.07, 8]} />
                  <meshStandardMaterial color="#E11D48" roughness={0.3} />
                </mesh>
                <mesh position={[0.035, 0, 0]} rotation={[0, 0, -0.4]}>
                  <coneGeometry args={[0.035, 0.07, 8]} />
                  <meshStandardMaterial color="#E11D48" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0.01]}>
                  <sphereGeometry args={[0.018, 12, 12]} />
                  <meshStandardMaterial color="#E11D48" roughness={0.3} />
                </mesh>
              </group>
              {/* Bottom Hem Ruffle */}
              <mesh position={[0, -0.14, 0]}>
                <torusGeometry args={[0.23, 0.015, 8, 24]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* TOP 2: Bunny Ear Crop Hoodie */}
          {itemId === 'top-bunny-hoodie' && (
            <group position={[0, 0.1, 0]}>
              {/* Cozy Hoodie Body */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.26, 0.22, 0.28, 20]} />
                <meshStandardMaterial color={color || '#FFA8CA'} roughness={0.45} />
              </mesh>
              {/* Hood Collar Resting on Neck */}
              <mesh position={[0, 0.16, -0.06]} rotation={[-0.3, 0, 0]}>
                <torusGeometry args={[0.2, 0.04, 10, 20, Math.PI * 1.4]} />
                <meshStandardMaterial color={color || '#FFA8CA'} roughness={0.45} />
              </mesh>
              {/* Drawstring Ribbons */}
              <mesh position={[-0.05, 0.02, 0.14]}>
                <cylinderGeometry args={[0.005, 0.005, 0.14, 6]} />
                <meshStandardMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0.05, 0.02, 0.14]}>
                <cylinderGeometry args={[0.005, 0.005, 0.14, 6]} />
                <meshStandardMaterial color="#FFFFFF" />
              </mesh>
            </group>
          )}

          {/* TOP 3: Frilly Ruffle Camisole (Like Reference Image!) */}
          {itemId === 'top-ruffle-camisole' && (
            <group position={[0, 0.1, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.23, 0.21, 0.28, 20]} />
                <meshStandardMaterial color={color || '#FFB6C1'} roughness={0.35} />
              </mesh>
              {/* Lace Neckline Frill */}
              <mesh position={[0, 0.12, 0.05]}>
                <torusGeometry args={[0.18, 0.02, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              {/* Cute Center Yellow Ribbon Bow */}
              <group position={[0, 0.08, 0.14]}>
                <mesh position={[-0.025, 0, 0]} rotation={[0, 0, 0.4]}>
                  <coneGeometry args={[0.025, 0.05, 8]} />
                  <meshStandardMaterial color="#FDE047" />
                </mesh>
                <mesh position={[0.025, 0, 0]} rotation={[0, 0, -0.4]}>
                  <coneGeometry args={[0.025, 0.05, 8]} />
                  <meshStandardMaterial color="#FDE047" />
                </mesh>
              </group>
              {/* Multi-tier Waist Frills */}
              <mesh position={[0, -0.12, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 0.05, 20]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* TOP 4: Off-Shoulder Gyaru Knit */}
          {itemId === 'top-gyaru-knit' && (
            <group position={[0, 0.08, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.25, 0.22, 0.32, 20]} />
                <meshStandardMaterial color={color || '#E0E7FF'} roughness={0.55} />
              </mesh>
              {/* Slouchy Rolled Neckline */}
              <mesh position={[0, 0.12, 0]} rotation={[0.1, 0, 0]}>
                <torusGeometry args={[0.24, 0.035, 10, 24]} />
                <meshStandardMaterial color={color || '#E0E7FF'} roughness={0.55} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 2. BOTTOMS (Pleated Tennis Skirt, Frilly Rara, Denim Shorts) */}
      {/* ============================================================ */}
      {category === 'bottom' && (
        <group>
          {/* BOTTOM 1: Pleated Tennis Skirt with Belt */}
          {itemId === 'bottom-pleated-skirt' && (
            <group position={[0, 0.02, 0]}>
              {/* Waistband */}
              <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.23, 0.23, 0.05, 20]} />
                <meshStandardMaterial color={color || '#FF80AB'} roughness={0.35} />
              </mesh>
              {/* Pleated Flare Skirt */}
              <mesh position={[0, -0.12, 0]}>
                <cylinderGeometry args={[0.24, 0.42, 0.26, 24, 1, true]} />
                <meshStandardMaterial color={color || '#FF80AB'} roughness={0.35} side={2} />
              </mesh>
              {/* White Trim Ribbon on Hem */}
              <mesh position={[0, -0.24, 0]}>
                <torusGeometry args={[0.41, 0.015, 8, 24]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* BOTTOM 2: Tiered Frilly Rara Skirt (Like Reference Image!) */}
          {itemId === 'bottom-frilly-rara' && (
            <group position={[0, 0.02, 0]}>
              {/* Tier 1 Upper Ruffle */}
              <mesh position={[0, -0.04, 0]}>
                <cylinderGeometry args={[0.23, 0.35, 0.15, 24, 1, true]} />
                <meshStandardMaterial color={color || '#F472B6'} roughness={0.35} side={2} />
              </mesh>
              {/* Tier 2 Lower Lace Petticoat Ruffle */}
              <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.32, 0.44, 0.16, 24, 1, true]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} side={2} />
              </mesh>
              {/* Cute Center Waist Ribbon */}
              <mesh position={[0, 0.03, 0.14]}>
                <sphereGeometry args={[0.02, 10, 10]} />
                <meshStandardMaterial color="#FF1493" />
              </mesh>
            </group>
          )}

          {/* BOTTOM 3: Mini Denim Shorts */}
          {itemId === 'bottom-denim-shorts' && (
            <group position={[0, -0.02, 0]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.23, 0.24, 0.18, 20]} />
                <meshStandardMaterial color={color || '#38BDF8'} roughness={0.6} />
              </mesh>
              {/* Pocket details */}
              <mesh position={[0, 0.06, 0]}>
                <torusGeometry args={[0.235, 0.015, 8, 20]} />
                <meshStandardMaterial color="#78350F" roughness={0.4} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 3. DRESSES (Full Outfits: Maid Cafe, Y2K Slip, Lolita)      */}
      {/* ============================================================ */}
      {category === 'dress' && (
        <group position={[0, 0, 0]}>
          {/* DRESS 1: Maid Café Lolita Dress */}
          {itemId === 'dress-maid-cafe' && (
            <group>
              {/* Torso Blouse & Black Vest */}
              <group position={[0, 0.3, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.24, 0.21, 0.3, 20]} />
                  <meshStandardMaterial color="#18181B" roughness={0.4} />
                </mesh>
                {/* White Apron Bib on Chest */}
                <mesh position={[0, 0.02, 0.11]}>
                  <boxGeometry args={[0.18, 0.22, 0.04]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                {/* Ruffled Shoulder Straps */}
                <mesh position={[-0.14, 0.06, 0.05]} rotation={[0, 0, -0.2]}>
                  <boxGeometry args={[0.06, 0.26, 0.03]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                <mesh position={[0.14, 0.06, 0.05]} rotation={[0, 0, 0.2]}>
                  <boxGeometry args={[0.06, 0.26, 0.03]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                {/* Red Chest Ribbon */}
                <mesh position={[0, 0.1, 0.14]}>
                  <sphereGeometry args={[0.022, 10, 10]} />
                  <meshStandardMaterial color="#DC2626" />
                </mesh>
              </group>

              {/* Fluffy Maid Skirt & White Apron Overlay */}
              <group position={[0, 0.02, 0]}>
                {/* Main Black Flare Skirt */}
                <mesh position={[0, -0.16, 0]}>
                  <cylinderGeometry args={[0.24, 0.46, 0.34, 24, 1, true]} />
                  <meshStandardMaterial color="#18181B" roughness={0.4} side={2} />
                </mesh>
                {/* White Front Apron Half-Skirt */}
                <mesh position={[0, -0.14, 0.06]}>
                  <cylinderGeometry args={[0.22, 0.4, 0.28, 20, 1, true]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} side={2} />
                </mesh>
                {/* Bottom White Petticoat Lace */}
                <mesh position={[0, -0.32, 0]}>
                  <torusGeometry args={[0.45, 0.02, 8, 24]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}

          {/* DRESS 2: Y2K Satin Slip Dress (Like Reference Image Pink Dress!) */}
          {itemId === 'dress-y2k-slip' && (
            <group>
              {/* Fitted Bodice */}
              <group position={[0, 0.3, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.23, 0.21, 0.3, 20]} />
                  <meshStandardMaterial color={color || '#FF80AB'} roughness={0.3} metalness={0.1} />
                </mesh>
                {/* Satin Neckline Frill & Bow */}
                <mesh position={[0, 0.13, 0.06]}>
                  <torusGeometry args={[0.18, 0.02, 8, 24, Math.PI]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.08, 0.13]}>
                  <sphereGeometry args={[0.02, 10, 10]} />
                  <meshStandardMaterial color="#FDE047" />
                </mesh>
              </group>

              {/* Ruffled Tiered Skirt (Identical to reference!) */}
              <group position={[0, 0.02, 0]}>
                <mesh position={[0, -0.12, 0]}>
                  <cylinderGeometry args={[0.22, 0.42, 0.26, 24, 1, true]} />
                  <meshStandardMaterial color={color || '#FF80AB'} roughness={0.3} side={2} />
                </mesh>
                {/* Petticoat Ruffle Hem */}
                <mesh position={[0, -0.24, 0]}>
                  <cylinderGeometry args={[0.4, 0.48, 0.08, 24, 1, true]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} side={2} />
                </mesh>
              </group>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 4. SOCKS (Striped Thigh-Highs, Frilly Lace Anklets, Fishnet) */}
      {/* ============================================================ */}
      {category === 'socks' && (
        <group>
          {/* SOCKS 1: Striped Thigh-High Socks (Like in Reference Image!) */}
          {itemId === 'socks-thigh-high-striped' && (
            <group>
              {/* Left Sock Rings */}
              <group position={[-0.14, -0.35, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.09, 0.075, 0.46, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
                </mesh>
                {/* Pink Horizontal Stripes */}
                {[-0.14, -0.05, 0.04, 0.13].map((y, i) => (
                  <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.082, 0.012, 8, 16]} />
                    <meshStandardMaterial color={color || '#FF80AB'} roughness={0.4} />
                  </mesh>
                ))}
              </group>
              {/* Right Sock Rings */}
              <group position={[0.14, -0.35, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.09, 0.075, 0.46, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
                </mesh>
                {[-0.14, -0.05, 0.04, 0.13].map((y, i) => (
                  <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.082, 0.012, 8, 16]} />
                    <meshStandardMaterial color={color || '#FF80AB'} roughness={0.4} />
                  </mesh>
                ))}
              </group>
            </group>
          )}

          {/* SOCKS 2: Frilly Lace Ankle Socks */}
          {itemId === 'socks-frilly-lace-ankle' && (
            <group>
              <group position={[-0.14, -0.72, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.068, 0.065, 0.18, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                {/* Ruffle Ankle Collar */}
                <mesh position={[0, 0.08, 0]}>
                  <torusGeometry args={[0.074, 0.018, 8, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>
              <group position={[0.14, -0.72, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.068, 0.065, 0.18, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.08, 0]}>
                  <torusGeometry args={[0.074, 0.018, 8, 16]} />
                  <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
                </mesh>
              </group>
            </group>
          )}

          {/* SOCKS 3: Gyaru Black Fishnet */}
          {itemId === 'socks-fishnet-gyaru' && (
            <group>
              <mesh position={[-0.14, -0.38, 0]}>
                <cylinderGeometry args={[0.092, 0.072, 0.52, 16]} />
                <meshStandardMaterial color="#1E1B4B" transparent opacity={0.65} roughness={0.6} />
              </mesh>
              <mesh position={[0.14, -0.38, 0]}>
                <cylinderGeometry args={[0.092, 0.072, 0.52, 16]} />
                <meshStandardMaterial color="#1E1B4B" transparent opacity={0.65} roughness={0.6} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ============================================================ */}
      {/* 5. SHOES (Platform Mary Janes, Chunky Sneakers, Gyaru Boots) */}
      {/* ============================================================ */}
      {category === 'shoes' && (
        <group>
          {/* SHOES 1: Platform Mary Janes with Ribbon (Like Reference Shoes!) */}
          {itemId === 'shoes-platform-mary-janes' && (
            <group>
              {/* Left Shoe */}
              <group position={[-0.14, -0.88, 0.04]}>
                {/* Glossy Upper Shoe */}
                <mesh position={[0, 0.03, 0]}>
                  <boxGeometry args={[0.11, 0.07, 0.18]} />
                  <meshStandardMaterial color={color || '#18181B'} roughness={0.2} metalness={0.3} />
                </mesh>
                {/* Thick Platform Sole */}
                <mesh position={[0, -0.04, 0]}>
                  <boxGeometry args={[0.12, 0.07, 0.2]} />
                  <meshStandardMaterial color="#27272A" roughness={0.4} />
                </mesh>
                {/* Cute Ankle Strap & Buckle */}
                <mesh position={[0, 0.07, -0.02]}>
                  <torusGeometry args={[0.068, 0.012, 8, 16]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>

              {/* Right Shoe */}
              <group position={[0.14, -0.88, 0.04]}>
                <mesh position={[0, 0.03, 0]}>
                  <boxGeometry args={[0.11, 0.07, 0.18]} />
                  <meshStandardMaterial color={color || '#18181B'} roughness={0.2} metalness={0.3} />
                </mesh>
                <mesh position={[0, -0.04, 0]}>
                  <boxGeometry args={[0.12, 0.07, 0.2]} />
                  <meshStandardMaterial color="#27272A" roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.07, -0.02]}>
                  <torusGeometry args={[0.068, 0.012, 8, 16]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>
            </group>
          )}

          {/* SHOES 2: Chunky Pastel Sneakers */}
          {itemId === 'shoes-chunky-sneakers' && (
            <group>
              <group position={[-0.14, -0.88, 0.04]}>
                <mesh position={[0, 0.03, 0]}>
                  <boxGeometry args={[0.12, 0.08, 0.19]} />
                  <meshStandardMaterial color={color || '#FFFFFF'} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.04, 0]}>
                  <boxGeometry args={[0.13, 0.07, 0.21]} />
                  <meshStandardMaterial color="#F472B6" roughness={0.4} />
                </mesh>
              </group>
              <group position={[0.14, -0.88, 0.04]}>
                <mesh position={[0, 0.03, 0]}>
                  <boxGeometry args={[0.12, 0.08, 0.19]} />
                  <meshStandardMaterial color={color || '#FFFFFF'} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.04, 0]}>
                  <boxGeometry args={[0.13, 0.07, 0.21]} />
                  <meshStandardMaterial color="#F472B6" roughness={0.4} />
                </mesh>
              </group>
            </group>
          )}

          {/* SHOES 3: Gyaru Platform Boots with Buckles */}
          {itemId === 'shoes-gyaru-boots' && (
            <group>
              <group position={[-0.14, -0.74, 0.02]}>
                {/* Boot Shaft */}
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.08, 0.075, 0.24, 16]} />
                  <meshStandardMaterial color={color || '#78350F'} roughness={0.3} />
                </mesh>
                {/* Foot & Platform */}
                <mesh position={[0, -0.1, 0.04]}>
                  <boxGeometry args={[0.12, 0.12, 0.2]} />
                  <meshStandardMaterial color={color || '#78350F'} roughness={0.3} />
                </mesh>
                {/* Gold Buckle */}
                <mesh position={[0, 0.12, 0.08]}>
                  <boxGeometry args={[0.04, 0.03, 0.015]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>
              <group position={[0.14, -0.74, 0.02]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.08, 0.075, 0.24, 16]} />
                  <meshStandardMaterial color={color || '#78350F'} roughness={0.3} />
                </mesh>
                <mesh position={[0, -0.1, 0.04]}>
                  <boxGeometry args={[0.12, 0.12, 0.2]} />
                  <meshStandardMaterial color={color || '#78350F'} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.12, 0.08]}>
                  <boxGeometry args={[0.04, 0.03, 0.015]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
              </group>
            </group>
          )}
        </group>
      )}
    </group>
  );
}
