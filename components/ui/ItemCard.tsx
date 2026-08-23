'use client';

import React from 'react';
import { Check, Heart } from 'lucide-react';
import { ClothingItem, ItemRarity } from '@/types/character';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface ItemCardProps {
  item: ClothingItem;
}

const RARITY_STYLES: Record<ItemRarity, { badge: string; text: string; bg: string }> = {
  common: {
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    text: 'Normal',
    bg: 'border-pink-100 hover:border-pink-300',
  },
  rare: {
    badge: 'bg-sky-100 text-sky-600 border-sky-200',
    text: 'Nadir',
    bg: 'border-sky-100 hover:border-sky-300',
  },
  epic: {
    badge: 'bg-purple-100 text-purple-600 border-purple-200',
    text: 'Epik',
    bg: 'border-purple-100 hover:border-purple-300',
  },
  legendary: {
    badge: 'bg-amber-100 text-amber-600 border-amber-200',
    text: 'Efsanevi',
    bg: 'border-amber-100 hover:border-amber-300',
  },
};

export function ItemCard({ item }: ItemCardProps) {
  const {
    equipped,
    toggleItem,
    setItemColor,
    itemColors,
    favorites,
    toggleFavorite,
  } = useGameStore();

  const { playPop, playSparkle, playHeart } = useSoundEffects();

  const isEquipped = equipped[item.category] === item.id;
  const isFav = favorites.includes(item.id);
  const currentColor = itemColors[item.id] || item.defaultColor;
  const rarity = RARITY_STYLES[item.rarity] || RARITY_STYLES.common;

  const handleClick = () => {
    if (!isEquipped) {
      if (item.rarity === 'legendary' || item.rarity === 'epic') {
        playSparkle();
      } else {
        playPop();
      }
    } else {
      playPop();
    }
    toggleItem(item);
  };

  const handleColorChange = (e: React.MouseEvent, colorHex: string) => {
    e.stopPropagation();
    playPop();
    setItemColor(item.id, colorHex);
    if (!isEquipped) {
      toggleItem(item);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHeart();
    toggleFavorite(item.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none bg-white/90 backdrop-blur-sm shadow-xs hover:shadow-md ${
        isEquipped
          ? 'border-2 border-pink-500 shadow-pink-200/80 shadow-md ring-2 ring-pink-300/40 transform -translate-y-0.5'
          : `border border-pink-100/80 hover:border-pink-300 ${rarity.bg}`
      }`}
    >
      {/* Active Checkmark Pill */}
      {isEquipped && (
        <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md animate-bounce-subtle">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      )}

      {/* Favorite Heart Button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 left-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-xs shadow-xs transition-transform active:scale-125 hover:scale-110 ${
          isFav ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'
        }`}
        title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
      >
        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
      </button>

      {/* Item Icon / Visual Banner */}
      <div
        className={`w-full aspect-square rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-inner relative overflow-hidden mb-2`}
      >
        <span className="transform transition-transform duration-200 group-hover:scale-110">
          {item.icon}
        </span>

        {/* Selected Color Indicator Dot */}
        {currentColor && (
          <div
            className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: currentColor }}
          />
        )}
      </div>

      {/* Item Information */}
      <div className="flex items-start justify-between gap-1 mb-1">
        <h4 className="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">
          {item.nameTr || item.name}
        </h4>
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${rarity.badge}`}
        >
          {rarity.text}
        </span>
      </div>

      {/* Available Color Swatches */}
      {item.availableColors && item.availableColors.length > 1 && (
        <div
          className="flex items-center gap-1 mt-2 pt-2 border-t border-pink-50 overflow-x-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {item.availableColors.slice(0, 5).map((colorHex) => (
            <button
              key={colorHex}
              onClick={(e) => handleColorChange(e, colorHex)}
              className={`w-4 h-4 rounded-full border transition-all ${
                currentColor === colorHex
                  ? 'scale-125 border-pink-600 ring-1 ring-pink-300'
                  : 'border-white/80 hover:scale-110'
              }`}
              style={{ backgroundColor: colorHex }}
              title={colorHex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
