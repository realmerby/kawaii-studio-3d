import {
  EyeStyle,
  EyebrowStyle,
  MouthStyle,
  BlushStyle,
  EarringStyle,
} from '@/types/character';

export interface FaceOptionItem<T> {
  id: T;
  nameTr: string;
  icon: string;
  description: string;
}

export const EYE_STYLES: FaceOptionItem<EyeStyle>[] = [
  {
    id: 'sparkle',
    nameTr: 'Işıltılı Anime',
    icon: '✨',
    description: 'Büyük parlak gözbebekleri ve çoklu parıltı noktaları.',
  },
  {
    id: 'cateye',
    nameTr: 'Gyaru Kedi Gözü',
    icon: '🐱',
    description: 'Kuyruklu çekici eyeliner ve havalı bakış.',
  },
  {
    id: 'soft',
    nameTr: 'Yumuşak Masum',
    icon: '🌸',
    description: 'Yuvarlak, tatlı ve masum anime göz yapısı.',
  },
  {
    id: 'heart',
    nameTr: 'Kalp Parıltılı',
    icon: '💖',
    description: 'Göz bebeği içinde sevimli minik kalp ışıltısı.',
  },
];

export const EYEBROW_STYLES: FaceOptionItem<EyebrowStyle>[] = [
  {
    id: 'gentle',
    nameTr: 'Doğal Kavisli',
    icon: '〰️',
    description: 'Yumuşak ve doğal kavisli kaşlar.',
  },
  {
    id: 'straight',
    nameTr: 'Düz Kore/Anime',
    icon: '➖',
    description: 'Popüler düz ve masum anime kaş stili.',
  },
  {
    id: 'confident',
    nameTr: 'Havalı Gyaru',
    icon: '📐',
    description: 'Kalkık ve kendinden emin stilize kaşlar.',
  },
  {
    id: 'playful',
    nameTr: 'Neşeli Yay',
    icon: '🌈',
    description: 'Hafif kalkık ve sempatik ifade veren kaşlar.',
  },
];

export const MOUTH_STYLES: FaceOptionItem<MouthStyle>[] = [
  {
    id: 'smile',
    nameTr: 'Tatlı Tebessüm',
    icon: '😊',
    description: 'Zarif ve kibar anime gülümsemesi.',
  },
  {
    id: 'open',
    nameTr: 'Neşeli Açık Gülüş',
    icon: '😄',
    description: 'Enerjik ve mutlu açık ağız gülümsemesi.',
  },
  {
    id: 'catpout',
    nameTr: 'Kedi Ağzı :3',
    icon: '🐱',
    description: 'Sevimli :3 şekilli kedi dudağı büküşü.',
  },
  {
    id: 'smirk',
    nameTr: 'Havalı Yan Gülüş',
    icon: '😏',
    description: 'Hafif muzip ve çekici yan gülümseme.',
  },
];

export const BLUSH_STYLES: FaceOptionItem<BlushStyle>[] = [
  {
    id: 'sparkles',
    nameTr: 'Çizgili Parıltı',
    icon: '✨',
    description: 'Yanaklarda sevimli anime parıltı çizgileri.',
  },
  {
    id: 'circles',
    nameTr: 'Yumuşak Daire',
    icon: '🍥',
    description: 'Dairesel ve tatlı pembe allık noktaları.',
  },
  {
    id: 'rosy',
    nameTr: 'Gül Pembesi',
    icon: '🌹',
    description: 'Tüm yanağa yayılan doğal gül tonu.',
  },
  {
    id: 'peachy',
    nameTr: 'Şeftali Işıltısı',
    icon: '🍑',
    description: 'Sıcak ve enerjik şeftali tonlu hafif allık.',
  },
];

export const EARRING_STYLES: FaceOptionItem<EarringStyle>[] = [
  {
    id: 'none',
    nameTr: 'Küpe Yok',
    icon: '❌',
    description: 'Küpeleri çıkar.',
  },
  {
    id: 'heart_studs',
    nameTr: 'Pembe Kalp Küpe',
    icon: '💖',
    description: 'Kulak memesine oturan parlak kalp küpeler.',
  },
  {
    id: 'pearl_drops',
    nameTr: 'İnci Sallantılı',
    icon: '🤍',
    description: 'Zarif beyaz inci sarkıtlı küpeler.',
  },
  {
    id: 'star_dangles',
    nameTr: 'Altın Yıldız Küpe',
    icon: '⭐',
    description: 'Işıltılı sallantılı altın yıldız küpeler.',
  },
  {
    id: 'gold_hoops',
    nameTr: 'Gyaru Halka Küpe',
    icon: '💫',
    description: 'Şık ve parlak gyaru tarzı mini altın halkalar.',
  },
];
