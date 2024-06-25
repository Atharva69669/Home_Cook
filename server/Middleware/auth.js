import userModel from "../Models/userModel.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export function userVerification(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await userModel.findById(data._id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.json({ status: false });
      }
    }
  });
}


