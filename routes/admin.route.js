import { Router } from "express";
import { addPermission, deletePermission, getPermissions, updatePermission } from "../controllers/admin/Admin.controller.js";

const router = Router();

router.post('/add-permission', addPermission)
router.get("/get-permissions", getPermissions)
router.put("/update-permission", updatePermission)
router.delete("/delete-permission", deletePermission)
export default router