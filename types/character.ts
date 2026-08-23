export type ClothingCategory =
  | 'hair'
  | 'headAccessory'
  | 'top'
  | 'bottom'
  | 'dress'
  | 'socks'
  | 'shoes'
  | 'bag'
  | 'accessory';

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface ClothingItem {
  id: string;
  name: string;
  nameTr: string;
  category: ClothingCategory;
  meshType: string;
  icon: string;
  gradient: string;
  rarity: ItemRarity;
  description: string;
  defaultColor: string;
  availableColors?: string[];
  tags?: string[];
  hidesCategories?: ClothingCategory[];
}

export type EyeStyle = 'sparkle' | 'cateye' | 'soft' | 'heart';
export type EyebrowStyle = 'gentle' | 'straight' | 'confident' | 'playful';
export type MouthStyle = 'smile' | 'open' | 'catpout' | 'smirk';
export type BlushStyle = 'circles' | 'sparkles' | 'rosy' | 'peachy';
export type EarringStyle = 'none' | 'heart_studs' | 'pearl_drops' | 'star_dangles' | 'gold_hoops';

export interface CharacterColors {
  hairColor: string;
  hairHighlightColor: string;
  eyeColor: string;
  skinTone: string;
  blushIntensity: number;
  lipColor: string;
}

export interface CharacterFaceFeatures {
  eyeStyle: EyeStyle;
  eyebrowStyle: EyebrowStyle;
  mouthStyle: MouthStyle;
  blushStyle: BlushStyle;
  earrings: EarringStyle;
}

export interface PoseRigTransform {
  head: [number, number, number];
  neck?: [number, number, number];
  torso: [number, number, number];
  hips: [number, number, number];
  leftShoulder: [number, number, number];
  leftUpperArm: [number, number, number];
  leftForearm: [number, number, number];
  leftHand: [number, number, number];
  rightShoulder: [number, number, number];
  rightUpperArm: [number, number, number];
  rightForearm: [number, number, number];
  rightHand: [number, number, number];
  leftUpperLeg: [number, number, number];
  leftLowerLeg: [number, number, number];
  leftFoot: [number, number, number];
  rightUpperLeg: [number, number, number];
  rightLowerLeg: [number, number, number];
  rightFoot: [number, number, number];
  bodyOffset?: [number, number, number];
}

export type PoseCategory = 'all' | 'cute' | 'fashion' | 'idol' | 'casual' | 'fun';

export interface PoseDefinition {
  id: string;
  name: string;
  nameTr: string;
  icon: string;
  badge: string;
  category: PoseCategory;
  description: string;
  transforms: PoseRigTransform;
  idleWiggle?: {
    headAmplitude?: number;
    hipAmplitude?: number;
    speed?: number;
    breathingScale?: number;
  };
  cameraSuggestion?: {
    targetOffsetY?: number;
  };
}

export type CameraPreset = 'full' | 'face' | 'outfit' | 'shoes';

export interface CategoryInfo {
  id: ClothingCategory;
  name: string;
  nameTr: string;
  icon: string;
  badgeCount?: number;
  description: string;
}
