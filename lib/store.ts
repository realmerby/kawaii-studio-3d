import { create } from 'zustand';
import {
  ClothingCategory,
  ClothingItem,
  CharacterColors,
  CharacterFaceFeatures,
  CameraPreset,
} from '@/types/character';
import { ALL_ITEMS, getItemById, ITEMS_BY_CATEGORY } from '@/data/clothing';
import { FULL_CHARACTER_PRESETS, OUTFIT_PRESETS } from '@/data/presets';
import { POSES } from '@/data/poses/posesList';

const STORAGE_KEY = 'kawaii_studio_save_v1';
const FAVORITES_KEY = 'kawaii_studio_favorites_v1';

export interface GameState {
  // Character clothing & items
  equipped: Record<ClothingCategory, string | null>;
  hiddenBackup: {
    top: string | null;
    bottom: string | null;
  };
  itemColors: Record<string, string>;

  // Character appearance
  colors: CharacterColors;
  faceFeatures: CharacterFaceFeatures;

  // Favorites
  favorites: string[];

  // Poses and motion
  poseId: string;
  idleAnimation: boolean;
  animationSpeed: number;
  autoRotate: boolean;

  // Camera & View
  cameraPreset: CameraPreset;
  cameraResetCount: number;

  // UI state
  activeCategory: ClothingCategory;
  activeTab: 'character' | 'wardrobe' | 'poses' | 'presets' | 'favorites';
  characterSubTab: 'features' | 'colors' | 'hair' | 'earrings';
  isMobileDrawerOpen: boolean;
  isPhotoModalOpen: boolean;
  soundEnabled: boolean;
  sparkleCount: number;
  screenshotDataUrl: string | null;

