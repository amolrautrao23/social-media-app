import { Router } from 'express';
import { addPost, getAllPosts, deletePost, updatePost } from '../controllers/post.js';
import { createUploadMiddleware } from '../middlewares/upload.js';
const router = Router();

router.get('/get-posts', getAllPosts);
router.delete('/delete-post/:id', deletePost);
router.post('/add-post', createUploadMiddleware([{ name: 'img', prefix: 'post', maxCount: 1, destination: 'uploads/posts' }]), addPost);
router.put('/update-post/:id', createUploadMiddleware([{ name: 'img', prefix: 'post', maxcount: 1, destination: 'uploads/posts' }]), updatePost);
export default router;
