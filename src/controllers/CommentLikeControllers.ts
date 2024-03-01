import { Request, Response } from 'express';
import { AppDataSource } from '../database/db.config';
import { CommentLike } from '../entites/CommentLike';

export const toggleLikeComment = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const commentId = parseInt(req.params.commentId);
    try {

        if (isNaN(userId) || isNaN(commentId)) {
            return res.status(400).json({ error: 'Invalid user ID or comment ID' });
        }
        const likeRepository = AppDataSource.getRepository(CommentLike);

        let like = await likeRepository.findOne({ 
            where:{user:{id: userId}, comment:{id: commentId}} });

            if (like) {
                // If the user has already liked the comment, toggle the like
                like.liked = !like.liked;
                like.count = like.liked ? like.count + 1 : like.count - 1;
            } 
            else {
                like = likeRepository.create({
                user:{id:userId},
                comment:{id:commentId},
                liked: true, count: 1 });
        }

        await likeRepository.save(like);
        res.status(200).json({ message: like.liked ? 'Comment liked successfully' : 'Comment unliked successfully' });
    } catch (error) {
        console.error('Error toggling like on comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
