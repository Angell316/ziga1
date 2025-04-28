export type DropQuality = 'common' | 'rare' | 'epic' | 'legendary';

export interface Drop {
  drop_id: string;
  owner_id: string;
  invitee_id: string;
  quality: DropQuality;
  level: number;
  income_multiplier: number;
  income_per_hour: number;
  created_at: Date;
}

export interface DropUpgrade {
  cost: number;
  income_boost: number;
  level: number;
}

export interface QualityMultiplier {
  common: number; // 1.0
  rare: number;   // 2.5
  epic: number;   // 6.0
  legendary: number; // 15.0
} 