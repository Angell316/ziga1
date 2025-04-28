export type BusinessType = 'legal' | 'darknet';

export interface Business {
  business_id: string;
  owner_id: string;
  name: string;
  type: BusinessType;
  level: number;
  income_per_hour: number;
  cost: number;
  upgrade_cost: number;
  purchased_at: Date;
}

export interface BusinessUpgrade {
  upgrade_id: string;
  business_id: string;
  level: number;
  cost: number;
  income_boost: number;
}

export interface AvailableBusiness {
  id: string;
  name: string;
  type: BusinessType;
  description: string;
  initial_cost: number;
  initial_income: number;
  image_url?: string;
} 