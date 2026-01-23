import { Router } from "express";
import { toggleLike } from "../controllers/like.js";

const router = Router();

router.post('/like', toggleLike)
export default router