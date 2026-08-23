'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/store';

export function ParticleEffects() {
  const sparkleCount = useGameStore((state) => state.sparkleCount);
  const particlesGroupRef = useRef<THREE.Group>(null);
  const burstGroupRef = useRef<THREE.Group>(null);
  const burstProgressRef = useRef(1);

  // Background floating ambient particles
  const floatingParticles = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 3.5 - 1,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.4,
      size: 0.025 + Math.random() * 0.035,
      phase: Math.random() * Math.PI * 2,
      color: ['#FF80AB', '#FF4081', '#EA80FC', '#B388FF', '#FFD180'][Math.floor(Math.random() * 5)],
    }));
  }, []);

  // Burst particles when clothing/pose changes
  const burstParticles = useMemo(() => {
    return Array.from({ length: 24 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 1.2 + Math.random() * 1.5;
      return {
        direction: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.cos(phi) * speed + 0.5,
          Math.sin(phi) * Math.sin(theta) * speed
        ),
        color: ['#FF69B4', '#FFB6C1', '#FBBF24', '#C084FC', '#FFFFFF'][Math.floor(Math.random() * 5)],
      };
    });
  }, []);

  const prevSparkleRef = useRef(sparkleCount);
  if (prevSparkleRef.current !== sparkleCount) {
    prevSparkleRef.current = sparkleCount;
    burstProgressRef.current = 0; // Trigger burst
  }

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Floating ambient particle movement
    if (particlesGroupRef.current) {
      particlesGroupRef.current.children.forEach((child, i) => {
        const p = floatingParticles[i];
        if (p) {
          child.position.y += Math.sin(t * p.speed + p.phase) * 0.003;
          child.rotation.z += 0.01;
          child.rotation.y += 0.008;
        }
      });
    }

    // Burst expansion
    if (burstProgressRef.current < 1) {
      burstProgressRef.current += delta * 2.2;
      const progress = Math.min(1, burstProgressRef.current);

      if (burstGroupRef.current) {
        burstGroupRef.current.children.forEach((child, i) => {
          const bp = burstParticles[i];
          if (bp) {
            const currentDist = progress * 1.4;
            child.position.x = bp.direction.x * currentDist;
            child.position.y = 0.2 + bp.direction.y * currentDist - progress * progress * 0.5;
            child.position.z = bp.direction.z * currentDist;

            const scale = Math.max(0, 1 - progress);
            child.scale.set(scale, scale, scale);
          }
        });
      }
    }
  });

  return (
    <group>
      {/* 1. Ambient Floating Kawaii Sparkles & Stars */}
      <group ref={particlesGroupRef}>
        {floatingParticles.map((p, i) => (
          <mesh key={i} position={p.position}>
            <octahedronGeometry args={[p.size, 0]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.65} />
          </mesh>
        ))}
      </group>

      {/* 2. Burst Sparkle Ring on Outfit Changes */}
      <group ref={burstGroupRef} position={[0, 0, 0]}>
        {burstParticles.map((bp, i) => (
          <mesh key={`burst-${i}`} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.04, 0]} />
            <meshBasicMaterial color={bp.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
