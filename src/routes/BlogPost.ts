import {Router} from 'express';
import * as BlogController from '../controllers/BlogPostControllers';
import checkAuth  from '../middleware/check-auth';

const router = Router();

// Create a new blog post
router.post('/posts', checkAuth, BlogController.createBlogPost);

// Get all blog posts
router.get('/posts',BlogController.getAllBlogPosts);

// Get a specific blog post by ID
router.get('/posts/:id', BlogController.getBlogPostById);

// Update a blog post
router.put('/posts/:id',checkAuth, BlogController.updateBlogPost);

// Delete a blog post
router.delete('/posts/:id',checkAuth, BlogController.deleteBlogPost);

export default router;
