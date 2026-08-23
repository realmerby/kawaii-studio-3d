'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { useGameStore } from '@/lib/store';
import { getPoseById } from '@/data/poses/posesList';
import { AccessoriesRenderer } from './AccessoriesRenderer';

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
  const chestBoneRef = useRef<THREE.Object3D | null>(null);
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

          // Rotate model to face the front camera directly
          loadedVrm.scene.rotation.y = 0;
          loadedVrm.scene.position.set(0, -0.85, 0);

          // Cache Bone Nodes
          const humanoid = loadedVrm.humanoid;
          if (humanoid) {
            headBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
            neckBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Neck);
            chestBoneRef.current = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Chest);
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

          // Hair Material Customization
          if (matName.includes('hair') || meshName.includes('hair')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(hairCol);
            }
          }

          // Eye & Iris Material Customization
          if (matName.includes('eye') || matName.includes('iris') || meshName.includes('eye')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(eyeCol);
            }
          }

          // Skin & Face Material Customization
          if (matName.includes('skin') || matName.includes('body') || matName.includes('face')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(skinCol);
            }
          }

          // Top Clothing Material Customization
          if (matName.includes('top') || matName.includes('shirt') || matName.includes('cloth')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(topCol);
            }
          }

          // Bottom / Skirt Material Customization
          if (matName.includes('bottom') || matName.includes('skirt') || matName.includes('pant')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(bottomCol);
            }
          }

          // Shoes Material Customization
          if (matName.includes('shoe') || matName.includes('foot')) {
            if ('color' in mat && mat.color instanceof THREE.Color) {
              mat.color.set(shoesCol);
            }
          }
        });
      }
    });
  }, [vrm, equipped, itemColors, colors]);

  // Real-time Bone Rigging, Spring Physics & Blendshape Poses
  useFrame(({ clock }, delta) => {
    if (!vrm) return;

    // Update spring bones for dynamic hair physics
    vrm.update(delta);

    const t = clock.getElapsedTime() * animationSpeed;
    const pose = getPoseById(poseId);
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

      // Facial Expression style
      if (faceFeatures.mouthStyle === 'open') {
        vrm.expressionManager.setValue('aa', 0.5);
        vrm.expressionManager.setValue('happy', 0.8);
      } else if (faceFeatures.mouthStyle === 'smile') {
        vrm.expressionManager.setValue('happy', 0.7);
        vrm.expressionManager.setValue('relaxed', 0.4);
      } else if (faceFeatures.mouthStyle === 'smirk') {
        vrm.expressionManager.setValue('surprised', 0.2);
        vrm.expressionManager.setValue('happy', 0.4);
      }

      vrm.expressionManager.update();
    }

    const idleHead = idleAnimation && pose.idleWiggle
      ? Math.sin(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.headAmplitude || 0.02)
      : 0;
    const idleHip = idleAnimation && pose.idleWiggle
      ? Math.cos(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.hipAmplitude || 0.02)
      : 0;

    // Head
    const headNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
    if (headNode) {
      headNode.rotation.set(
        pose.transforms.head[0],
        pose.transforms.head[1] + idleHead,
        pose.transforms.head[2]
      );
    }

    // Chest & Spine
    const chestNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Chest);
    if (chestNode) {
      chestNode.rotation.set(
        pose.transforms.torso[0],
        pose.transforms.torso[1],
        pose.transforms.torso[2]
      );
    }

    // Hips
    const hipsNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
    if (hipsNode) {
      hipsNode.rotation.set(
        pose.transforms.hips[0],
        pose.transforms.hips[1] + idleHip,
        pose.transforms.hips[2]
      );
    }

    // Left Arm
    const leftUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm);
    if (leftUpperArm) {
      leftUpperArm.rotation.set(
        pose.transforms.leftUpperArm[0],
        pose.transforms.leftUpperArm[1],
        pose.transforms.leftUpperArm[2] - 1.15
      );
    }

    const leftLowerArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftLowerArm);
    if (leftLowerArm) {
      leftLowerArm.rotation.set(
        pose.transforms.leftForearm[0],
        pose.transforms.leftForearm[1],
        pose.transforms.leftForearm[2]
      );
    }

    // Right Arm
    const rightUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm);
    if (rightUpperArm) {
      rightUpperArm.rotation.set(
        pose.transforms.rightUpperArm[0],
        pose.transforms.rightUpperArm[1],
        pose.transforms.rightUpperArm[2] + 1.15
      );
    }

    const rightLowerArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightLowerArm);
    if (rightLowerArm) {
      rightLowerArm.rotation.set(
        pose.transforms.rightForearm[0],
        pose.transforms.rightForearm[1],
        pose.transforms.rightForearm[2]
      );
    }

    // Left Leg
    const leftUpperLeg = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperLeg);
    if (leftUpperLeg) {
      leftUpperLeg.rotation.set(
        pose.transforms.leftUpperLeg[0],
        pose.transforms.leftUpperLeg[1],
        pose.transforms.leftUpperLeg[2]
      );
    }

    // Right Leg
    const rightUpperLeg = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperLeg);
    if (rightUpperLeg) {
      rightUpperLeg.rotation.set(
        pose.transforms.rightUpperLeg[0],
        pose.transforms.rightUpperLeg[1],
        pose.transforms.rightUpperLeg[2]
      );
    }
  });

  return (
    <group ref={groupRef}>
      {vrm && (
        <>
          <primitive object={vrm.scene} />

          {/* 3D Head Accessories mounted in front */}
          <group position={[0, 0.45, 0]}>
            <AccessoriesRenderer
              category="headAccessory"
              itemId={equipped.headAccessory}
              itemColors={itemColors}
            />
          </group>

          {/* 3D Bags mounted near hip */}
          <group position={[0, -0.15, 0]}>
            <AccessoriesRenderer
              category="bag"
              itemId={equipped.bag}
              itemColors={itemColors}
            />
          </group>

          {/* 3D Neck Accessories */}
          <group position={[0, 0.28, 0]}>
            <AccessoriesRenderer
              category="accessory"
              itemId={equipped.accessory}
              itemColors={itemColors}
            />
          </group>
        </>
      )}
    </group>
  );
}
