'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterColors, CharacterFaceFeatures } from '@/types/character';

interface AnimeFaceTextureProps {
  colors: CharacterColors;
  faceFeatures?: CharacterFaceFeatures;
}

/**
 * Generates an ultra high-definition (1024x1024) VRoid/CustomCast style
 * anime face texture canvas mapped onto the character's head geometry.
 */
export function AnimeFace({
  colors,
  faceFeatures = {
    eyeStyle: 'sparkle',
    eyebrowStyle: 'gentle',
    mouthStyle: 'smile',
    blushStyle: 'sparkles',
    earrings: 'heart_studs',
  },
}: AnimeFaceTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const blinkTimerRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const blinkProgressRef = useRef(0);

  const { eyeStyle, eyebrowStyle, mouthStyle, blushStyle, earrings } = faceFeatures;
  const eyeColor = colors.eyeColor || '#9333EA';
  const hairColor = colors.hairColor || '#18181B';
  const skinTone = colors.skinTone || '#FFF8F5';
  const blushIntensity = colors.blushIntensity ?? 0.85;

  // Create high-res canvas texture once
  const { canvas, texture } = useMemo(() => {
    const c = typeof document !== 'undefined' ? document.createElement('canvas') : null;
    if (c) {
      c.width = 1024;
      c.height = 1024;
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      return { canvas: c, texture: tex };
    }
    return { canvas: null, texture: null };
  }, []);

  useEffect(() => {
    canvasRef.current = canvas;
    textureRef.current = texture;
  }, [canvas, texture]);

  // Draw authentic VRoid/CustomCast anime face
  const drawFace = (eyeOpenRatio: number = 1.0) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1024, 1024);

    // Fill Base Skin
    ctx.fillStyle = skinTone;
    ctx.fillRect(0, 0, 1024, 1024);

    // Soft Skin Ambient Gradient / Soft Chin Shadow
    const skinGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
    skinGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    skinGrad.addColorStop(1, 'rgba(254, 215, 215, 0.35)');
    ctx.fillStyle = skinGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // ==========================================
    // 1. SOFT AIRBRUSH BLUSH
    // ==========================================
    const blushAlpha = Math.min(0.85, blushIntensity * 0.55);
    const blushPink = blushStyle === 'peachy' ? '255, 120, 100' : '255, 75, 130';

    // Left Cheek
    const leftBlushGrad = ctx.createRadialGradient(320, 560, 10, 320, 560, 110);
    leftBlushGrad.addColorStop(0, `rgba(${blushPink}, ${blushAlpha})`);
    leftBlushGrad.addColorStop(0.6, `rgba(${blushPink}, ${blushAlpha * 0.4})`);
    leftBlushGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = leftBlushGrad;
    ctx.beginPath();
    ctx.arc(320, 560, 110, 0, Math.PI * 2);
    ctx.fill();

    // Right Cheek
    const rightBlushGrad = ctx.createRadialGradient(704, 560, 10, 704, 560, 110);
    rightBlushGrad.addColorStop(0, `rgba(${blushPink}, ${blushAlpha})`);
    rightBlushGrad.addColorStop(0.6, `rgba(${blushPink}, ${blushAlpha * 0.4})`);
    rightBlushGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = rightBlushGrad;
    ctx.beginPath();
    ctx.arc(704, 560, 110, 0, Math.PI * 2);
    ctx.fill();

    // Cute Anime Blush Stripes / Sparkles
    if (blushStyle === 'sparkles') {
      ctx.strokeStyle = `rgba(255, 20, 147, ${blushAlpha * 1.2})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      // Left Cheek Marks
      ctx.beginPath();
      ctx.moveTo(290, 545);
      ctx.lineTo(315, 575);
      ctx.moveTo(325, 545);
      ctx.lineTo(350, 575);
      ctx.stroke();

      // Right Cheek Marks
      ctx.beginPath();
      ctx.moveTo(675, 545);
      ctx.lineTo(700, 575);
      ctx.moveTo(710, 545);
      ctx.lineTo(735, 575);
      ctx.stroke();
    }

    // ==========================================
    // 2. NOSE (Delicate Anime Button Nose)
    // ==========================================
    ctx.fillStyle = 'rgba(225, 112, 112, 0.45)';
    ctx.beginPath();
    ctx.arc(512, 540, 5, 0, Math.PI * 2);
    ctx.fill();

    // ==========================================
    // 3. MOUTH & LIPS
    // ==========================================
    if (mouthStyle === 'smile') {
      // Sweet Anime Smile Arc
      ctx.strokeStyle = '#BE185D';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(512, 595, 36, 0.2 * Math.PI, 0.8 * Math.PI, false);
      ctx.stroke();

      // Lip Gloss Highlight
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(522, 630, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (mouthStyle === 'open') {
      // Happy Open Mouth
      ctx.fillStyle = '#9F1239';
      ctx.beginPath();
      ctx.arc(512, 615, 30, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();

      // Teeth
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.rect(494, 615, 36, 8);
      ctx.fill();

      // Tongue
      ctx.fillStyle = '#FDA4AF';
      ctx.beginPath();
      ctx.arc(512, 635, 16, 0, Math.PI, false);
      ctx.fill();
    } else if (mouthStyle === 'catpout') {
      // :3 Cat Pout
      ctx.strokeStyle = '#BE185D';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(495, 620, 18, 0.8 * Math.PI, 1.9 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(529, 620, 18, 1.1 * Math.PI, 0.2 * Math.PI, false);
      ctx.stroke();
    } else if (mouthStyle === 'smirk') {
      ctx.strokeStyle = '#BE185D';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(525, 615, 30, 0.3 * Math.PI, 0.9 * Math.PI, false);
      ctx.stroke();
    }

    // ==========================================
    // 4. EYEBROWS
    // ==========================================
    ctx.strokeStyle = hairColor;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';

    if (eyebrowStyle === 'gentle') {
      // Left Eyebrow
      ctx.beginPath();
      ctx.arc(330, 365, 80, 1.25 * Math.PI, 1.65 * Math.PI, false);
      ctx.stroke();
      // Right Eyebrow
      ctx.beginPath();
      ctx.arc(694, 365, 80, 1.35 * Math.PI, 1.75 * Math.PI, false);
      ctx.stroke();
    } else if (eyebrowStyle === 'straight') {
      ctx.beginPath();
      ctx.moveTo(270, 320);
      ctx.lineTo(390, 320);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(634, 320);
      ctx.lineTo(754, 320);
      ctx.stroke();
    } else if (eyebrowStyle === 'confident') {
      ctx.beginPath();
      ctx.moveTo(270, 335);
      ctx.lineTo(390, 305);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(634, 305);
      ctx.lineTo(754, 335);
      ctx.stroke();
    } else if (eyebrowStyle === 'playful') {
      ctx.beginPath();
      ctx.arc(330, 350, 75, 1.2 * Math.PI, 1.65 * Math.PI, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(634, 315);
      ctx.lineTo(754, 315);
      ctx.stroke();
    }

    // ==========================================
    // 5. ANIME EYES (Expressive, Detailed VRoid/CustomCast)
    // ==========================================
    const drawEye = (cx: number, cy: number, isRight: boolean) => {
      ctx.save();
      ctx.translate(cx, cy);

      if (eyeOpenRatio < 0.15) {
        // Closed Smiling / Blinking Eye Arc (^ ^)
        ctx.strokeStyle = '#18181B';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 0, 55, 1.15 * Math.PI, 1.85 * Math.PI, false);
        ctx.stroke();

        // Cute Lash Tip
        ctx.beginPath();
        ctx.moveTo(isRight ? 45 : -45, -20);
        ctx.lineTo(isRight ? 65 : -65, -35);
        ctx.stroke();
        ctx.restore();
        return;
      }

      ctx.scale(1, Math.max(0.1, eyeOpenRatio));

      // Sclera (Eye White)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(0, 0, 75, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye White Shadow
      ctx.fillStyle = 'rgba(219, 234, 254, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, -35, 70, 45, 0, 0, Math.PI);
      ctx.fill();

      // Iris Container (Clip Path)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, 68, 88, 0, 0, Math.PI * 2);
      ctx.clip();

      // Iris Deep Gradient
      const irisGrad = ctx.createLinearGradient(0, -90, 0, 90);
      irisGrad.addColorStop(0, '#1E1B4B');
      irisGrad.addColorStop(0.35, eyeColor);
      irisGrad.addColorStop(0.85, '#F472B6');
      irisGrad.addColorStop(1, '#FEF08A');
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.ellipse(0, 5, 58, 78, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner Iris Rings / Pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 20, 36, 0.2 * Math.PI, 0.8 * Math.PI, false);
      ctx.stroke();

      // Pupil
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.ellipse(0, -8, 22, 34, 0, 0, Math.PI * 2);
      ctx.fill();

      // Primary Bright Star Highlight
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(isRight ? 18 : -18, -32, 18, 24, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Glint
      ctx.beginPath();
      ctx.arc(isRight ? -18 : 18, 26, 10, 0, Math.PI * 2);
      ctx.fill();

      // Micro Star Glint
      ctx.beginPath();
      ctx.arc(isRight ? 24 : -24, 18, 6, 0, Math.PI * 2);
      ctx.fill();

      if (eyeStyle === 'heart') {
        // Heart Shaped Highlight
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.arc(0, 25, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // End Iris clip

      // Outer Eye Border / Upper Winged Eyeliner
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, -10, 78, 1.15 * Math.PI, 1.85 * Math.PI, false);
      ctx.stroke();

      // Winged Eyelash Tip
      ctx.beginPath();
      ctx.moveTo(isRight ? 55 : -55, -45);
      ctx.lineTo(isRight ? 85 : -85, eyeStyle === 'cateye' ? -70 : -55);
      ctx.stroke();

      // Cute Lower Eyelash Accent
      ctx.strokeStyle = 'rgba(30, 27, 75, 0.8)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 20, 72, 0.3 * Math.PI, 0.7 * Math.PI, false);
      ctx.stroke();

      ctx.restore();
    };

    // Draw Both Eyes
    drawEye(330, 440, false); // Left Eye
    drawEye(694, 440, true);  // Right Eye

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  };

  // Redraw when colors or features change
  useEffect(() => {
    drawFace(1.0);
  }, [eyeStyle, eyebrowStyle, mouthStyle, blushStyle, eyeColor, hairColor, skinTone, blushIntensity]);

  // Frame blink loop
  useFrame((_, delta) => {
    blinkTimerRef.current += delta;

    if (!isBlinkingRef.current && blinkTimerRef.current > 3.8) {
      if (Math.random() > 0.25) {
        isBlinkingRef.current = true;
        blinkProgressRef.current = 0;
      }
      blinkTimerRef.current = 0;
    }

    if (isBlinkingRef.current) {
      blinkProgressRef.current += delta * 12;
      const ratio = Math.max(0, Math.abs(Math.cos(blinkProgressRef.current * Math.PI)));
      drawFace(ratio);

      if (blinkProgressRef.current >= 1) {
        isBlinkingRef.current = false;
        drawFace(1.0);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Head Sphere with the Dynamic High-Res Anime Texture */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.38, 36, 32]} />
        {texture && (
          <meshStandardMaterial
            map={texture}
            roughness={0.4}
            metalness={0.0}
          />
        )}
      </mesh>

      {/* Cute Chin / Taper Contour */}
      <mesh position={[0, -0.16, 0.12]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.18, 0.22, 24]} />
        <meshStandardMaterial color={skinTone} roughness={0.4} />
      </mesh>

      {/* 3D Earrings */}
      {earrings !== 'none' && (
        <group position={[0, -0.06, 0]}>
          <mesh position={[-0.37, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.04, 0.04, 0.02]} />
            <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.5} />
          </mesh>
          <mesh position={[0.37, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.04, 0.04, 0.02]} />
            <meshStandardMaterial color="#FF1493" roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}
