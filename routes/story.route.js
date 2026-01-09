import { Router } from "express";

const router = Router();

router.get('/test', (req, res) => {
    res.send("This is story test route")
})
export default router