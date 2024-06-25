import mongoose from "mongoose";
import mailSender from "../util/mailSender.js";

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 20, // OTP expires in 20 minutes
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

OTPSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    throw error;
  }
});

const OTPModel = mongoose.model("OTP", OTPSchema);
export default OTPModel;
