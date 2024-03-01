import express from 'express';
import * as BlogPostLikeController from '../controllers/BlogLikeControllers';
import * as CommentLikeController from '../controllers/CommentLikeControllers';

const router = express.Router();

router.post('/posts/:userId/:postId/like', BlogPostLikeController.toggleLikeBlogPost);

router.post('/comments/:userId/:commentId/like', CommentLikeController.toggleLikeComment);

export default router;
