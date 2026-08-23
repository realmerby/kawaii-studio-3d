'use client';

import React from 'react';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { CATEGORIES } from '@/data/categories';
import { ITEMS_BY_CATEGORY } from '@/data/clothing';
import { ItemCard } from './ItemCard';
import { CharacterCustomizer } from './CharacterCustomizer';
import { PosePanel } from './PosePanel';
import { PresetPanel } from './PresetPanel';
import { FavoritesPanel } from './FavoritesPanel';
import { Shirt, Sparkles, Wand2, Camera, X, Trash2, User, Heart } from 'lucide-react';

export function MobileNavigation() {
  const {
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    isMobileDrawerOpen,
    setMobileDrawerOpen,
    setPhotoModalOpen,
    equipped,
    unequipCategory,
    favorites,
  } = useGameStore();

  const { playPop, playCameraSnap } = useSoundEffects();

  const items = ITEMS_BY_CATEGORY[activeCategory] || [];
  const isCategoryEquipped = !!equipped[activeCategory];

  const handleTabClick = (tab: 'character' | 'wardrobe' | 'poses' | 'presets' | 'favorites') => {
    playPop();
    if (activeTab === tab && isMobileDrawerOpen) {
      setMobileDrawerOpen(false);
    } else {
      setActiveTab(tab);
      setMobileDrawerOpen(true);
    }
  };

  const handlePhotoClick = () => {
    playCameraSnap();
    setMobileDrawerOpen(false);
    setPhotoModalOpen(true);
  };

  return (
    <div className="md:hidden">
      {/* Slide-Up Bottom Sheet Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/30 backdrop-blur-xs">
          {/* Backdrop click to close */}
          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div className="w-full max-h-[70vh] bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-pink-200 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Sheet Handle & Close */}
            <div className="p-3 border-b border-pink-100 flex items-center justify-between">
              <div className="w-10" />
              <div className="w-12 h-1.5 bg-pink-200 rounded-full" />
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content per Active Tab */}
            {activeTab === 'character' && (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <CharacterCustomizer />
              </div>
            )}

            {activeTab === 'wardrobe' && (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Horizontal Category Strip */}
                <div className="flex items-center gap-1.5 p-2 overflow-x-auto bg-pink-50/50 border-b border-pink-100 no-scrollbar">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    const hasEquipped = !!equipped[cat.id];

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          playPop();
                          setActiveCategory(cat.id);
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-pink-500 text-white shadow-xs'
                            : 'bg-white text-gray-700 border border-pink-100'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.nameTr}</span>
                        {hasEquipped && !isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                  {activeCategory !== 'hair' && isCategoryEquipped && (
                    <div className="flex justify-end mb-1">
                      <button
                        onClick={() => {
                          playPop();
                          unequipCategory(activeCategory);
                        }}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-rose-500 bg-rose-50 rounded-xl border border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Bu parçayı çıkar</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2.5">
                    {items.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'poses' && (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <PosePanel />
              </div>
            )}

            {activeTab === 'presets' && (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <PresetPanel />
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <FavoritesPanel />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-t border-pink-200/80 shadow-lg z-30 flex items-center justify-around px-1 select-none">
        <button
          onClick={() => handleTabClick('character')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
            activeTab === 'character' && isMobileDrawerOpen
              ? 'text-pink-600 bg-pink-50 font-bold'
              : 'text-gray-600'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px]">Karakter</span>
        </button>

        <button
          onClick={() => handleTabClick('wardrobe')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
            activeTab === 'wardrobe' && isMobileDrawerOpen
              ? 'text-pink-600 bg-pink-50 font-bold'
              : 'text-gray-600'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span className="text-[10px]">Gardırop</span>
        </button>

        <button
          onClick={() => handleTabClick('poses')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
            activeTab === 'poses' && isMobileDrawerOpen
              ? 'text-purple-600 bg-purple-50 font-bold'
              : 'text-gray-600'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px]">Pozlar</span>
        </button>

        <button
          onClick={() => handleTabClick('presets')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
            activeTab === 'presets' && isMobileDrawerOpen
              ? 'text-rose-600 bg-rose-50 font-bold'
              : 'text-gray-600'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span className="text-[10px]">Stiller</span>
        </button>

        <button
          onClick={() => handleTabClick('favorites')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all ${
            activeTab === 'favorites' && isMobileDrawerOpen
              ? 'text-pink-600 bg-pink-50 font-bold'
              : 'text-gray-600'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px]">Favoriler</span>
        </button>

        <button
          onClick={handlePhotoClick}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-pink-600 font-bold"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-200">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px]">Fotoğraf</span>
        </button>
      </nav>
    </div>
  );
}
