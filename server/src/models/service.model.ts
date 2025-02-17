import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  price: number;
  duration: number;
  image?: string;
  description?: string;
}

const serviceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Haircut", "Manicure", "Facial", "Pedicure", "Massage"],
  },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  image: { type: String },
  description: { type: String },
});

export default mongoose.model<IService>("Service", serviceSchema);
