import { ClothingCategory, ClothingItem } from '@/types/character';
import { HAIRS } from './hairs';
import { TOPS } from './tops';
import { BOTTOMS } from './bottoms';
import { DRESSES } from './dresses';
import { SHOES } from './shoes';
import { SOCKS } from './socks';
import { ACCESSORIES } from './accessories';
import { BAGS } from './bags';
import { HEAD_ACCESSORIES } from './headAccessories';

export {
  HAIRS,
  TOPS,
  BOTTOMS,
  DRESSES,
  SHOES,
  SOCKS,
  ACCESSORIES,
  BAGS,
  HEAD_ACCESSORIES,
};

export const ALL_ITEMS: ClothingItem[] = [
  ...HAIRS,
  ...TOPS,
  ...BOTTOMS,
  ...DRESSES,
  ...SHOES,
  ...SOCKS,
  ...ACCESSORIES,
  ...BAGS,
  ...HEAD_ACCESSORIES,
];

export const ITEMS_BY_CATEGORY: Record<ClothingCategory, ClothingItem[]> = {
  hair: HAIRS,
  headAccessory: HEAD_ACCESSORIES,
  top: TOPS,
  bottom: BOTTOMS,
  dress: DRESSES,
  socks: SOCKS,
  shoes: SHOES,
  accessory: ACCESSORIES,
  bag: BAGS,
};

export function getItemById(id?: string | null): ClothingItem | undefined {
  if (!id) return undefined;
  return ALL_ITEMS.find((item) => item.id === id);
}
