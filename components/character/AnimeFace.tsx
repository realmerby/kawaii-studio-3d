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
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const blinkTimerRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const blinkProgressRef = useRef(0);

  useFrame((_, delta) => {
    blinkTimerRef.current += delta;

    // Trigger blink every ~3.5 to 5 seconds
    if (!isBlinkingRef.current && blinkTimerRef.current > 3.8) {
      if (Math.random() > 0.25) {
        isBlinkingRef.current = true;
        blinkProgressRef.current = 0;
      }
      blinkTimerRef.current = 0;
    }

    if (isBlinkingRef.current) {
      blinkProgressRef.current += delta * 12; // Fast anime blink
      const scaleY = Math.max(0.08, Math.abs(Math.cos(blinkProgressRef.current * Math.PI)));

      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = scaleY;
        rightEyeRef.current.scale.y = scaleY;
      }

      if (blinkProgressRef.current >= 1) {
        isBlinkingRef.current = false;
        if (leftEyeRef.current && rightEyeRef.current) {
          leftEyeRef.current.scale.y = 1;
          rightEyeRef.current.scale.y = 1;
        }
      }
    }
  });

  const { eyeStyle, eyebrowStyle, mouthStyle, blushStyle, earrings } = faceFeatures;

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. ANIME EYES                                                */}
      {/* ============================================================ */}
      <group position={[0, 0.05, 0.32]}>
        {/* Left Eye */}
        <group ref={leftEyeRef} position={[-0.135, 0, 0]} rotation={[-0.05, -0.1, 0.04]}>
          {/* Eyeball Base (White Sclera) */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.078, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>

          {/* Iris */}
          <mesh position={[0.005, 0, 0.065]}>
            <circleGeometry args={[0.054, 32]} />
            <meshStandardMaterial
              color={colors.eyeColor}
              emissive={colors.eyeColor}
              emissiveIntensity={0.25}
              roughness={0.1}
            />
          </mesh>

          {/* Pupil */}
          <mesh position={[0.005, 0.005, 0.067]}>
            <circleGeometry args={[0.026, 24]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>

          {/* Highlights based on Eye Style */}
          {eyeStyle === 'sparkle' && (
            <>
              <mesh position={[0.02, 0.022, 0.07]}>
                <circleGeometry args={[0.016, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.015, -0.02, 0.07]}>
                <circleGeometry args={[0.009, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0.025, -0.015, 0.07]}>
                <circleGeometry args={[0.006, 12]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {eyeStyle === 'heart' && (
            <>
              <mesh position={[0.015, 0.018, 0.07]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.018, 0.018, 0.002]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.015, -0.018, 0.07]}>
                <circleGeometry args={[0.008, 12]} />
                <meshBasicMaterial color="#FFB6C1" />
              </mesh>
            </>
          )}

          {eyeStyle === 'cateye' && (
            <>
              <mesh position={[0.022, 0.025, 0.07]}>
                <circleGeometry args={[0.018, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.01, -0.025, 0.07]}>
                <circleGeometry args={[0.007, 12]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {eyeStyle === 'soft' && (
            <>
              <mesh position={[0.012, 0.02, 0.07]}>
                <circleGeometry args={[0.019, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {/* Eyelash & Winged Liner */}
          <mesh position={[0, 0.052, 0.066]} rotation={[0, 0, eyeStyle === 'cateye' ? -0.1 : -0.05]}>
            <boxGeometry args={[0.115, 0.018, 0.02]} />
            <meshStandardMaterial color="#2E1065" roughness={0.5} />
          </mesh>
          {/* Wing Tip */}
          <mesh
            position={[-0.058, eyeStyle === 'cateye' ? 0.07 : 0.06, 0.06]}
            rotation={[0, 0, eyeStyle === 'cateye' ? 0.6 : 0.4]}
          >
            <boxGeometry args={[eyeStyle === 'cateye' ? 0.045 : 0.035, 0.014, 0.02]} />
            <meshStandardMaterial color="#2E1065" roughness={0.5} />
          </mesh>
        </group>

        {/* Right Eye */}
        <group ref={rightEyeRef} position={[0.135, 0, 0]} rotation={[-0.05, 0.1, -0.04]}>
          {/* Eyeball Base */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.078, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>

          {/* Iris */}
          <mesh position={[-0.005, 0, 0.065]}>
            <circleGeometry args={[0.054, 32]} />
            <meshStandardMaterial
              color={colors.eyeColor}
              emissive={colors.eyeColor}
              emissiveIntensity={0.25}
              roughness={0.1}
            />
          </mesh>

          {/* Pupil */}
          <mesh position={[-0.005, 0.005, 0.067]}>
            <circleGeometry args={[0.026, 24]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>

          {/* Highlights */}
          {eyeStyle === 'sparkle' && (
            <>
              <mesh position={[0.008, 0.022, 0.07]}>
                <circleGeometry args={[0.016, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.022, -0.02, 0.07]}>
                <circleGeometry args={[0.009, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0.015, -0.015, 0.07]}>
                <circleGeometry args={[0.006, 12]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {eyeStyle === 'heart' && (
            <>
              <mesh position={[0.008, 0.018, 0.07]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.018, 0.018, 0.002]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.02, -0.018, 0.07]}>
                <circleGeometry args={[0.008, 12]} />
                <meshBasicMaterial color="#FFB6C1" />
              </mesh>
            </>
          )}

          {eyeStyle === 'cateye' && (
            <>
              <mesh position={[0.01, 0.025, 0.07]}>
                <circleGeometry args={[0.018, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[-0.02, -0.025, 0.07]}>
                <circleGeometry args={[0.007, 12]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {eyeStyle === 'soft' && (
            <>
              <mesh position={[0.005, 0.02, 0.07]}>
                <circleGeometry args={[0.019, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </>
          )}

          {/* Eyelash & Winged Liner */}
          <mesh position={[0, 0.052, 0.066]} rotation={[0, 0, eyeStyle === 'cateye' ? 0.1 : 0.05]}>
            <boxGeometry args={[0.115, 0.018, 0.02]} />
            <meshStandardMaterial color="#2E1065" roughness={0.5} />
          </mesh>
          {/* Wing Tip */}
          <mesh
            position={[0.058, eyeStyle === 'cateye' ? 0.07 : 0.06, 0.06]}
            rotation={[0, 0, eyeStyle === 'cateye' ? -0.6 : -0.4]}
          >
            <boxGeometry args={[eyeStyle === 'cateye' ? 0.045 : 0.035, 0.014, 0.02]} />
            <meshStandardMaterial color="#2E1065" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 2. EYEBROWS                                                  */}
      {/* ============================================================ */}
      <group position={[0, 0.14, 0.36]}>
        {eyebrowStyle === 'gentle' && (
          <>
            <mesh position={[-0.13, 0, 0]} rotation={[0, 0, -0.08]}>
              <boxGeometry args={[0.075, 0.009, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
            <mesh position={[0.13, 0, 0]} rotation={[0, 0, 0.08]}>
              <boxGeometry args={[0.075, 0.009, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'straight' && (
          <>
            <mesh position={[-0.13, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
            <mesh position={[0.13, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'confident' && (
          <>
            <mesh position={[-0.13, 0.01, 0]} rotation={[0, 0, -0.22]}>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
            <mesh position={[0.13, 0.01, 0]} rotation={[0, 0, 0.22]}>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
          </>
        )}

        {eyebrowStyle === 'playful' && (
          <>
            <mesh position={[-0.13, 0.02, 0]} rotation={[0, 0, 0.12]}>
              <boxGeometry args={[0.075, 0.009, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
            <mesh position={[0.13, 0.01, 0]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.075, 0.009, 0.01]} />
              <meshStandardMaterial color={colors.hairColor} roughness={0.4} />
            </mesh>
          </>
        )}
      </group>

      {/* ============================================================ */}
      {/* 3. BLUSH STYLES                                              */}
      {/* ============================================================ */}
      <group position={[0, -0.01, 0.36]}>
        {/* Left Blush */}
        <mesh position={[-0.17, -0.02, 0]} rotation={[0, -0.2, 0]}>
          <circleGeometry args={[blushStyle === 'rosy' ? 0.06 : 0.045, 16]} />
          <meshBasicMaterial
            color={blushStyle === 'peachy' ? '#FF7A59' : '#FF4D8D'}
            transparent
            opacity={colors.blushIntensity * 0.45}
            depthWrite={false}
          />
        </mesh>
        {blushStyle === 'sparkles' && (
          <mesh position={[-0.17, -0.01, 0.002]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[0.035, 0.004]} />
            <meshBasicMaterial color="#FF1493" transparent opacity={0.6} />
          </mesh>
        )}

        {/* Right Blush */}
        <mesh position={[0.17, -0.02, 0]} rotation={[0, 0.2, 0]}>
          <circleGeometry args={[blushStyle === 'rosy' ? 0.06 : 0.045, 16]} />
          <meshBasicMaterial
            color={blushStyle === 'peachy' ? '#FF7A59' : '#FF4D8D'}
            transparent
            opacity={colors.blushIntensity * 0.45}
            depthWrite={false}
          />
        </mesh>
        {blushStyle === 'sparkles' && (
          <mesh position={[0.17, -0.01, 0.002]} rotation={[0, 0, -0.3]}>
            <planeGeometry args={[0.035, 0.004]} />
            <meshBasicMaterial color="#FF1493" transparent opacity={0.6} />
          </mesh>
        )}
      </group>

      {/* ============================================================ */}
      {/* 4. ANIME NOSE                                                */}
      {/* ============================================================ */}
      <mesh position={[0, 0.01, 0.39]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshStandardMaterial color={colors.skinTone} roughness={0.3} />
      </mesh>

      {/* ============================================================ */}
      {/* 5. MOUTH & SMILE STYLES                                      */}
      {/* ============================================================ */}
      <group position={[0, -0.09, 0.36]}>
        {mouthStyle === 'smile' && (
          <group>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.026, 0.006, 8, 16, Math.PI]} />
              <meshStandardMaterial color={colors.lipColor} roughness={0.2} />
            </mesh>
            <mesh position={[0.008, -0.008, 0.005]}>
              <sphereGeometry args={[0.005, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        )}

        {mouthStyle === 'open' && (
          <group>
            <mesh position={[0, -0.005, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshStandardMaterial color="#E11D48" roughness={0.3} />
            </mesh>
            {/* Teeth line */}
            <mesh position={[0, 0.008, 0.002]}>
              <boxGeometry args={[0.032, 0.008, 0.002]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        )}

        {mouthStyle === 'catpout' && (
          <group>
            {/* :3 Cat Lip Wave */}
            <mesh position={[-0.014, 0, 0]} rotation={[0, 0, Math.PI * 0.8]}>
              <torusGeometry args={[0.014, 0.005, 8, 12, Math.PI * 0.9]} />
              <meshStandardMaterial color={colors.lipColor} roughness={0.2} />
            </mesh>
            <mesh position={[0.014, 0, 0]} rotation={[0, 0, Math.PI * 0.2]}>
              <torusGeometry args={[0.014, 0.005, 8, 12, Math.PI * 0.9]} />
              <meshStandardMaterial color={colors.lipColor} roughness={0.2} />
            </mesh>
          </group>
        )}

        {mouthStyle === 'smirk' && (
          <group>
            <mesh position={[0.01, 0, 0]} rotation={[0, 0, Math.PI * 1.1]}>
              <torusGeometry args={[0.028, 0.006, 8, 16, Math.PI * 0.8]} />
              <meshStandardMaterial color={colors.lipColor} roughness={0.2} />
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
