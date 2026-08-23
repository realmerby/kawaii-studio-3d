'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterColors, CharacterFaceFeatures } from '@/types/character';

interface AnimeFaceProps {
  colors: CharacterColors;
  faceFeatures?: CharacterFaceFeatures;
}

export function AnimeFace({
  colors,
  faceFeatures = {
    eyeStyle: 'sparkle',
    eyebrowStyle: 'gentle',
    mouthStyle: 'smile',
    blushStyle: 'sparkles',
    earrings: 'heart_studs',
  },
}: AnimeFaceProps) {
  const leftEyeGroupRef = useRef<THREE.Group>(null);
  const rightEyeGroupRef = useRef<THREE.Group>(null);
  const blinkTimerRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const blinkProgressRef = useRef(0);

  useFrame((_, delta) => {
    blinkTimerRef.current += delta;

    // Natural anime blink cycle
    if (!isBlinkingRef.current && blinkTimerRef.current > 3.5) {
      if (Math.random() > 0.3) {
        isBlinkingRef.current = true;
        blinkProgressRef.current = 0;
      }
      blinkTimerRef.current = 0;
    }

    if (isBlinkingRef.current) {
      blinkProgressRef.current += delta * 14;
      const scaleY = Math.max(0.05, Math.abs(Math.cos(blinkProgressRef.current * Math.PI)));

      if (leftEyeGroupRef.current && rightEyeGroupRef.current) {
        leftEyeGroupRef.current.scale.y = scaleY;
        rightEyeGroupRef.current.scale.y = scaleY;
      }

      if (blinkProgressRef.current >= 1) {
        isBlinkingRef.current = false;
        if (leftEyeGroupRef.current && rightEyeGroupRef.current) {
          leftEyeGroupRef.current.scale.y = 1;
          rightEyeGroupRef.current.scale.y = 1;
        }
      }
    }
  });

  const { eyeStyle, eyebrowStyle, mouthStyle, blushStyle, earrings } = faceFeatures;
  const eyeCol = colors.eyeColor || '#9333EA';

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. ANIME EYES (Expressive VRoid/CustomCast 3D Eye Sockets)    */}
      {/* ============================================================ */}
      <group position={[0, 0.04, 0.335]}>
        {/* LEFT EYE */}
        <group
          ref={leftEyeGroupRef}
          position={[-0.125, 0.02, 0]}
          rotation={[-0.03, -0.15, 0.02]}
        >
          {/* Eye White Base (Sclera) with Soft Shadow */}
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.075, 32]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.02, 0.001]}>
            <planeGeometry args={[0.13, 0.035]} />
            <meshBasicMaterial color="#E2E8F0" transparent opacity={0.35} depthWrite={false} />
          </mesh>

          {/* Large Stylized Anime Iris */}
          <group position={[0.006, -0.005, 0.002]}>
            {/* Base Deep Iris */}
            <mesh>
              <circleGeometry args={[0.058, 32]} />
              <meshBasicMaterial color={eyeCol} />
            </mesh>

            {/* Iris Lower Gradient Glow */}
            <mesh position={[0, -0.018, 0.001]}>
              <circleGeometry args={[0.042, 32]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.45} depthWrite={false} />
            </mesh>

            {/* Pupil */}
            <mesh position={[0, 0.006, 0.002]}>
              <circleGeometry args={[0.024, 32]} />
              <meshBasicMaterial color="#18181B" />
            </mesh>

            {/* Anime Light Highlights (Sparkle Reflections) */}
            {eyeStyle === 'sparkle' && (
              <>
                {/* Main Upper Highlight */}
                <mesh position={[0.02, 0.022, 0.004]}>
                  <circleGeometry args={[0.016, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                {/* Lower Secondary Sparkle */}
                <mesh position={[-0.016, -0.02, 0.004]}>
                  <circleGeometry args={[0.01, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                {/* Micro Glint */}
                <mesh position={[0.024, -0.012, 0.004]}>
                  <circleGeometry args={[0.006, 12]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}

            {eyeStyle === 'heart' && (
              <>
                <mesh position={[0.012, 0.016, 0.004]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.022, 0.022, 0.002]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[-0.016, -0.018, 0.004]}>
                  <circleGeometry args={[0.008, 12]} />
                  <meshBasicMaterial color="#FFB6C1" />
                </mesh>
              </>
            )}

            {eyeStyle === 'cateye' && (
              <>
                <mesh position={[0.022, 0.024, 0.004]}>
                  <circleGeometry args={[0.018, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[-0.012, -0.024, 0.004]}>
                  <circleGeometry args={[0.007, 12]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}

            {eyeStyle === 'soft' && (
              <>
                <mesh position={[0.01, 0.02, 0.004]}>
                  <circleGeometry args={[0.02, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}
          </group>

          {/* Upper Thick Eyelash Arch */}
          <group position={[0, 0.055, 0.005]} rotation={[0, 0, -0.04]}>
            <mesh>
              <boxGeometry args={[0.13, 0.02, 0.008]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            {/* Winged Lash Tip */}
            <mesh
              position={[-0.065, eyeStyle === 'cateye' ? 0.02 : 0.012, 0]}
              rotation={[0, 0, eyeStyle === 'cateye' ? 0.7 : 0.45]}
            >
              <boxGeometry args={[0.045, 0.014, 0.008]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            {/* Cute Double Lash Spikes */}
            <mesh position={[-0.035, 0.012, 0]} rotation={[0, 0, 0.25]}>
              <coneGeometry args={[0.007, 0.025, 8]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            <mesh position={[0.025, 0.01, 0]} rotation={[0, 0, -0.2]}>
              <coneGeometry args={[0.006, 0.02, 8]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
          </group>

          {/* Lower Eyelash Accent */}
          <mesh position={[0.01, -0.065, 0.003]}>
            <boxGeometry args={[0.06, 0.007, 0.005]} />
            <meshBasicMaterial color="#312E81" />
          </mesh>
        </group>

        {/* RIGHT EYE */}
        <group
          ref={rightEyeGroupRef}
          position={[0.125, 0.02, 0]}
          rotation={[-0.03, 0.15, -0.02]}
        >
          {/* Eye White Base */}
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.075, 32]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.02, 0.001]}>
            <planeGeometry args={[0.13, 0.035]} />
            <meshBasicMaterial color="#E2E8F0" transparent opacity={0.35} depthWrite={false} />
          </mesh>

          {/* Large Stylized Anime Iris */}
          <group position={[-0.006, -0.005, 0.002]}>
            <mesh>
              <circleGeometry args={[0.058, 32]} />
              <meshBasicMaterial color={eyeCol} />
            </mesh>

            {/* Iris Lower Glow */}
            <mesh position={[0, -0.018, 0.001]}>
              <circleGeometry args={[0.042, 32]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.45} depthWrite={false} />
            </mesh>

            {/* Pupil */}
            <mesh position={[0, 0.006, 0.002]}>
              <circleGeometry args={[0.024, 32]} />
              <meshBasicMaterial color="#18181B" />
            </mesh>

            {/* Highlights */}
            {eyeStyle === 'sparkle' && (
              <>
                <mesh position={[0.008, 0.022, 0.004]}>
                  <circleGeometry args={[0.016, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[-0.022, -0.02, 0.004]}>
                  <circleGeometry args={[0.01, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[0.016, -0.012, 0.004]}>
                  <circleGeometry args={[0.006, 12]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}

            {eyeStyle === 'heart' && (
              <>
                <mesh position={[0.008, 0.016, 0.004]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.022, 0.022, 0.002]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[-0.018, -0.018, 0.004]}>
                  <circleGeometry args={[0.008, 12]} />
                  <meshBasicMaterial color="#FFB6C1" />
                </mesh>
              </>
            )}

            {eyeStyle === 'cateye' && (
              <>
                <mesh position={[0.01, 0.024, 0.004]}>
                  <circleGeometry args={[0.018, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                <mesh position={[-0.022, -0.024, 0.004]}>
                  <circleGeometry args={[0.007, 12]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}

            {eyeStyle === 'soft' && (
              <>
                <mesh position={[0.005, 0.02, 0.004]}>
                  <circleGeometry args={[0.02, 16]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </>
            )}
          </group>

          {/* Upper Thick Eyelash Arch */}
          <group position={[0, 0.055, 0.005]} rotation={[0, 0, 0.04]}>
            <mesh>
              <boxGeometry args={[0.13, 0.02, 0.008]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            {/* Winged Lash Tip */}
            <mesh
              position={[0.065, eyeStyle === 'cateye' ? 0.02 : 0.012, 0]}
              rotation={[0, 0, eyeStyle === 'cateye' ? -0.7 : -0.45]}
            >
              <boxGeometry args={[0.045, 0.014, 0.008]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            {/* Cute Double Lash Spikes */}
            <mesh position={[0.035, 0.012, 0]} rotation={[0, 0, -0.25]}>
              <coneGeometry args={[0.007, 0.025, 8]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
            <mesh position={[-0.025, 0.01, 0]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.006, 0.02, 8]} />
              <meshBasicMaterial color="#1E1B4B" />
            </mesh>
          </group>

          {/* Lower Eyelash Accent */}
          <mesh position={[-0.01, -0.065, 0.003]}>
            <boxGeometry args={[0.06, 0.007, 0.005]} />
            <meshBasicMaterial color="#312E81" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 2. EYEBROWS                                                  */}
      {/* ============================================================ */}
      <group position={[0, 0.16, 0.355]}>
        {eyebrowStyle === 'gentle' && (
          <>
            <mesh position={[-0.125, 0, 0]} rotation={[0, -0.15, -0.08]}>
              <boxGeometry args={[0.085, 0.012, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
            <mesh position={[0.125, 0, 0]} rotation={[0, 0.15, 0.08]}>
              <boxGeometry args={[0.085, 0.012, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'straight' && (
          <>
            <mesh position={[-0.125, 0, 0]} rotation={[0, -0.15, 0]}>
              <boxGeometry args={[0.09, 0.013, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
            <mesh position={[0.125, 0, 0]} rotation={[0, 0.15, 0]}>
              <boxGeometry args={[0.09, 0.013, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'confident' && (
          <>
            <mesh position={[-0.125, 0.01, 0]} rotation={[0, -0.15, -0.22]}>
              <boxGeometry args={[0.09, 0.013, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
            <mesh position={[0.125, 0.01, 0]} rotation={[0, 0.15, 0.22]}>
              <boxGeometry args={[0.09, 0.013, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'playful' && (
          <>
            <mesh position={[-0.125, 0.02, 0]} rotation={[0, -0.15, 0.12]}>
              <boxGeometry args={[0.085, 0.012, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
            <mesh position={[0.125, 0.01, 0]} rotation={[0, 0.15, 0.08]}>
              <boxGeometry args={[0.085, 0.012, 0.01]} />
              <meshBasicMaterial color={colors.hairColor} />
            </mesh>
          </>
        )}
      </group>

      {/* ============================================================ */}
      {/* 3. SOFT ANIME NOSE                                           */}
      {/* ============================================================ */}
      <group position={[0, -0.015, 0.38]}>
        <mesh>
          <sphereGeometry args={[0.014, 16, 16]} />
          <meshStandardMaterial color={colors.skinTone} roughness={0.4} />
        </mesh>
        {/* Subtle Nose Shadow Accent */}
        <mesh position={[0, -0.01, 0.002]}>
          <circleGeometry args={[0.008, 12]} />
          <meshBasicMaterial color="#E2A89C" transparent opacity={0.35} depthWrite={false} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 4. BLUSHING CHEEKS                                           */}
      {/* ============================================================ */}
      <group position={[0, -0.04, 0.36]}>
        {/* Left Cheek Blush */}
        <group position={[-0.165, 0, 0]} rotation={[0, -0.3, 0]}>
          <mesh>
            <circleGeometry args={[blushStyle === 'rosy' ? 0.065 : 0.052, 24]} />
            <meshBasicMaterial
              color={blushStyle === 'peachy' ? '#FF7A59' : '#FF4081'}
              transparent
              opacity={(colors.blushIntensity || 0.85) * 0.45}
              depthWrite={false}
            />
          </mesh>
          {blushStyle === 'sparkles' && (
            <>
              <mesh position={[-0.015, 0.01, 0.002]} rotation={[0, 0, 0.35]}>
                <planeGeometry args={[0.035, 0.005]} />
                <meshBasicMaterial color="#FF1493" transparent opacity={0.7} />
              </mesh>
              <mesh position={[0.01, -0.01, 0.002]} rotation={[0, 0, 0.35]}>
                <planeGeometry args={[0.03, 0.005]} />
                <meshBasicMaterial color="#FF1493" transparent opacity={0.7} />
              </mesh>
            </>
          )}
        </group>

        {/* Right Cheek Blush */}
        <group position={[0.165, 0, 0]} rotation={[0, 0.3, 0]}>
          <mesh>
            <circleGeometry args={[blushStyle === 'rosy' ? 0.065 : 0.052, 24]} />
            <meshBasicMaterial
              color={blushStyle === 'peachy' ? '#FF7A59' : '#FF4081'}
              transparent
              opacity={(colors.blushIntensity || 0.85) * 0.45}
              depthWrite={false}
            />
          </mesh>
          {blushStyle === 'sparkles' && (
            <>
              <mesh position={[0.015, 0.01, 0.002]} rotation={[0, 0, -0.35]}>
                <planeGeometry args={[0.035, 0.005]} />
                <meshBasicMaterial color="#FF1493" transparent opacity={0.7} />
              </mesh>
              <mesh position={[-0.01, -0.01, 0.002]} rotation={[0, 0, -0.35]}>
                <planeGeometry args={[0.03, 0.005]} />
                <meshBasicMaterial color="#FF1493" transparent opacity={0.7} />
              </mesh>
            </>
          )}
        </group>
      </group>

      {/* ============================================================ */}
      {/* 5. ANIME MOUTH & LIPS                                        */}
      {/* ============================================================ */}
      <group position={[0, -0.11, 0.365]}>
        {mouthStyle === 'smile' && (
          <group>
            {/* Cute curved upper smile line */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.028, 0.006, 8, 20, Math.PI * 0.9]} />
              <meshBasicMaterial color="#BE185D" />
            </mesh>
            {/* Lip Gloss Highlight */}
            <mesh position={[0.008, -0.008, 0.004]}>
              <sphereGeometry args={[0.005, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        )}

        {mouthStyle === 'open' && (
          <group position={[0, -0.005, 0]}>
            {/* Open Happy Mouth cavity */}
            <mesh>
              <circleGeometry args={[0.026, 20]} />
              <meshBasicMaterial color="#881337" />
            </mesh>
            {/* Cute White Top Teeth */}
            <mesh position={[0, 0.01, 0.002]}>
              <boxGeometry args={[0.034, 0.01, 0.002]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            {/* Cute Pink Tongue */}
            <mesh position={[0, -0.01, 0.002]}>
              <circleGeometry args={[0.016, 16]} />
              <meshBasicMaterial color="#FB7185" />
            </mesh>
          </group>
        )}

        {mouthStyle === 'catpout' && (
          <group position={[0, 0, 0]}>
            {/* :3 Cat Lip Curve */}
            <mesh position={[-0.015, 0, 0]} rotation={[0, 0, Math.PI * 0.85]}>
              <torusGeometry args={[0.016, 0.005, 8, 14, Math.PI * 0.9]} />
              <meshBasicMaterial color="#BE185D" />
            </mesh>
            <mesh position={[0.015, 0, 0]} rotation={[0, 0, Math.PI * 0.15]}>
              <torusGeometry args={[0.016, 0.005, 8, 14, Math.PI * 0.9]} />
              <meshBasicMaterial color="#BE185D" />
            </mesh>
          </group>
        )}

        {mouthStyle === 'smirk' && (
          <group position={[0.008, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI * 1.1]}>
              <torusGeometry args={[0.03, 0.006, 8, 20, Math.PI * 0.85]} />
              <meshBasicMaterial color="#BE185D" />
            </mesh>
          </group>
        )}
      </group>

      {/* ============================================================ */}
      {/* 6. EARRINGS                                                  */}
      {/* ============================================================ */}
      {earrings !== 'none' && (
        <group position={[0, -0.06, 0]}>
          {/* Left Earring */}
          <group position={[-0.37, 0, 0]}>
            {earrings === 'heart_studs' && (
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.04, 0.04, 0.02]} />
                <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.4} />
              </mesh>
            )}
            {earrings === 'pearl_drops' && (
              <group position={[0, -0.04, 0]}>
                <mesh position={[0, 0.03, 0]}>
                  <cylinderGeometry args={[0.004, 0.004, 0.04, 6]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.024, 12, 12]} />
                  <meshStandardMaterial color="#FFF5F8" roughness={0.1} metalness={0.1} />
                </mesh>
              </group>
            )}
            {earrings === 'star_dangles' && (
              <group position={[0, -0.04, 0]}>
                <mesh position={[0, 0.03, 0]}>
                  <cylinderGeometry args={[0.004, 0.004, 0.04, 6]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.035, 0.035, 0.01]} />
                  <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={0.4} metalness={0.7} />
                </mesh>
              </group>
            )}
            {earrings === 'gold_hoops' && (
              <mesh position={[0, -0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.03, 0.006, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
            )}
          </group>

          {/* Right Earring */}
          <group position={[0.37, 0, 0]}>
            {earrings === 'heart_studs' && (
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.04, 0.04, 0.02]} />
                <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.4} />
              </mesh>
            )}
            {earrings === 'pearl_drops' && (
              <group position={[0, -0.04, 0]}>
                <mesh position={[0, 0.03, 0]}>
                  <cylinderGeometry args={[0.004, 0.004, 0.04, 6]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.024, 12, 12]} />
                  <meshStandardMaterial color="#FFF5F8" roughness={0.1} metalness={0.1} />
                </mesh>
              </group>
            )}
            {earrings === 'star_dangles' && (
              <group position={[0, -0.04, 0]}>
                <mesh position={[0, 0.03, 0]}>
                  <cylinderGeometry args={[0.004, 0.004, 0.04, 6]} />
                  <meshStandardMaterial color="#FBBF24" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.035, 0.035, 0.01]} />
                  <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={0.4} metalness={0.7} />
                </mesh>
              </group>
            )}
            {earrings === 'gold_hoops' && (
              <mesh position={[0, -0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.03, 0.006, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.1} />
              </mesh>
            )}
          </group>
        </group>
      )}
    </group>
  );
}
