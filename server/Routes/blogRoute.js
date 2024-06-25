import  express from "express";
import blogDataController from "../Controllers/addLikeController.js";
import {blogPublishController} from "../Controllers/blogPublishController.js";
import deleteBlogController from "../Controllers/deleteBlogController.js";
import getAllBlogsVontroller from "../Controllers/getAllBlogsController.js";
import getBlogController from "../Controllers/getBlogController.js";
import getBlogsController from  "../Controllers/getBlogsController.js";
import getBlogsByTagController from "../Controllers/getBlogsByTagcontroller.js";
import  homePageController  from "../Controllers/homePageController.js";
import updateViewController from "../Controllers/updateViewController.js";
import addLikeController from "../Controllers/addLikeController.js";
import fetchUserDetailsController from "../Controllers/fetchUserDetails.js";


const router =express.Router();
router.post('/publish',blogPublishController)
router.put('/addlike',addLikeController);
router.get('/getblogs/:author',getBlogsController)
router.get('/getall',getAllBlogsVontroller);
router.get('/getblog/:blogId',getBlogController);
router.post('/blogdata',blogDataController)
router.put('/updateview/:blogid',updateViewController)
router.get('/getn/:n',homePageController)
router.get('/get/:category/:tag/:n',getBlogsByTagController)
router.delete('/delete/:id',deleteBlogController);
router.get('/user/:username',fetchUserDetailsController);

export default router;