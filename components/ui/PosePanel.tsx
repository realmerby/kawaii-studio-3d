'use client';

import React, { useState } from 'react';
import { POSES, POSE_CATEGORIES, getPosesByCategory } from '@/data/poses/posesList';
import { OUTFIT_PRESETS } from '@/data/presets';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { PoseCategory } from '@/types/character';
import { Sparkles, Play, RotateCw, Wand2, Check, Heart } from 'lucide-react';

export function PosePanel() {
  const {
    poseId,
    setPose,
    idleAnimation,
    setIdleAnimation,
    animationSpeed,
    setAnimationSpeed,
    autoRotate,
    setAutoRotate,
    applyOutfitOnlyPreset,
  } = useGameStore();

  const { playClick, playPoseChange, playSparkle } = useSoundEffects();
  const [selectedCategory, setSelectedCategory] = useState<PoseCategory>('all');

  const filteredPoses = getPosesByCategory(selectedCategory);

  const handlePoseSelect = (id: string) => {
    playPoseChange();
    setPose(id);
  };

  const handlePresetSelect = (id: string) => {
    playSparkle();
    applyOutfitOnlyPreset(id);
  };

  return (
    <div className="flex flex-col h-full select-none overflow-hidden">
      {/* Kawaii Fashion Magazine Header */}
      <div className="p-4 border-b border-pink-100/80 bg-gradient-to-r from-purple-50/70 via-pink-50/90 to-rose-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-sm">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-800 tracking-wide font-sans flex items-center gap-1.5">
              <span>POSES ♡</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                {POSES.length} Poz
              </span>
            </h3>
            <p className="text-[10px] text-pink-500 font-medium">Poz Stüdyosu & Poz Geçişleri</p>
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-1.5 p-2.5 overflow-x-auto bg-pink-50/40 border-b border-pink-100/60 no-scrollbar">
        {POSE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-pink-200 transform scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-pink-100/60 hover:text-pink-600 border border-pink-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.labelTr}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* ============================================================ */}
        {/* SECTION 1: POSE GRID CARDS                                   */}
        {/* ============================================================ */}
        <div>
          <div className="grid grid-cols-2 gap-2.5">
            {filteredPoses.map((pose) => {
              const isActive = poseId === pose.id;

              return (
                <div
                  key={pose.id}
                  onClick={() => handlePoseSelect(pose.id)}
                  className={`group relative flex flex-col p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md ${
                    isActive
                      ? 'border-2 border-pink-500 shadow-pink-200/80 shadow-md ring-2 ring-pink-300/40 transform -translate-y-0.5'
                      : 'border border-pink-100/80 hover:border-pink-300'
                  }`}
                >
                  {/* Active Checkmark Pill */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md animate-bounce-subtle">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Pose Icon & Visual Badge */}
                  <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 flex items-center justify-center text-3xl shadow-inner mb-2 group-hover:scale-105 transition-transform duration-200">
                    <span className="drop-shadow-sm">{pose.icon}</span>
                  </div>

                  {/* Pose Details */}
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1 leading-tight mb-1">
                    {pose.nameTr}
                  </h4>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[9px] font-semibold text-gray-400 truncate">
                      {pose.name}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">
                      {pose.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: ANIMATION CONTROLS                                */}
        {/* ============================================================ */}
        <div className="p-3.5 bg-pink-50/60 rounded-2xl border border-pink-100/80 space-y-3 shadow-xs">
          <h4 className="text-xs font-bold text-gray-700 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Play className="w-3.5 h-3.5 text-pink-500" /> Hareket & Döndürme
            </span>
          </h4>

          {/* Idle Animation Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">Nefes / Canlı Duruş</span>
            <button
              onClick={() => {
                playClick();
                setIdleAnimation(!idleAnimation);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                idleAnimation
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {idleAnimation ? 'Açık' : 'Kapalı'}
            </button>
          </div>

          {/* Auto Rotate Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">Otomatik 360° Döndür</span>
            <button
              onClick={() => {
                playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                autoRotate
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'Dönüyor' : 'Sabit'}</span>
            </button>
          </div>

          {/* Animation Speed Slider */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-600 font-medium mb-1">
              <span>Animasyon Hızı:</span>
              <span className="text-pink-600 font-bold">{animationSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.0"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 3: READY OUTFIT PRESETS                              */}
        {/* ============================================================ */}
        <div>
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-pink-500" /> Hazır Sevimli Kombinler
          </h4>

          <div className="space-y-2">
            {OUTFIT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-pink-100/80 hover:border-pink-300 transition-all text-left group shadow-sm hover:shadow"
              >
                <span className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {preset.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-gray-800 truncate">
                    {preset.nameTr || preset.name}
                  </h5>
                  <p className="text-[10px] text-gray-500 line-clamp-1">
                    {preset.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
