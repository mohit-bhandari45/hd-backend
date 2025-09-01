import { Request, Response } from "express";
import { encode } from "../middleware";
import { User } from "../model/user.model";
import { generateOTP } from "../utils/generateOTP";
import { sendOTP } from "../config/email.service";
import { OTPModel } from "../model/otp.model";

/**
 * @desc Handles user registration
 * @method POST
 * @route /auth/signup
 */
export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, dob, otp } = req.body;

    // checking if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // fetching the OTP record
    const record = await OTPModel.findOne({ email });
    if (!record) {
      return res.status(400).json({ error: "No OTP found for this email" });
    }

    // verifying OTP match
    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // checking if OTP expired
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // creating new user
    const user = await User.create({ username, email, dob });

    // cleaning old otp
    await OTPModel.deleteOne({ email });

    const token = encode(user);

    return res.status(201).json({ token });
  } catch (e) {
    console.error("Register error:", e);
    return res.status(400).json({ error: (e as Error).message });
  }
};

/**
 * @desc sends user otp for verification
 * @method POST
 * @route /auth/get-otp
 */
export const getOTPHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);


  await OTPModel.create({ email, otp, expiresAt });

  try {
    await sendOTP(email, otp);
    console.log("OTP sent " + "to: " + email);
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
};

/**
 * @desc resends otp to user
 * @method POST
 * @route /auth/resend-otp
 */
export const resendOTPHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await OTPModel.deleteOne({ email });
  await OTPModel.create({ email, otp, expiresAt });

  try {
    await sendOTP(email, otp);
    console.log("OTP sent " + "to: " + email);
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
};

/**
 * @desc Handles user login
 * @method POST
 * @route /auth/login
 */
export const signinHandler = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    // verifying otp
    const record = await OTPModel.findOne({ email });
    if (!record) {
      return res.status(400).json({ error: "No OTP found for this email" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // checking expiration
    if (record.expiresAt < new Date()) {
      await OTPModel.deleteOne({ email });
      return res.status(400).json({ error: "OTP expired" });
    }

    // OTP verified => deleting record
    await OTPModel.deleteOne({ email });

    // issue a token
    const token = encode(user);

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};
