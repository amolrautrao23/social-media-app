import { Router } from "express";
import {addPost} from "../controllers/post.js"
import { createUploadMiddleware } from "../middlewares/upload.js";
const router = Router();

router.post('/add-post',createUploadMiddleware([{ name: "img",prefix:"post", maxCount: 1, destination: "uploads/posts" }]), addPost)
export default router