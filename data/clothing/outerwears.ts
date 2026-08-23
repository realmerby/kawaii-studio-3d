import { ClothingItem } from '@/types/character';

/**
 * Outerwear Registry (Cardigans, Jackets, Coats)
 * Designed for modular clothing layer expansion
 */
export const OUTERWEARS: ClothingItem[] = [
  {
    id: 'outer-pastel-cardigan',
    name: 'Oversized Pastel Cardigan',
    nameTr: 'Oversize Pastel Hırka',
    category: 'outerwear',
    meshType: 'pastel_cardigan',
    itemType: 'reskin',
    pattern: 'solid',
    layer: 4,
    icon: '🧥',
    gradient: 'from-amber-200 to-rose-300',
    rarity: 'rare',
    description: 'Kıyafetlerin üzerine rahatça giyilebilen yumuşacık ve dökümlü pastel anime hırkası.',
    defaultColor: '#FDE68A',
    patternSecondaryColor: '#FFFFFF',
    availableColors: ['#FDE68A', '#FFB6C1', '#C084FC', '#BAE6FD', '#18181B'],
    tags: ['cardigan', 'outerwear', 'comfy', 'pastel', 'school'],
    compatibleWith: ['top', 'dress'],
  },
];
