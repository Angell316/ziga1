import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
  business_id: mongoose.Types.ObjectId;
  owner_id: string;
  name: string;
  type: string;
  level: number;
  income_per_hour: number;
  cost: number;
  upgrade_cost: number;
  purchased_at: Date;
  is_darknet?: boolean;
}

const BusinessSchema: Schema = new Schema({
  business_id: { type: Schema.Types.ObjectId, auto: true },
  owner_id: { type: String, required: true, index: true }, // Telegram ID
  name: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: Number, default: 1 },
  income_per_hour: { type: Number, required: true },
  cost: { type: Number, required: true },
  upgrade_cost: { type: Number, required: true },
  purchased_at: { type: Date, default: Date.now },
  is_darknet: { type: Boolean, default: false } // Флаг для даркнет-бизнесов
});

// Индексы для оптимизации запросов
BusinessSchema.index({ owner_id: 1, type: 1 });
BusinessSchema.index({ income_per_hour: -1 });

export default mongoose.model<IBusiness>('Business', BusinessSchema); 