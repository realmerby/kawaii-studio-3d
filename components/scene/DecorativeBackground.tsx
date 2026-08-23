'use client';

import React from 'react';

const FLOATING_STICKERS = [
  { icon: '🎀', top: '8%', left: '4%', size: 'text-2xl', delay: '0s', duration: '6s' },
  { icon: '✨', top: '15%', right: '6%', size: 'text-xl', delay: '1s', duration: '5s' },
  { icon: '💖', top: '45%', left: '2%', size: 'text-2xl', delay: '2s', duration: '7s' },
  { icon: '🍓', top: '75%', left: '5%', size: 'text-xl', delay: '1.5s', duration: '6s' },
  { icon: '⭐', top: '35%', right: '3%', size: 'text-2xl', delay: '0.5s', duration: '5.5s' },
  { icon: '🌸', top: '80%', right: '4%', size: 'text-2xl', delay: '2.5s', duration: '6.5s' },
  { icon: '🐾', top: '60%', right: '6%', size: 'text-lg', delay: '3s', duration: '7s' },
];

export function DecorativeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {FLOATING_STICKERS.map((s, index) => (
        <div
          key={index}
          className={`absolute ${s.size} opacity-20 filter blur-[0.3px] transition-transform animate-float`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          {s.icon}
        </div>
      ))}
    </div>
  );
}
