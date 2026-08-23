'use client';

import React from 'react';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Palette, Sparkles, Heart } from 'lucide-react';

const HAIR_COLORS = [
  { name: 'Sakura Pink', hex: '#FFA8CA' },
  { name: 'Golden Gyaru', hex: '#FBBF24' },
  { name: 'Pastel Lilac', hex: '#C084FC' },
  { name: 'Sky Cyan', hex: '#38BDF8' },
  { name: 'Princess Blue', hex: '#312E81' },
  { name: 'Ruby Rose', hex: '#F43F5E' },
  { name: 'Chestnut Brown', hex: '#78350F' },
  { name: 'Anime Black', hex: '#18181B' },
  { name: 'Platinum White', hex: '#FFFFFF' },
];

const EYE_COLORS = [
  { name: 'Violet Gem', hex: '#9333EA' },
  { name: 'Aquamarine', hex: '#0284C7' },
  { name: 'Magenta Heart', hex: '#DB2777' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Golden Topaz', hex: '#EAB308' },
  { name: 'Ruby Glow', hex: '#DC2626' },
  { name: 'Dark Onyx', hex: '#1E1B4B' },
];

const SKIN_TONES = [
  { name: 'Porcelain Fair', hex: '#FFF8F5' },
  { name: 'Peachy Natural', hex: '#FFF0E8' },
  { name: 'Warm Apricot', hex: '#FFE4D6' },
  { name: 'Gyaru Bronze Tan', hex: '#FCD5B5' },
  { name: 'Sun-kissed Golden', hex: '#F6BE9A' },
];

export function StyleCustomizer() {
  const { colors, setColors, triggerSparkle } = useGameStore();
  const { playPop, playSparkle } = useSoundEffects();

  const handleColorPick = (key: keyof typeof colors, value: string | number) => {
    playPop();
    setColors({ [key]: value });
    triggerSparkle();
  };

  return (
    <div className="p-4 space-y-5 select-none custom-scrollbar">
      {/* Hair Color Palette */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span>✨</span> Saç Rengi
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {HAIR_COLORS.map((c) => {
            const isSelected = colors.hairColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                onClick={() => handleColorPick('hairColor', c.hex)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/80 ring-2 ring-pink-300/50 shadow-sm'
                    : 'border-pink-100/80 bg-white/70 hover:bg-pink-50/50'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-gray-300 shadow-inner shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] font-bold text-gray-700 truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Eye Color Palette */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span>👀</span> Göz Rengi
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {EYE_COLORS.map((c) => {
            const isSelected = colors.eyeColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                onClick={() => handleColorPick('eyeColor', c.hex)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/80 ring-2 ring-pink-300/50 shadow-sm'
                    : 'border-pink-100/80 bg-white/70 hover:bg-pink-50/50'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-gray-300 shadow-inner shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[11px] font-bold text-gray-700 truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skin Tone Palette */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span>🌸</span> Ten Rengi
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {SKIN_TONES.map((c) => {
            const isSelected = colors.skinTone.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                onClick={() => handleColorPick('skinTone', c.hex)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/80 ring-2 ring-pink-300/50 shadow-sm'
                    : 'border-pink-100/80 bg-white/70 hover:bg-pink-50/50'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 shadow-inner shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs font-bold text-gray-700 truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blush & Lip Sliders */}
      <div className="p-3.5 bg-pink-50/60 rounded-2xl border border-pink-100/80 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-600 font-medium mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> Allık Yoğunluğu
            </span>
            <span className="text-pink-600 font-bold">
              {Math.round(colors.blushIntensity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={colors.blushIntensity}
            onChange={(e) => handleColorPick('blushIntensity', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
