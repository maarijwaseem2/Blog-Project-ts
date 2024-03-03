import express from 'express';
import * as BlogPostLikeController from '../controllers/BlogLikeControllers';
import * as CommentLikeController from '../controllers/CommentLikeControllers';

const router = express.Router();

router.post('/posts/:userId/:postId', BlogPostLikeController.toggleLikeBlogPost);

router.post('/comments/:userId/:commentId', CommentLikeController.toggleLikeComment);

export default router;
