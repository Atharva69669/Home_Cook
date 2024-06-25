import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import blog from '../Models/blogmodel.js';


export async function editProfileController(req, res) {
  try {
    const { username, password, userAbout, userPic } =
      req.body;

    const user = await userModel.findOneAndUpdate(
      { username:username },
      {
        password: await bcrypt.hash(password, 12),
        userAbout: userAbout,
        userPic: userPic,
      }
    );
   

    if (user) {
      res
        .status(200)
        .json({ message: "Profile updated successfully", user: user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
