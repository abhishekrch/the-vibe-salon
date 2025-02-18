import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  userId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
}

const appointmentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  notes: { type: String },
});

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
