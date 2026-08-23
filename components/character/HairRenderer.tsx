'use client';

import { CharacterColors } from '@/types/character';

interface HairRendererProps {
  hairId?: string | null;
  colors?: CharacterColors;
  itemColor?: string;
}

/**
 * HairRenderer is reserved for fully rigged, avatar-compatible external VRM/GLB hair assets.
 * The primary character hair is rendered natively via the anime_girl.vrm skeleton and spring-bone engine.
 */
export function HairRenderer(_props?: HairRendererProps) {
  return null;
}
