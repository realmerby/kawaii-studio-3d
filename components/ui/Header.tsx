'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Sparkles, Dices, RotateCcw, Volume2, VolumeX, Camera, Heart } from 'lucide-react';

export function Header() {
  const {
    randomizeOutfit,
    resetToDefault,
    soundEnabled,
    setSoundEnabled,
    setPhotoModalOpen,
  } = useGameStore();

  const { playClick, playRandomize, playReset, playCameraSnap } = useSoundEffects();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleRandomize = () => {
    playRandomize();
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 500);

    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.15 },
      colors: ['#ff80ab', '#ff4081', '#ea80fc', '#ffd180', '#ffffff'],
    });
    randomizeOutfit();
    showToast('✨ Yeni sevimli kombin ve poz seçildi!');
  };

  const handleReset = () => {
    playReset();
    resetToDefault();
    showToast('🌸 Karakter varsayılan haline döndürüldü!');
  };

  const handlePhotoClick = () => {
    playCameraSnap();
    setPhotoModalOpen(true);
  };

  return (
    <header className="relative h-16 px-4 md:px-6 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-pink-200/60 shadow-sm z-30 select-none">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-400 flex items-center justify-center text-white shadow-md shadow-pink-200 animate-pulse-glow">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base md:text-lg font-black bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tight font-sans">
              Kawaii Studio 3D
            </h1>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-pink-100 text-pink-600 rounded-full border border-pink-200">
              Dress Up
            </span>
          </div>
          <p className="text-[11px] text-pink-400 font-medium hidden sm:flex items-center gap-1">
            <span>3D Anime Giydirme Stüdyosu</span>
            <span className="text-pink-300">•</span>
            <span>made with <span className="text-pink-500 font-bold">♡</span> by <span className="font-extrabold text-pink-600">merbybutter</span></span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Randomize Outfit */}
        <button
          onClick={handleRandomize}
          className={`flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-pink-200/80 transition-all hover:scale-105 active:scale-95 ${
            isShuffling ? 'animate-spin' : ''
          }`}
          title="Rastgele Sevimli Kombin & Poz"
        >
          <Dices className={`w-4 h-4 ${isShuffling ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">Rastgele</span>
        </button>

        {/* Reset Outfit */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:text-pink-600 bg-white/80 hover:bg-pink-50 rounded-2xl border border-pink-200/60 shadow-sm transition-all hover:scale-105 active:scale-95 text-xs font-bold"
          title="Varsayılana Sıfırla"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden lg:inline">Sıfırla</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            playClick();
            setSoundEnabled(!soundEnabled);
          }}
          className={`p-2 rounded-2xl border shadow-sm transition-all hover:scale-105 active:scale-95 ${
            soundEnabled
              ? 'text-pink-600 bg-pink-50 border-pink-200'
              : 'text-gray-400 bg-white/80 border-gray-200'
          }`}
          title={soundEnabled ? 'Sesi Kapat (Mute)' : 'Sesi Aç (Unmute)'}
          aria-label={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Photo Studio / Polaroid Modal Trigger */}
        <button
          onClick={handlePhotoClick}
          className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-200/80 transition-all hover:scale-105 active:scale-95"
          title="Polaroid Fotoğraf Çek"
        >
          <Camera className="w-4 h-4" />
          <span className="hidden md:inline">Fotoğraf Çek</span>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-200 text-pink-600 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
}
