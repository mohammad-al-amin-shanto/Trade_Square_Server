import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  user: mongoose.Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IItem>('Item', itemSchema);