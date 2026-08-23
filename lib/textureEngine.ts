import * as THREE from 'three';
import { ClothingPattern } from '@/types/character';

// Cache generated canvas textures to avoid regenerating identical patterns
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedural Dynamic Canvas Texture Engine for Anime Clothing Patterns
 */
export function getClothingPatternTexture(
  pattern: ClothingPattern = 'solid',
  primaryColor: string = '#FF80AB',
  secondaryColor: string = '#FFFFFF',
  detailColor: string = '#F43F5E'
): THREE.CanvasTexture {
  const cacheKey = `${pattern}_${primaryColor}_${secondaryColor}_${detailColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // Base background fill
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, 512, 512);

  switch (pattern) {
    case 'stripes': {
      // Crisp alternating anime stripes
      ctx.fillStyle = secondaryColor;
      const stripeWidth = 32;
      for (let y = 0; y < 512; y += stripeWidth * 2) {
        ctx.fillRect(0, y, 512, stripeWidth);
      }
      // Delicate pinstripe detail
      ctx.fillStyle = detailColor;
      for (let y = stripeWidth - 4; y < 512; y += stripeWidth * 2) {
        ctx.fillRect(0, y, 512, 4);
      }
      break;
    }

    case 'check': {
      // Tartan / Pleated Skirt Plaid Pattern
      ctx.fillStyle = secondaryColor;
      const checkSize = 48;
      for (let x = 0; x < 512; x += checkSize * 2) {
        ctx.fillRect(x, 0, checkSize, 512);
      }
      ctx.globalAlpha = 0.5;
      for (let y = 0; y < 512; y += checkSize * 2) {
        ctx.fillRect(0, y, 512, checkSize);
      }
      ctx.globalAlpha = 1.0;

      // Fine golden/white accent lines
      ctx.strokeStyle = detailColor;
      ctx.lineWidth = 3;
      for (let x = 0; x < 512; x += checkSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += checkSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      break;
    }

    case 'heart': {
      // Cute Repeating Anime Hearts Pattern
      ctx.fillStyle = secondaryColor;
      const spacing = 64;
      for (let x = 32; x < 512; x += spacing) {
        for (let y = 32; y < 512; y += spacing) {
          const shift = (Math.floor(y / spacing) % 2) * (spacing / 2);
          const px = (x + shift) % 512;
          const py = y;

          ctx.save();
          ctx.translate(px, py);
          ctx.beginPath();
          ctx.moveTo(0, 4);
          ctx.bezierCurveTo(-10, -10, -20, 4, 0, 18);
          ctx.bezierCurveTo(20, 4, 10, -10, 0, 4);
          ctx.fill();
          ctx.restore();
        }
      }
      break;
    }

    case 'polka': {
      // Sweet Polka Dots
      ctx.fillStyle = secondaryColor;
      const dotSpacing = 56;
      for (let x = 28; x < 512; x += dotSpacing) {
        for (let y = 28; y < 512; y += dotSpacing) {
          const shift = (Math.floor(y / dotSpacing) % 2) * (dotSpacing / 2);
          ctx.beginPath();
          ctx.arc((x + shift) % 512, y, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case 'lace': {
      // Delicate Scalloped Lace Frills
      ctx.fillStyle = secondaryColor;
      ctx.fillRect(0, 0, 512, 64);
      ctx.fillRect(0, 448, 512, 64);

      // Scallops
      const scallopR = 24;
      for (let x = scallopR; x < 512; x += scallopR * 2) {
        ctx.beginPath();
        ctx.arc(x, 64, scallopR, 0, Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, 448, scallopR, Math.PI, 0);
        ctx.fill();
      }
      break;
    }

    case 'denim': {
      // Denim diagonal twill weave
      ctx.fillStyle = secondaryColor;
      ctx.globalAlpha = 0.15;
      for (let i = -512; i < 1024; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Orange contrast seam line
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 48);
      ctx.lineTo(512, 48);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }

    case 'sailor': {
      // Sailor uniform crisp white with navy bands and red scarf accent
      ctx.fillStyle = secondaryColor;
      ctx.fillRect(0, 0, 512, 120);

      // Navy collar bands
      ctx.fillStyle = '#1E1B4B';
      ctx.fillRect(0, 40, 512, 20);
      ctx.fillRect(0, 80, 512, 20);

      // Center Red Sailor Scarf Ribbon
      ctx.fillStyle = detailColor;
      ctx.beginPath();
      ctx.moveTo(256, 120);
      ctx.lineTo(216, 260);
      ctx.lineTo(256, 320);
      ctx.lineTo(296, 260);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'solid':
    default: {
      // Subtle soft fabric weave
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 0; y < 512; y += 4) {
        ctx.fillRect(0, y, 512, 2);
      }
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}
