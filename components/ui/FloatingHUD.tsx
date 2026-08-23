'use client';

import React from 'react';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { CameraPreset } from '@/types/character';
import { RotateCcw, Sparkles, Eye, Shirt, Footprints, Maximize2, Heart } from 'lucide-react';

const PRESET_BUTTONS: { id: CameraPreset; label: string; icon: React.ReactNode }[] = [
  { id: 'full', label: 'Tam Boy', icon: <Maximize2 className="w-3.5 h-3.5" /> },
  { id: 'face', label: 'Yüz', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 'outfit', label: 'Kıyafet', icon: <Shirt className="w-3.5 h-3.5" /> },
  { id: 'shoes', label: 'Ayakkabı', icon: <Footprints className="w-3.5 h-3.5" /> },
];

export function FloatingHUD() {
  const {
    cameraPreset,
    setCameraPreset,
    resetCamera,
    triggerSparkle,
  } = useGameStore();

  const { playPop, playSparkle } = useSoundEffects();

  const handlePreset = (preset: CameraPreset) => {
    playPop();
    setCameraPreset(preset);
  };

  const handleReset = () => {
    playPop();
    resetCamera();
  };

  const handleSparkle = () => {
    playSparkle();
    triggerSparkle();
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 select-none pointer-events-auto">
      {/* Camera Focus Pills */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white/85 backdrop-blur-md rounded-full shadow-lg border border-pink-200/70">
        {PRESET_BUTTONS.map((btn) => {
          const isActive = cameraPreset === btn.id;

          return (
            <button
              key={btn.id}
              onClick={() => handlePreset(btn.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                  : 'bg-transparent text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              {btn.icon}
              <span className="hidden sm:inline">{btn.label}</span>
            </button>
          );
        })}

        <div className="w-px h-4 bg-pink-200 mx-0.5" />

        {/* Reset Camera Button */}
        <button
          onClick={handleReset}
          className="p-1.5 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all"
          title="Kamera Açısını Sıfırla"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Sparkle Burst Button */}
        <button
          onClick={handleSparkle}
          className="p-1.5 text-pink-500 hover:text-pink-600 hover:bg-pink-100/60 rounded-full transition-all active:scale-125"
          title="Parıltı Efekti"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </button>
      </div>

      {/* Made by merbybutter Badge */}
      <div className="flex items-center gap-1 text-[10px] text-pink-500/90 font-medium px-2.5 py-0.5 rounded-full bg-white/60 backdrop-blur-xs border border-pink-100/60 shadow-2xs">
        <span>made with</span>
        <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500 inline" />
        <span>by</span>
        <span className="font-bold text-pink-600">merbybutter</span>
      </div>
    </div>
  );
}
