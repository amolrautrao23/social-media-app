import { Router } from 'express';
import { addCategory,getCategories } from '../controllers/category.controller.js';

const router = Router();
router.get('/get-categories', getCategories);
router.post('/add-category', addCategory);
export default router;
