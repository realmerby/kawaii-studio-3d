'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/store';
import { getPoseById } from '@/data/poses/posesList';
import { AnimeFace } from './AnimeFace';
import { HairRenderer } from './HairRenderer';
import { ClothingRenderer } from './ClothingRenderer';
import { AccessoriesRenderer } from './AccessoriesRenderer';

/**
 * Real Articulated 3D Anime Hand with 5 sculpted fingers
 */
function AnimeHand({ isRight, skinTone }: { isRight: boolean; skinTone: string }) {
  const sign = isRight ? 1 : -1;

  return (
    <group position={[0, -0.19, 0]}>
      {/* Palm Base */}
      <mesh position={[0, -0.025, 0]}>
        <boxGeometry args={[0.065, 0.05, 0.03]} />
        <meshStandardMaterial color={skinTone} roughness={0.4} />
      </mesh>

      {/* Thumb */}
      <group position={[-0.035 * sign, -0.015, 0.01]} rotation={[0.4, 0, -0.6 * sign]}>
        <mesh position={[0, -0.018, 0]}>
          <cylinderGeometry args={[0.009, 0.008, 0.035, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>

      {/* Index Finger */}
      <group position={[-0.022 * sign, -0.05, 0.005]} rotation={[0.15, 0, -0.08 * sign]}>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.008, 0.007, 0.042, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>

      {/* Middle Finger */}
      <group position={[-0.007 * sign, -0.052, 0.005]} rotation={[0.18, 0, 0]}>
        <mesh position={[0, -0.022, 0]}>
          <cylinderGeometry args={[0.008, 0.007, 0.046, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>

      {/* Ring Finger */}
      <group position={[0.008 * sign, -0.05, 0.005]} rotation={[0.2, 0, 0.06 * sign]}>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.0075, 0.0065, 0.04, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>

      {/* Pinky Finger */}
      <group position={[0.022 * sign, -0.046, 0.005]} rotation={[0.25, 0, 0.14 * sign]}>
        <mesh position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.007, 0.006, 0.034, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export function CharacterRig() {
  const {
    equipped,
    itemColors,
    colors,
    faceFeatures,
    poseId,
    idleAnimation,
    animationSpeed,
  } = useGameStore();

  const rootGroupRef = useRef<THREE.Group>(null);
  const hipsRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const leftUpperArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightUpperArmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);

  const leftUpperLegRef = useRef<THREE.Group>(null);
  const leftLowerLegRef = useRef<THREE.Group>(null);
  const rightUpperLegRef = useRef<THREE.Group>(null);
  const rightLowerLegRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const pose = getPoseById(poseId);
    const t = clock.getElapsedTime() * animationSpeed;
    const lerpFactor = 1 - Math.exp(-8 * delta);

    const idleHead = idleAnimation && pose.idleWiggle
      ? Math.sin(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.headAmplitude || 0.02)
      : 0;
    const idleHip = idleAnimation && pose.idleWiggle
      ? Math.cos(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.hipAmplitude || 0.02)
      : 0;
    const breatheChest = idleAnimation
      ? Math.sin(t * 2.2) * (pose.idleWiggle?.breathingScale || 0.015)
      : 0;

    if (rootGroupRef.current) {
      const targetOffsetY = 0.42 + (pose.transforms.bodyOffset?.[1] || 0);
      rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, targetOffsetY, lerpFactor);
    }

    if (hipsRef.current) {
      hipsRef.current.rotation.x = THREE.MathUtils.lerp(hipsRef.current.rotation.x, pose.transforms.hips[0], lerpFactor);
      hipsRef.current.rotation.y = THREE.MathUtils.lerp(hipsRef.current.rotation.y, pose.transforms.hips[1] + idleHip, lerpFactor);
      hipsRef.current.rotation.z = THREE.MathUtils.lerp(hipsRef.current.rotation.z, pose.transforms.hips[2], lerpFactor);
    }

    if (torsoRef.current) {
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, pose.transforms.torso[0] + breatheChest, lerpFactor);
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, pose.transforms.torso[1], lerpFactor);
      torsoRef.current.rotation.z = THREE.MathUtils.lerp(torsoRef.current.rotation.z, pose.transforms.torso[2], lerpFactor);
    }

    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, pose.transforms.head[0], lerpFactor);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pose.transforms.head[1] + idleHead, lerpFactor);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, pose.transforms.head[2] + idleHead * 0.5, lerpFactor);
    }

    // Arms
    if (leftUpperArmRef.current) {
      leftUpperArmRef.current.rotation.x = THREE.MathUtils.lerp(leftUpperArmRef.current.rotation.x, pose.transforms.leftUpperArm[0], lerpFactor);
      leftUpperArmRef.current.rotation.y = THREE.MathUtils.lerp(leftUpperArmRef.current.rotation.y, pose.transforms.leftUpperArm[1], lerpFactor);
      leftUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(leftUpperArmRef.current.rotation.z, pose.transforms.leftUpperArm[2], lerpFactor);
    }
    if (leftForearmRef.current) {
      leftForearmRef.current.rotation.x = THREE.MathUtils.lerp(leftForearmRef.current.rotation.x, pose.transforms.leftForearm[0], lerpFactor);
      leftForearmRef.current.rotation.y = THREE.MathUtils.lerp(leftForearmRef.current.rotation.y, pose.transforms.leftForearm[1], lerpFactor);
      leftForearmRef.current.rotation.z = THREE.MathUtils.lerp(leftForearmRef.current.rotation.z, pose.transforms.leftForearm[2], lerpFactor);
    }

    if (rightUpperArmRef.current) {
      rightUpperArmRef.current.rotation.x = THREE.MathUtils.lerp(rightUpperArmRef.current.rotation.x, pose.transforms.rightUpperArm[0], lerpFactor);
      rightUpperArmRef.current.rotation.y = THREE.MathUtils.lerp(rightUpperArmRef.current.rotation.y, pose.transforms.rightUpperArm[1], lerpFactor);
      rightUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(rightUpperArmRef.current.rotation.z, pose.transforms.rightUpperArm[2], lerpFactor);
    }
    if (rightForearmRef.current) {
      rightForearmRef.current.rotation.x = THREE.MathUtils.lerp(rightForearmRef.current.rotation.x, pose.transforms.rightForearm[0], lerpFactor);
      rightForearmRef.current.rotation.y = THREE.MathUtils.lerp(rightForearmRef.current.rotation.y, pose.transforms.rightForearm[1], lerpFactor);
      rightForearmRef.current.rotation.z = THREE.MathUtils.lerp(rightForearmRef.current.rotation.z, pose.transforms.rightForearm[2], lerpFactor);
    }

    // Legs
    if (leftUpperLegRef.current) {
      leftUpperLegRef.current.rotation.x = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.x, pose.transforms.leftUpperLeg[0], lerpFactor);
      leftUpperLegRef.current.rotation.y = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.y, pose.transforms.leftUpperLeg[1], lerpFactor);
      leftUpperLegRef.current.rotation.z = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.z, pose.transforms.leftUpperLeg[2], lerpFactor);
    }
    if (leftLowerLegRef.current) {
      leftLowerLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLowerLegRef.current.rotation.x, pose.transforms.leftLowerLeg[0], lerpFactor);
    }

    if (rightUpperLegRef.current) {
      rightUpperLegRef.current.rotation.x = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.x, pose.transforms.rightUpperLeg[0], lerpFactor);
      rightUpperLegRef.current.rotation.y = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.y, pose.transforms.rightUpperLeg[1], lerpFactor);
      rightUpperLegRef.current.rotation.z = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.z, pose.transforms.rightUpperLeg[2], lerpFactor);
    }
    if (rightLowerLegRef.current) {
      rightLowerLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLowerLegRef.current.rotation.x, pose.transforms.rightLowerLeg[0], lerpFactor);
    }
  });

  const skinTone = colors.skinTone || '#FFF8F5';

  return (
    <group ref={rootGroupRef} position={[0, 0.42, 0]}>
      {/* ============================================================ */}
      {/* 1. PELVIS / HIPS ROOT                                        */}
      {/* ============================================================ */}
      <group ref={hipsRef} position={[0, 0, 0]}>
        {/* Curvy Pelvis Mesh */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.16, 0.18, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>

        {/* Bottom Clothing Item (Skirt / Shorts) */}
        {!equipped.dress && (
          <ClothingRenderer
            category="bottom"
            itemId={equipped.bottom}
            itemColors={itemColors}
            skinTone={skinTone}
          />
        )}

        {/* Dress Item */}
        {equipped.dress && (
          <ClothingRenderer
            category="dress"
            itemId={equipped.dress}
            itemColors={itemColors}
            skinTone={skinTone}
          />
        )}

        {/* ============================================================ */}
        {/* 2. TORSO / CHEST (Hourglass Anime Silhouette)                */}
        {/* ============================================================ */}
        <group ref={torsoRef} position={[0, 0.16, 0]}>
          {/* Lower Waist */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.12, 24]} />
            <meshStandardMaterial color={skinTone} roughness={0.4} />
          </mesh>
          {/* Upper Chest / Bust Contour */}
          <mesh position={[0, 0.14, 0.02]}>
            <cylinderGeometry args={[0.19, 0.16, 0.14, 24]} />
            <meshStandardMaterial color={skinTone} roughness={0.4} />
          </mesh>

          {/* Top Clothing Item */}
          {!equipped.dress && (
            <ClothingRenderer
              category="top"
              itemId={equipped.top}
              itemColors={itemColors}
              skinTone={skinTone}
            />
          )}

          {/* Bag Attachment */}
          <AccessoriesRenderer
            category="bag"
            itemId={equipped.bag}
            itemColors={itemColors}
          />

          {/* ============================================================ */}
          {/* 3. NECK & HEAD                                               */}
          {/* ============================================================ */}
          <group position={[0, 0.24, 0]}>
            {/* Tapered Anime Neck */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.065, 0.075, 0.14, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.4} />
            </mesh>

            {/* Neck Accessory */}
            <AccessoriesRenderer
              category="accessory"
              itemId={equipped.accessory}
              itemColors={itemColors}
            />

            {/* Head Group */}
            <group ref={headRef} position={[0, 0.22, 0]}>
              {/* Anime Face with High-Res Canvas Texture */}
              <AnimeFace colors={colors} faceFeatures={faceFeatures} />

              {/* 3D Flowing Anime Hair */}
              <HairRenderer
                hairId={equipped.hair}
                colors={colors}
                itemColor={equipped.hair ? itemColors[equipped.hair] : undefined}
              />

              {/* Head Accessories */}
              <AccessoriesRenderer
                category="headAccessory"
                itemId={equipped.headAccessory}
                itemColors={itemColors}
              />
            </group>
          </group>

          {/* ============================================================ */}
          {/* 4. LEFT ARM HIERARCHY (Curved organic feminine limb)         */}
          {/* ============================================================ */}
          <group position={[-0.22, 0.18, 0]}>
            {/* Shoulder Ball */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial color={skinTone} roughness={0.4} />
            </mesh>

            <group ref={leftUpperArmRef} position={[0, 0, 0]}>
              {/* Upper Arm */}
              <mesh position={[0, -0.11, 0]}>
                <cylinderGeometry args={[0.042, 0.036, 0.22, 16]} />
                <meshStandardMaterial color={skinTone} roughness={0.4} />
              </mesh>

              {/* Forearm & Hand */}
              <group ref={leftForearmRef} position={[0, -0.22, 0]}>
                <mesh position={[0, -0.09, 0]}>
                  <cylinderGeometry args={[0.036, 0.03, 0.18, 16]} />
                  <meshStandardMaterial color={skinTone} roughness={0.4} />
                </mesh>

                {/* Modeled 5-finger Anime Hand */}
                <AnimeHand isRight={false} skinTone={skinTone} />
              </group>
            </group>
          </group>

          {/* ============================================================ */}
          {/* 5. RIGHT ARM HIERARCHY (Curved organic feminine limb)        */}
          {/* ============================================================ */}
          <group position={[0.22, 0.18, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial color={skinTone} roughness={0.4} />
            </mesh>

            <group ref={rightUpperArmRef} position={[0, 0, 0]}>
              {/* Upper Arm */}
              <mesh position={[0, -0.11, 0]}>
                <cylinderGeometry args={[0.042, 0.036, 0.22, 16]} />
                <meshStandardMaterial color={skinTone} roughness={0.4} />
              </mesh>

              {/* Forearm & Hand */}
              <group ref={rightForearmRef} position={[0, -0.22, 0]}>
                <mesh position={[0, -0.09, 0]}>
                  <cylinderGeometry args={[0.036, 0.03, 0.18, 16]} />
                  <meshStandardMaterial color={skinTone} roughness={0.4} />
                </mesh>

                {/* Modeled 5-finger Anime Hand */}
                <AnimeHand isRight={true} skinTone={skinTone} />
              </group>
            </group>
          </group>
        </group>

        {/* ============================================================ */}
        {/* 6. LEFT LEG HIERARCHY (Tapered Anime Thigh & Calf)           */}
        {/* ============================================================ */}
        <group position={[-0.11, -0.06, 0]}>
          <group ref={leftUpperLegRef} position={[0, 0, 0]}>
            {/* Smooth Thigh */}
            <mesh position={[0, -0.18, 0]}>
              <cylinderGeometry args={[0.075, 0.06, 0.36, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.4} />
            </mesh>

            {/* Knee & Calf */}
            <group ref={leftLowerLegRef} position={[0, -0.36, 0]}>
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.06, 0.048, 0.4, 20]} />
                <meshStandardMaterial color={skinTone} roughness={0.4} />
              </mesh>
            </group>
          </group>
        </group>

        {/* ============================================================ */}
        {/* 7. RIGHT LEG HIERARCHY (Tapered Anime Thigh & Calf)          */}
        {/* ============================================================ */}
        <group position={[0.11, -0.06, 0]}>
          <group ref={rightUpperLegRef} position={[0, 0, 0]}>
            {/* Smooth Thigh */}
            <mesh position={[0, -0.18, 0]}>
              <cylinderGeometry args={[0.075, 0.06, 0.36, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.4} />
            </mesh>

            {/* Knee & Calf */}
            <group ref={rightLowerLegRef} position={[0, -0.36, 0]}>
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.06, 0.048, 0.4, 20]} />
                <meshStandardMaterial color={skinTone} roughness={0.4} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Socks Overlay */}
        <ClothingRenderer
          category="socks"
          itemId={equipped.socks}
          itemColors={itemColors}
          skinTone={skinTone}
        />

        {/* Shoes Overlay */}
        <ClothingRenderer
          category="shoes"
          itemId={equipped.shoes}
          itemColors={itemColors}
          skinTone={skinTone}
        />
      </group>
    </group>
  );
}
