import { Router } from "express";
import { addPermission, getPermissions, updatePermission } from "../controllers/admin/Admin.controller.js";

const router = Router();

router.post('/add-permission', addPermission)
router.get("/get-permissions", getPermissions)
router.put("/update-permission", updatePermission)
export default router