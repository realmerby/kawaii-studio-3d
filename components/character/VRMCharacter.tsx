'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { useGameStore } from '@/lib/store';

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
  // 1. Forehead Salute (Like the reference image!)
  'pose-forehead-salute': {
    head: [0.08, -0.1, 0.14],
    chest: [0.02, -0.05, 0],
    hips: [0, 0.05, -0.02],
    leftUpperArm: [0.12, 0, -1.2],
    leftLowerArm: [0.1, 0, -0.1],
    rightUpperArm: [-1.4, 0.35, 0.85],
    rightLowerArm: [-0.2, -1.6, -0.45],
    leftUpperLeg: [0.04, 0.08, -0.06],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    bodyOffsetY: 0,
  },

  // 2. Kawaii Peace Sign (✌️)
  'pose-peace-sign': {
    head: [0.06, 0.08, 0.15],
    chest: [0.02, 0, 0],
    hips: [0, 0, 0],
    leftUpperArm: [0.1, 0, -1.2],
    leftLowerArm: [0.1, 0, -0.1],
    rightUpperArm: [-0.95, 0.25, 0.95],
    rightLowerArm: [-0.15, -1.5, -0.5],
    leftUpperLeg: [0.04, 0.08, -0.06],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    bodyOffsetY: 0,
  },

  // 3. Cute Standing (Pigeon Toes)
  'pose-cute-standing': {
    head: [0.05, 0.05, 0.08],
    chest: [0.02, 0, 0],
    hips: [0, 0.04, 0],
    leftUpperArm: [0.1, 0.1, -1.2],
    leftLowerArm: [0.2, 0, -0.2],
    rightUpperArm: [0.1, -0.1, 1.2],
    rightLowerArm: [0.2, 0, 0.2],
    leftUpperLeg: [0.02, 0.12, -0.05],
    rightUpperLeg: [0.02, -0.12, 0.05],
    bodyOffsetY: 0,
  },

  // 4. Hand on Hip (Gyaru Pose)
  'pose-hand-on-hip': {
    head: [-0.04, 0.1, -0.08],
    chest: [0.02, -0.06, -0.04],
    hips: [-0.02, 0.12, 0.08],
    leftUpperArm: [0.15, 0.3, -0.75],
    leftLowerArm: [0.1, 1.45, 0.4],
    rightUpperArm: [0.1, 0, 1.25],
    rightLowerArm: [0.1, 0, 0.1],
    leftUpperLeg: [0.06, -0.08, 0.08],
    rightUpperLeg: [-0.04, 0.08, -0.06],
    bodyOffsetY: 0,
  },

  // 5. Cute Wave (👋)
  'pose-waving': {
    head: [0.05, 0.08, 0.08],
    chest: [0, 0.04, 0.02],
    hips: [0, -0.04, -0.02],
    leftUpperArm: [0.1, 0, -1.2],
    leftLowerArm: [0.1, 0, -0.1],
    rightUpperArm: [-1.3, 0.4, 0.5],
    rightLowerArm: [0.1, -0.9, -0.3],
    leftUpperLeg: [0.02, 0.06, -0.05],
    rightUpperLeg: [-0.02, -0.06, 0.05],
    bodyOffsetY: 0,
  },

  // 6. Shy Hands Behind (🥺)
  'pose-shy-pose': {
    head: [-0.08, 0.04, 0.06],
    chest: [0.06, 0, 0],
    hips: [-0.04, 0, 0],
    leftUpperArm: [0.35, 0, -0.4],
    leftLowerArm: [0.3, 0, -0.3],
    rightUpperArm: [0.35, 0, 0.4],
    rightLowerArm: [0.3, 0, 0.3],
    leftUpperLeg: [0.05, 0.15, -0.05],
    rightUpperLeg: [0.05, -0.15, 0.05],
    bodyOffsetY: 0,
  },

  // 7. Finger to Cheek (💖)
  'pose-hand-near-face': {
    head: [0.06, -0.08, 0.12],
    chest: [0.02, -0.04, 0],
    hips: [0, 0.04, -0.02],
    leftUpperArm: [0.15, 0, -1.2],
    leftLowerArm: [0.1, 0, -0.1],
    rightUpperArm: [-1.05, 0.25, 0.85],
    rightLowerArm: [-0.1, -1.45, -0.4],
    leftUpperLeg: [0.04, 0.08, -0.06],
    rightUpperLeg: [-0.04, -0.08, 0.06],
    bodyOffsetY: 0,
  },

  // 8. Anime Idol Sparkle (⭐)
  'pose-idol-pose': {
    head: [0.06, -0.1, 0.1],
    chest: [0.04, 0.06, 0.02],
    hips: [-0.04, -0.06, -0.02],
    leftUpperArm: [0.35, 0.2, -0.6],
    leftLowerArm: [0.3, 0.9, 0.4],
    rightUpperArm: [-1.5, 0.3, 0.6],
    rightLowerArm: [0.2, 0, 0.2],
    leftUpperLeg: [-0.05, 0.08, -0.06],
    rightUpperLeg: [0.06, -0.1, 0.08],
    bodyOffsetY: 0,
  },

  // 9. Cute Kneeling / Sitting (🪑)
  'pose-sitting': {
    head: [0.05, 0.04, 0.06],
    chest: [0.04, 0, 0],
    hips: [-0.3, 0, 0],
    leftUpperLeg: [1.3, 0.08, -0.1],
    leftLowerLeg: [-1.9, 0, 0],
    rightUpperLeg: [1.3, -0.08, 0.1],
    rightLowerLeg: [-1.9, 0, 0],
    leftUpperArm: [0.25, 0, -1.0],
    leftLowerArm: [0.5, 0.2, 0.2],
    rightUpperArm: [0.25, 0, 1.0],
    rightLowerArm: [0.5, -0.2, -0.2],
    bodyOffsetY: -0.38,
  },

  // 10. Over the Shoulder (👀)
  'pose-looking-back': {
    head: [0.02, 0.85, 0.08],
    chest: [0, 0.6, 0],
    hips: [0, 0.35, 0],
    leftUpperArm: [0.15, 0, -1.1],
    leftLowerArm: [0.2, 0, -0.1],
    rightUpperArm: [0.15, 0, 1.1],
    rightLowerArm: [0.2, 0, 0.1],
    leftUpperLeg: [-0.04, 0.15, -0.05],
    rightUpperLeg: [0.04, -0.15, 0.05],
    bodyOffsetY: 0,
  },

  // 11. Playful Crossed Arms (😏)
  'pose-crossed-arms': {
    head: [-0.04, 0.12, -0.06],
    chest: [0.04, 0, 0],
    hips: [-0.04, 0.06, 0.04],
    leftUpperArm: [0.55, 0.35, -0.6],
    leftLowerArm: [0.4, 1.3, 0.5],
    rightUpperArm: [0.55, -0.35, 0.6],
    rightLowerArm: [0.4, -1.3, -0.5],
    leftUpperLeg: [0.05, -0.08, 0.06],
    rightUpperLeg: [-0.05, 0.08, -0.06],
    bodyOffsetY: 0,
  },

  // 12. Gyaru Catwalk (👠)
  'pose-fashion-pose': {
    head: [0.02, -0.08, 0.06],
    chest: [0, 0.08, -0.04],
    hips: [0, -0.08, 0.04],
    leftUpperArm: [0.25, 0, -1.1],
    leftLowerArm: [0.3, 0, -0.2],
    rightUpperArm: [-0.3, 0, 1.1],
    rightLowerArm: [0.35, 0, 0.2],
    leftUpperLeg: [0.25, 0.06, -0.04],
    rightUpperLeg: [-0.2, -0.06, 0.04],
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
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const hipsBoneRef = useRef<THREE.Object3D | null>(null);

  // Load VRM Model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      '/models/anime_girl.vrm',
      (gltf) => {
        const loadedVrm = gltf.userData.vrm as VRM;
        if (loadedVrm) {
          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.combineSkeletons(gltf.scene);
          VRMUtils.combineMorphs(loadedVrm);

          // Face the camera directly
          loadedVrm.scene.rotation.y = 0;
          loadedVrm.scene.position.set(0, -0.85, 0);

          const humanoid = loadedVrm.humanoid;
          if (humanoid) {
            headBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
            neckBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Neck);
            hipsBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
          }

          setVrm(loadedVrm);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading VRM:', error);
      }
    );
  }, []);

  // Real-time Material & Color Customization Bridge
  useEffect(() => {
    if (!vrm) return;

    const hairCol = (equipped.hair && itemColors[equipped.hair]) || colors.hairColor || '#FFA8CA';
    const eyeCol = colors.eyeColor || '#9333EA';
    const skinCol = colors.skinTone || '#FFF8F5';
    const topCol = (equipped.top && itemColors[equipped.top]) || '#FF80AB';
    const bottomCol = (equipped.bottom && itemColors[equipped.bottom]) || '#FF4081';
    const shoesCol = (equipped.shoes && itemColors[equipped.shoes]) || '#18181B';

    vrm.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        materials.forEach((mat) => {
          if (!mat) return;
          const matName = (mat.name || '').toLowerCase();
          const meshName = (mesh.name || '').toLowerCase();

          // Hair Material
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
          if (matName.includes('top') || matName.includes('shirt') || matName.includes('cloth') || matName.includes('jacket') || matName.includes('cardigan')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(topCol);
            }
          }

          // Bottom / Skirt
          if (matName.includes('bottom') || matName.includes('skirt') || matName.includes('pant')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(bottomCol);
            }
          }

          // Shoes
          if (matName.includes('shoe') || matName.includes('foot')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(shoesCol);
            }
          }
        });
      }
    });
  }, [vrm, equipped, itemColors, colors]);

  // Real-time Smooth Bone Animation & Spring Physics
  useFrame(({ clock }, delta) => {
    if (!vrm) return;

    // Update spring bones for dynamic hair physics
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

    // Root / Position Offset
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
  });

  return (
    <group ref={groupRef}>
      {vrm && <primitive object={vrm.scene} />}
    </group>
  );
}
