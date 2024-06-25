import dotenv from 'dotenv'
dotenv.config();
import jwt from "jsonwebtoken";

export default function createSecretToken(user) {
  return jwt.sign({
     _id:user._id,
    username:user.username,
  }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}
