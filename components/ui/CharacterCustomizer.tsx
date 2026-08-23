'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import {
  EYE_STYLES,
  EYEBROW_STYLES,
  MOUTH_STYLES,
  BLUSH_STYLES,
  EARRING_STYLES,
} from '@/data/faceFeatures';
import { Sparkles, Heart, Palette, Smile, Sparkle, Gem } from 'lucide-react';

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

const LIP_COLORS = [
  { name: 'Sakura Gloss', hex: '#FB7185' },
  { name: 'Sweet Pink', hex: '#FF4D8D' },
  { name: 'Ruby Tint', hex: '#E11D48' },
  { name: 'Peach Glow', hex: '#FB923C' },
  { name: 'Berry Wine', hex: '#BE185D' },
];

export function CharacterCustomizer() {
  const {
    colors,
    setColors,
    faceFeatures,
    setFaceFeatures,
    characterSubTab,
    setCharacterSubTab,
    triggerSparkle,
  } = useGameStore();

  const { playPop, playSparkle } = useSoundEffects();

  const handleFeatureChange = <K extends keyof typeof faceFeatures>(
    key: K,
    value: (typeof faceFeatures)[K]
  ) => {
    playPop();
    setFaceFeatures({ [key]: value });
    triggerSparkle();
  };

  const handleColorPick = (key: keyof typeof colors, value: string | number) => {
    playPop();
    setColors({ [key]: value });
    triggerSparkle();
  };

  return (
    <div className="flex flex-col h-full select-none overflow-hidden">
      {/* Sub-tab Navigation Bar */}
      <div className="flex items-center gap-1 p-2 bg-gradient-to-r from-pink-50/80 to-purple-50/60 border-b border-pink-100/70">
        <button
          onClick={() => {
            playPop();
            setCharacterSubTab('features');
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
            characterSubTab === 'features'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
              : 'text-gray-600 hover:bg-pink-100/60'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>Yüz & İfade</span>
        </button>

        <button
          onClick={() => {
            playPop();
            setCharacterSubTab('colors');
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
            characterSubTab === 'colors'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xs'
              : 'text-gray-600 hover:bg-pink-100/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Renk Paleti</span>
        </button>

        <button
          onClick={() => {
            playPop();
            setCharacterSubTab('earrings');
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
            characterSubTab === 'earrings'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs'
              : 'text-gray-600 hover:bg-pink-100/60'
          }`}
        >
          <Gem className="w-3.5 h-3.5" />
          <span>Küpeler</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* ============================================================ */}
        {/* TAB 1: YÜZ & İFADE (Eyes, Eyebrows, Mouth, Blush)            */}
        {/* ============================================================ */}
        {characterSubTab === 'features' && (
          <div className="space-y-4">
            {/* Göz Stili */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>👀</span> Göz Tipi
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {EYE_STYLES.map((eye) => {
                  const isSelected = faceFeatures.eyeStyle === eye.id;
                  return (
                    <button
                      key={eye.id}
                      onClick={() => handleFeatureChange('eyeStyle', eye.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/90 ring-2 ring-pink-300/40 shadow-xs'
                          : 'border-pink-100 bg-white/80 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className="text-xl shrink-0">{eye.icon}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-gray-800 block truncate">
                          {eye.nameTr}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kaş Stili */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>〰️</span> Kaş Modeli
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {EYEBROW_STYLES.map((brow) => {
                  const isSelected = faceFeatures.eyebrowStyle === brow.id;
                  return (
                    <button
                      key={brow.id}
                      onClick={() => handleFeatureChange('eyebrowStyle', brow.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/90 ring-2 ring-pink-300/40 shadow-xs'
                          : 'border-pink-100 bg-white/80 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className="text-lg shrink-0">{brow.icon}</span>
                      <span className="text-xs font-bold text-gray-800 truncate">
                        {brow.nameTr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ağız & Gülüş */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>👄</span> Gülüş & Ağız
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {MOUTH_STYLES.map((mouth) => {
                  const isSelected = faceFeatures.mouthStyle === mouth.id;
                  return (
                    <button
                      key={mouth.id}
                      onClick={() => handleFeatureChange('mouthStyle', mouth.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/90 ring-2 ring-pink-300/40 shadow-xs'
                          : 'border-pink-100 bg-white/80 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className="text-xl shrink-0">{mouth.icon}</span>
                      <span className="text-xs font-bold text-gray-800 truncate">
                        {mouth.nameTr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Allık Stili & Yoğunluğu */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🍥</span> Allık Stili
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {BLUSH_STYLES.map((blush) => {
                  const isSelected = faceFeatures.blushStyle === blush.id;
                  return (
                    <button
                      key={blush.id}
                      onClick={() => handleFeatureChange('blushStyle', blush.id)}
                      className={`flex items-center gap-2 p-2 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/90 ring-2 ring-pink-300/40 shadow-xs'
                          : 'border-pink-100 bg-white/80 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className="text-lg shrink-0">{blush.icon}</span>
                      <span className="text-xs font-bold text-gray-800 truncate">
                        {blush.nameTr}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Allık Slider */}
              <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100">
                <div className="flex items-center justify-between text-xs text-gray-600 font-medium mb-1">
                  <span>Allık Yoğunluğu:</span>
                  <span className="text-pink-600 font-bold">
                    {Math.round(colors.blushIntensity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={colors.blushIntensity}
                  onChange={(e) => handleColorPick('blushIntensity', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: RENK PALETİ (Hair, Eyes, Skin, Lips)                  */}
        {/* ============================================================ */}
        {characterSubTab === 'colors' && (
          <div className="space-y-4">
            {/* Saç Rengi */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>✨</span> Saç Rengi
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {HAIR_COLORS.map((c) => {
                  const isSelected = colors.hairColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.hex}
                      onClick={() => handleColorPick('hairColor', c.hex)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300/50 shadow-xs'
                          : 'border-pink-100 bg-white/70 hover:bg-pink-50/50'
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

            {/* Göz Rengi */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>👀</span> Göz Rengi
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {EYE_COLORS.map((c) => {
                  const isSelected = colors.eyeColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.hex}
                      onClick={() => handleColorPick('eyeColor', c.hex)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300/50 shadow-xs'
                          : 'border-pink-100 bg-white/70 hover:bg-pink-50/50'
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

            {/* Ten Rengi */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🌸</span> Ten Rengi
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {SKIN_TONES.map((c) => {
                  const isSelected = colors.skinTone.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.hex}
                      onClick={() => handleColorPick('skinTone', c.hex)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300/50 shadow-xs'
                          : 'border-pink-100 bg-white/70 hover:bg-pink-50/50'
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

            {/* Ruj / Dudak Rengi */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>💄</span> Dudak Tonu
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {LIP_COLORS.map((c) => {
                  const isSelected = colors.lipColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.hex}
                      onClick={() => handleColorPick('lipColor', c.hex)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300/50 shadow-xs'
                          : 'border-pink-100 bg-white/70 hover:bg-pink-50/50'
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
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: KÜPELER & MÜCEVHER (Earrings)                         */}
        {/* ============================================================ */}
        {characterSubTab === 'earrings' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-pink-500" /> Küpe Seçimi
            </h4>

            <div className="space-y-2">
              {EARRING_STYLES.map((earring) => {
                const isSelected = faceFeatures.earrings === earring.id;
                return (
                  <button
                    key={earring.id}
                    onClick={() => handleFeatureChange('earrings', earring.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50/90 ring-2 ring-pink-300/40 shadow-xs scale-[1.01]'
                        : 'border-pink-100 bg-white/80 hover:bg-pink-50/50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 w-10 h-10 rounded-xl bg-pink-100/60 flex items-center justify-center">
                      {earring.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-gray-800 truncate">
                        {earring.nameTr}
                      </h5>
                      <p className="text-[10px] text-gray-500 line-clamp-1">
                        {earring.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
