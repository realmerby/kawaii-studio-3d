'use client';

import React from 'react';
import * as THREE from 'three';
import { CharacterModel } from '@/components/character/CharacterModel';
import { CameraController } from './CameraController';
import { ParticleEffects } from './ParticleEffects';

export function StudioScene() {
  return (
    <>
      {/* Anime Studio Lighting Setup (Warm, Soft, Cel-style) */}
      <ambientLight intensity={1.35} color="#FFF5F8" />

      {/* Warm Front Key Light */}
      <directionalLight
        position={[2.5, 4.5, 4.5]}
        intensity={2.0}
        color="#FFFBF5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Pastel Soft Fill Light */}
      <directionalLight position={[-3, 2.5, 3]} intensity={1.2} color="#FCE7F3" />

      {/* Glowing Anime Rim Backlight (Provides luminous hair highlights & edge separation) */}
      <directionalLight position={[0, 4.5, -4]} intensity={2.2} color="#FF94B8" />

      {/* Low Ground Reflection */}
      <directionalLight position={[0, -2, 2]} intensity={0.5} color="#FFE4E8" />

      {/* 3D Soft Pastel Backdrop */}
      <mesh position={[0, 0, -3.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[18, 14]} />
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
