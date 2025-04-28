import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  achievement_id: mongoose.Types.ObjectId;
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

const AchievementSchema: Schema = new Schema({
  achievement_id: { type: Schema.Types.ObjectId, auto: true },
  user_id: { type: String, required: true, index: true }, // Telegram ID
  type: { type: String, required: true }, // business, drops, income, darknet и т.д.
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: {
    type: { type: String, required: true }, // coins, premium_coins, multiplier и т.д.
    value: { type: Number, required: true } // Размер награды
  },
  completed_at: { type: Date, default: Date.now }
});

// Индексы для оптимизации запросов
AchievementSchema.index({ user_id: 1, type: 1 });
AchievementSchema.index({ completed_at: -1 });

export default mongoose.model<IAchievement>('Achievement', AchievementSchema); 