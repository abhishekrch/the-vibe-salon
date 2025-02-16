import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Hair", "Nails", "Skin", "Makeup", "Massage"],
    },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
