import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  rating_id: mongoose.Types.ObjectId;
  user_id: string;
  score: number;
  rank: number;
  last_updated: Date;
  rating_type: string;
  period?: string;
}

const RatingSchema: Schema = new Schema({
  rating_id: { type: Schema.Types.ObjectId, auto: true },
  user_id: { type: String, required: true, index: true }, // Telegram ID
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }, // Позиция в рейтинге
  last_updated: { type: Date, default: Date.now },
  rating_type: { type: String, required: true }, // total_balance, income, businesses, drops и т.д.
  period: { type: String } // daily, weekly, monthly, all_time
});

// Составной индекс для быстрого доступа к рейтингам определенного типа и периода
RatingSchema.index({ rating_type: 1, period: 1, score: -1 });
RatingSchema.index({ rating_type: 1, period: 1, rank: 1 });
RatingSchema.index({ last_updated: -1 });

export default mongoose.model<IRating>('Rating', RatingSchema); 