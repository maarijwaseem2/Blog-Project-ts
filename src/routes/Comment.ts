import { Router } from 'express';
import * as CommentController from '../controllers/CommentControllers';
import checkAuth from '../middleware/check-auth';

const router = Router();

// Create a new comment
router.post('/comments/:userId/:postId', checkAuth, CommentController.createComment);

// Get a specific comment by ID
router.get('/comments/:id', CommentController.getCommentById);

// Update a comment
router.put('/comments/:id', CommentController.updateComment);

// Delete a comment
router.delete('/comments/:id', checkAuth, CommentController.deleteComment);

export default router;
