'use client';

import React from 'react';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ALL_ITEMS, getItemById } from '@/data/clothing';
import { FULL_CHARACTER_PRESETS, OUTFIT_PRESETS } from '@/data/presets';
import { ItemCard } from './ItemCard';
import { Heart, Sparkles, Wand2 } from 'lucide-react';

export function FavoritesPanel() {
  const {
    favorites,
    applyFullCharacterPreset,
    applyOutfitOnlyPreset,
  } = useGameStore();

  const { playSparkle } = useSoundEffects();

  const favoritedItems = ALL_ITEMS.filter((item) => favorites.includes(item.id));
  const favoritedFullPresets = FULL_CHARACTER_PRESETS.filter((p) => favorites.includes(p.id));
  const favoritedOutfitPresets = OUTFIT_PRESETS.filter((p) => favorites.includes(p.id));

  const totalFavorites = favoritedItems.length + favoritedFullPresets.length + favoritedOutfitPresets.length;

  return (
    <div className="flex flex-col h-full select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-pink-100/80 bg-gradient-to-r from-pink-50/80 to-rose-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-sm">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-800 tracking-wide font-sans flex items-center gap-1.5">
              <span>FAVORİLERİM ♡</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                {totalFavorites}
              </span>
            </h3>
            <p className="text-[10px] text-pink-500 font-medium">Kalp Verdiğin Kıyafet ve Kombinler</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {totalFavorites === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-pink-100/80 flex items-center justify-center text-3xl mb-3 shadow-inner">
              💖
            </div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">Henüz favorin yok ♡</h4>
            <p className="text-xs text-pink-500/80 max-w-xs leading-relaxed">
              Kıyafetlerin veya kombinlerin üzerindeki kalp simgesine basarak buraya ekleyebilirsin!
            </p>
          </div>
        ) : (
          <>
            {/* Favorited Presets */}
            {(favoritedFullPresets.length > 0 || favoritedOutfitPresets.length > 0) && (
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-pink-500" /> Favori Stiller
                </h4>
                <div className="space-y-2">
                  {favoritedFullPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        playSparkle();
                        applyFullCharacterPreset(preset.id);
                      }}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/90 hover:bg-pink-50 border border-pink-100 shadow-xs text-left"
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-gray-800 truncate">{preset.nameTr}</h5>
                        <p className="text-[9px] text-gray-500 truncate">{preset.description}</p>
                      </div>
                    </button>
                  ))}
                  {favoritedOutfitPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        playSparkle();
                        applyOutfitOnlyPreset(preset.id);
                      }}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/90 hover:bg-purple-50 border border-purple-100 shadow-xs text-left"
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-gray-800 truncate">{preset.nameTr}</h5>
                        <p className="text-[9px] text-gray-500 truncate">{preset.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Favorited Items */}
            {favoritedItems.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>👗</span> Favori Kıyafetler
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {favoritedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
