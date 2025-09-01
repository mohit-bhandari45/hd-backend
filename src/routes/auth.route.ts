
import { Router } from "express";
import { getOTPHandler, registerHandler, resendOTPHandler, signinHandler } from "../controller/auth.controller";

const authRoutes= Router();

authRoutes.post("/register",registerHandler);
authRoutes.post("/signin",signinHandler);
authRoutes.post("/get-otp",getOTPHandler);
authRoutes.post("/resend-otp",resendOTPHandler);

export default authRoutes;

