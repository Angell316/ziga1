import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  transaction_id: mongoose.Types.ObjectId;
  user_id: string;
  amount: number;
  type: string;
  description: string;
  timestamp: Date;
  related_entity?: {
    type: string;
    id: mongoose.Types.ObjectId;
  };
}

const TransactionSchema: Schema = new Schema({
  transaction_id: { type: Schema.Types.ObjectId, auto: true },
  user_id: { type: String, required: true, index: true }, // Telegram ID
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // income, expense, purchase, upgrade, raid_loss и т.д.
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Опциональное поле для связи с другими сущностями (бизнес, дроп и т.д.)
  related_entity: {
    type: { type: String }, // business, drop, upgrade и т.д.
    id: { type: Schema.Types.ObjectId } // ID связанной сущности
  }
});

// Индексы для оптимизации запросов
TransactionSchema.index({ user_id: 1, timestamp: -1 });
TransactionSchema.index({ type: 1, timestamp: -1 });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema); 