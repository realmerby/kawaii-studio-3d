'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM, VRMLoaderPlugin, VRMUtils, VRMHumanBoneName } from '@pixiv/three-vrm';
import { useGameStore } from '@/lib/store';
import { getPoseById } from '@/data/poses/posesList';

export function VRMCharacter() {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { poseId, idleAnimation, animationSpeed } = useGameStore();
  const groupRef = useRef<THREE.Group>(null);

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

          // Rotate model to face camera
          loadedVrm.scene.rotation.y = Math.PI;
          loadedVrm.scene.position.set(0, -0.85, 0);

          setVrm(loadedVrm);
        }
      },
      (progress) => {
        if (progress.total > 0) {
          setLoadingProgress(Math.round((progress.loaded / progress.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading VRM:', error);
      }
    );
  }, []);

  useFrame(({ clock }, delta) => {
    if (!vrm) return;

    // Update spring bones (hair and cloth physics)
    vrm.update(delta);

    const t = clock.getElapsedTime() * animationSpeed;
    const pose = getPoseById(poseId);
    const humanoid = vrm.humanoid;
    if (!humanoid) return;

    // Natural anime blink with expression manager
    if (vrm.expressionManager) {
      const blinkTime = t % 4;
      if (blinkTime < 0.2) {
        const blinkVal = Math.sin((blinkTime / 0.2) * Math.PI);
        vrm.expressionManager.setValue('blink', blinkVal);
      } else {
        vrm.expressionManager.setValue('blink', 0);
      }
      vrm.expressionManager.setValue('happy', 0.6);
      vrm.expressionManager.update();
    }

    const idleHead = idleAnimation && pose.idleWiggle
      ? Math.sin(t * (pose.idleWiggle.speed || 1.5)) * (pose.idleWiggle.headAmplitude || 0.02)
      : 0;

    // Apply Humanoid bone rotations from pose
    const headNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head);
    if (headNode) {
      headNode.rotation.set(
        pose.transforms.head[0],
        pose.transforms.head[1] + idleHead,
        pose.transforms.head[2]
      );
    }

    const chestNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Chest);
    if (chestNode) {
      chestNode.rotation.set(
        pose.transforms.torso[0],
        pose.transforms.torso[1],
        pose.transforms.torso[2]
      );
    }

    const hipsNode = humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips);
    if (hipsNode) {
      hipsNode.rotation.set(
        pose.transforms.hips[0],
        pose.transforms.hips[1],
        pose.transforms.hips[2]
      );
    }

    const leftUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm);
    if (leftUpperArm) {
      leftUpperArm.rotation.set(
        pose.transforms.leftUpperArm[0],
        pose.transforms.leftUpperArm[1],
        pose.transforms.leftUpperArm[2] - 1.1 // Adjust from T-pose to natural A-pose
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

    const rightUpperArm = humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm);
    if (rightUpperArm) {
      rightUpperArm.rotation.set(
        pose.transforms.rightUpperArm[0],
        pose.transforms.rightUpperArm[1],
        pose.transforms.rightUpperArm[2] + 1.1 // Adjust from T-pose to natural A-pose
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

    const leftUpperLeg = humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperLeg);
    if (leftUpperLeg) {
      leftUpperLeg.rotation.set(
        pose.transforms.leftUpperLeg[0],
        pose.transforms.leftUpperLeg[1],
        pose.transforms.leftUpperLeg[2]
      );
    }

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
      {vrm && <primitive object={vrm.scene} />}
    </group>
  );
}
