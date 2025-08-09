import { Router } from "express";
import {loginUser, registerUser,logoutUser} from "../controllers/user.js"
import { createUploadMiddleware } from "../middlewares/upload.js";
const router = Router();

router.post('/register',createUploadMiddleware([
    { name: "profilePic",prefix:"prof", maxCount: 1, destination: "uploads/users/profilePics" },
    { name: "coverPic",prefix:"cov", maxCount: 1, destination: "uploads/users/coverPics" }
  ]),registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
export default router