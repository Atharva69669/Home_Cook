import OTPModel from "../Models/otpModel.js";
import userModel from "../Models/userModel.js";

import otpGenerator from "otp-generator";

export default async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    const isPresentUser = await userModel.findOne({ email });
    console.log(isPresentUser,email)
    if (isPresentUser) {
      res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    } 
    else {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const otpPayload = { email:email,otp:otp };
      const otpBody = await OTPModel.create(otpPayload);
      console.log(otpBody)
      res.status(201).json({
        success: true,
        message: "OTP sent successfully",
        otp,
      });
    }
  } catch (error) {
    console.log("hw");
     res.status(500).json({ success: false, error: error.message });
  }
}
