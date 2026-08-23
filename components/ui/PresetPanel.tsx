'use client';

import React, { useState } from 'react';
import { FULL_CHARACTER_PRESETS, OUTFIT_PRESETS } from '@/data/presets';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Sparkles, Wand2, Heart, Shirt, UserCheck } from 'lucide-react';

export function PresetPanel() {
  const {
    applyFullCharacterPreset,
    applyOutfitOnlyPreset,
    favorites,
    toggleFavorite,
  } = useGameStore();

  const { playSparkle, playClick, playHeart } = useSoundEffects();
  const [presetTab, setPresetTab] = useState<'full' | 'outfit'>('full');

  const handleFullPreset = (id: string) => {
    playSparkle();
    applyFullCharacterPreset(id);
  };

  const handleOutfitPreset = (id: string) => {
    playSparkle();
    applyOutfitOnlyPreset(id);
  };

  return (
    <div className="flex flex-col h-full select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-pink-100/80 bg-gradient-to-r from-rose-50/70 via-pink-50/90 to-purple-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-800 tracking-wide font-sans flex items-center gap-1.5">
              <span>PRESETS ♡</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                Hazır Stiller
              </span>
            </h3>
            <p className="text-[10px] text-pink-500 font-medium">Tek Tıkla Stil ve Kombinler</p>
          </div>
        </div>
      </div>

      {/* Preset Sub-Tab Switcher */}
      <div className="flex items-center gap-1 p-2 bg-pink-50/40 border-b border-pink-100/60">
        <button
          onClick={() => {
            playClick();
            setPresetTab('full');
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all ${
            presetTab === 'full'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
              : 'text-gray-600 hover:bg-pink-100/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Tam Karakter Stili</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setPresetTab('outfit');
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all ${
            presetTab === 'outfit'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xs'
              : 'text-gray-600 hover:bg-pink-100/60'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Sadece Kıyafet</span>
        </button>
      </div>

      {/* Preset Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {presetTab === 'full' && (
          <div className="space-y-2.5">
            <div className="p-2.5 bg-pink-50/80 rounded-2xl border border-pink-100 text-[11px] text-pink-600 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Tam stil: Yüz, saç, renkler, kıyafetler ve poz birlikte değişir!</span>
            </div>

            {FULL_CHARACTER_PRESETS.map((preset) => {
              const isFav = favorites.includes(preset.id);

              return (
                <div
                  key={preset.id}
                  onClick={() => handleFullPreset(preset.id)}
                  className="group relative flex items-start gap-3 p-3 rounded-2xl bg-white/90 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-pink-100/90 hover:border-pink-300 shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
                >
                  <span className="w-12 h-12 rounded-2xl bg-pink-100/80 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    {preset.icon}
                  </span>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="text-xs font-bold text-gray-800 truncate">
                        {preset.nameTr}
                      </h4>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md bg-purple-50 text-purple-600 border border-purple-100">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playHeart();
                      toggleFavorite(preset.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1 rounded-full transition-transform active:scale-125 ${
                      isFav ? 'text-pink-500 fill-pink-500' : 'text-gray-300 hover:text-pink-400'
                    }`}
                    title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {presetTab === 'outfit' && (
          <div className="space-y-2.5">
            <div className="p-2.5 bg-purple-50/80 rounded-2xl border border-purple-100 text-[11px] text-purple-600 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Sadece kıyafet: Yüzünüz ve saç renginiz korunur!</span>
            </div>

            {OUTFIT_PRESETS.map((preset) => {
              const isFav = favorites.includes(preset.id);

              return (
                <div
                  key={preset.id}
                  onClick={() => handleOutfitPreset(preset.id)}
                  className="group relative flex items-start gap-3 p-3 rounded-2xl bg-white/90 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-pink-100/90 hover:border-pink-300 shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
                >
                  <span className="w-12 h-12 rounded-2xl bg-purple-100/80 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    {preset.icon}
                  </span>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="text-xs font-bold text-gray-800 truncate">
                        {preset.nameTr}
                      </h4>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md bg-pink-50 text-pink-600 border border-pink-100">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playHeart();
                      toggleFavorite(preset.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1 rounded-full transition-transform active:scale-125 ${
                      isFav ? 'text-pink-500 fill-pink-500' : 'text-gray-300 hover:text-pink-400'
                    }`}
                    title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
