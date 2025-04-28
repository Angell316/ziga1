import mongoose, { Schema, Document } from 'mongoose';

export interface IUpgrade extends Document {
  upgrade_id: mongoose.Types.ObjectId;
  owner_id: string;
  type: string;
  level: number;
  effect: {
    type: string;
    value: number;
  };
  purchased_at: Date;
  expires_at?: Date;
}

const UpgradeSchema: Schema = new Schema({
  upgrade_id: { type: Schema.Types.ObjectId, auto: true },
  owner_id: { type: String, required: true, index: true }, // Telegram ID
  type: { type: String, required: true }, // Тип улучшения (бизнес, защита, эффективность и т.д.)
  level: { type: Number, default: 1 },
  effect: {
    type: { type: String, required: true }, // income_boost, protection, drop_quality и т.д.
    value: { type: Number, required: true } // Числовое значение эффекта
  },
  purchased_at: { type: Date, default: Date.now },
  expires_at: { type: Date, default: null } // Для временных улучшений
});

// Индексы для оптимизации запросов
UpgradeSchema.index({ owner_id: 1, type: 1 });
UpgradeSchema.index({ expires_at: 1 }); // Для очистки истекших улучшений

// Метод для проверки, истекло ли улучшение
UpgradeSchema.methods.isExpired = function(): boolean {
  if (!this.expires_at) return false; // Безлимитные улучшения
  return this.expires_at < new Date();
};

export default mongoose.model<IUpgrade>('Upgrade', UpgradeSchema); 