// user-model.ts
import { Schema, model, Document } from "mongoose";

// Define the Gender enum
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Define the User interface
interface User extends Document {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// Create and export the User model
export const User = model<User>("User", userSchema);
