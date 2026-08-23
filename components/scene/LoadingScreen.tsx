'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

const LOADING_MESSAGES = [
  '♡ getting her ready...',
  '♡ saçları taranıyor...',
  '♡ en tatlı kombini hazırlıyoruz...',
  '♡ parıltılar ve allık ekleniyor...',
  '♡ 3D stüdyo açılıyor...',
];

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 select-none">
      <div className="relative flex flex-col items-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-200/80 animate-pulse-glow max-w-xs text-center">
        {/* Animated Heart Icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-400 flex items-center justify-center shadow-lg shadow-pink-300/50 animate-bounce">
            <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-spin" />
        </div>

        <h2 className="text-lg font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-wide font-sans mb-1">
          Kawaii Studio 3D ✨
        </h2>
        <p className="text-xs text-pink-500 font-semibold transition-all duration-300 h-5">
          {LOADING_MESSAGES[messageIndex]}
        </p>

        {/* Cute Loading Progress Bar */}
        <div className="w-48 h-2 bg-pink-100 rounded-full mt-4 overflow-hidden border border-pink-200 shadow-inner">
          <div className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] w-full" />
        </div>
      </div>
    </div>
  );
}
