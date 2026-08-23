'use client';

import React from 'react';
import * as THREE from 'three';
import { CharacterModel } from '@/components/character/CharacterModel';
import { CameraController } from './CameraController';
import { ParticleEffects } from './ParticleEffects';

export function StudioScene() {
  return (
    <>
      {/* Anime Studio Lighting Setup */}
      <ambientLight intensity={1.25} color="#FFF0F5" />

      {/* Warm Key Light */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.8}
        color="#FFF9F0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Pastel Fill Light */}
      <directionalLight position={[-3, 2, 3]} intensity={1.1} color="#FCE7F3" />

      {/* Anime Rim Light (Backlight for shiny hair and edges) */}
      <directionalLight position={[0, 4, -4]} intensity={1.6} color="#FF80AB" />

      {/* Low Ground Fill */}
      <directionalLight position={[0, -2, 2]} intensity={0.4} color="#FFE4E6" />

      {/* 3D Curved Pastel Backdrop Cyclorama */}
      <mesh position={[0, 0, -3.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshBasicMaterial color="#FFE4EC" side={THREE.DoubleSide} />
      </mesh>

      {/* Floating 3D Sparkles & Particles */}
      <ParticleEffects />

      {/* The 3D Anime Character */}
      <CharacterModel />

      {/* Camera & Orbit Controls */}
      <CameraController />
    </>
  );
}
