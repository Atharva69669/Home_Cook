import  {Signup,Login}  from "../Controllers/authcontrollers.js";
import  express from "express";
import sendOTP from "../Controllers/otpcontroller.js";
import {userVerification} from "../Middleware/auth.js";
import { editProfileController } from "../Controllers/editProfileController.js";
const router =express.Router();

router.get('/auth',userVerification);
router.post("/signup", Signup);
router.post('/login',Login)
router.post('/sendotp',sendOTP);
router.put('/edit',editProfileController);




export default router;
