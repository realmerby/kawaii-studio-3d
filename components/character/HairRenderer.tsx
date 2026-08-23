'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterColors } from '@/types/character';

interface HairRendererProps {
  hairId: string | null;
  colors: CharacterColors;
  itemColor?: string;
}

export interface HairTransformProfile {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

// Individualized Per-Hair Transform Calibrations tailored to the VRM Head Bone
const HAIR_TRANSFORM_PROFILES: Record<string, HairTransformProfile> = {
  'hair-twintails': {
    position: [0, 0.02, 0.005],
    rotation: [0, 0, 0],
    scale: [1.0, 1.0, 1.0],
  },
  'hair-bobcut': {
    position: [0, 0.015, 0.0],
    rotation: [0, 0, 0],
    scale: [1.0, 1.0, 1.0],
  },
  'hair-himecut': {
    position: [0, 0.02, 0.005],
    rotation: [0, 0, 0],
    scale: [1.0, 1.0, 1.0],
  },
};

/**
 * Helper to generate smooth curved 3D anime hair strand geometry
 */
function createCurvedStrandGeometry(
  points: [number, number, number][],
  tubularSegments: number = 12,
  radius: number = 0.015,
  radialSegments: number = 8
) {
  const vectors = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(vectors);
  return new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);
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
      leftTwintailRef.current.rotation.z = 0.18 + Math.sin(t * 2.2) * 0.04;
      leftTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.03;
      rightTwintailRef.current.rotation.z = -0.18 - Math.sin(t * 2.2) * 0.04;
      rightTwintailRef.current.rotation.x = Math.cos(t * 2.0) * 0.03;
    }
    if (ahogeRef.current) {
      ahogeRef.current.rotation.z = Math.sin(t * 3.0) * 0.08;
      ahogeRef.current.rotation.x = Math.cos(t * 2.4) * 0.05;
    }
  });

  // Pre-generate smooth curved anime strand geometries
  const geometries = useMemo(() => {
    return {
      // Common soft curved fringe strands (Bangs)
      bangCenter: createCurvedStrandGeometry(
        [
          [0, 0.065, 0.075],
          [0, 0.045, 0.086],
          [0, 0.022, 0.084],
        ],
        8,
        0.016
      ),
      bangLeft: createCurvedStrandGeometry(
        [
          [-0.025, 0.062, 0.072],
          [-0.035, 0.042, 0.084],
          [-0.042, 0.02, 0.082],
        ],
        8,
        0.015
      ),
      bangRight: createCurvedStrandGeometry(
        [
          [0.025, 0.062, 0.072],
          [0.035, 0.042, 0.084],
          [0.042, 0.02, 0.082],
        ],
        8,
        0.015
      ),
      sideLockLeft: createCurvedStrandGeometry(
        [
          [-0.065, 0.055, 0.05],
          [-0.075, 0.015, 0.062],
          [-0.078, -0.045, 0.058],
          [-0.072, -0.095, 0.045],
        ],
        12,
        0.014
      ),
      sideLockRight: createCurvedStrandGeometry(
        [
          [0.065, 0.055, 0.05],
          [0.075, 0.015, 0.062],
          [0.078, -0.045, 0.058],
          [0.072, -0.095, 0.045],
        ],
        12,
        0.014
      ),
      // Twintail curved flowing ponytails
      twintailMain: createCurvedStrandGeometry(
        [
          [0, 0, 0],
          [-0.025, -0.08, 0.01],
          [-0.055, -0.18, 0.02],
          [-0.075, -0.28, 0.015],
          [-0.065, -0.38, 0.0],
        ],
        16,
        0.028
      ),
      twintailSub: createCurvedStrandGeometry(
        [
          [0.01, -0.02, -0.01],
          [0.0, -0.12, 0.01],
          [-0.02, -0.24, 0.015],
          [-0.04, -0.34, 0.005],
        ],
        12,
        0.018
      ),
      // Himecut blunt straight sidelocks
      himeLockLeft: createCurvedStrandGeometry(
        [
          [-0.072, 0.055, 0.048],
          [-0.076, 0.0, 0.055],
          [-0.076, -0.065, 0.055],
        ],
        10,
        0.016
      ),
      himeLockRight: createCurvedStrandGeometry(
        [
          [0.072, 0.055, 0.048],
          [0.076, 0.0, 0.055],
          [0.076, -0.065, 0.055],
        ],
        10,
        0.016
      ),
      // Himecut & Bob back smooth curtain
      himeBackCurtain: createCurvedStrandGeometry(
        [
          [0, 0.05, -0.065],
          [0, -0.05, -0.078],
          [0, -0.16, -0.078],
          [0, -0.28, -0.072],
        ],
        14,
        0.062
      ),
      bobBackCurled: createCurvedStrandGeometry(
        [
          [0, 0.05, -0.062],
          [0, -0.02, -0.075],
          [0, -0.075, -0.072],
          [0, -0.11, -0.05],
        ],
        12,
        0.065
      ),
    };
  }, []);

  // If no hair or if gyaruwaves (which uses the native VRM hair mesh), render nothing
  if (!hairId || hairId === 'hair-gyaruwaves') {
    return null;
  }

  const profile = HAIR_TRANSFORM_PROFILES[hairId] || HAIR_TRANSFORM_PROFILES['hair-twintails'];

  return (
    <group
      name="ExternalHairActive"
      position={profile.position}
      rotation={profile.rotation}
      scale={profile.scale}
    >
      {/* ============================================================ */}
      {/* 1. SEAMLESS SCALP CAP & ANIME HIGHLIGHT                      */}
      {/* ============================================================ */}
      {/* Scalp Cap that contours seamlessly to skull */}
      <mesh position={[0, 0.02, -0.01]}>
        <sphereGeometry args={[0.104, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial
          color={mainColor}
          roughness={0.35}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front Anime Bangs (Smooth Curved Strands) */}
      <group position={[0, 0, 0]}>
        <mesh geometry={geometries.bangCenter}>
          <meshStandardMaterial color={mainColor} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh geometry={geometries.bangLeft}>
          <meshStandardMaterial color={mainColor} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh geometry={geometries.bangRight}>
          <meshStandardMaterial color={mainColor} roughness={0.35} metalness={0.05} />
        </mesh>
      </group>

      {/* Luminous Anime Hair Shine Band */}
      <mesh position={[0, 0.068, 0.052]} rotation={[-0.38, 0, 0]}>
        <torusGeometry args={[0.088, 0.007, 8, 32, Math.PI * 0.75]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.65} />
      </mesh>

      {/* Sweet Animated Ahoge on Crown */}
      <group ref={ahogeRef} position={[0, 0.125, 0.01]} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.025, 0.012]} rotation={[0.4, 0, 0.2]}>
          <coneGeometry args={[0.007, 0.06, 8]} />
          <meshStandardMaterial color={mainColor} roughness={0.35} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. SPECIFIC 3D HAIRSTYLE MESHES                              */}
      {/* ============================================================ */}

      {/* A. KAWAII TWINTAILS */}
      {hairId === 'hair-twintails' && (
        <group name="Hairstyle_Twintails">
          {/* Side Flowing Tendrils */}
          <mesh geometry={geometries.sideLockLeft}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh geometry={geometries.sideLockRight}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>

          {/* Left Ponytail with Satin Ribbon */}
          <group ref={leftTwintailRef} position={[-0.092, 0.055, -0.025]}>
            {/* Satin Pink Ribbon Bow */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.016, 0.005, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.015, 0.008, 0.005]} rotation={[0, 0, 0.3]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Flowing Curved Braids */}
            <mesh geometry={geometries.twintailMain}>
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh geometry={geometries.twintailSub}>
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>

          {/* Right Ponytail with Satin Ribbon */}
          <group
            ref={rightTwintailRef}
            position={[0.092, 0.055, -0.025]}
            scale={[-1, 1, 1]}
          >
            {/* Satin Pink Ribbon Bow */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.016, 0.005, 8, 16]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            <mesh position={[-0.015, 0.008, 0.005]} rotation={[0, 0, 0.3]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial color="#FF1493" roughness={0.3} />
            </mesh>
            {/* Flowing Curved Braids */}
            <mesh geometry={geometries.twintailMain}>
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
            <mesh geometry={geometries.twintailSub}>
              <meshStandardMaterial color={mainColor} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* B. PASTEL BOB CUT */}
      {hairId === 'hair-bobcut' && (
        <group name="Hairstyle_BobCut">
          {/* Side Curved Locks */}
          <mesh geometry={geometries.sideLockLeft}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh geometry={geometries.sideLockRight}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Back Smooth Curled Inward Bob Curtain */}
          <mesh geometry={geometries.bobBackCurled}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}

      {/* C. PRINCESS HIME CUT */}
      {hairId === 'hair-himecut' && (
        <group name="Hairstyle_HimeCut">
          {/* Characteristic Smooth Hime Sidelocks */}
          <mesh geometry={geometries.himeLockLeft}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          <mesh geometry={geometries.himeLockRight}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
          {/* Straight Silk Back Curtain */}
          <mesh geometry={geometries.himeBackCurtain}>
            <meshStandardMaterial color={mainColor} roughness={0.35} />
          </mesh>
        </group>
      )}
    </group>
  );
}
