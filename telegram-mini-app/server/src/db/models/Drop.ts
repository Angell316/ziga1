import mongoose, { Schema, Document } from 'mongoose';

export interface IDrop extends Document {
  drop_id: mongoose.Types.ObjectId;
  owner_id: string;
  invitee_id: string;
  quality: string;
  level: number;
  income_multiplier: number;
  income_per_hour: number;
  created_at: Date;
  is_active: boolean;
}

const DropSchema: Schema = new Schema({
  drop_id: { type: Schema.Types.ObjectId, auto: true },
  owner_id: { type: String, required: true, index: true }, // Telegram ID владельца
  invitee_id: { type: String, required: true, unique: true }, // Telegram ID приглашенного
  quality: { type: String, default: "1" }, // Качество дропа
  level: { type: Number, default: 1 },
  income_multiplier: { type: Number, default: 1.0 },
  income_per_hour: { type: Number, default: 10 }, // Базовый доход из README
  created_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true } // Для отслеживания активных/неактивных дропов
});

// Индексы для оптимизации запросов
DropSchema.index({ owner_id: 1 });
DropSchema.index({ invitee_id: 1 }, { unique: true });
DropSchema.index({ created_at: -1 });

// Виртуальное поле для расчета текущего дохода от дропа
DropSchema.virtual('current_income').get(function() {
  return this.income_per_hour * this.level * this.income_multiplier;
});

export default mongoose.model<IDrop>('Drop', DropSchema); 