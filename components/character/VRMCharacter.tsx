'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { useGameStore } from '@/lib/store';
import { HairRenderer } from './HairRenderer';
import { AccessoriesRenderer } from './AccessoriesRenderer';

// Accurate VRM Humanoid Bone Transforms for each of the 12 Anime Poses
const VRM_POSES: Record<
  string,
  {
    head?: [number, number, number];
    chest?: [number, number, number];
    hips?: [number, number, number];
    leftUpperArm?: [number, number, number];
    leftLowerArm?: [number, number, number];
    rightUpperArm?: [number, number, number];
    rightLowerArm?: [number, number, number];
    leftUpperLeg?: [number, number, number];
    leftLowerLeg?: [number, number, number];
    rightUpperLeg?: [number, number, number];
    rightLowerLeg?: [number, number, number];
    bodyOffsetY?: number;
  }
> = {
  // 1. Forehead Salute (Sevimli Alın Selamı - Like the Reference Image!)
  'pose-forehead-salute': {
    head: [0.06, -0.1, 0.14],
    chest: [0.02, -0.05, 0],
    hips: [0, 0.04, -0.02],
    leftUpperArm: [0.12, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    rightUpperArm: [-1.2, -0.4, 0.6],
    rightLowerArm: [0, -1.9, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    bodyOffsetY: 0,
  },

  // 2. Kawaii Peace Sign (✌️)
  'pose-peace-sign': {
    head: [0.05, 0.08, 0.14],
    chest: [0.02, 0, 0],
    hips: [0, 0, 0],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    rightUpperArm: [-0.8, -0.3, 0.7],
    rightLowerArm: [0, -1.8, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    bodyOffsetY: 0,
  },

  // 3. Cute Standing (Pigeon Toes)
  'pose-cute-standing': {
    head: [0.04, 0.05, 0.1],
    chest: [0.02, 0, 0],
    hips: [0, 0.02, 0],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.3, 0],
    rightUpperArm: [0.1, 0, 1.25],
    rightLowerArm: [0, -0.3, 0],
    leftUpperLeg: [0.02, 0.12, -0.04],
    leftLowerLeg: [0.05, 0, 0],
    rightUpperLeg: [0.02, -0.12, 0.04],
    rightLowerLeg: [0.05, 0, 0],
    bodyOffsetY: 0,
  },

  // 4. Hand on Hip (Gyaru Pose)
  'pose-hand-on-hip': {
    head: [-0.04, 0.12, -0.1],
    chest: [0.02, -0.06, -0.04],
    hips: [-0.02, 0.12, 0.08],
    leftUpperArm: [0.2, 0.4, -0.7],
    leftLowerArm: [0, 1.6, 0],
    rightUpperArm: [0.1, 0, 1.25],
    rightLowerArm: [0, -0.1, 0],
    leftUpperLeg: [0.06, -0.08, 0.08],
    leftLowerLeg: [0.08, 0, 0],
    rightUpperLeg: [-0.04, 0.08, -0.06],
    rightLowerLeg: [0.04, 0, 0],
    bodyOffsetY: 0,
  },

  // 5. Cute Wave (👋)
  'pose-waving': {
    head: [0.04, 0.08, 0.08],
    chest: [0, 0.04, 0.02],
    hips: [0, -0.04, -0.02],
    leftUpperArm: [0.1, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    rightUpperArm: [-1.4, -0.2, 0.3],
    rightLowerArm: [0, -0.8, 0],
    leftUpperLeg: [0.02, 0.06, -0.05],
    leftLowerLeg: [0.05, 0, 0],
    rightUpperLeg: [-0.02, -0.06, 0.05],
    rightLowerLeg: [0.05, 0, 0],
    bodyOffsetY: 0,
  },

  // 6. Shy Hands Behind (🥺)
  'pose-shy-pose': {
    head: [-0.08, 0.04, 0.06],
    chest: [0.06, 0, 0],
    hips: [-0.04, 0, 0],
    leftUpperArm: [0.4, 0, -0.3],
    leftLowerArm: [0, 0.5, 0],
    rightUpperArm: [0.4, 0, 0.3],
    rightLowerArm: [0, -0.5, 0],
    leftUpperLeg: [0.05, 0.18, -0.05],
    leftLowerLeg: [0.08, 0, 0],
    rightUpperLeg: [0.05, -0.18, 0.05],
    rightLowerLeg: [0.08, 0, 0],
    bodyOffsetY: 0,
  },

  // 7. Finger to Cheek (💖)
  'pose-hand-near-face': {
    head: [0.06, -0.08, 0.12],
    chest: [0.02, -0.04, 0],
    hips: [0, 0.04, -0.02],
    leftUpperArm: [0.12, 0, -1.25],
    leftLowerArm: [0, 0.2, 0],
    rightUpperArm: [-0.9, -0.3, 0.7],
    rightLowerArm: [0, -1.75, 0],
    leftUpperLeg: [0.04, 0.08, -0.06],
    leftLowerLeg: [0.05, 0, 0],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    rightLowerLeg: [0.05, 0, 0],
    bodyOffsetY: 0,
  },

  // 8. Anime Idol Sparkle (⭐)
  'pose-idol-pose': {
    head: [0.06, -0.1, 0.1],
    chest: [0.04, 0.06, 0.02],
    hips: [-0.04, -0.06, -0.02],
    leftUpperArm: [0.3, 0.2, -0.6],
    leftLowerArm: [0, 1.3, 0],
    rightUpperArm: [-1.6, -0.3, 0.4],
    rightLowerArm: [0, -0.3, 0],
    leftUpperLeg: [-0.05, 0.08, -0.06],
    leftLowerLeg: [0.08, 0, 0],
    rightUpperLeg: [0.06, -0.1, 0.08],
    rightLowerLeg: [0.08, 0, 0],
    bodyOffsetY: 0,
  },

  // 9. Cute Kneeling / Sitting (🪑) - Natural Knee Flexion & lowered hips
  'pose-sitting': {
    head: [0.04, 0.04, 0.06],
    chest: [0.04, 0, 0],
    hips: [0, 0, 0],
    leftUpperLeg: [1.4, 0.08, -0.05],
    leftLowerLeg: [1.85, 0, 0],
    rightUpperLeg: [1.4, -0.08, 0.05],
    rightLowerLeg: [1.85, 0, 0],
    leftUpperArm: [0.2, 0.2, -1.0],
    leftLowerArm: [0, 0.8, 0],
    rightUpperArm: [0.2, -0.2, 1.0],
    rightLowerArm: [0, -0.8, 0],
    bodyOffsetY: -0.42,
  },

  // 10. Over the Shoulder (👀)
  'pose-looking-back': {
    head: [0.02, 0.95, 0.08],
    chest: [0, 0.65, 0],
    hips: [0, 0.4, 0],
    leftUpperArm: [0.15, 0, -1.15],
    leftLowerArm: [0, 0.2, 0],
    rightUpperArm: [0.15, 0, 1.15],
    rightLowerArm: [0, -0.2, 0],
    leftUpperLeg: [-0.04, 0.15, -0.05],
    leftLowerLeg: [0.06, 0, 0],
    rightUpperLeg: [0.04, -0.15, 0.05],
    rightLowerLeg: [0.06, 0, 0],
    bodyOffsetY: 0,
  },

  // 11. Playful Crossed Arms (😏)
  'pose-crossed-arms': {
    head: [-0.04, 0.12, -0.06],
    chest: [0.04, 0, 0],
    hips: [-0.04, 0.06, 0.04],
    leftUpperArm: [0.55, 0.35, -0.6],
    leftLowerArm: [0, 1.6, 0],
    rightUpperArm: [0.55, -0.35, 0.6],
    rightLowerArm: [0, -1.6, 0],
    leftUpperLeg: [0.05, -0.08, 0.06],
    leftLowerLeg: [0.06, 0, 0],
    rightUpperLeg: [-0.05, 0.08, -0.06],
    rightLowerLeg: [0.06, 0, 0],
    bodyOffsetY: 0,
  },

  // 12. Gyaru Catwalk (👠)
  'pose-fashion-pose': {
    head: [0.02, -0.08, 0.06],
    chest: [0, 0.08, -0.04],
    hips: [0, -0.08, 0.04],
    leftUpperArm: [0.25, 0, -1.15],
    leftLowerArm: [0, 0.3, 0],
    rightUpperArm: [-0.3, 0, 1.15],
    rightLowerArm: [0, -0.35, 0],
    leftUpperLeg: [0.25, 0.06, -0.04],
    leftLowerLeg: [0.08, 0, 0],
    rightUpperLeg: [-0.2, -0.06, 0.04],
    rightLowerLeg: [0.08, 0, 0],
    bodyOffsetY: 0,
  },
};

// Clothing color palette mapping for wardrobe items
const WARDROBE_THEMES: Record<string, { topColor?: string; bottomColor?: string; shoesColor?: string }> = {
  'top-bunny-hoodie': { topColor: '#FFB6C1' },
  'top-sailor-blouse': { topColor: '#FFFFFF' },
  'top-gyaru-knit': { topColor: '#E9D5FF' },
  'top-ruffle-camisole': { topColor: '#FFE4E6' },
  'bottom-pleated-skirt': { bottomColor: '#1E1B4B' },
  'bottom-frilly-rara': { bottomColor: '#F472B6' },
  'bottom-denim-shorts': { bottomColor: '#38BDF8' },
  'dress-maid-cafe': { topColor: '#FFFFFF', bottomColor: '#18181B' },
  'dress-y2k-slip': { topColor: '#FF80AB', bottomColor: '#FF80AB' },
  'shoes-platform-mary-janes': { shoesColor: '#111827' },
  'shoes-chunky-sneakers': { shoesColor: '#FFFFFF' },
  'shoes-gyaru-boots': { shoesColor: '#92400E' },
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

  // Load VRM Model
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
              console.log('[Kawaii 3D Debug] VRM Model loaded successfully:', loadedVrm);
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

  // Central Character State -> 3D Material & Theme Synchronization
  const applyMaterials = useCallback(() => {
    if (!vrm) return;

    const hairCol = (equipped.hair && itemColors[equipped.hair]) || colors.hairColor || '#FFA8CA';
    const eyeCol = colors.eyeColor || '#9333EA';
    const skinCol = colors.skinTone || '#FFF8F5';

    // Dress override
    const isDressEquipped = !!equipped.dress;
    const dressTheme = equipped.dress ? WARDROBE_THEMES[equipped.dress] : null;

    const topTheme = (equipped.top && WARDROBE_THEMES[equipped.top]?.topColor) || '#FF80AB';
    const bottomTheme = (equipped.bottom && WARDROBE_THEMES[equipped.bottom]?.bottomColor) || '#18181B';
    const shoesTheme = (equipped.shoes && WARDROBE_THEMES[equipped.shoes]?.shoesColor) || '#18181B';

    const topCol = isDressEquipped
      ? (dressTheme?.topColor || '#FFFFFF')
      : (equipped.top && itemColors[equipped.top]) || topTheme;

    const bottomCol = isDressEquipped
      ? (dressTheme?.bottomColor || '#18181B')
      : (equipped.bottom && itemColors[equipped.bottom]) || bottomTheme;

    const shoesCol = (equipped.shoes && itemColors[equipped.shoes]) || shoesTheme;

    vrm.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        materials.forEach((mat) => {
          if (!mat) return;
          const matName = (mat.name || '').toLowerCase();
          const meshName = (mesh.name || '').toLowerCase();

          // Hair Material (Hair front, hair back)
          if (matName.includes('hair') || meshName.includes('hair')) {
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

          // Top Clothing
          if (
            matName.includes('top') ||
            matName.includes('shirt') ||
            matName.includes('cloth') ||
            matName.includes('jacket') ||
            matName.includes('cardigan') ||
            meshName.includes('top') ||
            meshName.includes('cloth')
          ) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(topCol);
            }
          }

          // Bottom / Skirt / Pants
          if (
            matName.includes('bottom') ||
            matName.includes('skirt') ||
            matName.includes('pant') ||
            meshName.includes('bottom') ||
            meshName.includes('skirt')
          ) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(bottomCol);
            }
          }

          // Shoes / Footwear
          if (matName.includes('shoe') || matName.includes('foot') || meshName.includes('shoe')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(shoesCol);
            }
          }
        });
      }
    });
  }, [vrm, equipped, itemColors, colors]);

  useEffect(() => {
    applyMaterials();
  }, [applyMaterials]);

  // Real-time Smooth Bone Animation, Head Tracking & Spring Physics
  useFrame(({ clock }, delta) => {
    if (!vrm) return;

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

    const idleHead = idleAnimation ? Math.sin(t * 1.5) * 0.02 : 0;
    const idleHip = idleAnimation ? Math.cos(t * 1.5) * 0.015 : 0;
    const lerpFactor = 1 - Math.exp(-8 * delta);

    // Root Position Offset (For sitting etc.)
    if (poseData.bodyOffsetY !== undefined) {
      const targetY = -0.85 + poseData.bodyOffsetY;
      vrm.scene.position.y = THREE.MathUtils.lerp(vrm.scene.position.y, targetY, lerpFactor);
    }

    // Apply Smooth Lerped Humanoid Bone Rotations
    const applyBone = (boneName: VRMHumanBoneName, rot?: [number, number, number], extraOffset?: [number, number, number]) => {
      const node = humanoid.getNormalizedBoneNode(boneName);
      if (!node || !rot) return;
      const ox = extraOffset ? extraOffset[0] : 0;
      const oy = extraOffset ? extraOffset[1] : 0;
      const oz = extraOffset ? extraOffset[2] : 0;

      node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, rot[0] + ox, lerpFactor);
      node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, rot[1] + oy, lerpFactor);
      node.rotation.z = THREE.MathUtils.lerp(node.rotation.z, rot[2] + oz, lerpFactor);
    };

    applyBone(VRMHumanBoneName.Head, poseData.head, [0, idleHead, idleHead * 0.5]);
    applyBone(VRMHumanBoneName.Chest, poseData.chest);
    applyBone(VRMHumanBoneName.Hips, poseData.hips, [0, idleHip, 0]);

    applyBone(VRMHumanBoneName.LeftUpperArm, poseData.leftUpperArm);
    applyBone(VRMHumanBoneName.LeftLowerArm, poseData.leftLowerArm);
    applyBone(VRMHumanBoneName.RightUpperArm, poseData.rightUpperArm);
    applyBone(VRMHumanBoneName.RightLowerArm, poseData.rightLowerArm);

    applyBone(VRMHumanBoneName.LeftUpperLeg, poseData.leftUpperLeg);
    applyBone(VRMHumanBoneName.LeftLowerLeg, poseData.leftLowerLeg);
    applyBone(VRMHumanBoneName.RightUpperLeg, poseData.rightUpperLeg);
    applyBone(VRMHumanBoneName.RightLowerLeg, poseData.rightLowerLeg);

    // Sync Attachments to VRM Bone world positions & orientations
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

          {/* 1. Head Attachments (Hair + Head Accessories + Glasses + Earrings) */}
          <group ref={headAttachmentRef}>
            {/* 3D Hair Style Model */}
            <HairRenderer
              hairId={equipped.hair}
              colors={colors}
              itemColor={equipped.hair ? itemColors[equipped.hair] : undefined}
            />

            {/* Head Accessory (Bow, Ears, Halo, Beret) */}
            <AccessoriesRenderer
              category="headAccessory"
              itemId={equipped.headAccessory}
              itemColors={itemColors}
            />

            {/* Face Accessory (Glasses) */}
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