  // Actions
  setActiveCategory: (cat: ClothingCategory) => void;
  setActiveTab: (tab: 'character' | 'wardrobe' | 'poses' | 'presets' | 'favorites') => void;
  setCharacterSubTab: (subTab: 'features' | 'colors' | 'hair' | 'earrings') => void;
  setMobileDrawerOpen: (open: boolean) => void;
  setPhotoModalOpen: (open: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setAutoRotate: (rotate: boolean) => void;
  setIdleAnimation: (idle: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setCameraPreset: (preset: CameraPreset) => void;
  resetCamera: () => void;

  // Character Customization Actions
  equipItem: (item: ClothingItem) => void;
  unequipCategory: (category: ClothingCategory) => void;
  toggleItem: (item: ClothingItem) => void;
  setItemColor: (itemId: string, color: string) => void;
  setColors: (colors: Partial<CharacterColors>) => void;
  setFaceFeatures: (features: Partial<CharacterFaceFeatures>) => void;
  setPose: (poseId: string) => void;

  // Favorites Actions
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Presets Actions
  applyFullCharacterPreset: (presetId: string) => void;
  applyOutfitOnlyPreset: (presetId: string) => void;
  randomizeOutfit: () => void;
  resetToDefault: () => void;
  triggerSparkle: () => void;
  setScreenshotDataUrl: (url: string | null) => void;
  loadSavedState: () => void;
}

const DEFAULT_EQUIPPED: Record<ClothingCategory, string | null> = {
  hair: 'hair-twintails',
  headAccessory: 'head-kitty-ears',
  top: 'top-bunny-hoodie',
  bottom: 'bottom-pleated-skirt',
  dress: null,
  socks: 'socks-thigh-high-striped',
  shoes: 'shoes-platform-mary-janes',
  accessory: 'acc-ribbon-choker',
  bag: 'bag-heart-crossbody',
};

const DEFAULT_COLORS: CharacterColors = {
  hairColor: '#FFA8CA',
  hairHighlightColor: '#FFFFFF',
  eyeColor: '#9333EA',
  skinTone: '#FFF5F0',
  blushIntensity: 0.85,
  lipColor: '#FB7185',
};

const DEFAULT_FACE: CharacterFaceFeatures = {
  eyeStyle: 'sparkle',
  eyebrowStyle: 'gentle',
  mouthStyle: 'smile',
  blushStyle: 'sparkles',
  earrings: 'heart_studs',
};

function saveToLocalStorage(state: Partial<GameState>) {
  if (typeof window === 'undefined') return;
  try {
    const dataToSave = {
      equipped: state.equipped,
      hiddenBackup: state.hiddenBackup,
      itemColors: state.itemColors,
      colors: state.colors,
      faceFeatures: state.faceFeatures,
      poseId: state.poseId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    if (state.favorites) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    }
  } catch {
    // Storage restricted
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  equipped: { ...DEFAULT_EQUIPPED },
  hiddenBackup: {
    top: 'top-bunny-hoodie',
    bottom: 'bottom-pleated-skirt',
  },
  itemColors: {},
  colors: { ...DEFAULT_COLORS },
  faceFeatures: { ...DEFAULT_FACE },
  favorites: [],
  poseId: 'pose-peace-sign',
  idleAnimation: true,
  animationSpeed: 1,
  autoRotate: false,

  cameraPreset: 'full',
  cameraResetCount: 0,

  activeCategory: 'top',
  activeTab: 'wardrobe',
  characterSubTab: 'features',
  isMobileDrawerOpen: false,
  isPhotoModalOpen: false,
  soundEnabled: true,
  sparkleCount: 0,
  screenshotDataUrl: null,

  setActiveCategory: (activeCategory) => set({ activeCategory, isMobileDrawerOpen: true }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setCharacterSubTab: (characterSubTab) => set({ characterSubTab }),
  setMobileDrawerOpen: (isMobileDrawerOpen) => set({ isMobileDrawerOpen }),
  setPhotoModalOpen: (isPhotoModalOpen) => set({ isPhotoModalOpen }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setIdleAnimation: (idleAnimation) => set({ idleAnimation }),
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  resetCamera: () => set((state) => ({ cameraResetCount: state.cameraResetCount + 1 })),
  triggerSparkle: () => set((state) => ({ sparkleCount: state.sparkleCount + 1 })),
  setScreenshotDataUrl: (screenshotDataUrl) => set({ screenshotDataUrl }),

  equipItem: (item: ClothingItem) => {
    const state = get();
    const newEquipped = { ...state.equipped };
    let newBackup = { ...state.hiddenBackup };

    if (item.category === 'dress') {
      if (newEquipped.top) newBackup.top = newEquipped.top;
      if (newEquipped.bottom) newBackup.bottom = newEquipped.bottom;
      newEquipped.top = null;
      newEquipped.bottom = null;
      newEquipped.dress = item.id;
    } else if (item.category === 'top' || item.category === 'bottom') {
      if (newEquipped.dress) {
        newEquipped.dress = null;
      }
      newEquipped[item.category] = item.id;
      if (item.category === 'top') newBackup.top = item.id;
      if (item.category === 'bottom') newBackup.bottom = item.id;
    } else {
      newEquipped[item.category] = item.id;
    }

    const updated = {
      equipped: newEquipped,
      hiddenBackup: newBackup,
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  unequipCategory: (category: ClothingCategory) => {
    const state = get();
    const newEquipped = { ...state.equipped };

    if (category === 'dress' && newEquipped.dress) {
      newEquipped.dress = null;
      newEquipped.top = state.hiddenBackup.top || 'top-bunny-hoodie';
      newEquipped.bottom = state.hiddenBackup.bottom || 'bottom-pleated-skirt';
    } else {
      newEquipped[category] = null;
    }

    const updated = {
      equipped: newEquipped,
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  toggleItem: (item: ClothingItem) => {
    const state = get();
    const isEquipped = state.equipped[item.category] === item.id;

    if (isEquipped) {
      if (item.category === 'hair') return;
      state.unequipCategory(item.category);
    } else {
      state.equipItem(item);
    }
  },

  setItemColor: (itemId: string, color: string) => {
    const state = get();
    const updated = {
      itemColors: {
        ...state.itemColors,
        [itemId]: color,
      },
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  setColors: (newColors: Partial<CharacterColors>) => {
    const state = get();
    const updated = {
      colors: {
        ...state.colors,
        ...newColors,
      },
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  setFaceFeatures: (newFeatures: Partial<CharacterFaceFeatures>) => {
    const state = get();
    const updated = {
      faceFeatures: {
        ...state.faceFeatures,
        ...newFeatures,
      },
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  setPose: (poseId: string) => {
    const state = get();
    const updated = {
      poseId,
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  toggleFavorite: (id: string) => {
    const state = get();
    const isFav = state.favorites.includes(id);
    const newFavorites = isFav
      ? state.favorites.filter((favId) => favId !== id)
      : [...state.favorites, id];

    set({ favorites: newFavorites });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch {
        // Storage restricted
      }
    }
  },

  isFavorite: (id: string) => {
    return get().favorites.includes(id);
  },

  applyFullCharacterPreset: (presetId: string) => {
    const state = get();
    const preset = FULL_CHARACTER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const updated = {
      equipped: { ...preset.equipped },
      hiddenBackup: {
        top: preset.equipped.top || state.hiddenBackup.top,
        bottom: preset.equipped.bottom || state.hiddenBackup.bottom,
      },
      colors: { ...preset.colors },
      faceFeatures: { ...preset.face },
      poseId: preset.poseId,
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  applyOutfitOnlyPreset: (presetId: string) => {
    const state = get();
    const preset = OUTFIT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const updated = {
      equipped: {
        ...state.equipped,
        top: preset.equipped.top,
        bottom: preset.equipped.bottom,
        dress: preset.equipped.dress,
        socks: preset.equipped.socks,
        shoes: preset.equipped.shoes,
        accessory: preset.equipped.accessory,
        bag: preset.equipped.bag,
        headAccessory: preset.equipped.headAccessory,
      },
      hiddenBackup: {
        top: preset.equipped.top || state.hiddenBackup.top,
        bottom: preset.equipped.bottom || state.hiddenBackup.bottom,
      },
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  randomizeOutfit: () => {
    const state = get();
    const randomHair = ITEMS_BY_CATEGORY.hair[Math.floor(Math.random() * ITEMS_BY_CATEGORY.hair.length)];
    const useDress = Math.random() > 0.5;

    const newEquipped: Record<ClothingCategory, string | null> = {
      hair: randomHair.id,
      headAccessory: Math.random() > 0.3
        ? ITEMS_BY_CATEGORY.headAccessory[Math.floor(Math.random() * ITEMS_BY_CATEGORY.headAccessory.length)].id
        : null,
      top: null,
      bottom: null,
      dress: null,
      socks: ITEMS_BY_CATEGORY.socks[Math.floor(Math.random() * ITEMS_BY_CATEGORY.socks.length)].id,
      shoes: ITEMS_BY_CATEGORY.shoes[Math.floor(Math.random() * ITEMS_BY_CATEGORY.shoes.length)].id,
      accessory: Math.random() > 0.3
        ? ITEMS_BY_CATEGORY.accessory[Math.floor(Math.random() * ITEMS_BY_CATEGORY.accessory.length)].id
        : null,
      bag: Math.random() > 0.4
        ? ITEMS_BY_CATEGORY.bag[Math.floor(Math.random() * ITEMS_BY_CATEGORY.bag.length)].id
        : null,
    };

    if (useDress) {
      const randomDress = ITEMS_BY_CATEGORY.dress[Math.floor(Math.random() * ITEMS_BY_CATEGORY.dress.length)];
      newEquipped.dress = randomDress.id;
    } else {
      const randomTop = ITEMS_BY_CATEGORY.top[Math.floor(Math.random() * ITEMS_BY_CATEGORY.top.length)];
      const randomBottom = ITEMS_BY_CATEGORY.bottom[Math.floor(Math.random() * ITEMS_BY_CATEGORY.bottom.length)];
      newEquipped.top = randomTop.id;
      newEquipped.bottom = randomBottom.id;
    }

    const randomPose = POSES[Math.floor(Math.random() * POSES.length)];

    const hairColors = ['#FFA8CA', '#FBBF24', '#C084FC', '#38BDF8', '#312E81', '#F43F5E', '#18181B', '#FFFFFF'];
    const eyeColors = ['#9333EA', '#0284C7', '#DB2777', '#059669', '#EAB308', '#DC2626'];
    const skinTones = ['#FFF8F5', '#FFF0E8', '#FFE4D6', '#FCD5B5'];

    const updated = {
      equipped: newEquipped,
      poseId: randomPose.id,
      colors: {
        ...state.colors,
        hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
        eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
        skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
      },
      sparkleCount: state.sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...state, ...updated });
  },

  resetToDefault: () => {
    const updated = {
      equipped: { ...DEFAULT_EQUIPPED },
      colors: { ...DEFAULT_COLORS },
      faceFeatures: { ...DEFAULT_FACE },
      poseId: 'pose-peace-sign',
      sparkleCount: get().sparkleCount + 1,
    };
    set(updated);
    saveToLocalStorage({ ...get(), ...updated });
  },

  loadSavedState: () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const favs = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set((state) => ({
          ...state,
          ...parsed,
        }));
      }
      if (favs) {
        const parsedFavs = JSON.parse(favs);
        set({ favorites: parsedFavs });
      }
    } catch {
      // Ignore
    }
  },
}));
