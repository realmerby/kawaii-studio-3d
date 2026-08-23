'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { useGameStore } from '@/lib/store';
import { getItemById } from '@/data/clothing';
import { getGarmentTexture } from '@/lib/textureEngine';
import { AccessoriesRenderer } from './AccessoriesRenderer';

export interface BonePoseConfig {
  head: [number, number, number];
  neck?: [number, number, number];
  chest: [number, number, number];
  spine?: [number, number, number];
  hips: [number, number, number];
  leftUpperArm: [number, number, number];
  leftLowerArm: [number, number, number];
  leftHand?: [number, number, number];
  rightUpperArm: [number, number, number];
  rightLowerArm: [number, number, number];
  rightHand?: [number, number, number];
  leftUpperLeg: [number, number, number];
  leftLowerLeg: [number, number, number];
  leftFoot?: [number, number, number];
  rightUpperLeg: [number, number, number];
  rightLowerLeg: [number, number, number];
  rightFoot?: [number, number, number];
  bodyOffsetY: number;
}

// Complete, Explicit, Anatomically Balanced Bone Targets for all 12 Poses
const VRM_POSES: Record<string, BonePoseConfig> = {
  // 1. Forehead Salute (Sevimli Alın Selamı)
  'pose-forehead-salute': {
    head: [0.06, -0.1, 0.14],
    chest: [0.02, -0.05, 0],
    hips: [0, 0.04, -0.02],
    leftUpperArm: [0.12, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-1.2, -0.35, 0.6],
    rightLowerArm: [0, -1.9, 0],
    rightHand: [0.2, 0.2, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 2. Kawaii Peace Sign (✌️)
  'pose-peace-sign': {
    head: [0.05, 0.08, 0.14],
    chest: [0.02, 0, 0],
    hips: [0, 0, 0],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-0.8, -0.3, 0.7],
    rightLowerArm: [0, -1.8, 0],
    rightHand: [0.2, 0.2, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 3. Cute Standing (Pigeon Toes)
  'pose-cute-standing': {
    head: [0.04, 0.05, 0.1],
    chest: [0.02, 0, 0],
    hips: [0, 0.02, 0],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.3, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [0.1, 0, 1.25],
    rightLowerArm: [0, -0.3, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [0.02, 0.12, -0.04],
    leftLowerLeg: [0.05, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [0.02, -0.12, 0.04],
    rightLowerLeg: [0.05, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 4. Hand on Hip (Gyaru Pose)
  'pose-hand-on-hip': {
    head: [-0.04, 0.12, -0.1],
    chest: [0.02, -0.06, -0.04],
    hips: [-0.02, 0.12, 0.08],
    leftUpperArm: [0.2, 0.4, -0.7],
    leftLowerArm: [0, 1.6, 0],
    leftHand: [-0.2, 0, 0],
    rightUpperArm: [0.1, 0, 1.25],
    rightLowerArm: [0, -0.1, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [0.06, -0.08, 0.08],
    leftLowerLeg: [0.08, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.04, 0.08, -0.06],
    rightLowerLeg: [0.04, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 5. Cute Wave (👋)
  'pose-waving': {
    head: [0.04, 0.08, 0.08],
    chest: [0, 0.04, 0.02],
    hips: [0, -0.04, -0.02],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-1.4, -0.2, 0.3],
    rightLowerArm: [0, -0.8, 0],
    rightHand: [0.3, 0, 0],
    leftUpperLeg: [0.02, 0.06, -0.05],
    leftLowerLeg: [0.05, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.02, -0.06, 0.05],
    rightLowerLeg: [0.05, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 6. Shy Hands Behind (🥺)
  'pose-shy-pose': {
    head: [-0.08, 0.04, 0.06],
    chest: [0.06, 0, 0],
    hips: [-0.04, 0, 0],
    leftUpperArm: [0.4, 0, -0.3],
    leftLowerArm: [0, 0.5, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [0.4, 0, 0.3],
    rightLowerArm: [0, -0.5, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [0.05, 0.18, -0.05],
    leftLowerLeg: [0.08, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [0.05, -0.18, 0.05],
    rightLowerLeg: [0.08, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 7. Finger to Cheek (💖)
  'pose-hand-near-face': {
    head: [0.06, -0.08, 0.12],
    chest: [0.02, -0.04, 0],
    hips: [0, 0.04, -0.02],
    leftUpperArm: [0.12, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-0.9, -0.3, 0.7],
    rightLowerArm: [0, -1.75, 0],
    rightHand: [0.15, 0.2, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 8. Anime Idol Sparkle (⭐)
  'pose-idol-pose': {
    head: [0.06, -0.1, 0.1],
    chest: [0.04, 0.06, 0.02],
    hips: [-0.04, -0.06, -0.02],
    leftUpperArm: [0.3, 0.2, -0.6],
    leftLowerArm: [0, 1.3, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-1.6, -0.3, 0.4],
    rightLowerArm: [0, -0.3, 0],
    rightHand: [0.2, 0, 0],
    leftUpperLeg: [-0.05, 0.08, -0.06],
    leftLowerLeg: [0.08, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [0.06, -0.1, 0.08],
    rightLowerLeg: [0.08, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 9. Cute Kneeling / Sitting (🪑)
  'pose-sitting': {
    head: [0.04, 0.04, 0.06],
    chest: [0.04, 0, 0],
    hips: [0, 0, 0],
    leftUpperLeg: [1.4, 0.08, -0.05],
    leftLowerLeg: [1.85, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [1.4, -0.08, 0.05],
    rightLowerLeg: [1.85, 0, 0],
    rightFoot: [0, 0, 0],
    leftUpperArm: [0.2, 0.2, -1.0],
    leftLowerArm: [0, 0.8, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [0.2, -0.2, 1.0],
    rightLowerArm: [0, -0.8, 0],
    rightHand: [0, 0, 0],
    bodyOffsetY: -0.42,
  },

  // 10. Over the Shoulder (👀)
  'pose-looking-back': {
    head: [0.02, 0.95, 0.08],
    chest: [0, 0.65, 0],
    hips: [0, 0.4, 0],
    leftUpperArm: [0.15, 0, -1.15],
    leftLowerArm: [0, 0.2, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [0.15, 0, 1.15],
    rightLowerArm: [0, -0.2, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [-0.04, 0.15, -0.05],
    leftLowerLeg: [0.06, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [0.04, -0.15, 0.05],
    rightLowerLeg: [0.06, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 11. Playful Crossed Arms (😏)
  'pose-crossed-arms': {
    head: [-0.04, 0.12, -0.06],
    chest: [0.04, 0, 0],
    hips: [-0.04, 0.06, 0.04],
    leftUpperArm: [0.55, 0.35, -0.6],
    leftLowerArm: [0, 1.6, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [0.55, -0.35, 0.6],
    rightLowerArm: [0, -1.6, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [0.05, -0.08, 0.06],
    leftLowerLeg: [0.06, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.05, 0.08, -0.06],
    rightLowerLeg: [0.06, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },

  // 12. Gyaru Catwalk (👠)
  'pose-fashion-pose': {
    head: [0.02, -0.08, 0.06],
    chest: [0, 0.08, -0.04],
    hips: [0, -0.08, 0.04],
    leftUpperArm: [0.25, 0, -1.15],
    leftLowerArm: [0, 0.3, 0],
    leftHand: [0, 0, 0],
    rightUpperArm: [-0.3, 0, 1.15],
    rightLowerArm: [0, -0.35, 0],
    rightHand: [0, 0, 0],
    leftUpperLeg: [0.25, 0.06, -0.04],
    leftLowerLeg: [0.08, 0, 0],
    leftFoot: [0, 0, 0],
    rightUpperLeg: [-0.2, -0.06, 0.04],
    rightLowerLeg: [0.08, 0, 0],
    rightFoot: [0, 0, 0],
    bodyOffsetY: 0,
  },
};

export function VRMCharacter() {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const {
    equipped,
    itemColors,
    colors,
    faceFeatures,
    poseId,
    idleAnimation,
    animationSpeed,
  } = useGameStore();

  const groupRef = useRef<THREE.Group>(null);
  const headAttachmentRef = useRef<THREE.Group>(null);
  const neckAttachmentRef = useRef<THREE.Group>(null);
  const hipsAttachmentRef = useRef<THREE.Group>(null);

  // Load VRM Model with cleanup
  useEffect(() => {
    let isCancelled = false;
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      '/models/anime_girl.vrm',
      (gltf) => {
        if (isCancelled) return;
        try {
          const loadedVrm = gltf.userData.vrm as VRM;
          if (loadedVrm) {
            VRMUtils.removeUnnecessaryVertices(gltf.scene);
            VRMUtils.combineSkeletons(gltf.scene);
            VRMUtils.combineMorphs(loadedVrm);

            // Face front directly
            loadedVrm.scene.rotation.y = 0;
            loadedVrm.scene.position.set(0, -0.85, 0);

            if (process.env.NODE_ENV === 'development') {
              console.log('[Kawaii 3D Debug] VRM Model initialized successfully');
            }

            setVrm(loadedVrm);
          }
        } catch (err) {
          console.error('[Kawaii 3D Debug] Error processing VRM:', err);
        }
      },
      undefined,
      (error) => {
        console.error('[Kawaii 3D Debug] Failed to load anime_girl.vrm:', error);
      }
    );

    return () => {
      isCancelled = true;
    };
  }, []);

  // Central Character State -> 3D Material, Texture & Hair Color Synchronization
  const applyMaterials = useCallback(() => {
    if (!vrm) return;

    const hairCol = (equipped.hair && itemColors[equipped.hair]) || colors.hairColor || '#FFA8CA';
    const eyeCol = colors.eyeColor || '#9333EA';
    const skinCol = colors.skinTone || '#FFF8F5';

    // Dress override & compatibility
    const isDressEquipped = !!equipped.dress;
    const dressItem = equipped.dress ? getItemById(equipped.dress) : undefined;
    const topItem = equipped.top ? getItemById(equipped.top) : undefined;
    const bottomItem = equipped.bottom ? getItemById(equipped.bottom) : undefined;
    const shoesItem = equipped.shoes ? getItemById(equipped.shoes) : undefined;
    const outerItem = equipped.outerwear ? getItemById(equipped.outerwear) : undefined;

    // Resolve active primary and secondary colors
    const topPrimary = isDressEquipped
      ? (equipped.dress && itemColors[equipped.dress]) || dressItem?.defaultColor || '#18181B'
      : (equipped.top && itemColors[equipped.top]) || topItem?.defaultColor || '#FF80AB';

    const topSecondary = isDressEquipped
      ? dressItem?.patternSecondaryColor || '#FFFFFF'
      : topItem?.patternSecondaryColor || '#FFFFFF';

    const bottomPrimary = isDressEquipped
      ? (equipped.dress && itemColors[equipped.dress]) || dressItem?.defaultColor || '#18181B'
      : (equipped.bottom && itemColors[equipped.bottom]) || bottomItem?.defaultColor || '#18181B';

    const bottomSecondary = isDressEquipped
      ? dressItem?.patternSecondaryColor || '#FFFFFF'
      : bottomItem?.patternSecondaryColor || '#FFFFFF';

    const shoesCol = (equipped.shoes && itemColors[equipped.shoes]) || shoesItem?.defaultColor || '#111827';
    const outerCol = (equipped.outerwear && itemColors[equipped.outerwear]) || outerItem?.defaultColor || '#FDE68A';

    // Generate high-definition tailored garment textures with collars, buttons, stitches, and pleats
    const activeTopId = isDressEquipped ? (equipped.dress || 'dress-maid-cafe') : (equipped.top || 'top-ruffle-camisole');
    const activeBottomId = isDressEquipped ? (equipped.dress || 'dress-maid-cafe') : (equipped.bottom || 'bottom-frilly-rara');
    const activeShoesId = equipped.shoes || 'shoes-platform-mary-janes';
    const activeOuterId = equipped.outerwear || 'outer-pastel-cardigan';

    const topTexture = getGarmentTexture(activeTopId, topPrimary, topSecondary);
    const bottomTexture = getGarmentTexture(activeBottomId, bottomPrimary, bottomSecondary);
    const shoesTexture = getGarmentTexture(activeShoesId, shoesCol, '#FFFFFF');
    const outerTexture = getGarmentTexture(activeOuterId, outerCol, '#FFFFFF');

    vrm.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const meshName = (mesh.name || '').toLowerCase();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        // 1. AUTHENTIC VRM HAIR MESH (Always visible, perfectly rigged with 12 spring bones)
        if (meshName === 'hair' || meshName.includes('hair')) {
          mesh.visible = true;
          materials.forEach((mat) => {
            if (mat && 'color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(hairCol);
            }
          });
        }

        materials.forEach((mat) => {
          if (!mat) return;
          const matName = (mat.name || '').toLowerCase();

          // Hair Material
          if (matName.includes('hair')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(hairCol);
            }
          }

          // Eye & Iris Material
          if (matName.includes('eye') || matName.includes('iris') || meshName.includes('eye')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(eyeCol);
            }
          }

          // Skin & Face Material
          if (matName.includes('skin') || matName.includes('body') || matName.includes('face')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(skinCol);
            }
          }

          // Outerwear / Cardigan
          if (matName.includes('cardigan') || matName.includes('jacket') || matName.includes('outer')) {
            if ('map' in mat) {
              (mat as THREE.MeshStandardMaterial).map = outerTexture;
            }
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(outerCol);
            }
            mat.needsUpdate = true;
          }

          // Top Clothing
          if (
            matName.includes('top') ||
            matName.includes('shirt') ||
            matName.includes('cloth') ||
            meshName.includes('top') ||
            meshName.includes('cloth')
          ) {
            if ('map' in mat) {
              (mat as THREE.MeshStandardMaterial).map = topTexture;
            }
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(topPrimary);
            }
            mat.needsUpdate = true;
          }

          // Bottom / Skirt / Pants
          if (
            matName.includes('bottom') ||
            matName.includes('skirt') ||
            matName.includes('pant') ||
            meshName.includes('bottom') ||
            meshName.includes('skirt')
          ) {
            if ('map' in mat) {
              (mat as THREE.MeshStandardMaterial).map = bottomTexture;
            }
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(bottomPrimary);
            }
            mat.needsUpdate = true;
          }

          // Shoes / Footwear
          if (matName.includes('shoe') || matName.includes('foot') || meshName.includes('shoe')) {
            if ('map' in mat) {
              (mat as THREE.MeshStandardMaterial).map = shoesTexture;
            }
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(shoesCol);
            }
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [vrm, equipped, itemColors, colors]);

  useEffect(() => {
    applyMaterials();
  }, [applyMaterials]);

  // Central Animation & Bone Pose Controller with Smooth Transitions
  useFrame(({ clock }, delta) => {
    if (!vrm) return;

    // Update spring bones for dynamic hair and cloth physics
    vrm.update(delta);

    const t = clock.getElapsedTime() * animationSpeed;
    const poseData = VRM_POSES[poseId] || VRM_POSES['pose-forehead-salute'];
    const humanoid = vrm.humanoid;
    if (!humanoid) return;

    // Natural Anime Expression & Blinking
    if (vrm.expressionManager) {
      const blinkTime = t % 4.2;
      if (blinkTime < 0.18) {
        const blinkVal = Math.sin((blinkTime / 0.18) * Math.PI);
        vrm.expressionManager.setValue('blink', blinkVal);
      } else {
        vrm.expressionManager.setValue('blink', 0);
      }

      if (faceFeatures.mouthStyle === 'open') {
        vrm.expressionManager.setValue('aa', 0.5);
        vrm.expressionManager.setValue('happy', 0.8);
      } else if (faceFeatures.mouthStyle === 'smile') {
        vrm.expressionManager.setValue('happy', 0.7);
        vrm.expressionManager.setValue('relaxed', 0.3);
      } else if (faceFeatures.mouthStyle === 'smirk') {
        vrm.expressionManager.setValue('surprised', 0.2);
        vrm.expressionManager.setValue('happy', 0.5);
      }

      vrm.expressionManager.update();
    }

    // Controlled Idle Animation Layers
    const idleHead = idleAnimation ? Math.sin(t * 1.5) * 0.02 : 0;
    const idleHip = idleAnimation ? Math.cos(t * 1.5) * 0.015 : 0;
    const idleBreathe = idleAnimation ? Math.sin(t * 2.2) * 0.012 : 0;

    // Smooth Pose Transition Lerp Factor
    const lerpFactor = 1 - Math.exp(-9 * delta);

    // Root Position Offset (For ground stability and sitting)
    const targetY = -0.85 + (poseData.bodyOffsetY ?? 0);
    vrm.scene.position.y = THREE.MathUtils.lerp(vrm.scene.position.y, targetY, lerpFactor);

    // Helper to smoothly lerp bone rotations with 0 residual error
    const applyBone = (
      boneName: VRMHumanBoneName,
      rot?: [number, number, number],
      extraOffset?: [number, number, number]
    ) => {
      const node = humanoid.getNormalizedBoneNode(boneName);
      if (!node) return;

      const targetX = (rot ? rot[0] : 0) + (extraOffset ? extraOffset[0] : 0);
      const targetY = (rot ? rot[1] : 0) + (extraOffset ? extraOffset[1] : 0);
      const targetZ = (rot ? rot[2] : 0) + (extraOffset ? extraOffset[2] : 0);

      node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, targetX, lerpFactor);
      node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, targetY, lerpFactor);
      node.rotation.z = THREE.MathUtils.lerp(node.rotation.z, targetZ, lerpFactor);
    };

    // Upper Body
    applyBone(VRMHumanBoneName.Head, poseData.head, [0, idleHead, idleHead * 0.5]);
    applyBone(VRMHumanBoneName.Chest, poseData.chest, [idleBreathe, 0, 0]);
    applyBone(VRMHumanBoneName.Hips, poseData.hips, [0, idleHip, 0]);

    // Left Arm & Hand
    applyBone(VRMHumanBoneName.LeftUpperArm, poseData.leftUpperArm);
    applyBone(VRMHumanBoneName.LeftLowerArm, poseData.leftLowerArm);
    applyBone(VRMHumanBoneName.LeftHand, poseData.leftHand);

    // Right Arm & Hand
    applyBone(VRMHumanBoneName.RightUpperArm, poseData.rightUpperArm);
    applyBone(VRMHumanBoneName.RightLowerArm, poseData.rightLowerArm);
    applyBone(VRMHumanBoneName.RightHand, poseData.rightHand);

    // Lower Body
    applyBone(VRMHumanBoneName.LeftUpperLeg, poseData.leftUpperLeg);
    applyBone(VRMHumanBoneName.LeftLowerLeg, poseData.leftLowerLeg);
    applyBone(VRMHumanBoneName.LeftFoot, poseData.leftFoot);

    applyBone(VRMHumanBoneName.RightUpperLeg, poseData.rightUpperLeg);
    applyBone(VRMHumanBoneName.RightLowerLeg, poseData.rightLowerLeg);
    applyBone(VRMHumanBoneName.RightFoot, poseData.rightFoot);

    // Synchronize Attachment Anchors with VRM Bones in real-time
    const headNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
    if (headNode && headAttachmentRef.current) {
      headNode.getWorldPosition(headAttachmentRef.current.position);
      headNode.getWorldQuaternion(headAttachmentRef.current.quaternion);
    }

    const neckNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Neck);
    if (neckNode && neckAttachmentRef.current) {
      neckNode.getWorldPosition(neckAttachmentRef.current.position);
      neckNode.getWorldQuaternion(neckAttachmentRef.current.quaternion);
    }

    const hipsNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
    if (hipsNode && hipsAttachmentRef.current) {
      hipsNode.getWorldPosition(hipsAttachmentRef.current.position);
      hipsNode.getWorldQuaternion(hipsAttachmentRef.current.quaternion);
    }
  });

  return (
    <group ref={groupRef}>
      {vrm && (
        <>
          <primitive object={vrm.scene} />

          {/* 1. Head Attachments (Head Accessories + Glasses + Earrings) */}
          <group ref={headAttachmentRef}>
            {/* Head Accessory (Bow, Ears, Halo, Beret) */}
            <AccessoriesRenderer
              category="headAccessory"
              itemId={equipped.headAccessory}
              itemColors={itemColors}
            />

            {/* Face Accessory (Heart Glasses) */}
            <AccessoriesRenderer
              category="accessory"
              itemId={equipped.accessory}
              itemColors={itemColors}
            />

            {/* Earrings */}
            <AccessoriesRenderer
              earringStyle={faceFeatures.earrings}
              itemColors={itemColors}
            />
          </group>

          {/* 2. Neck Attachments (Choker / Necklace) */}
          <group ref={neckAttachmentRef}>
            <AccessoriesRenderer
              category="accessory"
              itemId={equipped.accessory}
              itemColors={itemColors}
            />
          </group>

          {/* 3. Hip/Back Attachments (Bags / Backpack) */}
          <group ref={hipsAttachmentRef}>
            <AccessoriesRenderer
              category="bag"
              itemId={equipped.bag}
              itemColors={itemColors}
            />
          </group>
        </>
      )}
    </group>
  );
}
