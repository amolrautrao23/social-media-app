import { Router } from "express";

const router = Router();

router.get('/test', (req, res) => {
    res.send("This is comment test route")
})
export default router