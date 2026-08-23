'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { useGameStore } from '@/lib/store';
import { CameraPreset } from '@/types/character';
import { getPoseById } from '@/data/poses/posesList';

const PRESET_CONFIGS: Record<CameraPreset, { target: [number, number, number]; position: [number, number, number] }> = {
  full: {
    target: [0, -0.05, 0],
    position: [0, 0.15, 2.35],
  },
  face: {
    target: [0, 0.48, 0],
    position: [0, 0.52, 0.95],
  },
  outfit: {
    target: [0, 0.05, 0],
    position: [0, 0.12, 1.5],
  },
  shoes: {
    target: [0, -0.65, 0],
    position: [0, -0.6, 1.1],
  },
};

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const cameraPreset = useGameStore((state) => state.cameraPreset);
  const cameraResetCount = useGameStore((state) => state.cameraResetCount);
  const poseId = useGameStore((state) => state.poseId);

  const targetLookAt = useRef(new THREE.Vector3(0, -0.05, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 0.15, 2.35));
  const isTransitioning = useRef(false);

  // Full camera preset transitions
  useEffect(() => {
    const config = PRESET_CONFIGS[cameraPreset] || PRESET_CONFIGS.full;
    const pose = getPoseById(poseId);
    const offsetY = cameraPreset === 'full' ? (pose.cameraSuggestion?.targetOffsetY || 0) : 0;

    targetLookAt.current.set(config.target[0], config.target[1] + offsetY, config.target[2]);
    targetCamPos.current.set(config.position[0], config.position[1] + offsetY, config.position[2]);
    isTransitioning.current = true;
  }, [cameraPreset, cameraResetCount]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      const lerpSpeed = 1 - Math.exp(-6 * delta);

      camera.position.lerp(targetCamPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);

      if (
        camera.position.distanceTo(targetCamPos.current) < 0.01 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.01
      ) {
        isTransitioning.current = false;
      }
    } else {
      const pose = getPoseById(poseId);
      const targetY = -0.05 + (cameraPreset === 'full' ? (pose.cameraSuggestion?.targetOffsetY || 0) : 0);
      controlsRef.current.target.y = THREE.MathUtils.lerp(controlsRef.current.target.y, targetY, 0.05);
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={0.7}
      maxDistance={4.2}
      minPolarAngle={Math.PI * 0.1}
      maxPolarAngle={Math.PI * 0.52}
      target={[0, -0.05, 0]}
      makeDefault
    />
  );
}
