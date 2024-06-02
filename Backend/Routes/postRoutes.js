import express from 'express';
import { createPost, getPost } from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(getPost);
router.route('/').post(createPost);

export default router;