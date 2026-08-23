'use client';

import React, { useState } from 'react';
import { CATEGORIES } from '@/data/categories';
import { ITEMS_BY_CATEGORY } from '@/data/clothing';
import { ItemCard } from './ItemCard';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Sparkles, Trash2, Heart } from 'lucide-react';
import { ClothingCategory } from '@/types/character';

export function CategorySidebar() {
  const {
    activeCategory,
    setActiveCategory,
    equipped,
    unequipCategory,
    favorites,
  } = useGameStore();

  const { playPop } = useSoundEffects();
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const currentCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const allCategoryItems = ITEMS_BY_CATEGORY[activeCategory] || [];
  const items = onlyFavorites
    ? allCategoryItems.filter((item) => favorites.includes(item.id))
    : allCategoryItems;

  const isCategoryEquipped = !!equipped[activeCategory];

  const handleCategoryClick = (catId: ClothingCategory) => {
    playPop();
    setActiveCategory(catId);
  };

  const handleUnequip = () => {
    playPop();
    unequipCategory(activeCategory);
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-white/75 backdrop-blur-2xl border-r border-pink-200/60 shadow-xl rounded-r-3xl z-20 select-none overflow-hidden">
      {/* Category Header */}
      <div className="p-4 border-b border-pink-100/80 bg-gradient-to-r from-pink-50/80 to-purple-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentCategoryInfo.icon}</span>
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              {currentCategoryInfo.nameTr}
            </h3>
            <p className="text-[11px] text-pink-500 font-medium">
              {allCategoryItems.length} parça mevcut
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Favorite filter toggle */}
          <button
            onClick={() => {
              playPop();
              setOnlyFavorites(!onlyFavorites);
            }}
            className={`p-1.5 rounded-xl border transition-all ${
              onlyFavorites
                ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                : 'bg-white text-gray-400 hover:text-pink-500 border-pink-100'
            }`}
            title={onlyFavorites ? 'Tümünü Göster' : 'Sadece Favorileri Göster'}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
          </button>

          {/* Unequip Button for non-mandatory items */}
          {activeCategory !== 'hair' && isCategoryEquipped && (
            <button
              onClick={handleUnequip}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100/80 rounded-xl border border-rose-200/60 transition-all shadow-xs active:scale-95"
              title="Bu parçayı çıkar"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Çıkar</span>
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Tab Bar */}
      <div className="flex items-center gap-1.5 p-2.5 overflow-x-auto bg-pink-50/40 border-b border-pink-100/60 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const hasEquipped = !!equipped[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`relative flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 transform scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-pink-100/60 hover:text-pink-600 border border-pink-100'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.nameTr}</span>
              {hasEquipped && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Items Scrollable Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-pink-100/70 flex items-center justify-center text-2xl mb-2">
              🌸
            </div>
            <h4 className="text-xs font-bold text-gray-700 mb-1">
              {onlyFavorites ? 'Favori parça bulunamadı' : 'Koleksiyon Hazırlanıyor ♡'}
            </h4>
            <p className="text-[11px] text-pink-500/80">
              {onlyFavorites
                ? 'Bu kategoride kalp verdiğin bir parça yok.'
                : 'Bu kategori için yeni modeller stüdyoya eklenecektir!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Category Note or Tip */}
        <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 flex items-start gap-2 text-pink-600">
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {activeCategory === 'dress'
              ? 'Elbise seçildiğinde üst ve alt kıyafetler otomatik olarak gizlenir.'
              : 'İstediğin kıyafeti seçip altındaki renk paletinden tonunu değiştirebilirsin!'}
          </p>
        </div>
      </div>
    </aside>
  );
}
