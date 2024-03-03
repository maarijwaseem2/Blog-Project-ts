import { Router } from 'express';
import * as CommentController from '../controllers/CommentControllers';
import checkAuth from '../middleware/check-auth';

const router = Router();

// Create a new comment
router.post('/comments/:postId', checkAuth, CommentController.createComment);

// Get all comments
router.get('/comments', CommentController.getAllComments);

// Get a specific comment by ID
router.get('/comments/:id', CommentController.getCommentById);

// Update a comment
router.put('/comments/:id',checkAuth, CommentController.updateComment);


router.get('/UserComment', checkAuth ,CommentController.getUserPostsAndCount);

// Delete a comment
router.delete('/comments/:id', checkAuth, CommentController.deleteComment);

export default router;
