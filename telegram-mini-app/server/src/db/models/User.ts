import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  username: string;
  balance: number;
  premium_balance: number;
  total_income: number;
  created_at: Date;
  last_active: Date;
  businesses: mongoose.Types.ObjectId[];
  drops: mongoose.Types.ObjectId[];
  upgrades: mongoose.Types.ObjectId[];
  achievements: mongoose.Types.ObjectId[];
  darknet_status: {
    protection_level: number;
    last_raid_time: Date;
    darknet_businesses: mongoose.Types.ObjectId[];
  };
}

const UserSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true }, // Telegram ID
  username: { type: String, required: true },
  balance: { type: Number, default: 1000 }, // Стартовый капитал из README
  premium_balance: { type: Number, default: 0 },
  total_income: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_active: { type: Date, default: Date.now },
  businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
  drops: [{ type: Schema.Types.ObjectId, ref: 'Drop' }],
  upgrades: [{ type: Schema.Types.ObjectId, ref: 'Upgrade' }],
  achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
  darknet_status: {
    protection_level: { type: Number, default: 0 },
    last_raid_time: { type: Date, default: null },
    darknet_businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }]
  }
});

// Индексы для оптимизации запросов
UserSchema.index({ user_id: 1 });
UserSchema.index({ balance: -1 }); // Для сортировки в рейтинге
UserSchema.index({ total_income: -1 }); // Для сортировки в рейтинге

export default mongoose.model<IUser>('User', UserSchema); 