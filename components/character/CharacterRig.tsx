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

  // Rig Hierarchy References
  const rootGroupRef = useRef<THREE.Group>(null);
  const hipsRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const leftUpperArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);

  const rightUpperArmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);

  const leftUpperLegRef = useRef<THREE.Group>(null);
  const leftLowerLegRef = useRef<THREE.Group>(null);
  const leftFootRef = useRef<THREE.Group>(null);

  const rightUpperLegRef = useRef<THREE.Group>(null);
  const rightLowerLegRef = useRef<THREE.Group>(null);
  const rightFootRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const pose = getPoseById(poseId);
    const t = clock.getElapsedTime() * animationSpeed;
    const lerpFactor = 1 - Math.exp(-8 * delta); // Smooth 300-500ms easing

    const idleHead = idleAnimation && pose.idleWiggle
      ? Math.sin(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.headAmplitude || 0.02)
      : 0;
    const idleHip = idleAnimation && pose.idleWiggle
      ? Math.cos(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.hipAmplitude || 0.02)
      : 0;
    const breatheChest = idleAnimation
      ? Math.sin(t * 2.2) * (pose.idleWiggle?.breathingScale || 0.018)
      : 0;

    // 0. Body Position Offset
    if (rootGroupRef.current) {
      const targetOffsetY = 0.45 + (pose.transforms.bodyOffset?.[1] || 0);
      const targetOffsetX = pose.transforms.bodyOffset?.[0] || 0;
      const targetOffsetZ = pose.transforms.bodyOffset?.[2] || 0;

      rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, targetOffsetY, lerpFactor);
      rootGroupRef.current.position.x = THREE.MathUtils.lerp(rootGroupRef.current.position.x, targetOffsetX, lerpFactor);
      rootGroupRef.current.position.z = THREE.MathUtils.lerp(rootGroupRef.current.position.z, targetOffsetZ, lerpFactor);
    }

    // 1. Root & Hips
    if (hipsRef.current) {
      hipsRef.current.rotation.x = THREE.MathUtils.lerp(hipsRef.current.rotation.x, pose.transforms.hips[0], lerpFactor);
      hipsRef.current.rotation.y = THREE.MathUtils.lerp(hipsRef.current.rotation.y, pose.transforms.hips[1] + idleHip, lerpFactor);
      hipsRef.current.rotation.z = THREE.MathUtils.lerp(hipsRef.current.rotation.z, pose.transforms.hips[2], lerpFactor);
    }

    // 2. Torso & Chest
    if (torsoRef.current) {
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, pose.transforms.torso[0] + breatheChest, lerpFactor);
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, pose.transforms.torso[1], lerpFactor);
      torsoRef.current.rotation.z = THREE.MathUtils.lerp(torsoRef.current.rotation.z, pose.transforms.torso[2], lerpFactor);
    }

    // 3. Head & Neck
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, pose.transforms.head[0], lerpFactor);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pose.transforms.head[1] + idleHead, lerpFactor);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, pose.transforms.head[2] + idleHead * 0.5, lerpFactor);
    }

    // 4. Left Arm Hierarchy
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
    if (leftHandRef.current) {
      leftHandRef.current.rotation.x = THREE.MathUtils.lerp(leftHandRef.current.rotation.x, pose.transforms.leftHand[0], lerpFactor);
      leftHandRef.current.rotation.y = THREE.MathUtils.lerp(leftHandRef.current.rotation.y, pose.transforms.leftHand[1], lerpFactor);
      leftHandRef.current.rotation.z = THREE.MathUtils.lerp(leftHandRef.current.rotation.z, pose.transforms.leftHand[2], lerpFactor);
    }

    // 5. Right Arm Hierarchy
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
    if (rightHandRef.current) {
      rightHandRef.current.rotation.x = THREE.MathUtils.lerp(rightHandRef.current.rotation.x, pose.transforms.rightHand[0], lerpFactor);
      rightHandRef.current.rotation.y = THREE.MathUtils.lerp(rightHandRef.current.rotation.y, pose.transforms.rightHand[1], lerpFactor);
      rightHandRef.current.rotation.z = THREE.MathUtils.lerp(rightHandRef.current.rotation.z, pose.transforms.rightHand[2], lerpFactor);
    }

    // 6. Left Leg Hierarchy
    if (leftUpperLegRef.current) {
      leftUpperLegRef.current.rotation.x = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.x, pose.transforms.leftUpperLeg[0], lerpFactor);
      leftUpperLegRef.current.rotation.y = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.y, pose.transforms.leftUpperLeg[1], lerpFactor);
      leftUpperLegRef.current.rotation.z = THREE.MathUtils.lerp(leftUpperLegRef.current.rotation.z, pose.transforms.leftUpperLeg[2], lerpFactor);
    }
    if (leftLowerLegRef.current) {
      leftLowerLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLowerLegRef.current.rotation.x, pose.transforms.leftLowerLeg[0], lerpFactor);
      leftLowerLegRef.current.rotation.y = THREE.MathUtils.lerp(leftLowerLegRef.current.rotation.y, pose.transforms.leftLowerLeg[1] || 0, lerpFactor);
      leftLowerLegRef.current.rotation.z = THREE.MathUtils.lerp(leftLowerLegRef.current.rotation.z, pose.transforms.leftLowerLeg[2] || 0, lerpFactor);
    }
    if (leftFootRef.current) {
      leftFootRef.current.rotation.x = THREE.MathUtils.lerp(leftFootRef.current.rotation.x, pose.transforms.leftFoot[0], lerpFactor);
      leftFootRef.current.rotation.y = THREE.MathUtils.lerp(leftFootRef.current.rotation.y, pose.transforms.leftFoot[1] || 0, lerpFactor);
      leftFootRef.current.rotation.z = THREE.MathUtils.lerp(leftFootRef.current.rotation.z, pose.transforms.leftFoot[2] || 0, lerpFactor);
    }

    // 7. Right Leg Hierarchy
    if (rightUpperLegRef.current) {
      rightUpperLegRef.current.rotation.x = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.x, pose.transforms.rightUpperLeg[0], lerpFactor);
      rightUpperLegRef.current.rotation.y = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.y, pose.transforms.rightUpperLeg[1], lerpFactor);
      rightUpperLegRef.current.rotation.z = THREE.MathUtils.lerp(rightUpperLegRef.current.rotation.z, pose.transforms.rightUpperLeg[2], lerpFactor);
    }
    if (rightLowerLegRef.current) {
      rightLowerLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLowerLegRef.current.rotation.x, pose.transforms.rightLowerLeg[0], lerpFactor);
      rightLowerLegRef.current.rotation.y = THREE.MathUtils.lerp(rightLowerLegRef.current.rotation.y, pose.transforms.rightLowerLeg[1] || 0, lerpFactor);
      rightLowerLegRef.current.rotation.z = THREE.MathUtils.lerp(rightLowerLegRef.current.rotation.z, pose.transforms.rightLowerLeg[2] || 0, lerpFactor);
    }
    if (rightFootRef.current) {
      rightFootRef.current.rotation.x = THREE.MathUtils.lerp(rightFootRef.current.rotation.x, pose.transforms.rightFoot[0], lerpFactor);
      rightFootRef.current.rotation.y = THREE.MathUtils.lerp(rightFootRef.current.rotation.y, pose.transforms.rightFoot[1] || 0, lerpFactor);
      rightFootRef.current.rotation.z = THREE.MathUtils.lerp(rightFootRef.current.rotation.z, pose.transforms.rightFoot[2] || 0, lerpFactor);
    }
  });

  const skinTone = colors.skinTone || '#FFF5F0';

  return (
    <group ref={rootGroupRef} position={[0, 0.45, 0]}>
      {/* ============================================================ */}
      {/* 1. PELVIS / HIPS ROOT                                        */}
      {/* ============================================================ */}
      <group ref={hipsRef} position={[0, 0, 0]}>
        {/* Soft Contoured Pelvis / Underwear */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.2, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
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

        {/* Dress Item (If equipped) */}
        {equipped.dress && (
          <ClothingRenderer
            category="dress"
            itemId={equipped.dress}
            itemColors={itemColors}
            skinTone={skinTone}
          />
        )}

        {/* ============================================================ */}
        {/* 2. TORSO / CHEST (Slender Feminine Anime Curve)              */}
        {/* ============================================================ */}
        <group ref={torsoRef} position={[0, 0.18, 0]}>
          {/* Base Slender Anime Torso */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.22, 0.19, 0.28, 24]} />
            <meshStandardMaterial color={skinTone} roughness={0.35} />
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
          <group position={[0, 0.28, 0]}>
            {/* Graceful Anime Neck */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.085, 0.15, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.35} />
            </mesh>

            {/* Neck Accessory (Choker / Necklace) */}
            <AccessoriesRenderer
              category="accessory"
              itemId={equipped.accessory}
              itemColors={itemColors}
            />

            {/* Stylized Anime Head Group */}
            <group ref={headRef} position={[0, 0.22, 0]}>
              {/* Cute Chibi Anime Head Base */}
              <mesh position={[0, 0.02, 0]}>
                <sphereGeometry args={[0.38, 32, 28]} />
                <meshStandardMaterial color={skinTone} roughness={0.32} />
              </mesh>
              {/* Soft Cheeks / Jaw Contour */}
              <mesh position={[0, -0.12, 0.12]} rotation={[0.35, 0, 0]}>
                <coneGeometry args={[0.19, 0.22, 20]} />
                <meshStandardMaterial color={skinTone} roughness={0.32} />
              </mesh>

              {/* Anime Face Features (Expressive Eyes, Lashes, Blush, Lips) */}
              <AnimeFace colors={colors} faceFeatures={faceFeatures} />

              {/* Modular 3D Layered Anime Hair */}
              <HairRenderer
                hairId={equipped.hair}
                colors={colors}
                itemColor={equipped.hair ? itemColors[equipped.hair] : undefined}
              />

              {/* Headwear Accessories (Cat Ears, Bow, Halo, Beret) */}
              <AccessoriesRenderer
                category="headAccessory"
                itemId={equipped.headAccessory}
                itemColors={itemColors}
              />
            </group>
          </group>

          {/* ============================================================ */}
          {/* 4. LEFT ARM HIERARCHY (Slender & Smooth Anime Limb)          */}
          {/* ============================================================ */}
          <group position={[-0.24, 0.18, 0]}>
            {/* Soft Shoulder Cap */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial color={skinTone} roughness={0.35} />
            </mesh>

            <group ref={leftUpperArmRef} position={[0, 0, 0]}>
              {/* Upper Arm */}
              <mesh position={[0, -0.13, 0]}>
                <cylinderGeometry args={[0.048, 0.042, 0.24, 16]} />
                <meshStandardMaterial color={skinTone} roughness={0.35} />
              </mesh>

              {/* Left Elbow & Forearm */}
              <group ref={leftForearmRef} position={[0, -0.24, 0]}>
                {/* Forearm */}
                <mesh position={[0, -0.11, 0]}>
                  <cylinderGeometry args={[0.042, 0.036, 0.22, 16]} />
                  <meshStandardMaterial color={skinTone} roughness={0.35} />
                </mesh>

                {/* Left Hand (Delicate posed anime hand) */}
                <group ref={leftHandRef} position={[0, -0.22, 0]}>
                  {/* Palm */}
                  <mesh position={[0, -0.035, 0]}>
                    <sphereGeometry args={[0.038, 12, 12]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                  {/* Posed Fingers (Soft curved anime fingers) */}
                  <mesh position={[0, -0.065, 0.008]} rotation={[0.2, 0, 0]}>
                    <cylinderGeometry args={[0.024, 0.018, 0.055, 10]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                  {/* Thumb */}
                  <mesh position={[0.024, -0.03, 0.015]} rotation={[0.4, 0, -0.5]}>
                    <cylinderGeometry args={[0.01, 0.008, 0.03, 8]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>

          {/* ============================================================ */}
          {/* 5. RIGHT ARM HIERARCHY (Slender & Smooth Anime Limb)         */}
          {/* ============================================================ */}
          <group position={[0.24, 0.18, 0]}>
            {/* Soft Shoulder Cap */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial color={skinTone} roughness={0.35} />
            </mesh>

            <group ref={rightUpperArmRef} position={[0, 0, 0]}>
              {/* Upper Arm */}
              <mesh position={[0, -0.13, 0]}>
                <cylinderGeometry args={[0.048, 0.042, 0.24, 16]} />
                <meshStandardMaterial color={skinTone} roughness={0.35} />
              </mesh>

              {/* Right Elbow & Forearm */}
              <group ref={rightForearmRef} position={[0, -0.24, 0]}>
                <mesh position={[0, -0.11, 0]}>
                  <cylinderGeometry args={[0.042, 0.036, 0.22, 16]} />
                  <meshStandardMaterial color={skinTone} roughness={0.35} />
                </mesh>

                {/* Right Hand */}
                <group ref={rightHandRef} position={[0, -0.22, 0]}>
                  {/* Palm */}
                  <mesh position={[0, -0.035, 0]}>
                    <sphereGeometry args={[0.038, 12, 12]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                  {/* Posed Fingers */}
                  <mesh position={[0, -0.065, 0.008]} rotation={[0.2, 0, 0]}>
                    <cylinderGeometry args={[0.024, 0.018, 0.055, 10]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                  {/* Thumb */}
                  <mesh position={[-0.024, -0.03, 0.015]} rotation={[0.4, 0, 0.5]}>
                    <cylinderGeometry args={[0.01, 0.008, 0.03, 8]} />
                    <meshStandardMaterial color={skinTone} roughness={0.35} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* ============================================================ */}
        {/* 6. LEFT LEG HIERARCHY (Slender & Smooth Anime Thigh & Calf)  */}
        {/* ============================================================ */}
        <group position={[-0.13, -0.08, 0]}>
          <group ref={leftUpperLegRef} position={[0, 0, 0]}>
            {/* Smooth Thigh */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.085, 0.07, 0.4, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.35} />
            </mesh>

            {/* Left Knee & Lower Leg */}
            <group ref={leftLowerLegRef} position={[0, -0.4, 0]}>
              {/* Smooth Calf */}
              <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.07, 0.058, 0.44, 20]} />
                <meshStandardMaterial color={skinTone} roughness={0.35} />
              </mesh>

              {/* Left Ankle & Foot */}
              <group ref={leftFootRef} position={[0, -0.44, 0.03]}>
                <mesh position={[0, -0.02, 0]}>
                  <boxGeometry args={[0.08, 0.045, 0.14]} />
                  <meshStandardMaterial color={skinTone} roughness={0.35} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* ============================================================ */}
        {/* 7. RIGHT LEG HIERARCHY (Slender & Smooth Anime Thigh & Calf) */}
        {/* ============================================================ */}
        <group position={[0.13, -0.08, 0]}>
          <group ref={rightUpperLegRef} position={[0, 0, 0]}>
            {/* Smooth Thigh */}
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.085, 0.07, 0.4, 20]} />
              <meshStandardMaterial color={skinTone} roughness={0.35} />
            </mesh>

            {/* Right Knee & Lower Leg */}
            <group ref={rightLowerLegRef} position={[0, -0.4, 0]}>
              {/* Smooth Calf */}
              <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.07, 0.058, 0.44, 20]} />
                <meshStandardMaterial color={skinTone} roughness={0.35} />
              </mesh>

              {/* Right Ankle & Foot */}
              <group ref={rightFootRef} position={[0, -0.44, 0.03]}>
                <mesh position={[0, -0.02, 0]}>
                  <boxGeometry args={[0.08, 0.045, 0.14]} />
                  <meshStandardMaterial color={skinTone} roughness={0.35} />
                </mesh>
              </group>
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
