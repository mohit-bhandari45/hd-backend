import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, {timestamps: true
  
});

export const OTPModel = model("Otp", OtpSchema);
