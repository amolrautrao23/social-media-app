import { Router } from "express";
import {loginUser, registerUser,logoutUser,getUsers, updateUser,deleteUser} from "../controllers/user.js"
import { getMe } from "../controllers/user.js";
import { createUploadMiddleware } from "../middlewares/upload.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router();

router.post('/register',verifyToken,isAdmin,createUploadMiddleware([
    { name: "profilePic",prefix:"prof", maxCount: 1, destination: "uploads/users/profilePics" },
    { name: "coverPic",prefix:"cov", maxCount: 1, destination: "uploads/users/coverPics" }
  ]),registerUser)
router.post('/login',loginUser)
router.get('/logout',verifyToken,logoutUser)
router.get('/get-users',verifyToken,isAdmin,getUsers);
router.put('/update-user/:id',verifyToken,isAdmin,createUploadMiddleware([
    { name: "profilePic",prefix:"prof", maxCount: 1, destination: "uploads/users/profilePics" },
    { name: "coverPic",prefix:"cov", maxCount: 1, destination: "uploads/users/coverPics" }
  ]),updateUser)
  router.delete('/delete-user/:id',verifyToken, isAdmin, deleteUser)
// Get current user info if authenticated
router.get('/me', verifyToken, getMe);
export default router