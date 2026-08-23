import * as THREE from 'three';

// Cache generated canvas textures to avoid regenerating identical patterns
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * High-Definition Procedural Anime Garment Texture Generator (1024x1024)
 * Generates tailored anime fashion textures with realistic garment details:
 * Collars, stitching, buttons, pleat shadows, lace ruffles, ribbons, and fabric weaves.
 */
export function getGarmentTexture(
  itemId: string,
  primaryColor: string = '#FF80AB',
  secondaryColor: string = '#FFFFFF'
): THREE.CanvasTexture {
  const cacheKey = `${itemId}_${primaryColor}_${secondaryColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // Base background
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, 1024, 1024);

  switch (itemId) {
    // -------------------------------------------------------------
    // TOPS
    // -------------------------------------------------------------
    case 'top-sailor-blouse': {
      // 1. Crisp White School Uniform Body with fabric grain
      ctx.fillStyle = primaryColor || '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle fabric weave
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      for (let y = 0; y < 1024; y += 4) {
        ctx.fillRect(0, y, 1024, 2);
      }

      // 2. Navy Blue Sailor Collar Flap (Top Region)
      const navyCol = secondaryColor || '#1E1B4B';
      ctx.fillStyle = navyCol;
      ctx.fillRect(0, 0, 1024, 260);

      // 3. Double Crisp White Sailor Collar Stripes
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 70, 1024, 24);
      ctx.fillRect(0, 150, 1024, 24);

      // 4. Center Gold Emblem Star
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(512, 110, 20, 0, Math.PI * 2);
      ctx.fill();

      // 5. Iconic Red Sailor Scarf Knot & Ribbon
      ctx.fillStyle = '#DC2626';
      // Center knot
      ctx.beginPath();
      ctx.arc(512, 260, 36, 0, Math.PI * 2);
      ctx.fill();

      // Left & Right trailing scarf tails with soft shadow
      ctx.fillStyle = '#B91C1C';
      ctx.beginPath();
      ctx.moveTo(480, 260);
      ctx.lineTo(410, 520);
      ctx.lineTo(490, 560);
      ctx.lineTo(512, 280);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.moveTo(544, 260);
      ctx.lineTo(614, 520);
      ctx.lineTo(534, 560);
      ctx.lineTo(512, 280);
      ctx.closePath();
      ctx.fill();

      // 6. Waistband Seam & Hem Ruffle
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 6;
      ctx.strokeRect(0, 940, 1024, 84);
      break;
    }

    case 'top-bunny-hoodie': {
      // Soft fleece hoodie body
      ctx.fillStyle = primaryColor || '#FFB6C1';
      ctx.fillRect(0, 0, 1024, 1024);

      // Soft Heather/Fleece Grain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let x = 0; x < 1024; x += 6) {
        for (let y = 0; y < 1024; y += 6) {
          if ((x + y) % 12 === 0) ctx.fillRect(x, y, 3, 3);
        }
      }

      // Kangaroo Front Pocket with curved stitched seam
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.roundRect(256, 560, 512, 280, 32);
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center Sweet Anime Heart Badge
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(512, 630);
      ctx.bezierCurveTo(470, 580, 420, 630, 512, 720);
      ctx.bezierCurveTo(604, 630, 554, 580, 512, 630);
      ctx.fill();

      // Hoodie Drawstrings
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(440, 120, 16, 320);
      ctx.fillRect(568, 120, 16, 320);
      // Pink heart aglets at ends of drawstrings
      ctx.fillStyle = '#FF1493';
      ctx.beginPath();
      ctx.arc(448, 450, 16, 0, Math.PI * 2);
      ctx.arc(576, 450, 16, 0, Math.PI * 2);
      ctx.fill();

      // Ribbed Crop Waistband
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 880, 1024, 144);
      for (let x = 0; x < 1024; x += 16) {
        ctx.fillRect(x, 880, 4, 144);
      }
      break;
    }

    case 'top-gyaru-knit': {
      // Chunky Slouchy Cable-Knit Sweater
      ctx.fillStyle = primaryColor || '#E9D5FF';
      ctx.fillRect(0, 0, 1024, 1024);

      // Vertical Cable-Knit Braids & Ribs
      for (let x = 0; x < 1024; x += 64) {
        // Shaded groove
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(x, 0, 12, 1024);

        // Highlight cable ridge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(x + 20, 0, 24, 1024);

        // Diagonal cable cross-hatch
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        for (let y = 0; y < 1024; y += 32) {
          ctx.beginPath();
          ctx.moveTo(x + 12, y);
          ctx.lineTo(x + 44, y + 16);
          ctx.lineTo(x + 44, y + 24);
          ctx.lineTo(x + 12, y + 8);
          ctx.fill();
        }
      }

      // Off-Shoulder Folded Collar Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, 1024, 180);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 180, 1024, 24);
      break;
    }

    case 'top-ruffle-camisole': {
      // Sweet Silk Camisole
      ctx.fillStyle = primaryColor || '#FFE4E6';
      ctx.fillRect(0, 0, 1024, 1024);

      // Scalloped French Lace Trim at Neckline & Hem
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 80);
      ctx.fillRect(0, 944, 1024, 80);

      // Scallops
      const r = 32;
      for (let x = r; x < 1024; x += r * 2) {
        ctx.beginPath();
        ctx.arc(x, 80, r, 0, Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, 944, r, Math.PI, 0);
        ctx.fill();
      }

      // Princess Corset Seams
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.25)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(340, 120);
      ctx.bezierCurveTo(380, 400, 360, 700, 340, 940);
      ctx.moveTo(684, 120);
      ctx.bezierCurveTo(644, 400, 664, 700, 684, 940);
      ctx.stroke();

      // Center Satin Bow
      ctx.fillStyle = '#FB7185';
      ctx.beginPath();
      ctx.arc(512, 140, 20, 0, Math.PI * 2);
      ctx.fill();
      // Bow loops
      ctx.beginPath();
      ctx.ellipse(450, 135, 45, 24, -0.2, 0, Math.PI * 2);
      ctx.ellipse(574, 135, 45, 24, 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // -------------------------------------------------------------
    // BOTTOMS
    // -------------------------------------------------------------
    case 'bottom-pleated-skirt': {
      // Tartan / Pleated Skirt
      const base = primaryColor || '#1E1B4B';
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 1024, 1024);

      // Scottish Tartan Check Overlays
      ctx.fillStyle = secondaryColor || '#312E81';
      for (let x = 0; x < 1024; x += 128) {
        ctx.fillRect(x, 0, 48, 1024);
      }
      ctx.globalAlpha = 0.5;
      for (let y = 0; y < 1024; y += 128) {
        ctx.fillRect(0, y, 1024, 48);
      }
      ctx.globalAlpha = 1.0;

      // Fine golden/white tartan pinstripes
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 4;
      for (let x = 0; x < 1024; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x + 24, 0);
        ctx.lineTo(x + 24, 1024);
        ctx.stroke();
      }
      for (let y = 0; y < 1024; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y + 24);
        ctx.lineTo(1024, y + 24);
        ctx.stroke();
      }

      // Box Pleat Deep Shadow Crevices
      for (let x = 0; x < 1024; x += 64) {
        const grad = ctx.createLinearGradient(x, 0, x + 64, 0);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
        grad.addColorStop(0.2, 'rgba(0, 0, 0, 0.05)');
        grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.35)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 140, 64, 884);
      }

      // High-Waisted Belted Band
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, 1024, 140);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.strokeRect(460, 35, 104, 70);
      break;
    }

    case 'bottom-frilly-rara': {
      // Tiered Ruffled Ra-Ra Skirt
      ctx.fillStyle = primaryColor || '#F472B6';
      ctx.fillRect(0, 0, 1024, 1024);

      // 3 Tiers of Delicate Lace Ruffles
      const tiers = [260, 580, 900];
      tiers.forEach((y) => {
        // Shadow under tier
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, y, 1024, 30);

        // White Scalloped Lace Hem
        ctx.fillStyle = '#FFFFFF';
        const r = 24;
        for (let x = r; x < 1024; x += r * 2) {
          ctx.beginPath();
          ctx.arc(x, y + 20, r, 0, Math.PI);
          ctx.fill();
        }
      });

      // Sweet Polka Dot Tulle Texture
      ctx.fillStyle = '#FFFFFF';
      for (let x = 32; x < 1024; x += 96) {
        for (let y = 32; y < 1024; y += 96) {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case 'bottom-denim-shorts': {
      // Authentic Denim Twill Weave
      ctx.fillStyle = primaryColor || '#38BDF8';
      ctx.fillRect(0, 0, 1024, 1024);

      // Diagonal Twill Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 3;
      for (let i = -1024; i < 2048; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 1024, 1024);
        ctx.stroke();
      }

      // Faded Thigh Whiskers / Wash
      const wash = ctx.createRadialGradient(512, 512, 100, 512, 512, 450);
      wash.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      wash.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, 1024, 1024);

      // Golden Orange Denim Topstitching
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 6;
      ctx.setLineDash([16, 10]);

      // Waistband & Fly
      ctx.strokeRect(0, 0, 1024, 150);
      ctx.beginPath();
      ctx.moveTo(512, 150);
      ctx.lineTo(512, 600);
      ctx.bezierCurveTo(450, 600, 400, 750, 400, 950);
      ctx.stroke();

      // Curved Front Coin Pockets
      ctx.beginPath();
      ctx.arc(150, 150, 240, 0, Math.PI * 0.5);
      ctx.moveTo(874, 150);
      ctx.arc(874, 150, 240, Math.PI * 0.5, Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);

      // Copper Rivets
      ctx.fillStyle = '#B45309';
      [
        [150, 390],
        [380, 150],
        [874, 390],
        [644, 150],
      ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // -------------------------------------------------------------
    // DRESSES
    // -------------------------------------------------------------
    case 'dress-maid-cafe': {
      // Akihabara Maid Cafe Dress
      ctx.fillStyle = primaryColor || '#18181B';
      ctx.fillRect(0, 0, 1024, 1024);

      // White Apron Bib & Scalloped Front
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(256, 120);
      ctx.lineTo(768, 120);
      ctx.lineTo(820, 880);
      ctx.lineTo(204, 880);
      ctx.closePath();
      ctx.fill();

      // Scalloped Apron Lace Edge
      const r = 24;
      for (let x = 204 + r; x < 820; x += r * 2) {
        ctx.beginPath();
        ctx.arc(x, 880, r, 0, Math.PI);
        ctx.fill();
      }

      // Waist Tie Sash & Big Bow
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 450, 1024, 70);
      ctx.fillStyle = '#F3F4F6';
      ctx.beginPath();
      ctx.ellipse(450, 485, 65, 35, -0.2, 0, Math.PI * 2);
      ctx.ellipse(574, 485, 65, 35, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Neckline Frill Collar
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 100);
      for (let x = r; x < 1024; x += r * 2) {
        ctx.beginPath();
        ctx.arc(x, 100, r, 0, Math.PI);
        ctx.fill();
      }
      break;
    }

    case 'dress-y2k-slip': {
      // Y2K Saten Slip Dress
      ctx.fillStyle = primaryColor || '#FF1493';
      ctx.fillRect(0, 0, 1024, 1024);

      // Glossy Satin Shading Sheen
      const sheen = ctx.createLinearGradient(0, 0, 1024, 1024);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      sheen.addColorStop(0.3, 'rgba(0, 0, 0, 0.05)');
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      sheen.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, 1024, 1024);

      // Sweetheart Neckline Black/White Lace Trim
      ctx.fillStyle = secondaryColor || '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 64);
      const r = 24;
      for (let x = r; x < 1024; x += r * 2) {
        ctx.beginPath();
        ctx.arc(x, 64, r, 0, Math.PI);
        ctx.fill();
      }

      // Small repeating heart jacquard motif
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let x = 64; x < 1024; x += 128) {
        for (let y = 120; y < 1024; y += 128) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.bezierCurveTo(x - 20, y - 20, x - 40, y + 8, x, y + 36);
          ctx.bezierCurveTo(x + 40, y + 8, x + 20, y - 20, x, y);
          ctx.fill();
        }
      }
      break;
    }

    // -------------------------------------------------------------
    // OUTERWEAR
    // -------------------------------------------------------------
    case 'outer-pastel-cardigan': {
      // Chunky Knit Cardigan
      ctx.fillStyle = primaryColor || '#FDE68A';
      ctx.fillRect(0, 0, 1024, 1024);

      // Chunky Ribbed Knit Weave
      for (let x = 0; x < 1024; x += 32) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(x, 0, 8, 1024);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x + 10, 0, 12, 1024);
      }

      // Center Open Placket Band & Big Pearlescent Buttons
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(448, 0, 128, 1024);

      // Pearlescent Buttons
      ctx.fillStyle = '#FFFFFF';
      [220, 420, 620, 820].forEach((y) => {
        ctx.beginPath();
        ctx.arc(512, y, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 4;
        ctx.stroke();

        // 4 Buttonholes
        ctx.fillStyle = '#9CA3AF';
        ctx.fillRect(504, y - 8, 4, 4);
        ctx.fillRect(516, y - 8, 4, 4);
        ctx.fillRect(504, y + 4, 4, 4);
        ctx.fillRect(516, y + 4, 4, 4);
        ctx.fillStyle = '#FFFFFF';
      });
      break;
    }

    // -------------------------------------------------------------
    // SOCKS & SHOES
    // -------------------------------------------------------------
    case 'socks-thigh-high-striped': {
      // Alternating 2-Tone Pastel Anime Stripes
      ctx.fillStyle = primaryColor || '#FF80AB';
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.fillStyle = secondaryColor || '#FFFFFF';
      const stripeH = 96;
      for (let y = 0; y < 1024; y += stripeH * 2) {
        ctx.fillRect(0, y, 1024, stripeH);
      }

      // Elastic Top Grip Band with fine ribbing
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, 1024, 80);
      break;
    }

    case 'socks-lace-frill': {
      ctx.fillStyle = primaryColor || '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 1024);

      // Ruffled elastic lace cuff
      ctx.fillStyle = secondaryColor || '#FFB6C1';
      ctx.fillRect(0, 0, 1024, 120);
      const r = 30;
      for (let x = r; x < 1024; x += r * 2) {
        ctx.beginPath();
        ctx.arc(x, 120, r, 0, Math.PI);
        ctx.fill();
      }
      break;
    }

    case 'shoes-platform-mary-janes': {
      ctx.fillStyle = primaryColor || '#111827';
      ctx.fillRect(0, 0, 1024, 1024);

      // Glossy Patent Leather Specular Shine
      const shine = ctx.createLinearGradient(0, 0, 1024, 0);
      shine.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      shine.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
      shine.addColorStop(0.7, 'rgba(255, 255, 255, 0.35)');
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, 1024, 1024);

      // Silver Metallic Buckle
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 14;
      ctx.strokeRect(400, 350, 224, 140);
      break;
    }

    case 'shoes-chunky-sneakers': {
      ctx.fillStyle = primaryColor || '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 1024);

      // Pastel overlays and cross-laces
      ctx.fillStyle = '#FFB6C1';
      ctx.fillRect(0, 300, 1024, 180);
      ctx.fillStyle = '#38BDF8';
      ctx.fillRect(0, 680, 1024, 120);

      // White Athletic Laces
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 12;
      for (let y = 140; y < 600; y += 90) {
        ctx.beginPath();
        ctx.moveTo(350, y);
        ctx.lineTo(674, y + 45);
        ctx.moveTo(674, y);
        ctx.lineTo(350, y + 45);
        ctx.stroke();
      }
      break;
    }

    case 'shoes-gyaru-boots': {
      ctx.fillStyle = primaryColor || '#92400E';
      ctx.fillRect(0, 0, 1024, 1024);

      // Warm Suede Brush Texture
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let y = 0; y < 1024; y += 8) {
        ctx.fillRect(0, y, 1024, 3);
      }

      // Plush Faux-Fur White Shearling Collar
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 240);
      for (let x = 0; x < 1024; x += 32) {
        ctx.beginPath();
        ctx.arc(x, 240, 24, 0, Math.PI);
        ctx.fill();
      }
      break;
    }

    default: {
      // Crisp soft anime textile weave
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 0; y < 1024; y += 6) {
        ctx.fillRect(0, y, 1024, 3);
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
