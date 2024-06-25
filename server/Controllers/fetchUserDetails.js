import userModel from "../Models/userModel.js";

export default async function fetchUserDetailsController(req, res) {
  try {
    const username = req.params.username
    const response = await userModel.find({username:username}); 
    if(response.length===0) res.status(404).json({message:"User Not found"});
    res.status(200).json({ user: response }); 
  } catch (error) { 
    res.status(500).json({ message: "Error" }); 
  }
}
