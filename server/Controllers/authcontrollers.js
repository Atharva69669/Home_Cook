import userModel from "../Models/userModel.js";
import createSecretToken  from "../util/secretToken.js";
import bcrypt from 'bcrypt'
import OTPModel from "../Models/otpModel.js";

 export async function Signup(req, res, next) {
  try {
    const { email, password,username,otp,createdAt } = req.body;
    const existingMail = await userModel.findOne({ email });
    const existingUser=await userModel.findOne({username});
    if (existingMail || existingUser) {
      return res.status(401).json({ message: " User Already registered" });
    }

    const response = await OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    const user = await userModel.create({ email, password, username, createdAt });
    const token = createSecretToken(user);
    res.cookie("token", token, {
        httpOnly: false,
        maxAge: 36000000,
      });
      
    res.status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
     res.status(500).json({message:"Error Signup"});
  }
}


export async function Login(req, res) {
  try {
      console.log(req);
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Incorrect email' });
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
          return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = createSecretToken(user._id);
      // cookie issue need to be resolved later
      
      // res.cookie("token", token, {
      //   withCredentials: true,
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'Strict',
      //   path: '/',
      //   maxAge: 36000000,
      // });
      const loggedUser=await userModel.find({email:email});
      res.status(201).json({ access_token:token,message: "User logged in successfully", username:loggedUser[0].username,success: true });
      res.end();
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

