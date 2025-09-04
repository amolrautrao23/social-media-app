import { Router } from "express";
import {addPost, getAllPosts,deletePost} from "../controllers/post.js"
import { createUploadMiddleware } from "../middlewares/upload.js";
const router = Router();

router.get('/get-posts', getAllPosts)
router.get('/delete-post/:id', deletePost);
router.post('/add-post',createUploadMiddleware([{ name: "img",prefix:"post", maxCount: 1, destination: "uploads/posts" }]), addPost)
export default router