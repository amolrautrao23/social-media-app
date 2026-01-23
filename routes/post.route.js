import { Router } from 'express';
import { addPost, getAllPosts, deletePost, updatePost } from '../controllers/post.js';
import { createUploadMiddleware } from '../middlewares/upload.js';
import { checkPermission } from '../middlewares/checkPermission.js';
const router = Router();

router.get('/get-posts', getAllPosts);
router.delete('/delete-post/:id',checkPermission('post_delete'), deletePost);
router.post('/add-post',checkPermission('post_add'), createUploadMiddleware([{ name: 'img', prefix: 'post', maxCount: 1, destination: 'uploads/posts' }]), addPost);
router.put('/update-post/:id',checkPermission('post_update'), createUploadMiddleware([{ name: 'img', prefix: 'post', maxcount: 1, destination: 'uploads/posts' }]), updatePost);
export default router;
