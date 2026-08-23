'use client';

import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/lib/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { X, Download, Share2, Sparkles, Heart, Check } from 'lucide-react';

export function PhotoModal() {
  const { isPhotoModalOpen, setPhotoModalOpen } = useGameStore();
  const { playSparkle, playPop } = useSoundEffects();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [characterTitle, setCharacterTitle] = useState('Kawaii Princess ✨');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPhotoModalOpen) {
      // Find the WebGL canvas in DOM and capture frame
      const canvas = document.querySelector('canvas');
      if (canvas) {
        try {
          const dataUrl = canvas.toDataURL('image/png');
          setPhotoUrl(dataUrl);
          playSparkle();
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.3 },
            colors: ['#ff80ab', '#ff4081', '#ea80fc', '#ffd180', '#ffffff'],
          });
        } catch {
          // Canvas capture error
        }
      }
    } else {
      setPhotoUrl(null);
    }
  }, [isPhotoModalOpen, playSparkle]);

  if (!isPhotoModalOpen) return null;

  const handleDownload = () => {
    playPop();
    if (!photoUrl) return;

    // Create a synthesized canvas with polaroid frame
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 800;
      canvas.height = 1000;

      if (ctx) {
        // Pastel Polaroid Background
        ctx.fillStyle = '#FFF5F8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cute Outer Border
        ctx.strokeStyle = '#FFB6C1';
        ctx.lineWidth = 12;
        ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

        // Character Photo
        ctx.drawImage(img, 40, 40, 720, 780);

        // Inner photo border
        ctx.strokeStyle = '#FFE4E6';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, 720, 780);

        // Polaroid Text
        ctx.fillStyle = '#BE185D';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(characterTitle, canvas.width / 2, 880);

        ctx.fillStyle = '#F472B6';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Kawaii Studio 3D • made by merbybutter • ${new Date().toLocaleDateString('tr-TR')}`, canvas.width / 2, 930);

        // Download PNG
        const link = document.createElement('a');
        link.download = `kawaii-character-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = photoUrl;
  };

  const handleShare = async () => {
    playPop();
    if (navigator.share && photoUrl) {
      try {
        const blob = await (await fetch(photoUrl)).blob();
        const file = new File([blob], 'kawaii-character.png', { type: 'image/png' });
        await navigator.share({
          title: 'Benim Kawaii Anime Karakterim! 💖',
          text: 'Kawaii Studio 3D ile oluşturduğum tatlı anime karakterine bak!',
          files: [file],
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-4 border-pink-200 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => setPhotoModalOpen(false)}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Polaroid Card Frame */}
        <div
          ref={cardRef}
          className="w-full bg-gradient-to-b from-pink-50/70 to-rose-50/50 p-3.5 rounded-2xl border-2 border-pink-200/80 shadow-inner flex flex-col items-center"
        >
          {/* Photo Container */}
          <div className="relative w-full aspect-[4/5] bg-pink-100 rounded-xl overflow-hidden shadow-md border border-pink-200">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt="Captured Character"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pink-400">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            )}

            {/* Cute Overlay Badges */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-bold text-pink-600 shadow-sm">
              🎀 Kawaii Studio
            </div>
          </div>

          {/* Editable Caption */}
          <div className="w-full mt-3 flex flex-col items-center">
            <input
              type="text"
              value={characterTitle}
              onChange={(e) => setCharacterTitle(e.target.value)}
              className="w-full text-center text-sm font-bold text-pink-700 bg-transparent border-b border-pink-200 focus:border-pink-500 outline-none pb-0.5"
              placeholder="Karakterine bir isim ver..."
            />
            <p className="text-[10px] text-pink-400 font-medium mt-1">
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2.5 mt-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-pink-200 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Kartı İndir</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-purple-50 hover:bg-purple-100/80 text-purple-700 rounded-2xl text-xs font-bold border border-purple-200 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Paylaş</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
