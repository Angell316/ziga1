import { Business } from './business';
import { Drop } from './drops';

// Интерфейс для пользователя
export interface IUser {
  _id: string;
  user_id: string;
  username: string;
  balance: number;
  premium_balance: number;
  total_income: number;
  created_at: Date;
  last_active: Date;
  businesses: Business[];
  drops: Drop[];
  darknet_status: {
    protection_level: number;
    last_raid_time: Date | null;
  };
}

// Интерфейс для данных авторизации
export interface IAuthData {
  user: User;
  token: string;
}

// Интерфейс для статистики пользователя
export interface IUserStats {
  total_balance: number;
  total_income: number;
  total_businesses: number;
  total_drops: number;
  rank: number;
}

export interface User {
  user_id: string;
  username: string;
  balance: number;
  premium_balance: number;
  total_income: number;
  created_at: Date;
  last_active: Date;
  businesses: string[];
  drops: string[];
  upgrades: string[];
  darknet_status: DarknetStatus;
}

export interface DarknetStatus {
  protection_level: number;
  last_raid_time: Date;
  darknet_businesses: string[];
}

export interface UserStats {
  total_earned: number;
  total_spent: number;
  businesses_owned: number;
  drops_collected: number;
  raids_survived: number;
  raids_failed: number;
}

export interface UserAchievement {
  achievement_id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  reward: {
    type: string;
    value: number;
  };
  completed_at: Date;
} 