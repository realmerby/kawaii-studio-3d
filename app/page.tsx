'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/ui/Header';
import { CategorySidebar } from '@/components/ui/CategorySidebar';
import { CharacterCustomizer } from '@/components/ui/CharacterCustomizer';
import { PosePanel } from '@/components/ui/PosePanel';
import { PresetPanel } from '@/components/ui/PresetPanel';
import { FavoritesPanel } from '@/components/ui/FavoritesPanel';
import { FloatingHUD } from '@/components/ui/FloatingHUD';
import { MobileNavigation } from '@/components/ui/MobileNavigation';
import { PhotoModal } from '@/components/ui/PhotoModal';
import { LoadingScreen } from '@/components/scene/LoadingScreen';
import { DecorativeBackground } from '@/components/scene/DecorativeBackground';
import { useGameStore } from '@/lib/store';
import { Sparkles, Shirt, User, Wand2, Heart } from 'lucide-react';

// Dynamic import of 3D Canvas with ssr: false for rock-solid client-side WebGL rendering
const GameCanvas = dynamic(
  () => import('@/components/scene/GameCanvas').then((mod) => mod.GameCanvas),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

export default function Home() {
  const [leftTab, setLeftTab] = useState<'wardrobe' | 'character'>('wardrobe');
  const [rightTab, setRightTab] = useState<'poses' | 'presets' | 'favorites'>('poses');
  const loadSavedState = useGameStore((state) => state.loadSavedState);

  useEffect(() => {
    // Smoothly restore last created character and favorites from localStorage
    loadSavedState();
  }, [loadSavedState]);

  return (
    <main className="relative flex flex-col h-screen w-screen overflow-hidden select-none bg-gradient-to-br from-pink-100/60 via-purple-50/40 to-pink-200/50">
      {/* 0. Subtle Decorative Background Elements */}
      <DecorativeBackground />

      {/* 1. Header Bar */}
      <Header />

      {/* 2. Main Studio Canvas & Panels Area */}
      <div className="flex-1 flex relative overflow-hidden z-10">
        {/* Desktop Left Dock: Wardrobe & Character Customization */}
        <div className="hidden md:flex shrink-0 p-3 h-full flex-col">
          <div className="w-80 h-full flex flex-col bg-white/75 backdrop-blur-2xl border border-pink-200/70 shadow-xl rounded-3xl overflow-hidden">
            {/* Tab Switcher Header */}
            <div className="p-2 border-b border-pink-100/80 bg-gradient-to-r from-pink-50/80 to-purple-50/60 flex items-center gap-1">
              <button
                onClick={() => setLeftTab('wardrobe')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-bold transition-all ${
                  leftTab === 'wardrobe'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200'
                    : 'text-gray-600 hover:bg-pink-100/50'
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Gardırop</span>
              </button>

              <button
                onClick={() => setLeftTab('character')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-bold transition-all ${
                  leftTab === 'character'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200'
                    : 'text-gray-600 hover:bg-pink-100/50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Karakter</span>
              </button>
            </div>

            {/* Left Content Area */}
            <div className="flex-1 overflow-hidden">
              {leftTab === 'wardrobe' ? <CategorySidebar /> : <CharacterCustomizer />}
            </div>
          </div>
        </div>

        {/* Center 3D Stage & Canvas */}
        <div className="flex-1 relative h-full w-full overflow-hidden flex flex-col">
          <GameCanvas />
          <FloatingHUD />
        </div>

        {/* Desktop Right Dock: Poses, Presets & Favorites */}
        <div className="hidden lg:flex shrink-0 p-3 h-full flex-col">
          <div className="w-80 h-full flex flex-col bg-white/75 backdrop-blur-2xl border border-pink-200/70 shadow-xl rounded-3xl overflow-hidden">
            {/* Tab Switcher Header */}
            <div className="p-2 border-b border-pink-100/80 bg-gradient-to-r from-purple-50/60 via-pink-50/80 to-rose-50/60 flex items-center gap-1">
              <button
                onClick={() => setRightTab('poses')}
                className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-2xl text-xs font-bold transition-all ${
                  rightTab === 'poses'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200'
                    : 'text-gray-600 hover:bg-pink-100/50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Pozlar</span>
              </button>

              <button
                onClick={() => setRightTab('presets')}
                className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-2xl text-xs font-bold transition-all ${
                  rightTab === 'presets'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200'
                    : 'text-gray-600 hover:bg-pink-100/50'
                }`}
              >
                <Wand2 className="w-3 h-3" />
                <span>Stiller</span>
              </button>

              <button
                onClick={() => setRightTab('favorites')}
                className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-2xl text-xs font-bold transition-all ${
                  rightTab === 'favorites'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-pink-200'
                    : 'text-gray-600 hover:bg-pink-100/50'
                }`}
              >
                <Heart className="w-3 h-3" />
                <span>Favoriler</span>
              </button>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 overflow-hidden">
              {rightTab === 'poses' && <PosePanel />}
              {rightTab === 'presets' && <PresetPanel />}
              {rightTab === 'favorites' && <FavoritesPanel />}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation & Drawers */}
      <MobileNavigation />

      {/* 4. Photo Studio / Polaroid Modal */}
      <PhotoModal />
    </main>
  );
}
